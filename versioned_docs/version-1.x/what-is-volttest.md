---
id: what-is-volttest
title: What is VoltTest?
sidebar_label: What is VoltTest?
sidebar_position: 1
---

# What is VoltTest?

VoltTest is a cloud-based performance testing platform that lets you simulate 1,000 to 10,000,000+ concurrent virtual users against your application. Write tests in PHP, run them locally or on managed cloud infrastructure, and analyze results in a real-time dashboard.

:::tip Closed Beta
VoltTest Cloud is currently in **closed beta**. [Sign up](https://volt-test.com/register) to join the waitlist.
:::

## How It Works

```
Your PHP Code → VoltTest SDK → Go Engine → Your Application
                                   ↓
                            Metrics & Results
```

1. **You write tests in PHP** using the SDK or Laravel package
2. **The Go engine executes the load** — thousands of concurrent virtual users with minimal resource usage
3. **Results come back** as structured metrics (response times, throughput, error rates, percentiles)

Run locally for development, or on VoltTest Cloud for production-scale tests.

## Key Features

### Write Tests in PHP
No new language to learn. Define test scenarios using the same PHP you write your application in.

```php
$test = new VoltTest('API Load Test');
$test->setVirtualUsers(100);
$test->setDuration('5m');

$scenario = $test->scenario('User Flow');
$scenario->step('Login')->post('/api/login', $credentials)->expectStatus(200);
$scenario->step('Dashboard')->get('/api/dashboard')->expectStatus(200);

$test->run();
```

### Scale to Millions of Users
The Go-powered engine handles massive concurrency with minimal memory. Run locally for hundreds of VUs, or scale to thousands across multiple cloud regions.

### Real-Time Dashboard
When running on VoltTest Cloud, view live metrics — response times, throughput, error rates, and percentile distributions — as your test executes.

### Multi-Region Testing
Distribute load across geographic regions to test your application from where your real users are.

```php
$test->regions([
    'us-east-1' => 60,
    'eu-west-1' => 40,
]);
```

### Laravel Integration
First-class Laravel support with Artisan commands, PHPUnit integration, CSRF handling, route discovery, and performance assertions.

```bash
php artisan volttest:run LoginTest --users=50 --duration=2m
```

### Flexible Load Profiles
Constant load, staged ramp-up/down, spike tests, stress tests, and soak tests.

```php
$test->stage('2m', 100);   // Ramp up
$test->stage('10m', 100);  // Hold
$test->stage('1m', 500);   // Spike
$test->stage('5m', 500);   // Hold spike
$test->stage('2m', 0);     // Ramp down
```

## Platform Components

| Component | Description |
|-----------|-------------|
| **PHP SDK** | Write and run performance tests in PHP |
| **Laravel Package** | Artisan commands, PHPUnit integration, assertions |
| **Go Engine** | High-performance load generation engine |
| **VoltTest Cloud** | Managed infrastructure for large-scale tests |
| **Dashboard** | Real-time metrics visualization |

## Get Started

Choose your path:

- **[PHP SDK →](/docs/introduction)** — Install the SDK and write your first test
- **[Laravel →](/docs/laravel/laravel-installation)** — Add performance testing to your Laravel app

### Cloud Execution

Both the PHP SDK and Laravel package support cloud execution:

- **[PHP SDK Cloud Mode →](/docs/cloud-mode)** — Cloud execution with the PHP SDK
- **[Laravel Cloud Mode →](/docs/laravel/laravel-cloud-mode)** — Cloud execution with Artisan commands and config
