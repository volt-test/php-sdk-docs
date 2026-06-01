---
sidebar_position: 1
id: JSON-API-Examples
title: JSON API Examples
---

# JSON API Examples
In this section, we'll cover some examples of testing JSON APIs using VoltTest PHP SDK.

Ex:
- [API Authentication Testing](#authentication-api-testing)
  - Test an API that requires authentication
- [CRUD Operations](#crud-operations)
  - Test a JSON API that supports CRUD operations
- [Data Driven API Testing](#data-driven-api-testing)
  - Test an API with different sets of data from a CSV file

## Authentication API Testing
Authentication is a common use case for APIs. In this example, we'll test an authentication API that requires a login request to get an access token and then use that token in subsequent requests.

```php
$test = new VoltTest('API Authentication Test');
$test->setVirtualUsers(10);

$scenario = $test->scenario('API Authentication');

// Login Request
$scenario->step('Login')
    ->post('https://api.example.com/auth/login', json_encode([
        'email' => 'some@mail.com',
        'password' => 'secret' 
    ]))
    ->header('Content-Type', 'application/json')
    ->validateStatus('login_success', 200)
    ->extractFromJson('access_token', 'data.token');

// Use Token in Subsequent Requests
$scenario->step('Get Profile')
    ->get('https://api.example.com/profile')
    ->header('Authorization', 'Bearer ${access_token}')
    ->validateStatus('profile_success', 200);

// Run the test and get the result
$result = $test->run();

echo $result->getRawOutput();
```

In the example above, we create a new test named "API Authentication Test" 
and set the number of virtual users to 10. We then create a scenario named "API Authentication"
and add two steps to it. 
The first step sends a POST request to the login endpoint with the email and password,
validates the login success status, and extracts the access token from the JSON response.
The second step sends a GET request to the profile endpoint with the access token 
in the Authorization header and validates the profile success status.

## CRUD Operations
CRUD (Create, Read, Update, Delete) operations are fundamental to APIs.
In this example, we'll test a JSON API that supports CRUD operations for managing users.

```php
$test = new VoltTest('CRUD Operations Test');
$test->setVirtualUsers(100);
$test->setDuration('1m');

$scenario = $test->scenario('CRUD Operations');

// Create
$scenario->step('Create User')
    ->post('https://api.example.com/users', json_encode([
        'name' => 'John Doe',
        'email' => 'some@mail.com',
        'role' => 'user',
    ]))
    ->header('Content-Type', 'application/json')
    ->validateStatus('creation_success', 201)
    ->extractFromJson('user_id', 'data.id');

// Read
$scenario->step('Get User')
    ->get('https://api.example.com/users/${user_id}')
    ->validateStatus('read_success', 200);

// Update
$scenario->step('Update User')
    ->put('https://api.example.com/users/${user_id}', json_encode([
        'name' => 'Jane Doe',
        'email' => 'update@mail.com',
    ]))
    ->header('Content-Type', 'application/json')
    ->validateStatus('update_success', 200);

// Delete
$scenario->step('Delete User')
    ->delete('https://api.example.com/users/${user_id}')
    ->validateStatus('delete_success', 204);

// Run the test and get the result
$result = $test->run();

echo $result->getRawOutput();
```

In the example above, we create a new test named "CRUD Operations Test"
and set the number of virtual users to 100 and the test duration to 1 minute.
We then create a scenario named "CRUD Operations" and add four steps to it.
The first step sends a POST request to create a new user, validates the creation success status,
and extracts the user ID from the JSON response.
The second step sends a GET request to retrieve the user details.
The third step sends a PUT request to update the user details,
and the fourth step sends a DELETE request to delete the user.

## Data Driven API Testing
Data-driven testing involves running the same test scenario with different sets of data.
In this example, we'll test an API that requires different user data for registration.

```php
$test = new VoltTest('Data-Driven API Test');
$test->setVirtualUsers(50);

// Configure data source
$dataConfig = new DataSourceConfiguration(
    __DIR__ . '/test_users.csv',    // CSV with test data
    'random',            // Random selection
    true                 // Has header row
);

$scenario = $test->scenario('Registration Test')
    ->setDataSourceConfiguration($dataConfig);

// Registration process using data from CSV
$scenario->step('Submit Registration')
    ->post('https://api.example.com/register', json_encode([
        'name' => '${name}',
        'email' => '${email}',
        'phone' => '${phone}',
    ]))
    ->header('Content-Type', 'application/json')
    ->validateStatus('registration_success', 200);

// Run the test and get the result
$result = $test->run();
echo $result->getRawOutput();
```

In the example above, we create a new test named "Data-Driven API Test"
and set the number of virtual users to 50. We then configure a data source
using a CSV file with test data and set it to random selection.
We create a scenario named "Registration Test" and set the data source configuration.
The scenario step submits the registration form using data from the CSV file
and validates the registration success status.

:::info
The CSV file should have columns for name, email, and phone with corresponding values for each test case.
:::

