---
title: JUnit XML Reporter
description: Learn how to use the integrated JUnit XML report from Nightwatch.
---

<div class="page-header"><h1>JUnit XML Reporter</h1></div>

### Overview
JUnit is a widespread XML format for generating test results and most CI system (e.g. Jenkins) have native support to plug this in so that more advanced reports can be displayed. 

Nightwatch outputs JUnit-formatted XML by default and this can be controlled via the `output_folder` config setting. 

### Configuration

The HTML reporter is **enabled by default**, along with the HTML and JSON reporters since v2.2, but its behaviour can be configured as follows:

#### Via the config file
The `output_folder` config settings is used to specify the location where the JUnit XML report files will be saved. Nightwatch writes an XML file for each test suite file.

<div class="sample-test"><i>nightwatch/.../lib/settings/defaults.js</i>
<pre class="line-numbers language-javascript"><code class="language-javascript">module.exports = {
  output_folder: 'tests_output'
}</code></pre></div>

Refer to the [Configuration > Output settings](/guide/configuration/customising-test-output.html) page for a complete list of test output related settings.

#### Via the CLI

You can also configure the output folder at runtime via the CLI, using the `--output` flag:

<pre class="language-bash"><code class="language-bash">nightwatch --output ./tests-output</code></pre>

Refer to the [CLI reference page](/guide/nightwatch-cli/command-line-options.html) for a complete list of CLI flags that Nightwatch accepts.

The XML file name follows the pattern:

<pre class="hide-indicator">
<code class="language-bash">&lt;BROWSER&gt;_&lt;VERSION&gt;__&lt;testSuiteFileName&gt;.xml
</code></pre>

### Example

#### Step 0: create a new project
<p>First, let's create a new empty project and install Nightwatch inside it:</p>

<pre class="language-bash"><code class="language-bash">mkdir ./test-project && cd ./test-project</code></pre>

#### Step 1: install Nightwatch and chromedriver
<p>Install <code>nightwatch</code> and <code>chromedriver</code> from NPM (<code>chromedriver</code> is the W3C WebDriver implementation for running tests in the Google Chrome browser; make sure you have the latest Chrome browser installed on your machine):</p>

<pre class="language-bash"><code class="language-bash">npm i nightwatch chromedriver</code></pre>

#### Step 2: run an example test
Consider the [duckDuckGo.js](https://github.com/nightwatchjs/nightwatch/blob/main/examples/tests/duckDuckGo.js) example test:

<div class="sample-test"><i>duckDuckGo.js</i>
<pre class="line-numbers language-javascript"><code class="language-javascript">describe('duckduckgo example', function() {
  it('Search Nightwatch.js and check results', function(browser) {
    browser
      .navigateTo('https://duckduckgo.com')
      .waitForElementVisible('#search_form_input_homepage')
      .sendKeys('#search_form_input_homepage', ['Nightwatch.js'])
      .click('#search_button_homepage')
      .assert.visible('.results--main')
      .assert.textContains('.results--main', 'Nightwatch.js');
  }); 
});
</code></pre></div>

Which we can run using the command:

<pre class="language-bash"><code class="language-bash">npx nightwatch examples/tests/duckDuckGo.js --env chrome</code></pre>

To generate only the built-in JUnit-XML report, run the following command:

<pre class="language-bash"><code class="language-bash">npx nightwatch examples/tests/duckDuckGo.js --env chrome --reporter=junit</code></pre>

To generate both the built-in JUnit-XML and HTML reports, run the following command (v2.2+):

<pre class="language-bash"><code class="language-bash">npx nightwatch examples/tests/duckDuckGo.js --env chrome --reporter=junit --reporter=html</code></pre>

#### Step 3: view the JUnit XML report

The JUnit XML report should have been generated in the local `tests_output` folder inside the current project directory. It will look something like this:

<pre class="language-xml hide-indicator">
<code class ="language-xml">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;testsuites errors="0"
            failures="0"
            tests="1"&gt;

  &lt;testsuite name="duckDuckGo"
    errors="0" failures="0" hostname="" id="" package="duckDuckGo" skipped="0"
    tests="1" time="2.007" timestamp=""&gt;

    &lt;testcase name="Search Nightwatch.js and check results" classname="duckDuckGo" time="2.007" assertions="3">
    &lt;/testcase&gt;

  &lt;/testsuite&gt;

&lt;/testsuites&gt;
</code></pre>

### Jenkins integration
JUnit-formatted XML output integrates by default into Jenkins via the "Publish JUnit test result report" Post-build Action. 

<div><img src="https://www.jenkins.io/images/solution-images/junit-rspec-postbuild-action.png" alt="Publish JUnit test result report"></div>

By integrating the test reports into Jenkins, you can generate trends and reports and take full advtange of Jenkins reporting features. 

<div><img src="https://www.jenkins.io/images/solution-images/junit-rspec-trend.png" alt="Jenkins test results history"></div>

Please refer to the [Jenkins user guide](https://www.jenkins.io/doc/book/) for more details.

### JUnit schema

The complete The Apache Ant JUnit XML `.xsd` Schema is available on Github at: [windyroad/JUnit-Schema/blob/master/JUnit.xsd](https://github.com/windyroad/JUnit-Schema/blob/master/JUnit.xsd).

### Disable JUnit reports
The reports can be disabled completely if desired by setting the `output_folder` config settings to `false`:

<div class="sample-test"><i>nightwatch.conf.js</i>
<pre class="line-numbers language-javascript"><code class="language-javascript">module.exports = {
  output_folder: false
}</code></pre></div>

### Recommended content
- [How-to guides > Use reporters > HTML reporter](/guide/reporters/use-html-reporter.html)
- [Configuration > Output settings](/guide/configuration/customising-test-output.html)
- [Configuration > Default settings](/guide/reference/defaults.html)
- [Reference > Nightwatch CLI](/guide/nightwatch-cli/command-line-options.html)

<div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/network-requests/mock-geolocation.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Mock geolocation</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/reporters/use-html-reporter.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">HTML Reporter</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>

