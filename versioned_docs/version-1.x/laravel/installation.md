---
id: laravel-installation
title: Installation
sidebar_label: Installation
sidebar_position: 1
---

# Installation

## Requirements

- **PHP 8.2** or higher
- **Laravel 10, 11, or 12**
- **ext-pcntl** PHP extension (Unix-like systems only)
- **Composer**

## Install the Package

```bash
composer require volt-test/laravel-performance-testing
```

The package uses Laravel's auto-discovery, so the service provider and facade are registered automatically.

## Publish Configuration

```bash
php artisan vendor:publish --tag=volttest-config
```

This creates `config/volttest.php` with all default settings.

## Environment Variables

Add these to your `.env` file as needed:

```env
# Test defaults
VOLTTEST_VIRTUAL_USERS=10
VOLTTEST_DURATION=1m
VOLTTEST_RAMP_UP=10s

# Base URL (defaults to http://localhost:8000)
VOLTTEST_BASE_URL=http://localhost:8000

# Cloud execution (optional)
VOLTTEST_API_KEY=vt_your_api_key
VOLTTEST_CLOUD_ENABLED=false

# Debug
VOLTTEST_HTTP_DEBUG=false

# Reports
VOLTTEST_SAVE_REPORTS=true
```

## Verify Installation

Run the following to confirm the package is installed:

```bash
php artisan volttest:make --help
```

You should see the command's help output with available options.

## Next Steps

- [Quick Start](/docs/laravel/laravel-quick-start) — Create and run your first test
- [Configuration Reference](/docs/laravel/laravel-configuration) — All config options explained
