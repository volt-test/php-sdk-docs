---
sidebar_label: 'Cloud Examples'
sidebar_position: 2
id: cloud-examples
title: Cloud Examples
description: "VoltTest Cloud examples — basic cloud tests, staged load profiles, multi-region distribution, weighted multi-scenario runs, and error handling."
---

# Cloud Examples

In this section, we'll cover examples of running load tests on VoltTest Cloud using the PHP SDK.

Ex:
- [Basic Cloud Test](#basic-cloud-test)
  - Simplest cloud run with constant VUs
- [Staged Load Profile](#staged-load-profile)
  - Ramp up, spike, and ramp down on cloud
- [Multi-Region Distribution](#multi-region-distribution)
  - Distribute load across geographic regions
- [Multi-Scenario with Weights](#multi-scenario-with-weights)
  - Multiple user flows with weighted traffic
- [Custom Conflict Handler](#custom-conflict-handler)
  - Programmatic control when a test name already exists
- [Error Handling](#error-handling)
  - Catch cloud-specific exceptions

## Basic Cloud Test

The simplest cloud example — a fixed number of virtual users for a set duration.

```php
<?php
use VoltTest\VoltTest;

$test = new VoltTest('Basic Cloud Test');
$test->cloud('vt_your_api_key');
$test->setVirtualUsers(100);
$test->setDuration('2m');

$scenario = $test->scenario('Homepage');

$scenario->step('Load page')
    ->get('https://example.com')
    ->validateStatus('success', 200);

$test->run();
```

When you run this script, the SDK submits the test to VoltTest Cloud and prints the run ID, dashboard URL, and status automatically:

```
Cloud test submitted (run: a1b2c3d4-...)
Dashboard → https://volt-test.com/runs/a1b2c3d4-...
Waiting for cloud infrastructure...
✓ Test completed
```

## Staged Load Profile

Use stages to create dynamic load profiles — ramp up, hold, spike, and ramp down.

```php
<?php
use VoltTest\VoltTest;

$test = new VoltTest('Cloud Staged Load Test');
$test->cloud('vt_your_api_key')
    ->stage('1m', 100)    // Ramp to 100 VUs
    ->stage('5m', 100)    // Hold at 100
    ->stage('30s', 500)   // Spike to 500
    ->stage('2m', 500)    // Hold spike
    ->stage('1m', 0);     // Ramp down

$scenario = $test->scenario('API Check');

$scenario->step('Health')
    ->get('https://example.com')
    ->validateStatus('health', 200);

$test->run();
```

Stages are chained on the `cloud()` call since it returns the `VoltTest` instance. You can also call them separately:

```php
$test->cloud('vt_your_api_key');
$test->stage('1m', 100);
$test->stage('5m', 100);
```

## Multi-Region Distribution

Distribute virtual users across multiple geographic regions. Weights must sum to 100.

```php
<?php
use VoltTest\VoltTest;

$test = new VoltTest('Multi-Region Cloud Test');
$test->cloud('vt_your_api_key');
$test->setVirtualUsers(1000);
$test->setDuration('5m');
$test->regions([
    'us-east-1' => 60,  // 600 VUs in US East
    'eu-west-1' => 40,  // 400 VUs in EU West
]);

$scenario = $test->scenario('API Health Check');

$scenario->step('Check API')
    ->get('https://example.com')
    ->validateStatus('health', 200);

$scenario->step('Fetch Data')
    ->get('https://example.com/api/data')
    ->header('Accept', 'application/json')
    ->validateStatus('data', 200);

$test->run();
```

:::info
Region distribution requires cloud mode — `cloud()` must be called before `regions()`.
:::

## Multi-Scenario with Weights

Simulate realistic traffic by splitting virtual users across different user flows.

```php
<?php
use VoltTest\VoltTest;

$test = new VoltTest('Cloud Multi-Scenario Test');
$test->cloud('vt_your_api_key')
    ->stage('1m', 200)
    ->stage('5m', 200)
    ->stage('1m', 0);

// 70% of virtual users run this scenario
$login = $test->scenario('User Login Flow');
$login->setWeight(70);

$login->step('Get Login Page')
    ->get('https://example.com/login')
    ->validateStatus('login_page', 200);

$login->step('Submit Login')
    ->post('https://example.com/login', '{"email": "user@test.com", "password": "secret"}')
    ->header('Content-Type', 'application/json')
    ->extractFromJson('token', 'data.token')
    ->validateStatus('login_submit', 200);

$login->step('Get Profile')
    ->get('https://example.com/profile')
    ->header('Authorization', 'Bearer ${token}')
    ->validateStatus('profile', 200);

// 30% of virtual users run this scenario
$browse = $test->scenario('Browse Products');
$browse->setWeight(30);

$browse->step('List Products')
    ->get('https://example.com/products')
    ->header('Accept', 'application/json')
    ->validateStatus('products', 200);

$browse->step('View Product')
    ->get('https://example.com/products/1')
    ->header('Accept', 'application/json')
    ->validateStatus('product_detail', 200);

$test->run();
```

With 200 VUs, approximately 140 will execute the Login Flow and 60 will execute Browse Products. Weights must sum to 100 across all scenarios.

## Custom Conflict Handler

When a test with the same name already exists in your account, VoltTest prompts you to choose. Use `setOnConflictPrompt()` to handle this programmatically — useful in CI/CD where there's no interactive terminal.

```php
<?php
use VoltTest\VoltTest;

$test = new VoltTest('Cloud Conflict Handler Example');
$test->cloud('vt_your_api_key')
    ->stage('1m', 50)
    ->stage('3m', 50)
    ->stage('1m', 0);

$scenario = $test->scenario('Homepage');
$scenario->step('Load page')
    ->get('https://example.com')
    ->validateStatus('success', 200);

// Always update the most recent existing test
$test->setOnConflictPrompt(function (array $existingTests) {
    return $existingTests[0]['id'];
});

$test->run();
```

The callback receives an array of existing tests. Return values:
- **A test ID** — update that existing test
- **`null`** — create a new test
- **`'cancel'`** — abort the run

## Error Handling

Cloud mode throws specific exceptions for different failure scenarios. Wrap `run()` in a try/catch to handle them.

```php
<?php
use VoltTest\Exceptions\AuthenticationException;
use VoltTest\Exceptions\CloudConnectionException;
use VoltTest\Exceptions\CloudTimeoutException;
use VoltTest\Exceptions\PlanLimitException;
use VoltTest\Exceptions\RunFailedException;
use VoltTest\VoltTest;

$test = new VoltTest('Cloud Error Handling Example');
$test->cloud('vt_your_api_key');
$test->setVirtualUsers(100);
$test->setDuration('5m');

$scenario = $test->scenario('Test');
$scenario->step('Home')->get('https://example.com');

try {
    $test->run();
} catch (AuthenticationException $e) {
    echo "Invalid API key: " . $e->getMessage() . "\n";
} catch (PlanLimitException $e) {
    echo "Plan limit exceeded: " . $e->getMessage() . "\n";
} catch (CloudConnectionException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
} catch (CloudTimeoutException $e) {
    echo "Timed out: " . $e->getMessage() . "\n";
} catch (RunFailedException $e) {
    echo "Run failed: " . $e->getMessage() . "\n";
}
```

| Exception | Cause | Fix |
|-----------|-------|-----|
| `AuthenticationException` | Invalid or expired API key | Regenerate your key at [volt-test.com](https://volt-test.com) |
| `PlanLimitException` | VU count or duration exceeds your plan | Reduce load or upgrade your plan |
| `CloudConnectionException` | Cannot reach VoltTest servers | Check your network connection |
| `CloudTimeoutException` | Provisioning exceeded timeout | Increase with `setCloudTimeout()` |
| `RunFailedException` | Test execution failed or was stopped | Check target and test configuration |

All cloud exceptions extend `CloudException`, which extends `VoltTestException`.
