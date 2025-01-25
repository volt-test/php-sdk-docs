"use strict";(self.webpackChunkphp_sdk_docs=self.webpackChunkphp_sdk_docs||[]).push([[7924],{7161:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"getting-started","title":"Getting Started","description":"After installing the Volt-Test SDK, you can start writing performance tests for your PHP applications.","source":"@site/docs/getting-started.md","sourceDirName":".","slug":"/getting-started","permalink":"/docs/getting-started","draft":false,"unlisted":false,"editUrl":"https://github.com/volt-test/php-sdk-docs/tree/main/packages/create-docusaurus/templates/shared/docs/getting-started.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"id":"getting-started","title":"Getting Started","sidebar_label":"Getting Started","sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Installation","permalink":"/docs/installation"},"next":{"title":"Core Concepts and Architecture","permalink":"/docs/Core Concepts and Architecture"}}');var r=s(4848),i=s(8453);const a={id:"getting-started",title:"Getting Started",sidebar_label:"Getting Started",sidebar_position:3},o="Getting Started",l={},c=[{value:"Basic Usage",id:"basic-usage",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"getting-started",children:"Getting Started"})}),"\n",(0,r.jsx)(t.p,{children:"After installing the Volt-Test SDK, you can start writing performance tests for your PHP applications.\nThis guide will help you get started with the basics of Volt-Test and show you how to create and run your first performance test."}),"\n",(0,r.jsxs)(t.p,{children:["You can install the Volt-Test SDK Here: ",(0,r.jsx)(t.a,{href:"/docs/installation",children:"Volt-Test SDK"})]}),"\n",(0,r.jsx)(t.h2,{id:"basic-usage",children:"Basic Usage"}),"\n",(0,r.jsx)(t.p,{children:"Here's a minimal example to get started:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",metastring:'title="example.php"',children:"<?php\nrequire 'vendor/autoload.php';\nuse VoltTest\\VoltTest;\n// Create a new instance of the VoltTest class\n$voltTest = new VoltTest('Name of Your test');\n// Create a new scenario\n$scenario = $voltTest->scenario('Basic Scenario');\n// Add a step to the scenario\n$scenario->step('Register')\n    ->get('https://google.com')\n    ->header('Content-Type', 'text/html');\n// Run the test\n$result = $voltTest->run();\n// Echo the result\necho $result->getRawOutput();\n"})}),"\n",(0,r.jsx)(t.p,{children:"Then run the script using the following command in your terminal:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",metastring:'title="Run the script"',children:"php example.php\n"})}),"\n",(0,r.jsx)(t.p,{children:"The Output will be something like this:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",metastring:'title="Output"',children:"Test Metrics Summary:\n===================\nDuration:     254.804339ms\nTotal Reqs:   1\nSuccess Rate: 100.00%\nReq/sec:      3.93\nSuccess Requests: 1\nFailed Requests: 0\n\nResponse Time:\n------------\nMin:    252.587118ms\nMax:    252.587118ms\nAvg:    252.587118ms\nMedian: 252.587118ms\nP95:    252.587118ms\nP99:    252.587118ms\n"})}),"\n",(0,r.jsx)(t.p,{children:"This is just a simple example to get started with Volt-Test. The metrics summary provides insights into the request's performance, including response time distribution and success rate. You can create more complex scenarios, simulate concurrent requests, and monitor real-time results to stress-test your application under different loads."}),"\n",(0,r.jsx)(t.p,{children:"With Volt-Test, you can:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Easily define multiple steps in a scenario."}),"\n",(0,r.jsx)(t.li,{children:"Add headers, parameters, or custom data for each request."}),"\n",(0,r.jsx)(t.li,{children:"Measure critical performance metrics like request rates, latency percentiles, and throughput."}),"\n",(0,r.jsx)(t.li,{children:"Use the raw output for further analysis or logging."}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"Start writing and testing your performance scenarios today!"})]})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>a,x:()=>o});var n=s(6540);const r={},i=n.createContext(r);function a(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);