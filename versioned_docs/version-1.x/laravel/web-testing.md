---
id: laravel-web-testing
title: Web Testing
sidebar_label: Web Testing
sidebar_position: 6
---

# Web Testing

Test HTML forms, CSRF-protected pages, and multi-step web flows.

## CSRF Token Extraction

Laravel forms require a CSRF token. Use the built-in `extractCsrfToken()` helper:

```php
public function define(VoltTestManager $manager): void
{
    $scenario = $manager->scenario('Login Form');

    $scenario->step('Get Login Page')
        ->get('/login')
        ->expectStatus(200)
        ->extractCsrfToken();

    $scenario->step('Submit Login')
        ->post('/login', '_token=${csrf_token}&email=user@example.com&password=secret')
        ->header('Content-Type', 'application/x-www-form-urlencoded')
        ->expectStatus(302);
}
```

`extractCsrfToken()` extracts the value from `input[name=_token]` and stores it as `${csrf_token}`. You can customize the variable name, selector, and attribute:

```php
->extractCsrfToken('my_token', 'meta[name=csrf-token]', 'content')
```

## Registration Form

```php
public function define(VoltTestManager $manager): void
{
    $scenario = $manager->scenario('Registration');

    $scenario->step('Get Register Page')
        ->get('/register')
        ->expectStatus(200)
        ->extractCsrfToken();

    $scenario->step('Submit Registration')
        ->post('/register', '_token=${csrf_token}&name=John&email=john@test.com&password=secret123&password_confirmation=secret123')
        ->header('Content-Type', 'application/x-www-form-urlencoded')
        ->expectStatus(302);

    $scenario->step('View Dashboard')
        ->get('/dashboard')
        ->expectStatus(200);
}
```

## Multi-Step Forms

```php
public function define(VoltTestManager $manager): void
{
    $scenario = $manager->scenario('Multi-Step Wizard');

    $scenario->step('Step 1: Personal Info')
        ->get('/wizard/step-1')
        ->expectStatus(200)
        ->extractCsrfToken();

    $scenario->step('Submit Step 1')
        ->post('/wizard/step-1', '_token=${csrf_token}&name=John&email=john@test.com')
        ->header('Content-Type', 'application/x-www-form-urlencoded')
        ->expectStatus(302)
        ->thinkTime('1s');

    $scenario->step('Step 2: Address')
        ->get('/wizard/step-2')
        ->expectStatus(200)
        ->extractCsrfToken('csrf_token_2');

    $scenario->step('Submit Step 2')
        ->post('/wizard/step-2', '_token=${csrf_token_2}&address=123+Main+St&city=Springfield')
        ->header('Content-Type', 'application/x-www-form-urlencoded')
        ->expectStatus(302);
}
```

## HTML Data Extraction

Extract any value from the HTML response using CSS selectors:

```php
// Extract input value
->extractHtml('field_value', 'input[name=email]', 'value')

// Extract data attribute
->extractHtml('item_id', 'div.product', 'data-id')

// Extract text content (omit attribute)
->extractHtml('page_title', 'h1.title')

// Extract from a specific form
->extractHtml('action_url', 'form#checkout', 'action')
```

## Regex Extraction

For complex patterns, use regex:

```php
->extractRegex('csrf', 'name="_token" value="(.+?)"')
->extractRegex('order_id', 'Order #(\d+) confirmed')
```

## Cookie Handling

The Laravel package automatically handles cookies for all scenarios. Session cookies, CSRF cookies, and any other cookies set by your application are preserved across steps in the same scenario — just like a real browser session.

No configuration needed — this is enabled by default.
