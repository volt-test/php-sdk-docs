---
id: laravel-cli-commands
title: Artisan Commands
sidebar_label: Artisan Commands
sidebar_position: 3
---

# Artisan Commands

The Laravel package provides two Artisan commands for creating and running performance tests.

## volttest:make

Generate a new test class.

```bash
php artisan volttest:make {name} [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `name` | Test class name (e.g., `LoginTest`, `CheckoutFlowTest`) |

### Options

| Option | Description |
|--------|-------------|
| `--routes` | Scaffold test from your Laravel routes |
| `--filter=` | Filter routes by URI pattern (e.g., `api/*`, `admin/*`) |
| `--method=` | Filter routes by HTTP method (`GET`, `POST`, etc.) |
| `--auth` | Only include routes with auth middleware |
| `--select` | Interactively select which routes to include |

### Examples

Basic test:
```bash
php artisan volttest:make LoginTest
```

From API routes:
```bash
php artisan volttest:make ApiTest --routes --filter=api/*
```

Only authenticated POST routes:
```bash
php artisan volttest:make FormTest --routes --method=POST --auth
```

Interactive route selection:
```bash
php artisan volttest:make CustomTest --routes --select
```

Generated tests are placed in `app/VoltTests/` by default (configurable via `test_paths` in config).

---

## volttest:run

Execute a performance test.

```bash
php artisan volttest:run [test] [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `test` | Test class name or URL (optional — runs all tests if omitted) |

### Load Options

| Option | Description | Default |
|--------|-------------|---------|
| `--users=` | Number of virtual users | Config value (10) |
| `--duration=` | Test duration (e.g., `30s`, `2m`, `1h`) | Config value |
| `--stage=*` | Staged load profile as `duration:target` (repeatable) | None |
| `--stream` | Stream output to console in real time | false |
| `--debug` | Enable HTTP debug output | false |

### URL Testing Options

| Option | Description | Default |
|--------|-------------|---------|
| `--url` | Treat `test` argument as a URL | false |
| `--method=` | HTTP method for URL test | GET |
| `--headers=` | JSON string of headers | None |
| `--body=` | Request body | None |
| `--content-type=` | Content-Type header | None |
| `--code-status=` | Expected HTTP status code | 200 |
| `--scenario-name=` | Custom scenario name | None |

### Cloud Options

| Option | Description | Default |
|--------|-------------|---------|
| `--cloud` | Run on VoltTest Cloud | false |
| `--region=*` | Region distribution as `region:weight` (repeatable) | None |

### Examples

Run a specific test:
```bash
php artisan volttest:run LoginTest
```

Run with custom load:
```bash
php artisan volttest:run LoginTest --users=100 --duration=5m --stream
```

Staged load profile:
```bash
php artisan volttest:run LoginTest --stage=1m:50 --stage=5m:100 --stage=1m:0
```

Direct URL test:
```bash
php artisan volttest:run https://api.example.com/health --url --users=50 --duration=1m
```

URL test with POST and headers:
```bash
php artisan volttest:run https://api.example.com/login \
  --url \
  --method=POST \
  --body='{"email":"test@example.com","password":"secret"}' \
  --content-type=application/json \
  --code-status=200 \
  --users=20
```

Cloud execution with regions:
```bash
php artisan volttest:run LoginTest --cloud --region=us-east-1:60 --region=eu-west-1:40
```

Run all tests in the default path:
```bash
php artisan volttest:run
```

Search a custom path:
```bash
php artisan volttest:run --path=tests/Performance
```
