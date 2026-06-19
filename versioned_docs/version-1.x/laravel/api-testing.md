---
id: laravel-api-testing
title: API Testing
description: "Load test Laravel JSON APIs with VoltTest — authentication flows, token extraction, CRUD operations, and header-based API testing."
sidebar_label: API Testing
sidebar_position: 5
---

# API Testing

Test JSON APIs with authentication, token extraction, and CRUD flows.

## Authentication Flow

A typical API test: log in, extract the token, use it in subsequent requests.

```php
public function define(VoltTestManager $manager): void
{
    $manager->target('http://localhost:8000');

    $scenario = $manager->scenario('Authenticated API');

    $scenario->step('Login')
        ->post('/api/login', [
            'email' => 'user@example.com',
            'password' => 'password',
        ], ['Content-Type' => 'application/json'])
        ->expectStatus(200)
        ->extractJson('token', 'data.token');

    $scenario->step('Get Profile')
        ->get('/api/profile')
        ->header('Authorization', 'Bearer ${token}')
        ->header('Accept', 'application/json')
        ->expectStatus(200);

    $scenario->step('Update Profile')
        ->put('/api/profile', [
            'name' => 'Updated Name',
        ], [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ${token}',
        ])
        ->expectStatus(200);
}
```

## CRUD Operations

```php
public function define(VoltTestManager $manager): void
{
    $manager->target('http://localhost:8000');

    $scenario = $manager->scenario('User CRUD');

    $scenario->step('Create User')
        ->post('/api/users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'role' => 'editor',
        ], ['Content-Type' => 'application/json'])
        ->expectStatus(201)
        ->extractJson('user_id', 'data.id');

    $scenario->step('Read User')
        ->get('/api/users/${user_id}')
        ->header('Accept', 'application/json')
        ->expectStatus(200);

    $scenario->step('Update User')
        ->put('/api/users/${user_id}', [
            'name' => 'Jane Doe',
        ], ['Content-Type' => 'application/json'])
        ->expectStatus(200);

    $scenario->step('Delete User')
        ->delete('/api/users/${user_id}')
        ->expectStatus(204);
}
```

## Data Extraction

### Extract from JSON

Use dot notation to extract values from JSON responses:

```php
->extractJson('token', 'data.token')
->extractJson('user_id', 'data.id')
->extractJson('first_item', 'data.items[0].name')
```

### Extract from Headers

```php
->extractHeader('request_id', 'X-Request-Id')
->extractHeader('rate_limit', 'X-RateLimit-Remaining')
```

### Using Extracted Variables

Reference extracted values with `${variable_name}`:

```php
$scenario->step('Login')
    ->post('/api/login', [...])
    ->extractJson('token', 'data.token');

$scenario->step('Protected Endpoint')
    ->get('/api/protected')
    ->header('Authorization', 'Bearer ${token}');
```

## Status Validation

Validate expected HTTP status codes:

```php
->expectStatus(200)         // OK
->expectStatus(201)         // Created
->expectStatus(204)         // No Content
->expectStatus(302)         // Redirect
->expectStatus(422)         // Validation Error
```

You can provide a custom name for the validation:

```php
->expectStatus(200, 'profile_loaded')
```

If the status doesn't match, it's recorded as a failed request in the test report.
