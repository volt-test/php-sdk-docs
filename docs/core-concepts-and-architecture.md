---
id: Core Concepts and Architecture
title: Core Concepts and Architecture
sidebar_label: Core Concepts and Architecture
sidebar_position: 4
---

# Core Concepts and Architecture

## Introduction
VoltTest is a powerful, easy-to-use performance testing SDK for PHP applications.
Powered by a high-performance Golang engine running behind the scenes,
it combines the ease of use of PHP with the raw power and concurrency capabilities of Go.
This unique architecture enables you to create, run, and analyze performance tests with a fluent,
intuitive API while leveraging Go's superior performance characteristics for the actual load generation.

## Architecture
VoltTest PHP SDK works as a bridge between your PHP application and the VoltTest Engine (written in Go). When you run a test:

Your PHP code defines the test scenarios and configurations
The SDK transforms these into a format the Go engine understands
The Go engine executes the actual load testing Results are streamed back to your PHP application for analysis

This architecture provides several benefits:

Write tests in PHP while getting Go's performance benefits True parallel execution of virtual users
Minimal resource footprint during test execution Accurate timing and metrics collection

## Core Concepts

### Test
- A test represents a complete performance testing session. It contains:
- Configuration settings (virtual users, duration, etc.)
- One or more scenarios
- Global settings like HTTP debugging

### Scenario
A scenario represents a sequence of steps that virtual users will execute. Features:
- Independent flow of HTTP requests
- Cookie handling
- Data extraction and reuse
- Custom think time
- Weight-based execution distribution

### Step
A step represents a single HTTP request within a scenario. Features:
- HTTP method (GET, POST, etc.)
- URL
- Headers and body
- Validation
- Data extraction

### Result
A result represents the outcome of a test run. It contains:
- Metrics like response time, throughput, and success rate
- Raw output for debugging
- Error messages
- min, max, med, p90, p95, p99
- Print all the metrics