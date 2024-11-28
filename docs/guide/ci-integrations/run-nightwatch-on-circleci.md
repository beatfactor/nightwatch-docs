---
title: Run Nightwatch tests on CircleCI
description: Learn how to run Nightwatch tests on CircleCI
---

<div class="page-header"><h1>Run Nightwatch tests on CircleCI</h1></div>

In this article, you will learn how to create and run Nightwatch tests on CircleCI

### Overview

CircleCI is a CI/CD platform that can be used to create an automated testing pipeline. CircleCI can be used to execute tests on the same instances or on cloud-service providers such as BrowserStack & Sauce Labs.

### Prerequisites
- CircleCI account
- Nightwatch project uploaded to Git


### Setup Guide
We will be taking the [nightwatch-examples](https://github.com/nightwatchjs/nightwatch-examples) repo for demonstration. Now, let's configure CI by following the procedures below :


#### Step 1:  Setup CircleCI Project

Once you connect your CircleCI account to Github and you click on "Projects" in the left menu, you will see the list of repositories from Github.

Click on "Setup Project" besides your test repository

Once the `Config.yml` dialog opens, select the option "Take me to a config.yml template that I can edit" as shown below

![CircleCI config file](https://user-images.githubusercontent.com/1677755/189828701-e0aff507-c61f-4e58-ad28-efdc99dea61f.png)


In the next screen, select `Node` from the list

#### Step 2 : Update the config.yml file, commit and run the pipeline
Now you will view the config.yml file that you can edit. Copy the below file contents into the file

<pre class="nocode-space"><code class="yml"># This config is equivalent to both the '.circleci/extended/orb-free.yml' and the base '.circleci/config.yml'
version: 2.1

# Orbs are reusable packages of CircleCI configuration that you may share across projects, enabling you to create encapsulated, parameterized commands, jobs, and executors that can be used across multiple projects.
# See: https://circleci.com/docs/2.0/orb-intro/
orbs:
  node: circleci/node@4.7
  browser-tools: circleci/browser-tools@1.1.0
jobs:
  test:
    docker:
      - image: cimg/node:lts-browsers
    steps:
      - checkout
      - browser-tools/install-browser-tools
      - node/install-packages
      - run:
          command: npm run test
      - store_test_results:
          path: /tests_output
workflows:
  e2e-test:
    jobs:
      - test
</code></pre>

Once you have copied the config.yml file, press on `Commit and Run`

Let's try to understand the key highlights of the config file: -
1. We are using 2 orbs, Node & Browser tools, that are required for the Nightwatch setup
2. We are using a docker image that has browsers pre-installed
3. Under steps, we are checking out the branch followed by installing the browser tools 
4. In the next step, all packages from package.json are installed that includes `Nightwatch`, driver packages and other required packages
5. Once the setup is done, the pipeline will trigger the tests

#### Step 3 : View the results

Click on the pipeline build that just ran followed by the job name i.e. `test`. Under the `Steps` tab refer to the `npm run test` step to view the test output.

![Circle CI Results](https://user-images.githubusercontent.com/1677755/189831161-c08ee3e0-e1ce-4e92-90be-92c1ab61e02b.png)


### Related articles
- [How-to guides > Write tests > Run on CI Servers > Jenkins ](/guide/ci-integrations/run-nightwatch-on-jenkins.html)

<div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/ci-integrations/run-nightwatch-on-azure-pipelines.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Azure Pipelines</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/network-requests/capture-network-calls.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Capture network calls</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
