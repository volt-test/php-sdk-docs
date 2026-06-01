---
id: VoltTest
title: VoltTest
sidebar_label: VoltTest (Configuration)
sidebar_position: 5
---

# VoltTest

The `VoltTest` class is the entry point for creating and running performance tests. It holds the test configuration and scenarios.

## Creating a Test

```php
use VoltTest\VoltTest;

$test = new VoltTest('My API Test', 'Optional description');
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Test name |
| description | string | No | Test description (default: empty) |

## Configuration Methods

### Virtual Users

Set the number of concurrent virtual users:

```php
$test->setVirtualUsers(100);
```

- Must be at least 1
- Cannot be used together with `stage()`

### Duration

Set the total test duration:

```php
$test->setDuration('30s');  // 30 seconds
$test->setDuration('5m');   // 5 minutes
$test->setDuration('1h');   // 1 hour
```

- Format: `<number>[s|m|h]`
- Cannot be used together with `stage()`

### Ramp-Up

Set the ramp-up time for virtual users to gradually start:

```php
$test->setRampUp('10s');  // All VUs start within 10 seconds
```

- Format: `<number>[s|m|h]`
- Cannot be used together with `stage()`

### Staged Load Profiles

Define a multi-stage load profile where virtual users ramp between targets:

```php
$test = new VoltTest('Staged Load Test');

$test->stage('1m', 50);    // Ramp to 50 VUs over 1 minute
$test->stage('5m', 50);    // Hold at 50 VUs for 5 minutes
$test->stage('1m', 100);   // Ramp to 100 VUs over 1 minute
$test->stage('5m', 100);   // Hold at 100 VUs for 5 minutes
$test->stage('2m', 0);     // Ramp down to 0 VUs over 2 minutes
```

| Parameter | Type | Description |
|-----------|------|-------------|
| duration | string | Duration of this stage (`<number>[s\|m\|h]`) |
| target | int | Target VU count at the end of this stage |

:::warning
Stages are mutually exclusive with `setVirtualUsers()`, `setDuration()`, and `setRampUp()`. Use one approach or the other.
:::

### HTTP Timeout

Set the per-request timeout (default: 30s):

```php
$test->setHttpTimeout('60s');  // 60-second timeout per request
```

### HTTP Debug

Enable HTTP debug output for troubleshooting:

```php
$test->setHttpDebug(true);
```

### Idle Timeout

Configure the connection idle timeout:

```php
$test->setTarget('30s');  // 30-second idle timeout (default)
```

## Creating Scenarios

Create scenarios through the VoltTest instance:

```php
$scenario = $test->scenario('Login Flow', 'User authentication test');
```

See the [Scenarios](/docs/Scenarios) page for scenario configuration.

## Running Tests

### Local Execution

```php
$result = $test->run();

echo "Success Rate: " . $result->getSuccessRate() . "%\n";
echo "Total Requests: " . $result->getTotalRequests() . "\n";
```

Pass `true` to stream output in real time:

```php
$result = $test->run(true);
```

Returns a `TestResult` object. See the [Results](/docs/Result) page for available metrics.

### Cloud Execution

Run tests on VoltTest's cloud infrastructure:

```php
$test->cloud('vt_your_api_key');

$cloudRun = $test->run();

echo "Run ID: " . $cloudRun->getRunId() . "\n";
echo "Dashboard: " . $cloudRun->getDashboardUrl() . "\n";
```

Returns a `CloudRun` object with:

| Method | Return Type | Description |
|--------|-------------|-------------|
| getRunId() | string | The run identifier |
| getTestId() | string | The test identifier |
| getStatus() | string | Run status |
| getDashboardUrl() | string | Link to the results dashboard |
| isSuccessful() | bool | Whether the run completed successfully |

You can also set the cloud execution timeout (default: 30 minutes):

```php
$test->setCloudTimeout(3600);  // 1-hour timeout
```

### Region Distribution

Distribute cloud test load across multiple regions:

```php
$test->cloud('vt_your_api_key');
$test->regions([
    'us-east-1' => 60,  // 60% of VUs in US East
    'eu-west-1' => 40,  // 40% of VUs in EU West
]);

$cloudRun = $test->run();
```

- Weights must sum to 100
- Requires cloud execution mode (`cloud()` must be called first)

## Complete Example

```php
<?php
use VoltTest\VoltTest;

$test = new VoltTest('API Load Test');
$test->setVirtualUsers(50);
$test->setDuration('2m');
$test->setRampUp('10s');

$scenario = $test->scenario('CRUD Operations');

$scenario->step('Create User')
    ->post('https://api.example.com/users', '{"name": "John"}')
    ->header('Content-Type', 'application/json')
    ->validateStatus('created', 201)
    ->extractFromJson('user_id', 'data.id');

$scenario->step('Get User')
    ->get('https://api.example.com/users/${user_id}')
    ->header('Accept', 'application/json')
    ->validateStatus('success', 200);

$result = $test->run();

printf("Duration: %s\n", $result->getDuration());
printf("Success Rate: %.2f%%\n", $result->getSuccessRate());
printf("Requests/sec: %.2f\n", $result->getRequestsPerSecond());
printf("P95: %s\n", $result->getP95ResponseTime());
```

## Configuration Reference

| Method | Description | Default |
|--------|-------------|---------|
| setVirtualUsers(int) | Number of concurrent VUs | 1 |
| setDuration(string) | Total test duration | None |
| setRampUp(string) | Ramp-up time for VUs | None |
| stage(string, int) | Add a staged load profile step | None |
| setHttpTimeout(string) | Per-request timeout | 30s |
| setHttpDebug(bool) | Enable HTTP debug output | false |
| setTarget(string) | Connection idle timeout | 30s |
| cloud(string) | Enable cloud execution with API key | None |
| setCloudTimeout(int) | Cloud execution timeout in seconds | 1800 |
| regions(array) | Region distribution for cloud runs | None |
