---
id: laravel-cloud-mode
title: Cloud Execution
description: "Run Laravel performance tests on VoltTest Cloud. Configure API keys, set regions, and execute distributed load tests from your Laravel project."
sidebar_label: Cloud Execution
sidebar_position: 10
---

# Cloud Execution

Run Laravel performance tests on VoltTest Cloud instead of your local machine.

:::warning Closed Beta — Not in Stable Release
VoltTest Cloud is currently in **closed beta** and is **not available in the stable package release**. The cloud features documented on this page are only accessible to approved beta users. [Sign up](https://volt-test.com/register) to join the waitlist.
:::

## Setup

Add your API key to `.env`:

```env
VOLTTEST_API_KEY=vt_your_api_key
```

## Three Ways to Enable Cloud Mode

### 1. CLI Flag

```bash
php artisan volttest:run LoginTest --cloud
```

### 2. Config File

In `.env`:
```env
VOLTTEST_CLOUD_ENABLED=true
```

Or in `config/volttest.php`:
```php
'cloud' => [
    'enabled' => true,
    'api_key' => env('VOLTTEST_API_KEY'),
],
```

### 3. Facade / Programmatic

```php
use VoltTest\Laravel\Facades\VoltTest;

VoltTest::target('https://api.example.com');
VoltTest::cloud();
$result = VoltTest::run();
```

## Staged Load via CLI

```bash
php artisan volttest:run LoginTest --cloud --stage=1m:50 --stage=5m:100 --stage=1m:0
```

Format: `--stage=duration:target` (repeatable).

## Region Distribution

### Via CLI

```bash
php artisan volttest:run LoginTest --cloud --region=us-east-1:60 --region=eu-west-1:40
```

Format: `--region=region_code:weight` (repeatable, weights must sum to 100).

### Via Config

In `config/volttest.php`:

```php
'regions' => [
    'us-east-1' => 60,
    'eu-west-1' => 40,
],
```

### Via Code

```php
use VoltTest\Laravel\Facades\VoltTest;

VoltTest::target('https://api.example.com');
VoltTest::cloud();
VoltTest::regions([
    'us-east-1' => 60,
    'eu-west-1' => 40,
]);
$result = VoltTest::run();
```

### Available Regions

#### North America

| Code | Location |
|------|----------|
| `us-east-1` | US East (N. Virginia) |
| `us-east-2` | US East (Ohio) |
| `us-west-1` | US West (N. California) |
| `us-west-2` | US West (Oregon) |
| `ca-central-1` | Canada (Central) |

#### South America

| Code | Location |
|------|----------|
| `sa-east-1` | South America (São Paulo) |

#### Europe

| Code | Location |
|------|----------|
| `eu-west-1` | Europe (Ireland) |
| `eu-west-2` | Europe (London) |
| `eu-west-3` | Europe (Paris) |
| `eu-central-1` | Europe (Frankfurt) |
| `eu-north-1` | Europe (Stockholm) |

#### Asia Pacific

| Code | Location |
|------|----------|
| `ap-southeast-1` | Asia Pacific (Singapore) |
| `ap-southeast-2` | Asia Pacific (Sydney) |
| `ap-southeast-3` | Asia Pacific (Jakarta) |
| `ap-southeast-4` | Asia Pacific (Melbourne) |
| `ap-southeast-5` | Asia Pacific (Malaysia) |
| `ap-south-1` | Asia Pacific (Mumbai) |
| `ap-south-2` | Asia Pacific (Hyderabad) |
| `ap-northeast-1` | Asia Pacific (Tokyo) |
| `ap-northeast-2` | Asia Pacific (Seoul) |
| `ap-northeast-3` | Asia Pacific (Osaka) |
| `ap-east-1` | Asia Pacific (Hong Kong) |
| `ap-east-2` | Asia Pacific (Taipei) |

#### Africa

| Code | Location |
|------|----------|
| `af-south-1` | Africa (Cape Town) |

:::info
Region availability may change. If a region is temporarily unavailable, the API will return an error with details.
:::

## CloudRun Result

In cloud mode, `run()` returns a `CloudRun` object:

```php
VoltTest::cloud()->run();
```

The run ID, dashboard URL, and status are printed automatically. `run()` also returns a `CloudRun` object for programmatic access (useful in CI/CD).

## Conflict Handling

When a test with the same name already exists, VoltTest prompts interactively (in a terminal) or defaults to updating the most recent test (in non-interactive environments like CI).

For custom logic:

```php
VoltTest::setOnConflictPrompt(function (array $existingTests) {
    return $existingTests[0]['id']; // Update most recent
});
```

## PHPUnit + Cloud

```php
class CloudPerformanceTest extends PerformanceTestCase
{
    public function test_cloud_checkout(): void
    {
        $result = $this->runVoltTest(new CheckoutTest(), [
            'virtual_users' => 500,
            'duration' => '10m',
        ]);

        // CloudRun returned — check dashboard for detailed metrics
        $this->assertTrue($result->isSuccessful());
    }
}
```

:::info
When running in cloud mode, `assertVT*` response time assertions are not available since `CloudRun` doesn't contain local metrics. Use the dashboard for detailed analysis.
:::

## Error Handling

Cloud-specific exceptions are thrown when issues occur. See the [Cloud Mode](/docs/cloud-mode#error-handling) page for the full exception reference.

```php
use VoltTest\Exceptions\AuthenticationException;
use VoltTest\Exceptions\PlanLimitException;

try {
    $result = VoltTest::cloud()->run();
} catch (AuthenticationException $e) {
    // Invalid API key
} catch (PlanLimitException $e) {
    // VU or duration exceeds plan
}
```
