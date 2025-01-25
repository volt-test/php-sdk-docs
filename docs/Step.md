---
id: Steps
title: Steps
sidebar_label: Steps (HTTP Requests)
sidebar_position: 7
---

# Steps

Steps define individual HTTP requests and their associated configurations within a scenario.

Scenario can contain multiple steps, each representing a unique request to be executed during the test.


## Creating Steps
Creating step from a scenario instance:
```php
use VoltTest\VoltTest;
$test = new VoltTest('API Test');
$scenario = $test->scenario('Login Flow');
$scenario->step('Login')    // Step name is required
    ->post('https://api.example.com/login');
```

## HTTP Methods

### GET Request
```php
$scenario->get('https://api.example.com/users')
    ->header('Accept', 'application/json');
```

### POST Request
Json body is required for POST requests:
```php
$scenario->post('https://api.example.com/users', '{"name": "John"}')
    ->header('Content-Type', 'application/json');
```
Html form data can be sent as an array:
```php
$scenario->post('https://api.example.com/users', 'email=${email}&password=${password}')
    ->header('Content-Type', 'application/x-www-form-urlencoded');
```

### PUT Request
```php
$scenario->put('https://api.example.com/users/1', '{"name": "Updated"}');
```
### PATCH Request
```php
$scenario->patch('https://api.example.com/users/1', '{"status": "active"}');
```
### DELETE Request
```php
$scenario->delete('https://api.example.com/users/1');
```
### HEAD Request
```php
$scenario->head('https://api.example.com/status');
```
### OPTIONS Request
```php
$scenario->options('https://api.example.com/users');
```

## Headers

Add custom headers to requests:
```php
$scenario->post('https://api.example.com/users', '{"name": "John"}')
     ->header('Authorization', 'Bearer token')
     ->header('Accept', 'application/json')
     ->header('X-Custom-Header', 'value');
```

## Data Extraction
Data can be extracted from responses and used in subsequent requests.

Let's say you have a login request that returns a token in the response. You can extract the token and use it in subsequent requests.

### JSON Response
Extract data from a JSON response:
```php
$scenario->post('https://api.example.com/login', '{"name": "John"}')
->header('Content-Type', 'application/json')
->extractFromJson('token', 'meta.token');
```
Here, `token` is the variable name, and `meta.token` is the JSON path to extract the value from the response.
So, the extracted value will be stored in the `token` variable and can be used in subsequent steps.
Example usage in subsequent steps:
```php
$scenario->post('https://api.example.com/users', '{"name": "John"}')
    ->header('Content-Type', 'application/json')
    ->header('Authorization', 'Bearer ${token}');
```
:::info
The extracted value can be used in subsequent steps by referencing the variable name with `${variableName}`.
:::

### Headers
Extract data from response headers:
```php
$scenario->post('https://api.example.com/login', '{"name": "John"}')
    ->header('Content-Type', 'application/json')
    ->extractFromHeaders('token','Authorization'); // token is the variable name and Authorization is the header name
```
Here, `token` is the variable name, and `Authorization` is the header name to extract the value from the response headers.
So, the extracted value will be stored in the `token` variable and can be used in subsequent steps.

### Cookies
Extract data from cookies:
```php
$loginScenario->step('submit_login')
    ->post(
        'https://example.com/login',
        '_token=${csrf_token}&email=tes11t1v@mai1l.com&password=12345678'
    )
    ->extractFromCookie('session', 'laravel_session')
    ->extractFromCookie('XSRF-TOKEN', 'XSRF-TOKEN')
    ->header('Content-Type', 'application/x-www-form-urlencoded');
```

### Regular Expressions
Extract data using regular expressions:
```php
$scenario->get('https://example.com/login')
    ->extractFromRegex('csrf', 'name="_token" value="(.+?)"');
```
Here, `csrf` is the variable name, and `name="_token" value="(.+?)"` is the regular expression to extract the value from the response.

## Response Validation
For now, VoltTest php sdk supports validating the response status code only.

### Validate Status
```php
$scenario->post('https://api.example.com/login', '{"name": "John"}')
    ->validateStatus('success', 200);
```
Here, `success` is the validation name, and `200` is the expected status code.
So if the response status code is not 200, This will add an error to the test report.

## Think Time
Think time is the delay between steps in a scenario.
The default think time is 0 seconds.

Adding a delay after step execution:
```php
$scenario->setThinkTime('2s');  // 2-second delay
$scenario->setThinkTime('1m');  // 1-minute delay
```
This configuration adds a delay of (2 seconds or 1 minute) after the step execution.


## Using Variables
Reference extracted variables in subsequent steps:
```php
// Extract token from login response
$scenario->post('/login', '{"username": "user", "password": "pass"}')
    ->extractFromJson('token', 'data.token');

// Use token in next request
$scenario->get('/profile')
    ->header('Authorization', 'Bearer ${token}');
```

## Complete Example

```php
$scenario->step('Get Form')
    ->get('https://example.com/form')
    ->header('Content-Type', 'application/x-www-form-urlencoded')
    ->extractFromRegex('csrf', 'name="_token" value="(.+?)"')
    ->validateStatus('success', 200)
    ->setThinkTime('1s');
    
$scenario->step('Process Result')
    ->post('https://example.com/form', 'name=John')
    ->header('X-CSRF-TOKEN', '${csrf}')
    ->validateStatus('success', 200);
```
This example demonstrates a scenario with two steps:
1. Get Form: Sends a GET request to `https://example.com/form`, extracts the CSRF token from the response, and validates the status code.
2. After a 1-second delay, the Process Result step sends a POST request to `https://example.com/form` with the CSRF token extracted from the previous step.


## Validation Rules
- Step name is required
- URLs must be valid HTTP/HTTPS URLs
- Headers must follow RFC 7230 requirements
- JSON paths must be valid expressions
- Regex patterns must be valid
- Think time must use valid time units (s/m/h)


