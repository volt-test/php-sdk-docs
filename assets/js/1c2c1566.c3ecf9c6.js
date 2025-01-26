"use strict";(self.webpackChunkphp_sdk_docs=self.webpackChunkphp_sdk_docs||[]).push([[920],{8405:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>u,frontMatter:()=>c,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"Core Concepts and Architecture","title":"Core Concepts and Architecture","description":"Introduction","source":"@site/docs/core-concepts-and-architecture.md","sourceDirName":".","slug":"/Core Concepts and Architecture","permalink":"/docs/Core Concepts and Architecture","draft":false,"unlisted":false,"editUrl":"https://github.com/volt-test/php-sdk-docs/tree/main/docs/core-concepts-and-architecture.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"id":"Core Concepts and Architecture","title":"Core Concepts and Architecture","sidebar_label":"Core Concepts and Architecture","sidebar_position":4},"sidebar":"tutorialSidebar","previous":{"title":"Getting Started","permalink":"/docs/getting-started"},"next":{"title":"Volt Test Configuration","permalink":"/docs/VoltTest Configuration"}}');var i=n(4848),s=n(8453);const c={id:"Core Concepts and Architecture",title:"Core Concepts and Architecture",sidebar_label:"Core Concepts and Architecture",sidebar_position:4},o="Core Concepts and Architecture",a={},l=[{value:"Introduction",id:"introduction",level:2},{value:"Architecture",id:"architecture",level:2},{value:"Core Concepts",id:"core-concepts",level:2},{value:"Test",id:"test",level:3},{value:"Scenario",id:"scenario",level:3},{value:"Step",id:"step",level:3},{value:"Result",id:"result",level:3}];function d(e){const t={h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"core-concepts-and-architecture",children:"Core Concepts and Architecture"})}),"\n",(0,i.jsx)(t.h2,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsx)(t.p,{children:"VoltTest is a powerful, easy-to-use performance testing SDK for PHP applications.\nPowered by a high-performance Golang engine running behind the scenes,\nit combines the ease of use of PHP with the raw power and concurrency capabilities of Go.\nThis unique architecture enables you to create, run, and analyze performance tests with a fluent,\nintuitive API while leveraging Go's superior performance characteristics for the actual load generation."}),"\n",(0,i.jsx)(t.h2,{id:"architecture",children:"Architecture"}),"\n",(0,i.jsx)(t.p,{children:"VoltTest PHP SDK works as a bridge between your PHP application and the VoltTest Engine (written in Go). When you run a test:"}),"\n",(0,i.jsx)(t.p,{children:"Your PHP code defines the test scenarios and configurations\nThe SDK transforms these into a format the Go engine understands\nThe Go engine executes the actual load testing Results are streamed back to your PHP application for analysis"}),"\n",(0,i.jsx)(t.p,{children:"This architecture provides several benefits:"}),"\n",(0,i.jsx)(t.p,{children:"Write tests in PHP while getting Go's performance benefits True parallel execution of virtual users\nMinimal resource footprint during test execution Accurate timing and metrics collection"}),"\n",(0,i.jsx)(t.h2,{id:"core-concepts",children:"Core Concepts"}),"\n",(0,i.jsx)(t.h3,{id:"test",children:"Test"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"A test represents a complete performance testing session. It contains:"}),"\n",(0,i.jsx)(t.li,{children:"Configuration settings (virtual users, duration, etc.)"}),"\n",(0,i.jsx)(t.li,{children:"One or more scenarios"}),"\n",(0,i.jsx)(t.li,{children:"Global settings like HTTP debugging"}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"scenario",children:"Scenario"}),"\n",(0,i.jsx)(t.p,{children:"A scenario represents a sequence of steps that virtual users will execute. Features:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Independent flow of HTTP requests"}),"\n",(0,i.jsx)(t.li,{children:"Cookie handling"}),"\n",(0,i.jsx)(t.li,{children:"Data extraction and reuse"}),"\n",(0,i.jsx)(t.li,{children:"Custom think time"}),"\n",(0,i.jsx)(t.li,{children:"Weight-based execution distribution"}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"step",children:"Step"}),"\n",(0,i.jsx)(t.p,{children:"A step represents a single HTTP request within a scenario. Features:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"HTTP method (GET, POST, etc.)"}),"\n",(0,i.jsx)(t.li,{children:"URL"}),"\n",(0,i.jsx)(t.li,{children:"Headers and body"}),"\n",(0,i.jsx)(t.li,{children:"Validation"}),"\n",(0,i.jsx)(t.li,{children:"Data extraction"}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"result",children:"Result"}),"\n",(0,i.jsx)(t.p,{children:"A result represents the outcome of a test run. It contains:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Metrics like response time, throughput, and success rate"}),"\n",(0,i.jsx)(t.li,{children:"Raw output for debugging"}),"\n",(0,i.jsx)(t.li,{children:"Error messages"}),"\n",(0,i.jsx)(t.li,{children:"min, max, med, p90, p95, p99"}),"\n",(0,i.jsx)(t.li,{children:"Print all the metrics"}),"\n"]})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>o});var r=n(6540);const i={},s=r.createContext(i);function c(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);