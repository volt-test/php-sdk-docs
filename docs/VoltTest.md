---
id: VoltTest Configuration
title: VoltTest Configuration
sidebar_label: Volt Test Configuration
sidebar_position: 5
---

# VoltTest Configuration

VoltTest provides a flexible configuration system for setting up your performance tests. Here's how to configure and customize your test scenarios.

## Basic Configuration

When creating a new test, you start by initializing the VoltTest class:
    
```php
<?php
use VoltTest\VoltTest;

$test = new VoltTest(
'API Test Suite',           // Test name
'Testing API endpoints'     // Optional description
);
```

## Test Parameters

### Virtual Users
Set the number of concurrent virtual users to simulate during the test.

```php
$test->setVirtualUsers(10); // By default, 1 virtual user is used 
```

### Test Duration
Set the total test duration using time units (s: seconds, m: minutes, h: hours):
    
```php
$test->setDuration('30s');  // 30 seconds
$test->setDuration('5m');   // 5 minutes
$test->setDuration('1h');   // 1 hour
```
Test duration ensures the test runs continuously until the specified time is reached, even if all iterations aren't completed. If the duration ends before all iterations are done, the test stops. If the iterations finish early, the test keeps running until the time is up.
### Target Configuration
Set the idle timeout for all requests in the test:

```php
$test->setTarget('15s'); // 15 seconds, By default, 30 seconds
$test->setTarget('1m'); // 1 minute, By default, 30 seconds
```

### HTTP Debugging
When your writing test, maybe you need to check if the requests are being sent correctly. You can enable HTTP debugging to see the request and response headers:

```php
$test->setHttpDebug(true); // By default, false
```

## Complete Configuration Example
Here's an example of a complete test configuration:

```php
$test = new VoltTest('Complete Test Configuration', 'Full configuration Example');
    ->setVirtualUsers(100)       // 100 concurrent users
    ->setDuration('5m')          // Run for 5 minutes
    ->setTarget('45s')          // 45 second timeout
    ->setHttpDebug(true);       // Enable HTTP debugging
```

## Configuration Validation
The configuration system includes built-in validation:
- Virtual users must be at least 1
- Duration must use valid time units (s, m, h)
- Target must use valid time units (s, m, h)

Invalid configurations throw `VoltTestException` with descriptive messages:

```php
// These will throw exceptions
$test->setVirtualUsers(0);              // Invalid user count
$test->setDuration('invalid');          // Invalid duration format
$test->setTarget('not-valid');         // Invalid target format
```

## Running The Test

:::warning
Run test without scenarios will throw an exception.
:::

After configuring your test and make a scenarios, you can run it using the `run()` method:

```php
// Run without progress tracking
$result = $test->run();

// Run with real-time progress or http debugging
$result = $test->run(true);
```
:::info
Pass `true` to the `run()` function to enable **real-time progress** tracking and if you are **debugging** the requests.
:::
The `run()` function will wait until the test is completed and return the result object.

## Configuration Best Practices

1. Set realistic virtual user counts based on your system capacity
2. Use appropriate duration for your test scenarios
3. Enable HTTP debug only when needed for troubleshooting
4. Validate configurations before running large-scale tests

## Configuration Properties

| Property | Description | Format | Default |
|----------|-------------|---------|---------|
| name | Test name | string | Required |
| description | Test description | string | Empty string |
| virtualUsers | Concurrent users | integer > 0 | 1 |
| duration | Test duration | number + unit (s/m/h) | Required |
| target.idle_timeout | Request timeout | number + unit (s/m/h) | '30s' |
| httpDebug | Debug mode | boolean | false |
