"use strict";(self.webpackChunkphp_sdk_docs=self.webpackChunkphp_sdk_docs||[]).push([[469],{725:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"Examples/html-form-examples","title":"HTML Form Examples","description":"Here are some examples of testing HTML forms using VoltTest PHP SDK.","source":"@site/docs/Examples/html_form_examples.md","sourceDirName":"Examples","slug":"/Examples/html-form-examples","permalink":"/docs/Examples/html-form-examples","draft":false,"unlisted":false,"editUrl":"https://github.com/volt-test/php-sdk-docs/tree/main/docs/Examples/html_form_examples.md","tags":[],"version":"current","sidebarPosition":0,"frontMatter":{"sidebar_label":"HTML Form Examples","sidebar_position":0,"id":"html-form-examples","title":"HTML Form Examples"},"sidebar":"tutorialSidebar","previous":{"title":"Examples","permalink":"/docs/category/examples"},"next":{"title":"JSON API Examples","permalink":"/docs/Examples/JSON-API-Examples"}}');var a=n(4848),i=n(8453);const o={sidebar_label:"HTML Form Examples",sidebar_position:0,id:"html-form-examples",title:"HTML Form Examples"},r="HTML Form Examples",l={},d=[{value:"Login Form Testing",id:"login-form-testing",level:2},{value:"Registration Form Example",id:"registration-form-example",level:2},{value:"Multi-Step Form Example",id:"multi-step-form-example",level:2},{value:"Data-Driven Form Testing",id:"data-driven-form-testing",level:2},{value:"Form Validation Testing",id:"form-validation-testing",level:2}];function m(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"html-form-examples",children:"HTML Form Examples"})}),"\n",(0,a.jsx)(t.p,{children:"Here are some examples of testing HTML forms using VoltTest PHP SDK."}),"\n",(0,a.jsx)(t.p,{children:"Ex:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"#login-form-testing",children:"Login Form Testing"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Login form testing with CSRF token extraction"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"#registration-form-example",children:"Registration Form Example"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Registration form testing with CSRF token extraction"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"#multi-step-form-example",children:"Multi-Step Form Example"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Multi-step form testing with session management"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"#data-driven-form-testing",children:"Data-Driven Form Testing"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Use CSV file as data source"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"#form-validation-testing",children:"Form Validation Testing"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Test form validation with different scenarios"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"login-form-testing",children:"Login Form Testing"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"$test = new VoltTest('Login Form Test');\n$test->setVirtualUsers(10);\n$scenario = $test->scenario('Login Form Test');\n\n// Get login page and extract CSRF token\n$scenario->step('Get Login Page')\n    ->get('https://example.com/login')\n    ->extractFromHtml('csrf_token', 'input[name=\"_token\"]', 'value')\n    ->validateStatus('page_load', 200);\n\n// Submit login form\n$scenario->step('Submit Login')\n    ->post('https://example.com/login', '_token=${csrf_token}&email=user@example.com&password=secret')\n    ->header('Content-Type', 'application/x-www-form-urlencoded')\n    ->validateStatus('login_success', 302);\n    \n// Run the test and get the result\n$result = $test->run();\n"})}),"\n",(0,a.jsx)(t.p,{children:'In the example above, we create a new test named "Login Form Test" and set the number of virtual users to 10. We then create a scenario named "Login Form Test" and add two steps to it. The first step gets the login page, extracts the CSRF token, and validates the page load status. The second step submits the login form with the CSRF token, email, and password, and validates the login success status.'}),"\n",(0,a.jsx)(t.h2,{id:"registration-form-example",children:"Registration Form Example"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"$test = new VoltTest('Registration Form');\n$test->setVirtualUsers(100);\n$test->setDuration('5s');\n\n$scenario = $test->scenario('Registration Form');\n\n// Load registration page\n$scenario->step('Load Register Page')\n    ->get('https://example.com/register')\n    ->extractFromHtml('csrf_token', 'input[name=\"_token\"]', 'value')\n    ->validateStatus('page_load', 200);\n\n// Submit registration with form data\n$scenario->step('Submit Registration')\n    ->post('https://example.com/register', '_token=${csrf_token}&name=${name}&email=${email}&password=${password}&password_confirmation=${password}')\n    ->header('Content-Type', 'application/x-www-form-urlencoded')\n    ->validateStatus('registration_success', 302);\n\n\n// Run the test and get the result\n$result = $test->run();\n\n"})}),"\n",(0,a.jsx)(t.p,{children:'In the example above, we create a new test named "Registration Form" and\nset the number of virtual users to 100 and the test duration to 5 seconds.\nWe then create a scenario named "Registration Form" and add two steps to it.\nThe first step loads the registration page, extracts the CSRF token,\nand validates the page load status. The second step submits the registration form\nwith the CSRF token, name, email, password, and password confirmation,\nand validates the registration success status.'}),"\n",(0,a.jsx)(t.h2,{id:"multi-step-form-example",children:"Multi-Step Form Example"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"$test = new VoltTest('Multi-Step Form');\n$test->setVirtualUsers(50);\n\n$scenario = $test->scenario('Multi-Step Form');\n\n// Step 1: Personal Info\n$scenario->step('Personal Info')\n    ->get('https://example.com/form/step1')\n    ->extractFromHtml('form_token', 'input[name=\"_token\"]', 'value')\n    ->validateStatus('step1_load', 200);\n\n$scenario->step('Submit Step 1')\n    ->post('https://example.com/form/step1',''form_token=${form_token}&name=${name}&email=${email}'')\n    ->header('Content-Type', 'application/x-www-form-urlencoded')\n    ->validateStatus('step1_success', 302)\n    ->extractFromCookie('session_id', 'session_id');\n\n// Step 2: Address Info\n$scenario->step('Address Info')\n    ->get('https://example.com/form/step2')\n    ->header('Cookie', 'session_id=${session_id}')\n    ->validateStatus('step2_load', 200);\n\n$scenario->step('Submit Step 2')\n    ->post('https://example.com/form/step2', 'address=${address}&city=${city}&country=${country}')\n    ->header('Cookie', 'session_id=${session_id}')\n    ->validateStatus('step2_success', 302);\n\n// Run the test and get the result\n$result = $test->run(); \n"})}),"\n",(0,a.jsx)(t.p,{children:'In the example above, we create a new test named "Multi-Step Form" and set the number of virtual users to 50. We then create a scenario named "Multi-Step Form" and add four steps to it. The first two steps handle the personal info form, and the last two steps handle the address info form. Each step extracts data from the response and validates the status of the form submission.'}),"\n",(0,a.jsx)(t.h2,{id:"data-driven-form-testing",children:"Data-Driven Form Testing"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"$test = new VoltTest('Data-Driven Form Test');\n$test->setVirtualUsers(10);\n\n// Configure data source\n$dataConfig = new DataSourceConfiguration(\n    __DIR__ .'/test_users.csv',    // CSV with test data actual file path\n    'sequential',         // Sequential selection\n    true                 // Has header row\n);\n\n$scenario = $test->scenario('Registration Test')\n    ->setDataSourceConfiguration($dataConfig);\n\n// Registration process using data from CSV\n$scenario->step('Submit Registration')\n    ->post('https://example.com/register','name=${name}&email=${email}&phone=${phone}')\n    ->header('Content-Type', 'application/x-www-form-urlencoded')\n    ->validateStatus('registration_success', 200);\n    \n// Run the test and get the result\n$result = $test->run();\n"})}),"\n",(0,a.jsx)(t.admonition,{type:"info",children:(0,a.jsx)(t.p,{children:"The CSV file should have columns for name, email, and phone with corresponding values for each test case."})}),"\n",(0,a.jsx)(t.p,{children:'Data source configuration is used to provide test data for data-driven testing. In the example above, we create a new test named "Data-Driven Form Test" and set the number of virtual users to 10. We then configure a data source using a CSV file with test data and set it to sequential selection. We create a scenario named "Registration Test" and set the data source configuration. The scenario step submits the registration form using data from the CSV file and validates the registration success status.'}),"\n",(0,a.jsx)(t.h2,{id:"form-validation-testing",children:"Form Validation Testing"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"$scenario = $test->scenario('Form Validation');\n\n// Test required fields\n$scenario->step('Submit Empty Form')\n    ->post('https://example.com/submit','')\n    ->header('Content-Type', 'application/x-www-form-urlencoded')\n    ->validateStatus('validation_error', 422);\n\n// Test invalid email\n$scenario->step('Submit Invalid Email')\n    ->post('https://example.com/submit','email=invalid-email')\n    ->header('Content-Type', 'application/x-www-form-urlencoded')\n    ->validateStatus('validation_error', 422);\n\n// Test password mismatch\n$scenario->step('Password Mismatch')\n    ->post('https://example.com/submit','password=test123&password_confirmation=test456')\n    ->header('Content-Type', 'application/x-www-form-urlencoded')\n    ->validateStatus('validation_error', 422);\n"})}),"\n",(0,a.jsx)(t.p,{children:'In the example above, we create a new scenario named "Form Validation" and add three steps to it. Each step submits a form with different validation errors and validates the status code to ensure proper form validation handling.'})]})}function p(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>r});var s=n(6540);const a={},i=s.createContext(a);function o(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);