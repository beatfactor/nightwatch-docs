---
title: Nightwatch CucumberJS
description: Learn how to use CucumberJS runner with Nightwatch
---

## Using CucumberJS with Nightwatch

### Overview
Nightwatch 2 brings integrated support for using [Cucumber.js](https://cucumber.io/) directly as an alternative test runner. No other plugins are necessary, other than the [Cucumber library](https://www.npmjs.com/package/@cucumber/cucumber) itself (version 7.3 or higher).

Simply run the following in the same project where Nightwatch is also installed:

<div class="sample-test"><pre class="language-bash" style="font-size: 20px"><code class="language-bash">npm i @cucumber/cucumber --save-dev</code></pre></div>

### Configuration

In order to use CucumberJS in Nightwatch you need to set the `test_runner` config property and set the type to `cucumber`. You will also need to set the path to where the feature files are located.

<div class="sample-test"><i>nightwatch.conf.js</i><pre class="line-numbers"><code class="language-javascript">{
  test_runner: {
    // set cucumber as the runner
    type: 'cucumber',
    <br>
    // define cucumber specific options
    <br>
    options: {
      //set the feature path
      feature_path: 'examples/cucumber-js/*/*.feature',
      <br>
      // start the webdriver session automatically (enabled by default)
      auto_start_session: true,
      <br>
      // use parallel execution in Cucumber
      // set number of workers to use (can also be defined in the cli as --parallel 2
      parallel: 2 
    }
  },
  <br>
  src_folders: ['examples/cucumber-js/features/step_definitions']
}</code></pre></div>

### Running Tests
The easiest way to run Cucumber tests from examples is:

<div class="sample-test"><pre><code class="language-bash">npx nightwatch --env cucumber-js</code></pre></div>

Cucumber spec files/step definition files can be provided in `src_folders` in Nightwatch config or as a CLI argument.

##### With `src_folders` defined:

<div class="sample-test"><pre><code class="language-bash">npx nightwatch</code></pre></div>

##### Without `src_folders` defined:

<div class="sample-test"><pre><code class="language-bash">npx nightwatch examples/cucumber-js/features/step_definition</code></pre></div>

### Running in Parallel

Parallel running using 2 workers:

<div class="sample-test"><pre><code class="language-bash">nightwatch examples/cucumber-js/features/step_definitions --parallel 2</code></pre></div> 

Use other [test runner options](/guide/running-tests/command-line-options.html) as usual:

<div class="sample-test"><pre><code class="language-bash">npx nightwatch examples/cucumber-js/features/step_definitions --headless</code></pre></div>

### Manually Starting the WebDriver Session
You might need sometimes to not start the Webdriver session automatically after Nightwatch is instantiated. For this purpose, Nightwatch provides the instance available as `this.client`, which contains an `launchBrowser()` method.

#### Configuration
<div class="sample-test"><i>nightwatch.conf.js</i><pre class="line-numbers"><code class="language-javascript">{
  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'examples/cucumber-js/*/*.feature',
      auto_start_session: false
    }
  }
}</code></pre></div>

You can then use an extra setup file that you can pass as an extra `--require` to Nightwatch, which will be forwarded to Cucumber. In the extra setup file, you can add other operations needed to be executed before the session is started.

#### Example _extra_setup.js:

Remember to set the `browser` on `this` so it can be closed automatically by Nightwatch. Otherwise, remember to call `.quit()` in your own Cucumber `After()` hooks.

<div class="sample-test"><i>_extra_setup.js</i>
<pre class="line-numbers"><code class="language-javascript">const {Before} = require('@cucumber/cucumber');
<br>
Before(async function(testCase) {
  if (!this.client) {
    console.error('Nightwatch instance was not created.');
    <br>
    return;
  }
  <br>
  this.client.updateCapabilities({
    testCap: 'testing'
  });
  <br>
  this.browser = await this.client.launchBrowser();
});</code></pre></div>

#### Run with extra setup

<div class="sample-test"><pre><code class="language-bash">nightwatch examples/cucumber-js/features/step_definitions --require {/full/path/to/_extra_setup.js}</code></pre></div>

### Nightwatch setup file for Cucumber

You might also want to inspect the built-in setup file that Nightwatch uses for initializing the Cucumber runner. It is available in our project root folder at [/cucumber-js/_setup_cucumber_runner.js](https://github.com/nightwatchjs/nightwatch/blob/v2/cucumber-js/_setup_cucumber_runner.js).

### Reporting
When using the integrated Cucumber test runner, you need to use the Cucumber [formatters](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) for generating output.

<div class="alert alert-warning">
Nightwatch reporters (like JUnit XML reports or the <a href="/guide/reporters/use-html-reporter.html">global custom reporter</a>) are not available. The main reason is that reporting is delegated to the Cucumber CLI. You can also <a href="https://github.com/cucumber/cucumber-js/blob/main/docs/custom_formatters.md">write your own</a> Cucumber formatter.
</div>

Nightwatch will forward `--format` and `--format-options` CLI arguments, if present, to Cucumber.

By default, the `progress` formatter is used.

For example:

<div class="sample-test"><pre><code class="language-bash">npx nightwatch --env cucumber-js --format @cucumber/pretty-formatter</code></pre></div>

or:

<div class="sample-test"><pre><code class="language-bash">npx nightwatch --env cucumber-js --require cucumber.conf.js --format json:report/cucumber_report.json</code></pre></div>

#### Example  Output

Here's how the output looks like when running the example tests in Firefox. You can just run this in the project where Nightwatch is installed:

<div class="sample-test">
<pre><code class="language-bash">npx nightwatch examples/cucumber-js/features/step_definition</code></pre>
</div>

<div class="sample-test">
<pre>
<code class="language-bash">ℹ Connected to GeckoDriver on port 4444 (1740ms).
Using: firefox (92.0.1) on MAC (20.6.0).

..  ✔ Testing if the page title equals 'Rijksmuseum Amsterdam, home of the Dutch masters' (4ms)
.  ✔ Element <#rijksmuseum-app> was visible after 46 milliseconds.
.  ✔ Testing if element <.search-results> contains text 'Operation Night Watch' (1994ms)
...  ✔ Testing if the page title equals 'Rijksmuseum Amsterdam, home of the Dutch masters' (8ms)
.  ✔ Element <#rijksmuseum-app> was visible after 49 milliseconds.
.  ✔ Testing if element <.search-results> contains text 'The Night Watch, Rembrandt van Rijn, 1642' (1427ms)

    2 scenarios (2 passed)
    10 steps (10 passed)
    0m13.024s (executing steps: 0m12.998s)
</code>
</pre></div>

 <div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/writing-tests/write-complex-user-actions.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Write complex user actions</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/writing-tests/using-mocha.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Use Mocha as a test runner</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
