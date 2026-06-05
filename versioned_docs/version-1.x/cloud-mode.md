---
id: cloud-mode
title: Cloud Mode
sidebar_label: Cloud Mode
sidebar_position: 6
---

# Cloud Mode

VoltTest Cloud lets you run load tests on managed infrastructure instead of your local machine. Tests scale to thousands of concurrent virtual users across multiple regions, with results stored in the VoltTest dashboard.

:::warning Closed Beta — Not in Stable Release
VoltTest Cloud is currently in **closed beta** and is **not available in the stable SDK release**. The cloud features documented on this page are only accessible to approved beta users. [Sign up](https://volt-test.com/register) to join the waitlist.
:::

## Setup

### Prerequisites

- VoltTest PHP SDK installed ([Installation Guide](/docs/installation))
- A VoltTest account ([Register](https://volt-test.com/register))

### Get Your API Key

1. Log in to [volt-test.com](https://volt-test.com)
2. Go to **Settings**
3. Copy your API key (starts with `vt_`)

### Enable Cloud Mode

```php
$test = new VoltTest('My Load Test');
$test->cloud('vt_your_api_key');
```

That's it — when you call `run()`, the test will execute on VoltTest Cloud instead of locally.

## Basic Usage

```php
<?php
use VoltTest\VoltTest;

$test = new VoltTest('API Load Test');
$test->cloud('vt_your_api_key');
$test->setVirtualUsers(500);
$test->setDuration('5m');

$scenario = $test->scenario('Checkout Flow');

$scenario->step('Login')
    ->post('https://api.example.com/login', '{"email": "user@test.com", "password": "secret"}')
    ->header('Content-Type', 'application/json')
    ->extractFromJson('token', 'data.token');

$scenario->step('Add to Cart')
    ->post('https://api.example.com/cart', '{"product_id": 1}')
    ->header('Authorization', 'Bearer ${token}')
    ->validateStatus('success', 200);

$test->run();
```

In cloud mode, `run()` submits the test to VoltTest Cloud. The run ID, dashboard URL, and status are automatically printed to the terminal — no need to echo them manually.

`run()` also returns a `CloudRun` object for programmatic access (useful in CI/CD or automation).

## CloudRun API

The `CloudRun` object returned by `run()` provides programmatic access to the run details:

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getRunId()` | string | Unique run identifier |
| `getTestId()` | string | Test definition identifier |
| `getStatus()` | string | Run status |
| `getDashboardUrl()` | string | URL to view results in the dashboard |
| `isSuccessful()` | bool | `true` if status is `completed` |

### Status Values

| Status | Description |
|--------|-------------|
| `completed` | Test finished successfully |
| `running` | Test is currently executing |
| `failed` | Test encountered an error |
| `stopped` | Test was manually stopped |

## Configuration Options

### Cloud Timeout

Set the maximum time to wait for the cloud run to be provisioned and started (default: 30 minutes):

```php
$test->cloud('vt_your_api_key');
$test->setCloudTimeout(3600); // 1 hour
```

The minimum timeout is 60 seconds.

### Staged Load Profiles

Stages work in cloud mode the same as locally:

```php
$test->cloud('vt_your_api_key');

$test->stage('1m', 100);   // Ramp to 100 VUs over 1 minute
$test->stage('5m', 100);   // Hold at 100 VUs for 5 minutes
$test->stage('2m', 500);   // Ramp to 500 VUs over 2 minutes
$test->stage('10m', 500);  // Hold at 500 VUs for 10 minutes
$test->stage('1m', 0);     // Ramp down to 0
```

### Region Distribution

Distribute load across multiple geographic regions:

```php
$test->cloud('vt_your_api_key');
$test->setVirtualUsers(1000);
$test->regions([
    'us-east-1' => 60,  // 600 VUs in US East
    'eu-west-1' => 40,  // 400 VUs in EU West
]);
```

- Weights must be integers greater than 0
- Weights must sum to exactly 100
- Requires cloud mode (`cloud()` must be called first)

## Conflict Handling

When you run a test with a name that already exists in your account, VoltTest will prompt you to choose:

1. **Update** an existing test (reuse its configuration)
2. **Create new** test with the same name
3. **Cancel** the run

### Interactive Mode

In a terminal (TTY), you'll see an interactive prompt:

```
2 test(s) named 'API Load Test' already exist:
  [1] ID: a1b2c3d4...  Target: https://api.example.com  VUs: 100  Updated: 2026-05-01
  [2] ID: e5f6g7h8...  Target: https://api.example.com  VUs: 500  Updated: 2026-05-15
  [3] Create new test
  [4] Cancel
Choice [1]:
```

### Non-Interactive Mode

In non-interactive environments (CI/CD), VoltTest defaults to updating the most recently used test.

### Custom Conflict Handler

For programmatic control, use `setOnConflictPrompt()`:

```php
$test->setOnConflictPrompt(function (array $existingTests) {
    // Return a test ID to update that test
    return $existingTests[0]['id'];

    // Return null to create a new test
    // return null;

    // Return 'cancel' to abort
    // return 'cancel';
});
```

Each entry in `$existingTests` contains:

| Key | Description |
|-----|-------------|
| `id` | Test UUID |
| `name` | Test name |
| `target_url` | Target URL |
| `virtual_users` | Configured VUs |
| `updated_at` | Last update timestamp |

## Local vs Cloud Comparison

| | Local | Cloud |
|--|-------|-------|
| **Execution** | Your machine | VoltTest managed infrastructure |
| **Result type** | `TestResult` (immediate metrics) | `CloudRun` (async, view on dashboard) |
| **Max VUs** | Limited by local hardware | Thousands (plan-dependent) |
| **Results storage** | Console output only | Stored in dashboard with charts |
| **Real-time metrics** | CLI streaming | Live dashboard with graphs |
| **Multi-region** | No | Yes, via `regions()` |
| **Requires** | PHP + SDK | PHP + SDK + API key |
| **Staged load** | Yes | Yes |

## Error Handling

Cloud mode can throw specific exceptions for different failure scenarios:

```php
use VoltTest\VoltTest;
use VoltTest\Exceptions\AuthenticationException;
use VoltTest\Exceptions\PlanLimitException;
use VoltTest\Exceptions\CloudConnectionException;
use VoltTest\Exceptions\CloudTimeoutException;
use VoltTest\Exceptions\RunFailedException;

$test = new VoltTest('Load Test');
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

### Exception Reference

| Exception | Cause | Fix |
|-----------|-------|-----|
| `AuthenticationException` | Invalid or expired API key | Regenerate your key at [volt-test.com/settings](https://volt-test.com/settings) |
| `PlanLimitException` | VU count or duration exceeds your plan | Reduce load or upgrade your plan |
| `CloudConnectionException` | Cannot reach VoltTest servers | Check your network connection |
| `CloudTimeoutException` | Provisioning exceeded `cloudTimeout` | Increase timeout with `setCloudTimeout()` |
| `RunFailedException` | Test execution failed or was stopped | Check target availability and test configuration |

All cloud exceptions extend `CloudException`, which extends `VoltTestException`.
