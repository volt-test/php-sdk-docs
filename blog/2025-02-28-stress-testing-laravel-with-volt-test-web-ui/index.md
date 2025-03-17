---
slug: stress-testing-laravel-with-volt-test-web-ui

title: "Stress Testing Laravel Applications with VoltTest (Web UI Flow)"

description: "This tutorial walks you through setting up and executing stress tests on a Laravel application using the VoltTest PHP SDK. You will learn how to simulate real user interactions such as visiting the home page, registering a new user, and accessing the dashboard, ensuring your application can handle concurrent traffic efficiently."
authors: [elwafa]

image: "/img/stress-testing-laravel-web-ui-og.png"

tags: ["laravel", "performance-testing","load-testing", "volt-test", "stress-test"]

---


# Introduction

In this tutorial, we will explore how to perform stress testing on a Laravel application using the VoltTest PHP SDK. You will learn how to:

* Simulate multiple users interacting with your Laravel application.
* Test user registration and authentication workflows.
* Measure application performance under load.
* Extract dynamic values like CSRF tokens during test execution.
* Use a CSV file as a data source for testing.
* Analyze and optimize performance bottlenecks.

By the end of this guide, you will be able to confidently run automated performance tests to ensure your Laravel app is scalable and resilient.
<!-- truncate -->
![Stress Testing Laravel Applications with VoltTest](/img/stress-testing-laravel-web-ui.png)
## Prerequisites

Ensure you have the following:

- A running Laravel application
- PHP 8.0 or higher
- Composer installed

## Installing VoltTest PHP SDK

First, install the VoltTest PHP SDK via Composer in your Laravel project:

```bash title="Terminal"
composer require volt-test/php-sdk
```
Or clone the repository:

