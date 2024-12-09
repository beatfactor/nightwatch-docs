---
title: Run Nightwatch tests on Jenkins
description: Learn how to run Nightwatch tests on Jenkins
---

<div class="page-header"><h1>Run Nightwatch tests on Jenkins</h1></div>

In this article, you will learn how to create and run Nightwatch tests on Jenkins

### Overview

Jenkins is a long-term industry standard for continuous integration. Jenkins can be used to execute tests on the same instances or on cloud-service providers such as BrowserStack. You can also review the results post the execution of  the tests. 

### Prerequisites
1. Installed Jenkins instance
2. Nightwatch tests uploaded on Git

### Run on Jenkins instance

Steps:

<p><strong>1.</strong> Choose "Freestyle project" and name the project according to your project</p>

![Jenkins project setup](https://user-images.githubusercontent.com/1677755/177561718-3d9742e8-dcdc-4430-9b48-ca2eeb054023.png)

<p><strong>2.</strong> Setup source code management to fetch tests from the git repository to fetch the latest test version.</p> 

<p>Make sure the git branch is mentioned correctly. You can find the source code management settings under "Configure->General".</p>

![Jenkins GIT repository setup](https://user-images.githubusercontent.com/1677755/177564242-f5d2161b-a7f8-4be9-9923-7e12cfce645b.png)

<br><strong>3.</strong> Setup Node plugin by going to `dashboard -> Manage Jenkins -> Plugin Manager`, searching for `NodeJS Plugin` and installing it.

Jenkins executes the pipeline in a blank shell instance. In order to use `npm` commands, the NodeJS plugin would have to be installed.

![Jenkins NodeJS Plugin](https://user-images.githubusercontent.com/1677755/177565528-0d97bcf8-307d-412f-9b5f-8b091f32680f.png)

<br><strong>4.</strong> Setup the pipeline to use the NodeJS plugin by select the Node JS option under `Build Environment`.

![Jenkins NodeJS Plugin](https://user-images.githubusercontent.com/1677755/177566306-ff7eb83b-021e-4325-8746-1f6da9fbb058.png)

<br><strong>5.</strong> Add an `Execute shell` build step along with following commands.

<pre><code class="language-bash">npm install
npm test</code></pre>

![Jenkins Nightwatch Execute Tests](https://user-images.githubusercontent.com/1677755/177566752-6fd5e4d0-96a8-47f7-bd93-3cc7c597d4ba.png)

Your build is ready to be triggered. When you build this job, you will notice that your tests are running on the Jenkins instance.

### Run on Cloud Service Providers from Jenkins

#### Run on BrowserStack

In order to run your tests on BrowserStack from Jenkins, setup the environment variables by going to "Manage Jenkins-> Configure System -> Environment Variables"

Setup the following 2 environment variables


<pre >
<code class="language-javascript">
BROWSERSTACK_USERNAME
BROWSERSTACK_ACCESS_KEY
</code>
</pre>


![Jenkins BrowserStack](https://user-images.githubusercontent.com/1677755/177569029-da96b37d-6377-404f-9562-315d0694997d.png)

The setup is done. You can execute the tests by updating the test exection shell command in the build steps

<pre><code class="language-bash">npm test -- --env browserstack</code></pre>

Once you build, the tests will be executed on BrowserStack.

### View JUnit XML reports
Nightwatch publishes XML reports after test-run the same can be used in Jenkins to publish test reports.

<strong>1.</strong> Make sure [Junit Jenkins Plugin](https://plugins.jenkins.io/junit/) is installed

<strong>2.</strong> Add a post-build action to publish the XML report. Nightwatch by default uses `the tests_output` folder to write reports.

![Jenkins JUnit Report Setup](https://user-images.githubusercontent.com/1677755/178725915-ec67050c-8274-4379-8a5c-771fe9239f89.png)

<p><strong>3.</strong> Run your tests to see the JUnit report in Jenkins.</p>

![Jenkins JUnit Report](https://user-images.githubusercontent.com/1677755/178726091-3f7a7c51-76bf-4944-88f0-5c00da8fa398.png)

### View HTML reports
Nightwatch also publishes HTML reports which can be published to Jenkins

<strong>1.</strong> Make sure you have installed the [HTML Jenkins plugin](https://plugins.jenkins.io/htmlpublisher/).

<strong>2.</strong> Nightwatch by default writes HTML report to `tests_output/nightwatch-html-report/` that will be used by Jenkins to publish the report.

![Jenkins HTML reporter setup](https://user-images.githubusercontent.com/1677755/178726263-5c0cffde-85e9-41f1-93e5-dabbda9fe04e.png)

<strong>3.</strong> Run your tests to see the HTML report under `Status->HTML Report`.

![Jenkins HTML report](https://user-images.githubusercontent.com/1677755/178733403-8205f8ad-81a0-47d7-99aa-676e6e211aa2.png)

<div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/debugging-tests/using-debug.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Use.debug()</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/ci-integrations/run-nightwatch-on-github-actions.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Github Actions</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
