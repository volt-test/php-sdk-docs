---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 2
---

# Installation

## Requirements
- **PHP 8.0 or higher**
- **Composer**
- **ext-json** PHP extension
- **ext-curl** PHP extension
- **ext-pcntl** PHP extension (Required for Unix-like systems, not available on Windows)

⚠️ **Note:**
- `pcntl` is **not available on Windows** as it only works in CLI environments on Unix-based systems.
- If you're using Windows, see the [**Running on Windows**](#running-on-windows) section below.

---

## Installation Steps
There are two ways to install the Volt-Test SDK:
1. Install the SDK inside your project using Composer.
2. Clone the SDK repository.

### Install the SDK using Composer
Run the following command inside your project directory:
```bash
composer require volt-test/php-sdk
```
That's it! You have successfully installed the Volt-Test SDK in your project.  
See the [Getting Started](/docs/getting-started) guide to create your first test script.

---

### Clone the SDK Repository
If you prefer to clone the repository and install dependencies manually:
1. Clone the Repository:
   ```bash
   git clone git@github.com:volt-test/php-sdk.git
   ```
2. Navigate to the project directory:
   ```bash
   cd php-sdk
   ```
3. Install dependencies:
   ```bash
   composer install
   ```

Now, let's [get started](/docs/getting-started) by creating a simple test script.

---

## Running on Windows
Since `pcntl` is not supported on Windows, you need to run Volt-Test in a Linux environment. Here are your options:

### **Option 1: Use Windows Subsystem for Linux (WSL) (Recommended)**
1. Install WSL by running this command in **PowerShell (Admin)**:
   ```powershell
   wsl --install
   ```
2. Restart your PC and open **Ubuntu** from the Start Menu.
3. Install PHP inside WSL:
   ```bash
   sudo apt update
   sudo apt install php-cli php-curl php-json
   ```
4. Run Volt-Test commands inside WSL:
   ```bash
   php your-script.php
   ```

### **Option 2: Use Docker**
Run Volt-Test inside a **Docker container**:
```bash
docker run --rm -v $(pwd):/app -w /app php:8-cli php your-script.php
```
For Alpine-based PHP:
```bash
docker run --rm -v $(pwd):/app -w /app php:8-alpine sh -c "apk add php-cli php-curl php-json && php your-script.php"
```

### **Option 3: Use a Linux Virtual Machine**
- Install **VirtualBox** or **VMware**.
- Set up an Ubuntu-based VM.
- Install PHP and required extensions.
- Run your Volt-Test scripts inside the VM.

---
