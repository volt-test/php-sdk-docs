---

slug: introducing-volt-test-php-load-testing

title: "Introducing Volt-Test: Stress & Load Testing for PHP Developers"

authors: [elwafa]

tags: [stress-test,performance-testing, php, load-testing, volt-test]

image: "/img/volt-test-performance.png"

---

# Introducing VoltTest PHP SDK: Seamless Performance Testing for PHP Applications

Performance testing is crucial in modern application development, yet many developers skip it due to complex tools that don’t fit into PHP workflows. Today, I'm excited to introduce **VoltTest PHP SDK**, a powerful load testing tool with a PHP-native interface backed by Go's exceptional performance capabilities.
<!-- truncate -->

## Problem

As a PHP developer, I’ve often faced a common challenge: existing performance testing tools often require learning a new language, platform, or configuration syntax. This cognitive overhead leads many teams to defer proper load testing or rely on third-party services, creating additional costs and dependencies.

VoltTest bridges this gap by providing:

- A **fluent, intuitive PHP API** that feels natural to PHP developers
- The **raw power of Go** for generating heavy loads with minimal resources
- **No additional infrastructure** requirements beyond your existing PHP environment
- **Comprehensive metrics** to identify bottlenecks and performance issues

## How VoltTest Works: PHP Interface, Go Engine

VoltTest employs a unique dual-language architecture that delivers the best of both worlds:

1. Your **PHP code** defines test scenarios, configurations, and validation rules
2. The **SDK** transforms these definitions into a format the Go engine understands
3. The **Go engine** executes the actual load testing with true concurrency
4. **Results** are streamed back to your PHP application for analysis

This architecture allows you to write and maintain tests in familiar PHP syntax while benefiting from Go's exceptional performance characteristics for the load generation.

## Key Features

- **Fluent API**: Natural, chainable PHP methods for defining test scenarios
- **Multi-scenario support**: Test different user flows with configurable weight distribution
- **Variable extraction**: Capture and reuse values from responses (cookies, headers, JSON paths and HTML)
- **Data-driven testing**: Feed tests with CSV files to simulate realistic user data
- **Detailed metrics**: Get comprehensive performance insights including response times, throughput, and error rates

## Getting Started with VoltTest

Let's create a simple performance test to demonstrate VoltTest's capabilities:

```php
<?php

use VoltTest\VoltTest;

// Create a new test
$test = new VoltTest(
    'API Performance Test',
    'Tests our REST API under load'
);

// Configure test parameters
$test
    ->setVirtualUsers(50)      // Number of concurrent users
    ->setDuration('30s')       // Test duration
    ->setRampUp('5s')          // Gradually ramp up to full load
    ->setHttpDebug(false);     // Disable HTTP debug output

// Create a test scenario
$apiScenario = $test->scenario('API Flow')
    ->setWeight(100);           // Full weight (100%) to this scenario

// Define the first step - Get auth token
$apiScenario->step('Get Token')
    ->post('https://api.example.com/auth', '{"username":"test","password":"test123"}')
    ->header('Content-Type', 'application/json')
    ->extractFromJson('token', 'data.token')  // Extract token from response
    ->validateStatus('success', 200);

// Define the second step - Use the token
$apiScenario->step('Get User Data')
    ->get('https://api.example.com/users/me')
    ->header('Authorization', 'Bearer ${token}')  // Use extracted token
    ->validateStatus('success', 200);

// Run the test
$result = $test->run(true);  // true enables real-time progress output

// Display results
echo "Success Rate: " . $result->getSuccessRate() . "%\n";
echo "Requests/sec: " . $result->getRequestsPerSecond() . "\n";
echo "Avg Response: " . $result->getAvgResponseTime() . "\n";
echo "P95 Response: " . $result->getP95ResponseTime() . "\n";
```

## Advanced Features: Testing with Real-World Data

VoltTest supports data-driven testing with CSV files, allowing you to simulate diverse user behaviors:

```php
// users.csv contains columns: email,password,user_id
$loginScenario->setDataSourceConfiguration(
    new DataSourceConfiguration('users.csv', 'random', true)
);

// Now you can reference CSV columns in your requests
$loginScenario->step('Login')
    ->post('https://example.com/login', 
           'email=${email}&password=${password}')  // Variables from CSV
    ->validateStatus('success', 200);
```

## Extracting and Using Dynamic Values

One of VoltTest's most powerful features is its ability to extract and reuse values from responses:

```php
// Extract CSRF token from HTML response
$scenario->step('Get Login Page')
    ->get('https://example.com/login')
    ->extractFromHtml('csrf_token', 'input[name="_token"]', 'value')
    ->validateStatus('success', 200);

// Use the extracted token in the next request
$scenario->step('Submit Login')
    ->post('https://example.com/login',
           '_token=${csrf_token}&email=user@example.com&password=secret')
    ->validateStatus('success', 302);  // Expecting a redirect
```

## Understanding Your Results

VoltTest provides comprehensive metrics to analyze performance:

```php
$result = $test->run();

// Access detailed metrics
echo "Test duration: " . $result->getDuration() . "\n";
echo "Total requests: " . $result->getTotalRequests() . "\n";
echo "Success rate: " . $result->getSuccessRate() . "%\n";
echo "Requests/second: " . $result->getRequestsPerSecond() . "\n";
echo "Min response time: " . $result->getMinResponseTime() . "\n";
echo "Max response time: " . $result->getMaxResponseTime() . "\n";
echo "Avg response time: " . $result->getAvgResponseTime() . "\n";
echo "Median response time: " . $result->getMedianResponseTime() . "\n";
echo "P95 response time: " . $result->getP95ResponseTime() . "\n";
echo "P99 response time: " . $result->getP99ResponseTime() . "\n";
```

## Why VoltTest Created

As PHP developers, I’ve often found performance testing to be a challenge. Existing tools like JMeter, Gatling or Locust are powerful but require learning new syntax, languages or complex GUIs. We wanted a tool that would:

1. **Feel native to PHP developers** with an intuitive, fluent API
2. **Handle serious load testing** without requiring huge resources
3. **Integrate seamlessly** with PHP codebases and workflows
4. **Provide comprehensive metrics** with minimal configuration

VoltTest achieves this through a unique architecture that lets you write your tests in familiar PHP syntax while leveraging Go's exceptional performance capabilities for the actual load generation.

## What Makes VoltTest Different?

Unlike traditional PHP-based testing tools that struggle with concurrency limitations, VoltTest uses a high-performance Go engine that runs behind the scenes. This gives you:

- **True concurrent users** instead of PHP's process-based concurrency
- **Minimal resource usage** even when simulating thousands of users
- **Accurate timing and metrics** collection for detailed analysis

VoltTest brings modern stress testing to PHP with an intuitive API and high-performance Go engine. No new languages, no complex setup—just performance insights when you need them.

## Conclusion

VoltTest PHP SDK brings enterprise-grade performance testing capabilities to PHP developers with a familiar, easy-to-use API. By combining PHP's developer-friendly syntax with Go's raw performance power, VoltTest enables teams to integrate load testing directly into their development workflows without additional infrastructure or expertise.

Whether you're building APIs, websites, or complex applications, VoltTest gives you the tools to ensure your PHP applications can handle real-world traffic with confidence.

## Getting Started

💡 Ready to test your PHP app’s performance? Try Volt-Test today! 🚀

```bash
composer require volt-test/php-sdk
```

For more examples and detailed documentation, visit [Examples Page in docs](https://php.volt-test.com/docs/category/examples).
