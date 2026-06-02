---
id: laravel-configuration
title: Configuration Reference
sidebar_label: Configuration
sidebar_position: 11
---

# Configuration Reference

All settings are in `config/volttest.php`. Publish with:

```bash
php artisan vendor:publish --tag=volttest-config
```

## Test Configuration

| Key | Env Var | Default | Description |
|-----|---------|---------|-------------|
| `name` | `VOLTTEST_NAME` | `Laravel Application Test` | Default test name |
| `description` | `VOLTTEST_DESCRIPTION` | `Performance test for Laravel application` | Default description |

## Load Configuration

| Key | Env Var | Default | Description |
|-----|---------|---------|-------------|
| `virtual_users` | `VOLTTEST_VIRTUAL_USERS` | `10` | Number of concurrent virtual users |
| `duration` | `VOLTTEST_DURATION` | `null` | Test duration (e.g., `30s`, `2m`, `1h`) |
| `ramp_up` | `VOLTTEST_RAMP_UP` | `null` | Ramp-up time for VUs |

## Stages

```php
'stages' => [
    ['duration' => '1m', 'target' => 50],
    ['duration' => '5m', 'target' => 100],
    ['duration' => '1m', 'target' => 0],
],
```

When stages are set, `virtual_users`, `duration`, and `ramp_up` are ignored.

## Region Distribution

```php
'regions' => [
    'us-east-1' => 60,
    'eu-west-1' => 40,
],
```

Weights must sum to 100. Leave empty for single-region default. Requires cloud mode.

## Debug

| Key | Env Var | Default | Description |
|-----|---------|---------|-------------|
| `http_debug` | `VOLTTEST_HTTP_DEBUG` | `false` | Enable HTTP debug output |

## Paths

| Key | Default | Description |
|-----|---------|-------------|
| `test_paths` | `app_path('VoltTests')` | Directory for test classes |
| `reports_path` | `storage_path('volttest/reports')` | Directory for saved reports |

## Reports

| Key | Env Var | Default | Description |
|-----|---------|---------|-------------|
| `save_reports` | `VOLTTEST_SAVE_REPORTS` | `true` | Save test reports to disk |

## Base URL

| Key | Env Var | Default | Description |
|-----|---------|---------|-------------|
| `use_base_url` | `VOLTTEST_USE_BASE_URL` | `true` | Prefix relative paths with base URL |
| `base_url` | `VOLTTEST_BASE_URL` | `http://localhost:8000` | Base URL for your application |

When `use_base_url` is `true`, relative paths like `/api/users` become `http://localhost:8000/api/users`. Full URLs are used as-is.

## CSV Data Source

```php
'csv_data' => [
    'path' => storage_path('volttest/data'),
    'validate_files' => true,
    'default_distribution' => 'unique',
    'default_headers' => true,
],
```

| Key | Default | Description |
|-----|---------|-------------|
| `csv_data.path` | `storage/volttest/data` | Default directory for CSV files |
| `csv_data.validate_files` | `true` | Check CSV files exist before running |
| `csv_data.default_distribution` | `unique` | Default distribution mode (`unique`, `random`, `sequential`) |
| `csv_data.default_headers` | `true` | Whether CSV files have a header row |

## Cloud

| Key | Env Var | Default | Description |
|-----|---------|---------|-------------|
| `cloud.enabled` | `VOLTTEST_CLOUD_ENABLED` | `false` | Enable cloud execution by default |
| `cloud.api_key` | `VOLTTEST_API_KEY` | `null` | VoltTest API key (starts with `vt_`) |

## Minimal .env Example

```env
VOLTTEST_VIRTUAL_USERS=20
VOLTTEST_DURATION=1m
VOLTTEST_BASE_URL=http://localhost:8000
VOLTTEST_SAVE_REPORTS=true
```

## Cloud .env Example

```env
VOLTTEST_API_KEY=vt_your_api_key
VOLTTEST_CLOUD_ENABLED=true
VOLTTEST_VIRTUAL_USERS=500
VOLTTEST_DURATION=10m
```
