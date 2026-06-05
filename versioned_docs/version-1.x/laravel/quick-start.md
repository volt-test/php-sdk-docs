---
id: laravel-quick-start
title: Quick Start
sidebar_label: Quick Start
sidebar_position: 2
---

# Quick Start

Get your first performance test running in under 5 minutes.

## 1. Generate a Test

```bash
php artisan volttest:make LoginTest
```

This creates `app/VoltTests/LoginTest.php`:

```php
<?php

namespace App\VoltTests;

use VoltTest\Laravel\Contracts\VoltTestCase;
use VoltTest\Laravel\VoltTestManager;

class LoginTest implements VoltTestCase
{
    public function define(VoltTestManager $manager): void
    {
        $manager->target('http://localhost:8000');

        $scenario = $manager->scenario('Login Flow');

        $scenario->step('Visit Login Page')
            ->get('/login')
            ->expectStatus(200);
    }
}
```

## 2. Define Your Scenario

Edit the test to add a realistic flow:

```php
public function define(VoltTestManager $manager): void
{
    $manager->target('http://localhost:8000');

    $scenario = $manager->scenario('Login Flow');

    $scenario->step('Get Login Page')
        ->get('/login')
        ->expectStatus(200)
        ->extractCsrfToken();

    $scenario->step('Submit Login')
        ->post('/login', [
            '_token' => '${csrf_token}',
            'email' => 'user@example.com',
            'password' => 'password',
        ])
        ->expectStatus(302);

    $scenario->step('View Dashboard')
        ->get('/dashboard')
        ->expectStatus(200);
}
```

## 3. Run the Test

```bash
php artisan volttest:run LoginTest --users=10 --duration=30s
```

## 4. Read the Results

```
Test Metrics Summary:
===================
Duration:     30.05s
Total Reqs:   1,250
Success Rate: 98.40%
Req/sec:      41.58

Response Time:
------------
Min:    12.3ms
Max:    892.1ms
Avg:    145.7ms
Median: 102.4ms
P95:    456.2ms
P99:    721.8ms
```

## Quick URL Test

Test any URL without creating a test class:

```bash
php artisan volttest:run https://api.example.com/health --url --users=50 --duration=1m
```

## Next Steps

- [Creating Tests](/docs/laravel/laravel-creating-tests) — Test structure and scenarios in depth
- [CLI Commands](/docs/laravel/laravel-cli-commands) — All command options
- [API Testing](/docs/laravel/laravel-api-testing) — Test JSON APIs with token extraction
