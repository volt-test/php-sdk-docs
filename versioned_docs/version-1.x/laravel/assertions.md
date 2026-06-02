---
id: laravel-assertions
title: Performance Assertions
sidebar_label: Assertions
sidebar_position: 9
---

# Performance Assertions

Assert performance thresholds in your PHPUnit tests. All assertions are available on `PerformanceTestCase` via the `VoltTestAssertions` trait.

## Success Rate

### assertVTSuccessful

Assert that the success rate meets a minimum threshold.

```php
$this->assertVTSuccessful($result);           // Default: 95%
$this->assertVTSuccessful($result, 99.0);     // Custom: 99%
```

### assertVTErrorRate

Assert that the error rate stays below a maximum threshold.

```php
$this->assertVTErrorRate($result, 5.0);       // Max 5% errors
$this->assertVTErrorRate($result, 1.0);       // Max 1% errors
```

## Response Times

All response time assertions use **milliseconds**.

### assertVTMaxResponseTime

Assert that the maximum (slowest) response time doesn't exceed the threshold.

```php
$this->assertVTMaxResponseTime($result, 5000);  // Max 5 seconds
```

### assertVTAverageResponseTime

```php
$this->assertVTAverageResponseTime($result, 500);  // Avg under 500ms
```

### assertVTMedianResponseTime

```php
$this->assertVTMedianResponseTime($result, 300);  // P50 under 300ms
```

### assertVTP95ResponseTime

```php
$this->assertVTP95ResponseTime($result, 1000);  // P95 under 1 second
```

### assertVTP99ResponseTime

```php
$this->assertVTP99ResponseTime($result, 2000);  // P99 under 2 seconds
```

### assertVTMinResponseTime

Assert that the minimum (fastest) response time is at least a given value. Useful for detecting suspiciously fast responses (e.g., cached/mocked responses when you expect real ones).

```php
$this->assertVTMinResponseTime($result, 10);  // Min at least 10ms
```

## Throughput

### assertVTMinimumRequests

Assert that the total number of requests meets a minimum.

```php
$this->assertVTMinimumRequests($result, 1000);  // At least 1000 total requests
```

### assertVTMinimumRPS

Assert a minimum requests-per-second throughput.

```php
$this->assertVTMinimumRPS($result, 50);  // At least 50 req/s
```

### assertVTMaximumRPS

Assert a maximum requests-per-second. Useful for rate-limited endpoints.

```php
$this->assertVTMaximumRPS($result, 100);  // No more than 100 req/s
```

## Complete Example

```php
<?php

namespace Tests\Performance;

use App\VoltTests\ApiTest;
use VoltTest\Laravel\Testing\PerformanceTestCase;

class ApiPerformanceTest extends PerformanceTestCase
{
    public function test_api_meets_sla(): void
    {
        $result = $this->runVoltTest(new ApiTest(), [
            'virtual_users' => 50,
            'duration' => '2m',
        ]);

        // SLA: 99% success rate
        $this->assertVTSuccessful($result, 99.0);

        // SLA: P95 under 500ms
        $this->assertVTP95ResponseTime($result, 500);

        // SLA: P99 under 2 seconds
        $this->assertVTP99ResponseTime($result, 2000);

        // SLA: At least 100 requests per second
        $this->assertVTMinimumRPS($result, 100);

        // No suspiciously fast responses
        $this->assertVTMinResponseTime($result, 5);
    }
}
```

## Assertion Reference

| Assertion | Parameter | Description |
|-----------|-----------|-------------|
| `assertVTSuccessful($result, $min)` | float (default: 95.0) | Success rate ≥ threshold |
| `assertVTErrorRate($result, $max)` | float | Error rate ≤ threshold |
| `assertVTMinResponseTime($result, $ms)` | int (ms) | Min response time ≥ threshold |
| `assertVTMaxResponseTime($result, $ms)` | int (ms) | Max response time ≤ threshold |
| `assertVTAverageResponseTime($result, $ms)` | int (ms) | Average ≤ threshold |
| `assertVTMedianResponseTime($result, $ms)` | int (ms) | Median (P50) ≤ threshold |
| `assertVTP95ResponseTime($result, $ms)` | int (ms) | P95 ≤ threshold |
| `assertVTP99ResponseTime($result, $ms)` | int (ms) | P99 ≤ threshold |
| `assertVTMinimumRequests($result, $n)` | int | Total requests ≥ threshold |
| `assertVTMinimumRPS($result, $rps)` | float | Requests/sec ≥ threshold |
| `assertVTMaximumRPS($result, $rps)` | float | Requests/sec ≤ threshold |
