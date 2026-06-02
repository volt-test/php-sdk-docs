---
id: laravel-phpunit-integration
title: PHPUnit Integration
sidebar_label: PHPUnit Integration
sidebar_position: 8
---

# PHPUnit Integration

Run performance tests inside your PHPUnit test suite with automatic server management and performance assertions.

## Setup

Extend `PerformanceTestCase` instead of the standard Laravel `TestCase`:

```php
<?php

namespace Tests\Performance;

use App\VoltTests\LoginTest;
use VoltTest\Laravel\Testing\PerformanceTestCase;

class LoginPerformanceTest extends PerformanceTestCase
{
    public function test_login_performance(): void
    {
        $result = $this->runVoltTest(new LoginTest(), [
            'virtual_users' => 10,
            'duration' => '30s',
        ]);

        $this->assertVTSuccessful($result);
        $this->assertVTMaxResponseTime($result, 2000);
    }
}
```

## Running Tests

### Execute a VoltTestCase

```php
$result = $this->runVoltTest(new CheckoutTest(), [
    'virtual_users' => 20,
    'duration' => '1m',
    'ramp_up' => '10s',
]);
```

### Options

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `virtual_users` | int | 5 | Number of concurrent VUs |
| `duration` | string | null | Test duration (e.g., `30s`, `2m`) |
| `ramp_up` | string | null | Ramp-up time |
| `stages` | array | null | Staged load profile (overrides VUs/duration) |
| `stream` | bool | false | Stream output to console |
| `http_debug` | bool | false | Enable HTTP debug output |

### Staged Load in PHPUnit

```php
$result = $this->runVoltTest(new ApiTest(), [
    'stages' => [
        ['duration' => '30s', 'target' => 10],
        ['duration' => '2m', 'target' => 10],
        ['duration' => '30s', 'target' => 0],
    ],
]);
```

## Quick Helpers

### Load Test a URL

```php
$result = $this->loadTestUrl('http://localhost:8000/api/health', [
    'virtual_users' => 50,
    'duration' => '30s',
]);

$this->assertVTSuccessful($result);
$this->assertVTP95ResponseTime($result, 500);
```

### Load Test an API Endpoint

```php
$result = $this->loadTestApi('/api/users', 'GET', [], [
    'virtual_users' => 20,
    'duration' => '1m',
]);

$this->assertVTMinimumRPS($result, 100);
```

```php
$result = $this->loadTestApi('/api/users', 'POST', [
    'name' => 'John',
    'email' => 'john@example.com',
], [
    'virtual_users' => 10,
]);
```

## Server Management

`PerformanceTestCase` can automatically start and stop `php artisan serve` for your tests.

### Enable Auto Server

```php
class ApiPerformanceTest extends PerformanceTestCase
{
    protected static bool $enableServerManagement = true;
    protected static ?int $preferredPort = 8000;
}
```

The server starts in `setUpBeforeClass()` and stops in `tearDownAfterClass()`. If the preferred port is busy, an available port is found automatically.

### Custom Base URL

```php
class ExternalApiTest extends PerformanceTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->setBaseUrl('https://staging.example.com');
    }
}
```

### Debug Server

```php
$this->debugServer();         // Print server info
$stats = $this->getServerStats(); // Get registry statistics
```

## Complete Example

```php
<?php

namespace Tests\Performance;

use App\VoltTests\CheckoutTest;
use VoltTest\Laravel\Testing\PerformanceTestCase;

class CheckoutPerformanceTest extends PerformanceTestCase
{
    protected static bool $enableServerManagement = true;
    protected static ?int $preferredPort = 8000;

    public function test_checkout_under_load(): void
    {
        $result = $this->runVoltTest(new CheckoutTest(), [
            'virtual_users' => 50,
            'duration' => '2m',
            'ramp_up' => '15s',
        ]);

        $this->assertVTSuccessful($result, 95.0);
        $this->assertVTAverageResponseTime($result, 500);
        $this->assertVTP95ResponseTime($result, 1500);
        $this->assertVTMinimumRPS($result, 20);
    }

    public function test_health_endpoint(): void
    {
        $result = $this->loadTestUrl($this->getBaseUrl() . '/api/health', [
            'virtual_users' => 100,
            'duration' => '30s',
        ]);

        $this->assertVTSuccessful($result, 99.0);
        $this->assertVTMaxResponseTime($result, 1000);
    }
}
```

Run with PHPUnit:
```bash
php artisan test --filter=CheckoutPerformanceTest
# or
vendor/bin/phpunit tests/Performance/CheckoutPerformanceTest.php
```
