---
id: Result
title: Result
sidebar_label: Results
sidebar_position: 8
---

# Test Results
VoltTest provides comprehensive performance metrics and statistics through the TestResult class.

## Basic Usage

```php
$result = $test->run();

// Get key metrics
echo "Success Rate: " . $result->getSuccessRate() . "%\n";
echo "Total Requests: " . $result->getTotalRequests() . "\n";
```

## Available Metrics

### Basic Metrics

```php
// Test duration
$result->getDuration();           // Returns: "24.000873057s"

// Request counts
$result->getTotalRequests();      // Returns: 5000
$result->getSuccessRequests();    // Returns: 4148
$result->getFailedRequests();     // Returns: 852

// Performance metrics
$result->getSuccessRate();        // Returns: 82.96
$result->getRequestsPerSecond();  // Returns: 208.33
```

### Response Time Statistics

```php
// Time measurements
$result->getMinResponseTime();      // Returns: "7.388011ms"
$result->getMaxResponseTime();      // Returns: "18.179649581s"
$result->getAvgResponseTime();      // Returns: "3.848391356s"
$result->getMedianResponseTime();   // Returns: "8.997304894s"
$result->getP95ResponseTime();      // Returns: "16.74641748s"
$result->getP99ResponseTime();      // Returns: "17.552319263s"
```

### Raw Data Access

```php
// Get all metrics as array
$metrics = $result->getAllMetrics();

// Access raw output
$rawOutput = $result->getRawOutput();
```


## Metrics Format

The TestResult class parses and formats the following output structure:

```plaintext
Test Metrics Summary:
===================
Duration:     24.000873057s
Total Reqs:   5000
Success Rate: 82.96%
Req/sec:      208.33
Success Requests: 4148
Failed Requests: 852

Response Time:
------------
Min:    7.388011ms
Max:    18.179649581s
Avg:    3.848391356s
Median: 8.997304894s
P95:    16.74641748s
P99:    17.552319263s
```

## Response Time Units

Results are provided in appropriate units:
- Milliseconds (ms)
- Seconds (s)
- Minutes (m)
- Hours (h)

## Complete Example

```php
$result = $test->run();

printf("Test Summary:\n");
printf("Duration: %s\n", $result->getDuration());
printf("Total Requests: %d\n", $result->getTotalRequests());
printf("Success Rate: %.2f%%\n", $result->getSuccessRate());
printf("Requests/sec: %.2f\n", $result->getRequestsPerSecond());
printf("Success Requests: %d\n", $result->getSuccessRequests());
printf("Failed Requests: %d\n", $result->getFailedRequests());

printf("\nResponse Times:\n");
printf("Min: %s\n", $result->getMinResponseTime());
printf("Max: %s\n", $result->getMaxResponseTime());
printf("Avg: %s\n", $result->getAvgResponseTime());
printf("Median: %s\n", $result->getMedianResponseTime());
printf("P95: %s\n", $result->getP95ResponseTime());
printf("P99: %s\n", $result->getP99ResponseTime());
```

## Metrics Reference Table

| Metric | Method | Return Type | Description |
|--------|---------|-------------|-------------|
| Duration | getDuration() | string | Total test duration |
| Total Requests | getTotalRequests() | int | Total number of requests |
| Success Rate | getSuccessRate() | float | Percentage of successful requests |
| Requests/sec | getRequestsPerSecond() | float | Average throughput |
| Success Requests | getSuccessRequests() | int | Number of successful requests |
| Failed Requests | getFailedRequests() | int | Number of failed requests |
| Min Response Time | getMinResponseTime() | string | Fastest response time |
| Max Response Time | getMaxResponseTime() | string | Slowest response time |
| Avg Response Time | getAvgResponseTime() | string | Average response time |
| Median Response Time | getMedianResponseTime() | string | Median response time |
| P95 Response Time | getP95ResponseTime() | string | 95th percentile response time |
| P99 Response Time | getP99ResponseTime() | string | 99th percentile response time |

