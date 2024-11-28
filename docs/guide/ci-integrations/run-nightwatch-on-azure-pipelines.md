---
title: Run Nightwatch tests on Azure Pipelines
description: Learn how to run Nightwatch tests on Azure Pipelines
---

<div class="page-header"><h1>Run Nightwatch tests on Azure Pipelines</h1></div>

### Overview

Azure Pipelines is a mature and powerful tool meant for enterprises. It enables you to create workflows that automatically build, test, publish, release, and deploy code, allowing you to give complete traceability of the software development lifecycle.

In this article we will learn how to quickly build up test automation using the NightwatchJS testing library and integrate it into the Azure DevOps pipelines flow.

### Prerequisites
- Working project to test that has been pushed to Github
- Tests run properly in your local system

### Setup Guide
In this example we will be learning how to run Nightwatch tests using Azure Pipelines using the [nightwatch-examples](https://github.com/nightwatchjs/nightwatch-examples) Github repo


#### Step 1: Create a New Pipeline 
To create a new pipeline in Azure DevOps you have to navigate to Azure DevOps from your ***Azure DevOps home page***, then hover on ***Pipelines*** and Click on Pipelines

<img width="1266"  src="https://user-images.githubusercontent.com/94462364/184715997-e6866aa5-adec-4a5a-9d9b-d2eb670dd06c.png">


And then click on the new pipeline as shown in the below image

<img width="1266" src="https://user-images.githubusercontent.com/94462364/184716203-0a94bd5d-05a3-4cf2-918b-91748ff6955f.png">


#### Step 2: Link your repository
Choose your repository management system where your project resides.

<img width="1266" src="https://user-images.githubusercontent.com/94462364/184716322-57797f37-03e7-4e06-be45-7ae42cb1cc4a.png">

And then select your repository from the list

<img width="1266" src="https://user-images.githubusercontent.com/94462364/184716429-3aa4b6c0-a8eb-47a7-9946-b891739a54a6.png">

#### Step 3 : Select NodeJS plugin
You need to click on Node.js in order to configure its plugin. This will provide an environment to run the tests.

<img width="1266" src="https://user-images.githubusercontent.com/94462364/184716582-412e8bff-e765-4a67-a789-ee68be41dacc.png">

#### Step 4 : Configure azure-pipelines.yml file
Now you have to review and write the steps inside the azure-pipelines.yml file to run your tests. 

<pre class="nocode-space"><code class="yml"># Node.js
# Build a general Node.js project with npm.
# Add steps that analyze code, save build artifacts, deploy, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/javascript

trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '10.x'
  displayName: 'Install Node.js'

- script: |
    npm install
  displayName: 'npm install'

- script: |
    sudo apt-get install xvfb

- script: xvfb-run --auto-servernum npm test -- --env chrome
  displayName: 'Run tests'</code></pre>


#### Step 3: Push azure-pipelines.yml file and Run the tests
After editing and reviewing the .yml file you should click on the `save and run` button 

![yaml-file-setup](https://user-images.githubusercontent.com/94462364/184717879-8207a53c-b39c-4b0f-af8d-4425102e41a0.png)


Then click `save and run` button to commit .yml file after filling out the form accordingly.  

<img width="1266" src="https://user-images.githubusercontent.com/94462364/184718444-efc1dc1e-a431-4063-af8b-8b8a522d0003.png">

Once you push your changes and click on save and run button, the pipeline will start and your tests will run automatically. 

**Note:** ***After saving and running, you may encounter an error stating that no hosted parallelism has been purchased or granted. Please fill out the [form](https://aka.ms/azpipelines-parallelism-request) to request a free parallelism grant.***

 
Related articles
- [How-to guides > Write tests > Run on CI Servers > Jenkins ](/guide/ci-integrations/run-nightwatch-on-jenkins.html)

<div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/ci-integrations/run-nightwatch-on-bamboo.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Bamboo</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/ci-integrations/run-nightwatch-on-circleci.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">CircleCI</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
