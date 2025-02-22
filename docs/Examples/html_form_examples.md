---
sidebar_label: 'HTML Form Examples'
sidebar_position: 0
id: html-form-examples
title: HTML Form Examples
---

# HTML Form Examples

Here are some examples of testing HTML forms using VoltTest PHP SDK.


Ex: 
- [Login Form Testing](#login-form-testing)
  - Login form testing with CSRF token extraction
- [Registration Form Example](#registration-form-example)
  - Registration form testing with CSRF token extraction
- [Multi-Step Form Example](#multi-step-form-example)
  - Multi-step form testing with session management
- [Data-Driven Form Testing](#data-driven-form-testing)
  - Use CSV file as data source
- [Form Validation Testing](#form-validation-testing)
  - Test form validation with different scenarios 

## Login Form Testing

```php
$test = new VoltTest('Login Form Test');
$test->setVirtualUsers(10);
$scenario = $test->scenario('Login Form Test');

// Get login page and extract CSRF token
$scenario->step('Get Login Page')
    ->get('https://example.com/login')
    ->extractFromHtml('csrf_token', 'input[name="_token"]', 'value')
    ->validateStatus('page_load', 200);

// Submit login form
$scenario->step('Submit Login')
    ->post('https://example.com/login', '_token=${csrf_token}&email=user@example.com&password=secret')
    ->header('Content-Type', 'application/x-www-form-urlencoded')
    ->validateStatus('login_success', 302);
    
// Run the test and get the result
$result = $test->run();
```

In the example above, we create a new test named "Login Form Test" and set the number of virtual users to 10. We then create a scenario named "Login Form Test" and add two steps to it. The first step gets the login page, extracts the CSRF token, and validates the page load status. The second step submits the login form with the CSRF token, email, and password, and validates the login success status.

## Registration Form Example

```php
$test = new VoltTest('Registration Form');
$test->setVirtualUsers(100);
$test->setDuration('5s');

$scenario = $test->scenario('Registration Form');

// Load registration page
$scenario->step('Load Register Page')
    ->get('https://example.com/register')
    ->extractFromHtml('csrf_token', 'input[name="_token"]', 'value')
    ->validateStatus('page_load', 200);

// Submit registration with form data
$scenario->step('Submit Registration')
    ->post('https://example.com/register', '_token=${csrf_token}&name=${name}&email=${email}&password=${password}&password_confirmation=${password}')
    ->header('Content-Type', 'application/x-www-form-urlencoded')
    ->validateStatus('registration_success', 302);


// Run the test and get the result
$result = $test->run();

```

In the example above, we create a new test named "Registration Form" and
set the number of virtual users to 100 and the test duration to 5 seconds.
We then create a scenario named "Registration Form" and add two steps to it.
The first step loads the registration page, extracts the CSRF token,
and validates the page load status. The second step submits the registration form 
with the CSRF token, name, email, password, and password confirmation,
and validates the registration success status.


## Multi-Step Form Example

```php
$test = new VoltTest('Multi-Step Form');
$test->setVirtualUsers(50);

$scenario = $test->scenario('Multi-Step Form');

// Step 1: Personal Info
$scenario->step('Personal Info')
    ->get('https://example.com/form/step1')
    ->extractFromHtml('form_token', 'input[name="_token"]', 'value')
    ->validateStatus('step1_load', 200);

$scenario->step('Submit Step 1')
    ->post('https://example.com/form/step1',''form_token=${form_token}&name=${name}&email=${email}'')
    ->header('Content-Type', 'application/x-www-form-urlencoded')
    ->validateStatus('step1_success', 302)
    ->extractFromCookie('session_id', 'session_id');

// Step 2: Address Info
$scenario->step('Address Info')
    ->get('https://example.com/form/step2')
    ->header('Cookie', 'session_id=${session_id}')
    ->validateStatus('step2_load', 200);

$scenario->step('Submit Step 2')
    ->post('https://example.com/form/step2', 'address=${address}&city=${city}&country=${country}')
    ->header('Cookie', 'session_id=${session_id}')
    ->validateStatus('step2_success', 302);

// Run the test and get the result
$result = $test->run(); 
```


In the example above, we create a new test named "Multi-Step Form" and set the number of virtual users to 50. We then create a scenario named "Multi-Step Form" and add four steps to it. The first two steps handle the personal info form, and the last two steps handle the address info form. Each step extracts data from the response and validates the status of the form submission.


## Data-Driven Form Testing

```php
$test = new VoltTest('Data-Driven Form Test');
$test->setVirtualUsers(10);

// Configure data source
$dataConfig = new DataSourceConfiguration(
    __DIR__ .'/test_users.csv',    // CSV with test data actual file path
    'sequential',         // Sequential selection
    true                 // Has header row
);

$scenario = $test->scenario('Registration Test')
    ->setDataSourceConfiguration($dataConfig);

// Registration process using data from CSV
$scenario->step('Submit Registration')
    ->post('https://example.com/register','name=${name}&email=${email}&phone=${phone}')
    ->header('Content-Type', 'application/x-www-form-urlencoded')
    ->validateStatus('registration_success', 200);
    
// Run the test and get the result
$result = $test->run();
```
:::info
The CSV file should have columns for name, email, and phone with corresponding values for each test case.
:::
Data source configuration is used to provide test data for data-driven testing. In the example above, we create a new test named "Data-Driven Form Test" and set the number of virtual users to 10. We then configure a data source using a CSV file with test data and set it to sequential selection. We create a scenario named "Registration Test" and set the data source configuration. The scenario step submits the registration form using data from the CSV file and validates the registration success status.

## Form Validation Testing

```php
$scenario = $test->scenario('Form Validation');

// Test required fields
$scenario->step('Submit Empty Form')
    ->post('https://example.com/submit','')
    ->header('Content-Type', 'application/x-www-form-urlencoded')
    ->validateStatus('validation_error', 422);

// Test invalid email
$scenario->step('Submit Invalid Email')
    ->post('https://example.com/submit','email=invalid-email')
    ->header('Content-Type', 'application/x-www-form-urlencoded')
    ->validateStatus('validation_error', 422);

// Test password mismatch
$scenario->step('Password Mismatch')
    ->post('https://example.com/submit','password=test123&password_confirmation=test456')
    ->header('Content-Type', 'application/x-www-form-urlencoded')
    ->validateStatus('validation_error', 422);
```

In the example above, we create a new scenario named "Form Validation" and add three steps to it. Each step submits a form with different validation errors and validates the status code to ensure proper form validation handling.