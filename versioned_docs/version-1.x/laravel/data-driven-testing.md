---
id: laravel-data-driven-testing
title: Data-Driven Testing
description: "Use CSV data files in VoltTest Laravel tests. Each virtual user gets unique data with sequential, random, or unique iteration modes."
sidebar_label: Data-Driven Testing
sidebar_position: 7
---

# Data-Driven Testing

Load test data from CSV files so each virtual user gets different data.

## Basic Setup

1. Place your CSV file in `storage/volttest/data/` (configurable):

```csv
email,password,name
alice@test.com,secret123,Alice
bob@test.com,secret456,Bob
charlie@test.com,secret789,Charlie
```

2. Reference it in your scenario:

```php
public function define(VoltTestManager $manager): void
{
    $manager->target('http://localhost:8000');

    $scenario = $manager->scenario('Registration with CSV Data');

    $scenario->dataSource('users.csv');

    $scenario->step('Register')
        ->post('/register', 'name=${name}&email=${email}&password=${password}')
        ->header('Content-Type', 'application/x-www-form-urlencoded')
        ->expectStatus(302);
}
```

Each virtual user gets a row from the CSV. Column headers become variable names accessible via `${column_name}`.

## Distribution Modes

Control how CSV rows are assigned to virtual users:

```php
$scenario->dataSource('users.csv', 'unique');      // Each row used once (default)
$scenario->dataSource('users.csv', 'sequential');   // Rows in order, cycling when exhausted
$scenario->dataSource('users.csv', 'random');        // Random row selection
```

| Mode | Behavior |
|------|----------|
| `unique` | Each row assigned to one VU only. Fails if more VUs than rows. |
| `sequential` | Rows assigned in order; wraps around when exhausted. |
| `random` | Random row per VU on each iteration. |

## File Location

By default, CSV files are resolved relative to `storage/volttest/data/`. You can also use absolute paths:

```php
// Relative to configured path
$scenario->dataSource('users.csv');

// Absolute path
$scenario->dataSource('/path/to/custom/data.csv');
```

### Configure Default Path

In `config/volttest.php`:

```php
'csv_data' => [
    'path' => storage_path('volttest/data'),
    'validate_files' => true,
    'default_distribution' => 'unique',
    'default_headers' => true,
],
```

## Headers

If your CSV has a header row (default: `true`), the first row defines column names. Disable if your CSV has no headers:

```php
$scenario->dataSource('data.csv', 'sequential', false);
```

## File Validation

By default, the package validates that CSV files exist before running. Disable in config if needed:

```php
'csv_data' => [
    'validate_files' => false,
],
```

## Example: API Testing with CSV

```php
public function define(VoltTestManager $manager): void
{
    $manager->target('http://localhost:8000');

    $scenario = $manager->scenario('API with Test Data');

    $scenario->dataSource('api_users.csv', 'random');

    $scenario->step('Login')
        ->post('/api/login', [
            'email' => '${email}',
            'password' => '${password}',
        ], ['Content-Type' => 'application/json'])
        ->expectStatus(200)
        ->extractJson('token', 'data.token');

    $scenario->step('Get Profile')
        ->get('/api/profile')
        ->header('Authorization', 'Bearer ${token}')
        ->expectStatus(200);
}
```

CSV file (`storage/volttest/data/api_users.csv`):
```csv
email,password
admin@test.com,admin123
editor@test.com,editor456
viewer@test.com,viewer789
```