```bash title="Terminal"
git clone https://github.com/volt-test/php-sdk.git
cd php-sdk
composer install
```
**For _Windows_ users,** Visit the installation guide [here](https://php.volt-test.com/docs/installation#running-on-windows)

## Creating Test Data

For a realistic test, create a CSV file (`users.csv`) with test user data:

```csv title="users.csv"
email,password
user1@example.com,password123
user2@example.com,password123
user3@example.com,password123
user4@example.com,password123
user5@example.com,password123
```

Place this file in your project directory.

## Writing the Stress Test

Create a file named `laravel_stress_test.php` in your project root and add the following script (or you can use the laravel's command):

```php title="laravel_stress_test.php"
<?php

require 'vendor/autoload.php';

use VoltTest\DataSourceConfiguration;
use VoltTest\VoltTest;

// Define test
$test = new VoltTest(
'Laravel User Flow',
'Tests home page visit, user registration, and dashboard access'
);

// Configure test parameters
$test
->setVirtualUsers(5)
->setDuration('60s') // Optional: Set test duration
->setRampUp('10s') // Optional: Set ramp-up time
->setHttpDebug(true); // Enable HTTP debug logging for checking requests before sending the all requests

// Create test scenario
$userFlowScenario = $test->scenario('User Registration Flow')
->autoHandleCookies(); // Automatically handle cookies without extract them

// Set up data source
$userFlowScenario->setDataSourceConfiguration(
new DataSourceConfiguration(__Dir__ . '/users.csv', 'unique', true) // Load data from CSV file, should be the full path
);

// Step 1: Visit home page
$userFlowScenario->step('Visit Home Page')
->get('http://localhost:8000')
->header('Accept', 'text/html')
->validateStatus('home_page_loaded', 200)
->setThinkTime('2s');

// Step 2: Visit register page and extract CSRF token
$userFlowScenario->step('Visit Register Page')
->get('http://localhost:8000/register')
->header('Accept', 'text/html')
->extractFromHtml('csrf_token', 'input[name="_token"]', 'value')
->validateStatus('register_page_loaded', 200)
->setThinkTime('2s');

// Step 3: Submit registration form
$userFlowScenario->step('Submit Registration')
->post(
'http://localhost:8000/register',
'_token=${csrf_token}&name=Test User&email=${email}&password=${password}&password_confirmation=${password}'
)
->header('Content-Type', 'application/x-www-form-urlencoded')
->validateStatus('registration_successful', 302)
->setThinkTime('1s');

// Step 4: Access dashboard
$userFlowScenario->step('Visit Dashboard')
->get('http://localhost:8000/dashboard')
->header('Accept', 'text/html')
->validateStatus('dashboard_loaded', 200)
->setThinkTime('3s');

// Run test
$result = $test->run(true); // true enables real-time progress output

// Display results summary in case you turned off the real-time progress output
echo "\n\nTest Results Summary:\n";
echo "====================\n";
echo "Total Requests: " . $result->getTotalRequests() . "\n";
echo "Success Rate: " . $result->getSuccessRate() . "%\n";
echo "Requests/second: " . $result->getRequestsPerSecond() . "\n";
echo "Min Response Time: " . $result->getMinResponseTime() . "\n";
echo "Max Response Time: " . $result->getMaxResponseTime() . "\n";
echo "Avg Response Time: " . $result->getAvgResponseTime() . "\n";
echo "P95 Response Time: " . $result->getP95ResponseTime() . "\n";
```

### Code Explanation
The stress test script simulates multiple users interacting with a Laravel web application. Here’s how it works:

1. **Initialize VoltTest**:
```php title="laravel_stress_test.php"
$test = new VoltTest(
'Laravel User Flow',
'Tests home page visit, user registration, and dashboard access'
);
```
    - Creates a new test instance with a descriptive name.

2. **Configure test parameters**:
```php title="laravel_stress_test.php"
$test
->setVirtualUsers(5)
->setDuration('60s')
->setRampUp('10s')
->setHttpDebug(true);
```
- **5 virtual users**: Simulate 5 concurrent users.
- **Running the test for 60 seconds**: Optional - you can remove this line to run the test and finish when all virtual users finish their scenarios.
- **Ramping up over 10 seconds**: Optional - you can remove this line to start all virtual users at the same time.
- **Enables HTTP debug logging**: Optional - Inspect requests while sending them.

3. **Create a test scenario**:
```php title="laravel_stress_test.php"
$userFlowScenario = $test->scenario('User Registration Flow')
->autoHandleCookies();
```
- Creates a scenario for user registration flow.
- **autoHandleCookies()**: Automatically handles cookies without extracting them.

4. **Set up data source**:
```php title="laravel_stress_test.php"
$userFlowScenario->setDataSourceConfiguration(
new DataSourceConfiguration(__Dir__ . '/users.csv', 'unique', true)
);
```
- Loads user data from `users.csv` file. To simulate different users for each virtual user.

5. **Define test steps**:
```php title="laravel_stress_test.php"
$userFlowScenario->step('Visit Home Page')
->get('http://localhost:8000')
->header('Accept', 'text/html')
->validateStatus('home_page_loaded', 200)
->setThinkTime('2s');
```
- **Visit Home Page**: Sends a GET request to the home page.
- **Accept header**: Optional - Specifies the expected response content type.
- **Validate Status**: Optional - Checks if the response status is 200.
- **Think Time**: Optional -  Simulates user thinking time before the next step, so the virtual user will wait 2s before execute the next request.

6. **Extract CSRF token from registration page**:
```php title="laravel_stress_test.php"
$userFlowScenario->step('Visit Register Page')
->get('http://localhost:8000/register')
->header('Accept', 'text/html')
->extractFromHtml('csrf_token', 'input[name="_token"]', 'value')
->validateStatus('register_page_loaded', 200)
->setThinkTime('2s');
```
- Visits the registration page.
- Extracts the CSRF token from the HTML response. The token is stored in the variable `${csrf_token}`.
  - The way to extract the token is by using the `extractFromHtml` method, which takes the token name, the selector, and the attribute name.

7. **Submit registration form**:
```php title="laravel_stress_test.php"
$userFlowScenario->step('Submit Registration')
->post(
'http://localhost:8000/register',
'_token=${csrf_token}&name=Test User&email=${email}&password=${password}&password_confirmation=${password}'
)
->header('Content-Type', 'application/x-www-form-urlencoded')
->validateStatus('registration_successful', 302)
->setThinkTime('1s');
```
- Submits the registration form with the extracted CSRF token and user data.
- Validates the response status code.
- Sets a 1-second think time before the next step.
- The `${email}` and `${password}` variables are replaced with values from the CSV file.
- The `${csrf_token}` variable is replaced with the extracted CSRF token.
- The `validateStatus` method checks if the response status is 302 (redirect).
- The `setThinkTime` method simulates user thinking time before the next step.

8. **Access dashboard**:
```php title="laravel_stress_test.php"
$userFlowScenario->step('Visit Dashboard')
->get('http://localhost:8000/dashboard')
->header('Accept', 'text/html')
->validateStatus('dashboard_loaded', 200)
->setThinkTime('3s');
```
Ensures successful login by verifying dashboard access.

9. **Run the test**:
```php title="laravel_stress_test.php"
$result = $test->run(true);
```
- Executes the test with real-time progress output.



## Running the Test

Execute the script:

```bash
php laravel_stress_test.php
```

You'll see real-time progress, followed by a summary of test results.

## Analyzing Results

### Key Metrics:

- **Success Rate**: Should be as close to 100% as possible
- **Response Times**: Lower is better
- **Requests per Second**: Higher means better scalability

## Common Issues & Fixes

### Low Success Rate

- **Possible Cause**: Server overload
- **Solution**: Reduce virtual users or optimize queries

### High Response Times

- **Possible Cause**: Database bottlenecks
- **Solution**: Optimize queries, enable caching

### CSRF Token Extraction Fails

- **Possible Cause**: HTML structure changes
- **Solution**: Update the selector

## Next Steps

- Expand tests to cover more user flows
- Test with more virtual users
- Automate stress tests in CI/CD pipelines

## Conclusion

Using VoltTest for stress testing helps identify Laravel application bottlenecks before they impact users. Regular testing ensures scalability and reliability.

Stay tuned for our next guide on **Stress Testing Laravel APIs with VoltTest**!

Happy testing!

## Get in Touch

For questions, discussions, or contributions, feel free to open an issue or start a discussion on the Volt-Test GitHub repository:
[https://github.com/volt-test/php-sdk](https://github.com/volt-test/php-sdk)
