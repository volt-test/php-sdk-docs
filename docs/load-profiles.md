---
id: load-profiles
title: Load Profiles
sidebar_label: Load Profiles
sidebar_position: 7
---

# Load Profiles

Load profiles control how virtual users are distributed over time during a test. VoltTest supports two approaches: **constant load** and **staged load profiles**.

## Constant Load

The simplest approach — a fixed number of virtual users for a set duration.

```php
$test = new VoltTest('Constant Load Test');
$test->target('https://api.example.com');
$test->setVirtualUsers(100);
$test->setDuration('5m');
```

This runs 100 VUs for 5 minutes. All users start immediately by default.

### Ramp-Up

Gradually start virtual users over a period instead of all at once. This avoids a thundering herd hitting your server at second zero.

```php
$test = new VoltTest('Ramped Load Test');
$test->target('https://api.example.com');
$test->setVirtualUsers(200);
$test->setDuration('10m');
$test->setRampUp('30s');  // Spread user starts over 30 seconds
```

With ramp-up, VUs start linearly over the specified time:
- At 0s: 0 VUs active
- At 15s: ~100 VUs active
- At 30s: all 200 VUs active
- At 10m: test ends

### When to Use Constant Load

- **Baseline testing** — measure steady-state performance under known load
- **Smoke tests** — quick sanity check with low VU count
- **Endurance tests** — sustained load over a long duration to find memory leaks

## Staged Load Profiles

Stages let you define a dynamic load profile where VU count changes over time. Each stage linearly ramps from the previous target to a new target over a given duration.

```php
$test = new VoltTest('Staged Test');
$test->target('https://api.example.com');

$test->stage('1m', 50);    // Ramp up to 50 VUs over 1 minute
$test->stage('5m', 50);    // Hold at 50 VUs for 5 minutes
$test->stage('30s', 200);  // Spike to 200 VUs over 30 seconds
$test->stage('5m', 200);   // Hold at 200 VUs for 5 minutes
$test->stage('1m', 0);     // Ramp down to 0 over 1 minute
```

### Stage Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| duration | string | How long this stage lasts (`<number>[s\|m\|h]`) |
| target | int | Target VU count at the end of this stage |

Each stage starts from wherever the previous stage ended. The first stage starts from 0.

### Common Patterns

#### Ramp Up → Hold → Ramp Down

The standard load test pattern. Gradually increase load, sustain it, then wind down.

```php
$test->stage('2m', 100);   // Ramp up
$test->stage('10m', 100);  // Hold
$test->stage('2m', 0);     // Ramp down
```

#### Spike Test

Test how your system handles sudden traffic surges.

```php
$test->stage('1m', 50);    // Normal load
$test->stage('5m', 50);    // Hold normal
$test->stage('10s', 500);  // Sudden spike
$test->stage('1m', 500);   // Hold spike
$test->stage('10s', 50);   // Drop back to normal
$test->stage('5m', 50);    // Hold normal
$test->stage('1m', 0);     // Ramp down
```

#### Step-Up (Stress Test)

Incrementally increase load to find the breaking point.

```php
$test->stage('1m', 100);   // Step 1
$test->stage('3m', 100);   // Hold
$test->stage('1m', 200);   // Step 2
$test->stage('3m', 200);   // Hold
$test->stage('1m', 400);   // Step 3
$test->stage('3m', 400);   // Hold
$test->stage('1m', 800);   // Step 4
$test->stage('3m', 800);   // Hold
$test->stage('2m', 0);     // Ramp down
```

#### Soak Test (Endurance)

Sustained load over a long period to detect memory leaks and degradation.

```php
$test->stage('5m', 100);   // Ramp up
$test->stage('2h', 100);   // Hold for 2 hours
$test->stage('5m', 0);     // Ramp down
```

### When to Use Staged Profiles

- **Realistic traffic simulation** — real users don't all arrive at once
- **Spike testing** — simulate flash sales, marketing campaigns, or viral events
- **Stress testing** — find breaking points by stepping up load incrementally
- **Soak testing** — long-running tests to find slow memory leaks or connection pool exhaustion

## Constant vs Staged

| | Constant Load | Staged Profiles |
|--|---------------|-----------------|
| **VU count** | Fixed for entire test | Changes over time |
| **Setup** | `setVirtualUsers()` + `setDuration()` | `stage()` calls |
| **Ramp-up** | Optional via `setRampUp()` | Built into first stage |
| **Complexity** | Simple | Flexible |
| **Best for** | Baseline, smoke tests | Spike, stress, soak tests |

:::warning
Constant load and staged profiles are **mutually exclusive**. Using `stage()` prevents using `setVirtualUsers()`, `setDuration()`, and `setRampUp()` — and vice versa.
:::

## Cloud Mode

Both constant and staged profiles work identically in cloud mode:

```php
$test = new VoltTest('Cloud Staged Test');
$test->target('https://api.example.com');
$test->cloud('vt_your_api_key');

$test->stage('2m', 500);
$test->stage('10m', 500);
$test->stage('2m', 0);

$test->run();
```

See the [Cloud Mode](/docs/cloud-mode) page for details on cloud execution.
