---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
sidebar_position: 3
---

# Getting Started

After installing the Volt-Test SDK, you can start writing performance tests for your PHP applications.
This guide will help you get started with the basics of Volt-Test and show you how to create and run your first performance test.

You can install the Volt-Test SDK Here: [Volt-Test SDK](/docs/installation)

## Basic Usage
Here's a minimal example to get started:

```php title="example.php"
<?php
use VoltTest\VoltTest;

// Create a new instance of the VoltTest class
$voltTest = new VoltTest('Name of Your test');
// Create a new scenario
$scenario = $voltTest->scenario('Basic Scenario');
// Add a step to the scenario
$scenario->step('Register')
    ->get('https://google.com')
    ->header('Content-Type', 'text/html');
// Run the test
$result = $voltTest->run(true);
// Echo the result
echo $result->getRawOutput();
```
Then run the script using the following command in your terminal:
```bash title="Run the script"
php example.php
```
The Output will be something like this:
```bash title="Output"
Test Metrics Summary:
===================
Duration:     254.804339ms
Total Reqs:   1
Success Rate: 100.00%
Req/sec:      3.93
Success Requests: 1
Failed Requests: 0

Response Time:
------------
Min:    252.587118ms
Max:    252.587118ms
Avg:    252.587118ms
Median: 252.587118ms
P95:    252.587118ms
P99:    252.587118ms
```

This is just a simple example to get started with Volt-Test. The metrics summary provides insights into the request's performance, including response time distribution and success rate. You can create more complex scenarios, simulate concurrent requests, and monitor real-time results to stress-test your application under different loads.

With Volt-Test, you can:

- Easily define multiple steps in a scenario.
- Add headers, parameters, or custom data for each request.
- Measure critical performance metrics like request rates, latency percentiles, and throughput.
- Use the raw output for further analysis or logging.

Start writing and testing your performance scenarios today!