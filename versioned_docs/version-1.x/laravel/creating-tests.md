---
id: laravel-creating-tests
title: Creating Tests
sidebar_label: Creating Tests
sidebar_position: 4
---

# Creating Tests

## Test Structure

Every VoltTest test class implements `VoltTestCase` and defines scenarios in the `define()` method:

```php
<?php

namespace App\VoltTests;

use VoltTest\Laravel\Contracts\VoltTestCase;
use VoltTest\Laravel\VoltTestManager;

class CheckoutTest implements VoltTestCase
{
    public function define(VoltTestManager $manager): void
    {
        $manager->target('http://localhost:8000');

        $scenario = $manager->scenario('Checkout Flow');

        $scenario->step('Browse Products')
            ->get('/products')
            ->expectStatus(200);

        $scenario->step('Add to Cart')
            ->post('/cart', ['product_id' => 1, 'quantity' => 2], [
                'Content-Type' => 'application/json',
            ])
            ->expectStatus(200);
    }
}
```

## Scenarios

Create scenarios through the `$manager->scenario()` method. Each scenario represents a user flow.

### Multiple Scenarios

Use weights to control how virtual users are distributed across scenarios:

```php
public function define(VoltTestManager $manager): void
{
    $manager->target('http://localhost:8000');

    $browse = $manager->scenario('Browse Only');
    $browse->weight(70);
    $browse->step('Home')->get('/')->expectStatus(200);
    $browse->step('Products')->get('/products')->expectStatus(200);

    $purchase = $manager->scenario('Purchase Flow');
    $purchase->weight(30);
    $purchase->step('Home')->get('/')->expectStatus(200);
    $purchase->step('Checkout')->post('/checkout', [...])->expectStatus(200);
}
```

70% of virtual users will browse, 30% will purchase.

### Think Time

Add delays between steps to simulate real user behavior:

```php
$scenario->step('View Product')
    ->get('/products/1')
    ->expectStatus(200)
    ->thinkTime('2s');

$scenario->step('Add to Cart')
    ->post('/cart', ['product_id' => 1])
    ->expectStatus(200);
```

## Steps

Each step represents an HTTP request. Create steps with `step()` then chain the HTTP method:

```php
$scenario->step('Step Name')
    ->get('/path')
    ->expectStatus(200);
```

### HTTP Methods

```php
$scenario->step('Get')->get('/users');
$scenario->step('Create')->post('/users', $data, $headers);
$scenario->step('Update')->put('/users/1', $data, $headers);
$scenario->step('Patch')->patch('/users/1', $data, $headers);
$scenario->step('Delete')->delete('/users/1');
```

### Headers

Add headers inline or with the `header()` method:

```php
// Inline headers (second/third parameter)
$scenario->step('Create')
    ->post('/api/users', ['name' => 'John'], [
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
    ]);

// Chained headers
$scenario->step('Get Profile')
    ->get('/api/profile')
    ->header('Authorization', 'Bearer ${token}')
    ->header('Accept', 'application/json');
```

### Auto-JSON Encoding

When you pass an array as the request body with a JSON `Content-Type` header, the package automatically encodes it to JSON:

```php
$scenario->step('Create User')
    ->post('/api/users', ['name' => 'John', 'email' => 'john@example.com'], [
        'Content-Type' => 'application/json',
    ]);
```

### Base URL

By default, relative paths (e.g., `/login`) are prefixed with the configured `base_url` (`http://localhost:8000`). Full URLs are used as-is.

```php
$scenario->step('Local')->get('/api/health');
// → http://localhost:8000/api/health

$scenario->step('External')->get('https://api.example.com/health');
// → https://api.example.com/health
```

Configure in `.env`:
```env
VOLTTEST_BASE_URL=http://localhost:8000
```

## Route Discovery

Generate test scaffolds from your existing Laravel routes:

```bash
php artisan volttest:make ApiTest --routes --filter=api/*
```

This creates a test class with steps for each matching route:

```php
class ApiTest implements VoltTestCase
{
    public function define(VoltTestManager $manager): void
    {
        $manager->target('http://localhost:8000');

        $scenario = $manager->scenario('API Routes');

        $scenario->step('GET /api/users')
            ->get('/api/users')
            ->expectStatus(200);

        $scenario->step('POST /api/users')
            ->post('/api/users')
            ->expectStatus(200);

        // ... more routes
    }
}
```

### Filtering Routes

```bash
# By URI pattern
php artisan volttest:make Test --routes --filter=api/v1/*

# By HTTP method
php artisan volttest:make Test --routes --method=GET

# Only authenticated routes
php artisan volttest:make Test --routes --auth

# Interactive selection
php artisan volttest:make Test --routes --select
```

## Cookie Handling

The Laravel package automatically enables cookie handling for all scenarios. This means Laravel session cookies, CSRF tokens, and other cookies are preserved across steps — matching how a real browser works.
