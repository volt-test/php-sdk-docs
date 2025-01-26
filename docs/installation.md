---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 2
---

# Installation


### Requirements
- PHP 8.0 or higher
- Composer
- ext-json PHP extension
- ext-curl PHP extension
- ext-pcntl PHP extension (recommended for Unix-like systems)

## Installation Steps
There are two ways to install the Volt-Test SDK:
1. Install the SDK inside your project using Composer
2. Clone the SDK repository

### Install the SDK using Composer
Composer require inside your project directory:
```bash
composer require volt-test/php-sdk
```
That's it! You have successfully installed the Volt-Test SDK in your project.
See the [Getting Started](/docs/getting-started) guide to create your first test script.

### Clone the SDK Repository
Clone the repository and install the dependencies using Composer.
1. Clone the Repository:
   ```bash
   git clone git@github.com:volt-test/php-sdk.git
    ```
2. GO to the project directory:
   ```bash
    cd php-sdk
    ```
   
3. Install the dependencies:
   ```bash
   composer install
   ```

Let's [getting started](/docs/getting-started) with the SDK by creating a simple test script.