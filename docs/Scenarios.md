---
id: Scenarios
title: Scenarios
sidebar_label: Scenarios
sidebar_position: 6
---

# Scenarios
Scenarios in VoltTest represent user flows that will be executed during the performance test.

Each scenario contains a sequence of steps and can be configured with specific behaviors.

## Creating a Scenario
Create scenarios through the VoltTest instance:

```php
use VoltTest\VoltTest;

$test = new VoltTest('API Test');
$scenario = $test->scenario(
    'Login Flow',           // Scenario name
    'User authentication'   // Optional description
);
```

## Scenario Configuration

### Weight
The weight of a scenario determines the execution probability relative to other scenarios
```php
$scenario->setWeight(75); // 75% weight
```

Let's say you have two scenarios, A and B, with weights 30 and 70, respectively. and you have 100 virtual users.
Scenario A will be executed by approximately 30 virtual users, and scenario B will be executed by 70 virtual users.

```php
$regitrationScenario = $test->scenario(
'Registration Flow'
);
$browseCategoryScenario = $test->scenario(
'Browse Category Flow'
);
$browseCategoryScenario->setWeight(70); // 70% weight
$regitrationScenario->setWeight(30); // 30% weight
```
:::warning
If you have only one scenario, ignore the weight configuration.
:::

#### Weight Validation
- Weights must be integers between 1 and 100
- The sum of all scenario weights must be 100

### Think Time
Let's say you have a scenario with multiple steps. and you want to add a delay between each step.
Think time is the delay between steps in a scenario.
The Default think time is 0 seconds.

Adding a delay between steps:
```php
$scenario->setThinkTime('2s');  // 2-second delay
$scenario->setThinkTime('1m');  // 1-minute delay
```
This configuration adds a delay of (2 seconds or 1 minute) between each step in the scenario.
:::info
You can configure think time at the step level as well, and it will override the scenario-level think time.
:::

### Cookie Management
Cookie management is disabled by default in VoltTest. You can enable it if needed.
```php
$scenario->autoHandleCookies();
```

### Data Source Configuration
Assuming you have a CSV file with test data, you can configure data-driven testing in VoltTest.

The data source configuration allows you to specify the data file path, mode, and whether the file has a header row.

Then you can use the data in your scenario steps.

Configure data-driven testing:

```php
use VoltTest\DataSourceConfiguration;

$dataConfig = new DataSourceConfiguration(
    __DIR__ . '/test-data.csv',    // Full file path
    'random',           // Mode: sequential/random/unique
    true                // Has header row
);

$scenario->setDataSourceConfiguration($dataConfig);
```
So Each virtual user will get a row from the data file and use it in the scenario steps.
Each Scenario will have its own data source configuration.

For more information on data-driven testing, see the [Examples of Data-Driven Testing](/docs/category/examples) section.

### Data Iteration Modes

When using data sources, you can choose from three iteration modes:

- `sequential`: Iterate through records in order
- `random`: Select records randomly
- `unique`: Use each record only once

## Properties Reference

| Property | Description | Default |
|----------|-------------|---------|
| name | Scenario name | Required |
| description | Scenario description | Empty string |
| weight | Execution probability | 100 |
| thinkTime | Delay between steps | None |
| autoHandleCookies | Cookie management | false |
| DataSourceConfiguration | Data source configuration | None |

Next We will see how to add steps to a scenario.


