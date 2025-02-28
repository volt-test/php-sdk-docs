"use strict";(self.webpackChunkphp_sdk_docs=self.webpackChunkphp_sdk_docs||[]).push([[8130],{7735:e=>{e.exports=JSON.parse('{"archive":{"blogPosts":[{"id":"stress-testing-laravel-with-volt-test-web-ui","metadata":{"permalink":"/blog/stress-testing-laravel-with-volt-test-web-ui","editUrl":"https://github.com/volt-test/php-sdk-docs/tree/main/blog/2025-02-28-stress-testing-laravel-with-volt-test-web-ui/index.md","source":"@site/blog/2025-02-28-stress-testing-laravel-with-volt-test-web-ui/index.md","title":"Stress Testing Laravel Applications with VoltTest (Web UI Flow)","description":"This tutorial walks you through setting up and executing stress tests on a Laravel application using the VoltTest PHP SDK. You will learn how to simulate real user interactions such as visiting the home page, registering a new user, and accessing the dashboard, ensuring your application can handle concurrent traffic efficiently.","date":"2025-02-28T00:00:00.000Z","tags":[{"inline":false,"label":"Laravel","permalink":"/blog/tags/laravel","description":"Articles about Laravel development."},{"inline":false,"label":"Performance Testing","permalink":"/blog/tags/performance-testing","description":"Guides and tools for performance testing."},{"inline":false,"label":"Load Testing","permalink":"/blog/tags/load-testing","description":"Resources for testing application load performance."},{"inline":false,"label":"Volt-Test","permalink":"/blog/tags/volt-test","description":"Guides and tutorials about Volt-Test."},{"inline":false,"label":"Stress Test","permalink":"/blog/tags/stress-test","description":"Articles related to stress testing applications."}],"readingTime":5.8,"hasTruncateMarker":true,"authors":[{"name":"Islam A-Elwafa","title":"Software Engineer","url":"https://github.com/elwafa","page":{"permalink":"/blog/authors/elwafa"},"socials":{"x":"https://x.com/elwafa90","github":"https://github.com/elwafa"},"imageURL":"https://github.com/elwafa.png","key":"elwafa"}],"frontMatter":{"slug":"stress-testing-laravel-with-volt-test-web-ui","title":"Stress Testing Laravel Applications with VoltTest (Web UI Flow)","description":"This tutorial walks you through setting up and executing stress tests on a Laravel application using the VoltTest PHP SDK. You will learn how to simulate real user interactions such as visiting the home page, registering a new user, and accessing the dashboard, ensuring your application can handle concurrent traffic efficiently.","authors":["elwafa"],"image":"/img/stress-test-php.png","tags":["laravel","performance-testing","load-testing","volt-test","stress-test"]},"unlisted":false,"nextItem":{"title":"Introducing Volt-Test: Stress & Load Testing for PHP Developers","permalink":"/blog/introducing-volt-test-php-load-testing"}},"content":"In this tutorial, we will explore how to perform stress testing on a Laravel application using the VoltTest PHP SDK. You will learn how to:\\n\\n* Simulate multiple users interacting with your Laravel application.\\n* Test user registration and authentication workflows.\\n* Measure application performance under load.\\n* Extract dynamic values like CSRF tokens during test execution.\\n* Use a CSV file as a data source for testing.\\n* Analyze and optimize performance bottlenecks.\\n\\nBy the end of this guide, you will be able to confidently run automated performance tests to ensure your Laravel app is scalable and resilient.\\n\x3c!-- truncate --\x3e\\n![Stress Testing Laravel Applications with VoltTest](/img/stress-test-php.png)\\n## Prerequisites\\n\\nEnsure you have the following:\\n\\n- A running Laravel application\\n- PHP 8.0 or higher\\n- Composer installed\\n\\n## Installing VoltTest PHP SDK\\n\\nFirst, install the VoltTest PHP SDK via Composer in your Laravel project:\\n\\n```bash title=\\"Terminal\\"\\ncomposer require volt-test/php-sdk\\n```\\nOr clone the repository:\\n\\n```bash title=\\"Terminal\\"\\ngit clone https://github.com/volt-test/php-sdk.git\\ncd php-sdk\\ncomposer install\\n```\\n**For _Windows_ users,** Visit the installation guide [here](https://php.volt-test.com/docs/installation#running-on-windows)\\n\\n## Creating Test Data\\n\\nFor a realistic test, create a CSV file (`users.csv`) with test user data:\\n\\n```csv title=\\"users.csv\\"\\nemail,password\\nuser1@example.com,password123\\nuser2@example.com,password123\\nuser3@example.com,password123\\nuser4@example.com,password123\\nuser5@example.com,password123\\n```\\n\\nPlace this file in your project directory.\\n\\n## Writing the Stress Test\\n\\nCreate a file named `laravel_stress_test.php` in your project root and add the following script (or you can use the laravel\'s command):\\n\\n```php title=\\"laravel_stress_test.php\\"\\n<?php\\n\\nrequire \'vendor/autoload.php\';\\n\\nuse VoltTest\\\\DataSourceConfiguration;\\nuse VoltTest\\\\VoltTest;\\n\\n// Define test\\n$test = new VoltTest(\\n\'Laravel User Flow\',\\n\'Tests home page visit, user registration, and dashboard access\'\\n);\\n\\n// Configure test parameters\\n$test\\n->setVirtualUsers(5)\\n->setDuration(\'60s\') // Optional: Set test duration\\n->setRampUp(\'10s\') // Optional: Set ramp-up time\\n->setHttpDebug(true); // Enable HTTP debug logging for checking requests before sending the all requests\\n\\n// Create test scenario\\n$userFlowScenario = $test->scenario(\'User Registration Flow\')\\n->autoHandleCookies(); // Automatically handle cookies without extract them\\n\\n// Set up data source\\n$userFlowScenario->setDataSourceConfiguration(\\nnew DataSourceConfiguration(__Dir__ . \'/users.csv\', \'unique\', true) // Load data from CSV file, should be the full path\\n);\\n\\n// Step 1: Visit home page\\n$userFlowScenario->step(\'Visit Home Page\')\\n->get(\'http://localhost:8000\')\\n->header(\'Accept\', \'text/html\')\\n->validateStatus(\'home_page_loaded\', 200)\\n->setThinkTime(\'2s\');\\n\\n// Step 2: Visit register page and extract CSRF token\\n$userFlowScenario->step(\'Visit Register Page\')\\n->get(\'http://localhost:8000/register\')\\n->header(\'Accept\', \'text/html\')\\n->extractFromHtml(\'csrf_token\', \'input[name=\\"_token\\"]\', \'value\')\\n->validateStatus(\'register_page_loaded\', 200)\\n->setThinkTime(\'2s\');\\n\\n// Step 3: Submit registration form\\n$userFlowScenario->step(\'Submit Registration\')\\n->post(\\n\'http://localhost:8000/register\',\\n\'_token=${csrf_token}&name=Test User&email=${email}&password=${password}&password_confirmation=${password}\'\\n)\\n->header(\'Content-Type\', \'application/x-www-form-urlencoded\')\\n->validateStatus(\'registration_successful\', 302)\\n->setThinkTime(\'1s\');\\n\\n// Step 4: Access dashboard\\n$userFlowScenario->step(\'Visit Dashboard\')\\n->get(\'http://localhost:8000/dashboard\')\\n->header(\'Accept\', \'text/html\')\\n->validateStatus(\'dashboard_loaded\', 200)\\n->setThinkTime(\'3s\');\\n\\n// Run test\\n$result = $test->run(true); // true enables real-time progress output\\n\\n// Display results summary in case you turned off the real-time progress output\\necho \\"\\\\n\\\\nTest Results Summary:\\\\n\\";\\necho \\"====================\\\\n\\";\\necho \\"Total Requests: \\" . $result->getTotalRequests() . \\"\\\\n\\";\\necho \\"Success Rate: \\" . $result->getSuccessRate() . \\"%\\\\n\\";\\necho \\"Requests/second: \\" . $result->getRequestsPerSecond() . \\"\\\\n\\";\\necho \\"Min Response Time: \\" . $result->getMinResponseTime() . \\"\\\\n\\";\\necho \\"Max Response Time: \\" . $result->getMaxResponseTime() . \\"\\\\n\\";\\necho \\"Avg Response Time: \\" . $result->getAvgResponseTime() . \\"\\\\n\\";\\necho \\"P95 Response Time: \\" . $result->getP95ResponseTime() . \\"\\\\n\\";\\n```\\n\\n### Code Explanation\\nThe stress test script simulates multiple users interacting with a Laravel web application. Here\u2019s how it works:\\n\\n1. **Initialize VoltTest**:\\n```php title=\\"laravel_stress_test.php\\"\\n$test = new VoltTest(\\n\'Laravel User Flow\',\\n\'Tests home page visit, user registration, and dashboard access\'\\n);\\n```\\n    - Creates a new test instance with a descriptive name.\\n\\n2. **Configure test parameters**:\\n```php title=\\"laravel_stress_test.php\\"\\n$test\\n->setVirtualUsers(5)\\n->setDuration(\'60s\')\\n->setRampUp(\'10s\')\\n->setHttpDebug(true);\\n```\\n- **5 virtual users**: Simulate 5 concurrent users.\\n- **Running the test for 60 seconds**: Optional - you can remove this line to run the test and finish when all virtual users finish their scenarios.\\n- **Ramping up over 10 seconds**: Optional - you can remove this line to start all virtual users at the same time.\\n- **Enables HTTP debug logging**: Optional - Inspect requests while sending them.\\n\\n3. **Create a test scenario**:\\n```php title=\\"laravel_stress_test.php\\"\\n$userFlowScenario = $test->scenario(\'User Registration Flow\')\\n->autoHandleCookies();\\n```\\n- Creates a scenario for user registration flow.\\n- **autoHandleCookies()**: Automatically handles cookies without extracting them.\\n\\n4. **Set up data source**:\\n```php title=\\"laravel_stress_test.php\\"\\n$userFlowScenario->setDataSourceConfiguration(\\nnew DataSourceConfiguration(__Dir__ . \'/users.csv\', \'unique\', true)\\n);\\n```\\n- Loads user data from `users.csv` file. To simulate different users for each virtual user.\\n\\n5. **Define test steps**:\\n```php title=\\"laravel_stress_test.php\\"\\n$userFlowScenario->step(\'Visit Home Page\')\\n->get(\'http://localhost:8000\')\\n->header(\'Accept\', \'text/html\')\\n->validateStatus(\'home_page_loaded\', 200)\\n->setThinkTime(\'2s\');\\n```\\n- **Visit Home Page**: Sends a GET request to the home page.\\n- **Accept header**: Optional - Specifies the expected response content type.\\n- **Validate Status**: Optional - Checks if the response status is 200.\\n- **Think Time**: Optional -  Simulates user thinking time before the next step, so the virtual user will wait 2s before execute the next request.\\n\\n6. **Extract CSRF token from registration page**:\\n```php title=\\"laravel_stress_test.php\\"\\n$userFlowScenario->step(\'Visit Register Page\')\\n->get(\'http://localhost:8000/register\')\\n->header(\'Accept\', \'text/html\')\\n->extractFromHtml(\'csrf_token\', \'input[name=\\"_token\\"]\', \'value\')\\n->validateStatus(\'register_page_loaded\', 200)\\n->setThinkTime(\'2s\');\\n```\\n- Visits the registration page.\\n- Extracts the CSRF token from the HTML response. The token is stored in the variable `${csrf_token}`.\\n  - The way to extract the token is by using the `extractFromHtml` method, which takes the token name, the selector, and the attribute name.\\n\\n7. **Submit registration form**:\\n```php title=\\"laravel_stress_test.php\\"\\n$userFlowScenario->step(\'Submit Registration\')\\n->post(\\n\'http://localhost:8000/register\',\\n\'_token=${csrf_token}&name=Test User&email=${email}&password=${password}&password_confirmation=${password}\'\\n)\\n->header(\'Content-Type\', \'application/x-www-form-urlencoded\')\\n->validateStatus(\'registration_successful\', 302)\\n->setThinkTime(\'1s\');\\n```\\n- Submits the registration form with the extracted CSRF token and user data.\\n- Validates the response status code.\\n- Sets a 1-second think time before the next step.\\n- The `${email}` and `${password}` variables are replaced with values from the CSV file.\\n- The `${csrf_token}` variable is replaced with the extracted CSRF token.\\n- The `validateStatus` method checks if the response status is 302 (redirect).\\n- The `setThinkTime` method simulates user thinking time before the next step.\\n\\n8. **Access dashboard**:\\n```php title=\\"laravel_stress_test.php\\"\\n$userFlowScenario->step(\'Visit Dashboard\')\\n->get(\'http://localhost:8000/dashboard\')\\n->header(\'Accept\', \'text/html\')\\n->validateStatus(\'dashboard_loaded\', 200)\\n->setThinkTime(\'3s\');\\n```\\nEnsures successful login by verifying dashboard access.\\n\\n9. **Run the test**:\\n```php title=\\"laravel_stress_test.php\\"\\n$result = $test->run(true);\\n```\\n- Executes the test with real-time progress output.\\n\\n\\n\\n## Running the Test\\n\\nExecute the script:\\n\\n```bash\\nphp laravel_stress_test.php\\n```\\n\\nYou\'ll see real-time progress, followed by a summary of test results.\\n\\n## Analyzing Results\\n\\n### Key Metrics:\\n\\n- **Success Rate**: Should be as close to 100% as possible\\n- **Response Times**: Lower is better\\n- **Requests per Second**: Higher means better scalability\\n\\n## Common Issues & Fixes\\n\\n### Low Success Rate\\n\\n- **Possible Cause**: Server overload\\n- **Solution**: Reduce virtual users or optimize queries\\n\\n### High Response Times\\n\\n- **Possible Cause**: Database bottlenecks\\n- **Solution**: Optimize queries, enable caching\\n\\n### CSRF Token Extraction Fails\\n\\n- **Possible Cause**: HTML structure changes\\n- **Solution**: Update the selector\\n\\n## Next Steps\\n\\n- Expand tests to cover more user flows\\n- Test with more virtual users\\n- Automate stress tests in CI/CD pipelines\\n\\n## Conclusion\\n\\nUsing VoltTest for stress testing helps identify Laravel application bottlenecks before they impact users. Regular testing ensures scalability and reliability.\\n\\nStay tuned for our next guide on **Stress Testing Laravel APIs with VoltTest**!\\n\\nHappy testing!\\n\\n## Get in Touch\\n\\nFor questions, discussions, or contributions, feel free to open an issue or start a discussion on the Volt-Test GitHub repository:\\n[https://github.com/volt-test/php-sdk](https://github.com/volt-test/php-sdk)"},{"id":"introducing-volt-test-php-load-testing","metadata":{"permalink":"/blog/introducing-volt-test-php-load-testing","editUrl":"https://github.com/volt-test/php-sdk-docs/tree/main/blog/2025-02-26-introducing-volt-test-php-load-testing/index.md","source":"@site/blog/2025-02-26-introducing-volt-test-php-load-testing/index.md","title":"Introducing Volt-Test: Stress & Load Testing for PHP Developers","description":"Performance testing is crucial in modern application development, yet many developers skip it due to complex tools that don\u2019t fit into PHP workflows. Today, I\'m excited to introduce VoltTest PHP SDK, a powerful load testing tool with a PHP-native interface backed by Go\'s exceptional performance capabilities.","date":"2025-02-26T00:00:00.000Z","tags":[{"inline":false,"label":"Stress Test","permalink":"/blog/tags/stress-test","description":"Articles related to stress testing applications."},{"inline":false,"label":"Performance Testing","permalink":"/blog/tags/performance-testing","description":"Guides and tools for performance testing."},{"inline":false,"label":"PHP","permalink":"/blog/tags/php","description":"Articles about PHP development."},{"inline":false,"label":"Load Testing","permalink":"/blog/tags/load-testing","description":"Resources for testing application load performance."},{"inline":false,"label":"Volt-Test","permalink":"/blog/tags/volt-test","description":"Guides and tutorials about Volt-Test."}],"readingTime":4.935,"hasTruncateMarker":true,"authors":[{"name":"Islam A-Elwafa","title":"Software Engineer","url":"https://github.com/elwafa","page":{"permalink":"/blog/authors/elwafa"},"socials":{"x":"https://x.com/elwafa90","github":"https://github.com/elwafa"},"imageURL":"https://github.com/elwafa.png","key":"elwafa"}],"frontMatter":{"slug":"introducing-volt-test-php-load-testing","title":"Introducing Volt-Test: Stress & Load Testing for PHP Developers","authors":["elwafa"],"tags":["stress-test","performance-testing","php","load-testing","volt-test"],"image":"/img/volt-test-performance.png"},"unlisted":false,"prevItem":{"title":"Stress Testing Laravel Applications with VoltTest (Web UI Flow)","permalink":"/blog/stress-testing-laravel-with-volt-test-web-ui"}},"content":"Performance testing is crucial in modern application development, yet many developers skip it due to complex tools that don\u2019t fit into PHP workflows. Today, I\'m excited to introduce **VoltTest PHP SDK**, a powerful load testing tool with a PHP-native interface backed by Go\'s exceptional performance capabilities.\\n\x3c!-- truncate --\x3e\\n\\n## Problem\\n\\nAs a PHP developer, I\u2019ve often faced a common challenge: existing performance testing tools often require learning a new language, platform, or configuration syntax. This cognitive overhead leads many teams to defer proper load testing or rely on third-party services, creating additional costs and dependencies.\\n\\nVoltTest bridges this gap by providing:\\n\\n- A **fluent, intuitive PHP API** that feels natural to PHP developers\\n- The **raw power of Go** for generating heavy loads with minimal resources\\n- **No additional infrastructure** requirements beyond your existing PHP environment\\n- **Comprehensive metrics** to identify bottlenecks and performance issues\\n\\n## How VoltTest Works: PHP Interface, Go Engine\\n\\nVoltTest employs a unique dual-language architecture that delivers the best of both worlds:\\n\\n1. Your **PHP code** defines test scenarios, configurations, and validation rules\\n2. The **SDK** transforms these definitions into a format the Go engine understands\\n3. The **Go engine** executes the actual load testing with true concurrency\\n4. **Results** are streamed back to your PHP application for analysis\\n\\nThis architecture allows you to write and maintain tests in familiar PHP syntax while benefiting from Go\'s exceptional performance characteristics for the load generation.\\n\\n## Key Features\\n\\n- **Fluent API**: Natural, chainable PHP methods for defining test scenarios\\n- **Multi-scenario support**: Test different user flows with configurable weight distribution\\n- **Variable extraction**: Capture and reuse values from responses (cookies, headers, JSON paths and HTML)\\n- **Data-driven testing**: Feed tests with CSV files to simulate realistic user data\\n- **Detailed metrics**: Get comprehensive performance insights including response times, throughput, and error rates\\n\\n## Getting Started with VoltTest\\n\\nLet\'s create a simple performance test to demonstrate VoltTest\'s capabilities:\\n\\n```php\\n<?php\\n\\nuse VoltTest\\\\VoltTest;\\n\\n// Create a new test\\n$test = new VoltTest(\\n    \'API Performance Test\',\\n    \'Tests our REST API under load\'\\n);\\n\\n// Configure test parameters\\n$test\\n    ->setVirtualUsers(50)      // Number of concurrent users\\n    ->setDuration(\'30s\')       // Test duration\\n    ->setRampUp(\'5s\')          // Gradually ramp up to full load\\n    ->setHttpDebug(false);     // Disable HTTP debug output\\n\\n// Create a test scenario\\n$apiScenario = $test->scenario(\'API Flow\')\\n    ->setWeight(100);           // Full weight (100%) to this scenario\\n\\n// Define the first step - Get auth token\\n$apiScenario->step(\'Get Token\')\\n    ->post(\'https://api.example.com/auth\', \'{\\"username\\":\\"test\\",\\"password\\":\\"test123\\"}\')\\n    ->header(\'Content-Type\', \'application/json\')\\n    ->extractFromJson(\'token\', \'data.token\')  // Extract token from response\\n    ->validateStatus(\'success\', 200);\\n\\n// Define the second step - Use the token\\n$apiScenario->step(\'Get User Data\')\\n    ->get(\'https://api.example.com/users/me\')\\n    ->header(\'Authorization\', \'Bearer ${token}\')  // Use extracted token\\n    ->validateStatus(\'success\', 200);\\n\\n// Run the test\\n$result = $test->run(true);  // true enables real-time progress output\\n\\n// Display results\\necho \\"Success Rate: \\" . $result->getSuccessRate() . \\"%\\\\n\\";\\necho \\"Requests/sec: \\" . $result->getRequestsPerSecond() . \\"\\\\n\\";\\necho \\"Avg Response: \\" . $result->getAvgResponseTime() . \\"\\\\n\\";\\necho \\"P95 Response: \\" . $result->getP95ResponseTime() . \\"\\\\n\\";\\n```\\n\\n## Advanced Features: Testing with Real-World Data\\n\\nVoltTest supports data-driven testing with CSV files, allowing you to simulate diverse user behaviors:\\n\\n```php\\n// users.csv contains columns: email,password,user_id\\n$loginScenario->setDataSourceConfiguration(\\n    new DataSourceConfiguration(\'users.csv\', \'random\', true)\\n);\\n\\n// Now you can reference CSV columns in your requests\\n$loginScenario->step(\'Login\')\\n    ->post(\'https://example.com/login\', \\n           \'email=${email}&password=${password}\')  // Variables from CSV\\n    ->validateStatus(\'success\', 200);\\n```\\n\\n## Extracting and Using Dynamic Values\\n\\nOne of VoltTest\'s most powerful features is its ability to extract and reuse values from responses:\\n\\n```php\\n// Extract CSRF token from HTML response\\n$scenario->step(\'Get Login Page\')\\n    ->get(\'https://example.com/login\')\\n    ->extractFromHtml(\'csrf_token\', \'input[name=\\"_token\\"]\', \'value\')\\n    ->validateStatus(\'success\', 200);\\n\\n// Use the extracted token in the next request\\n$scenario->step(\'Submit Login\')\\n    ->post(\'https://example.com/login\',\\n           \'_token=${csrf_token}&email=user@example.com&password=secret\')\\n    ->validateStatus(\'success\', 302);  // Expecting a redirect\\n```\\n\\n## Understanding Your Results\\n\\nVoltTest provides comprehensive metrics to analyze performance:\\n\\n```php\\n$result = $test->run();\\n\\n// Access detailed metrics\\necho \\"Test duration: \\" . $result->getDuration() . \\"\\\\n\\";\\necho \\"Total requests: \\" . $result->getTotalRequests() . \\"\\\\n\\";\\necho \\"Success rate: \\" . $result->getSuccessRate() . \\"%\\\\n\\";\\necho \\"Requests/second: \\" . $result->getRequestsPerSecond() . \\"\\\\n\\";\\necho \\"Min response time: \\" . $result->getMinResponseTime() . \\"\\\\n\\";\\necho \\"Max response time: \\" . $result->getMaxResponseTime() . \\"\\\\n\\";\\necho \\"Avg response time: \\" . $result->getAvgResponseTime() . \\"\\\\n\\";\\necho \\"Median response time: \\" . $result->getMedianResponseTime() . \\"\\\\n\\";\\necho \\"P95 response time: \\" . $result->getP95ResponseTime() . \\"\\\\n\\";\\necho \\"P99 response time: \\" . $result->getP99ResponseTime() . \\"\\\\n\\";\\n```\\n\\n## Why VoltTest Created\\n\\nAs PHP developers, I\u2019ve often found performance testing to be a challenge. Existing tools like JMeter, Gatling or Locust are powerful but require learning new syntax, languages or complex GUIs. We wanted a tool that would:\\n\\n1. **Feel native to PHP developers** with an intuitive, fluent API\\n2. **Handle serious load testing** without requiring huge resources\\n3. **Integrate seamlessly** with PHP codebases and workflows\\n4. **Provide comprehensive metrics** with minimal configuration\\n\\nVoltTest achieves this through a unique architecture that lets you write your tests in familiar PHP syntax while leveraging Go\'s exceptional performance capabilities for the actual load generation.\\n\\n## What Makes VoltTest Different?\\n\\nUnlike traditional PHP-based testing tools that struggle with concurrency limitations, VoltTest uses a high-performance Go engine that runs behind the scenes. This gives you:\\n\\n- **True concurrent users** instead of PHP\'s process-based concurrency\\n- **Minimal resource usage** even when simulating thousands of users\\n- **Accurate timing and metrics** collection for detailed analysis\\n\\nVoltTest brings modern stress testing to PHP with an intuitive API and high-performance Go engine. No new languages, no complex setup\u2014just performance insights when you need them.\\n\\n## Conclusion\\n\\nVoltTest PHP SDK brings enterprise-grade performance testing capabilities to PHP developers with a familiar, easy-to-use API. By combining PHP\'s developer-friendly syntax with Go\'s raw performance power, VoltTest enables teams to integrate load testing directly into their development workflows without additional infrastructure or expertise.\\n\\nWhether you\'re building APIs, websites, or complex applications, VoltTest gives you the tools to ensure your PHP applications can handle real-world traffic with confidence.\\n\\n## Getting Started\\n\\n\ud83d\udca1 Ready to test your PHP app\u2019s performance? Try Volt-Test today! \ud83d\ude80\\n\\n```bash\\ncomposer require volt-test/php-sdk\\n```\\n\\nFor more examples and detailed documentation, visit [Examples Page in docs](https://php.volt-test.com/docs/category/examples)."}]}}')}}]);