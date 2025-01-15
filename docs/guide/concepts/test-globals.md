---
title: Test globals
description: Test globals are a useful concept that Nightwatch provides for persisting data between test suites and also to define global test hooks.
---

<div class="page-header"><h1>Test globals</h1></div>

### Overview
Nightwatch supports data persistence between test suites and global test hooks definitions via test globals. In its most simple form, it is a dictionary of name-value pairs which is defined in your configuration file.

Globals can be defined either as a `"globals"` property in your config file or as an external file which is specified as the `"globals_path"` property.

### Example

Here's an example definition using the `globals` property in the `nightwatch.json` configuration file:

<div class="sample-test"><i>nightwatch.json</i>

<pre data-language="javascript"><code class="language-javascript">{
  "src_folders": [],

  "globals": {
    "myGlobalVar" : "some value",
    "otherGlobal" : "some other value"
  },

  "test_settings": {
    "default": {
      "launch_url": "https://nightwatchjs.org",
    }
  }
}</code></pre></div>

<p></p>

The `globals` object is loaded directly onto the Nightwatch API object which is passed to the tests and is available via `browser.globals`.

<div class="sample-test"><i>sampleTest.js</i>
<pre data-language="javascript"><code class="language-javascript">describe('test globals example', function() {
  <br>
  it('Demo test', function(browser) {
    console.log(browser.globals.myGlobalVar); // myGlobalVar == "some value"
  });
  <br>
})</code></pre>
</div>

### External test globals
Test globals can also be defined in an external file, specified by the `globals_path` settings in your configuration file, like so:

<div class="sample-test"><i>nightwatch.json</i>
<pre data-language="javascript"><code class="language-javascript">{
  "src_folders": [],
  "globals_path": "lib/globals.js",
  <br>
  "test_settings": {
    "default": {
    "launch_url": "https://nightwatchjs.org"
  }
}</code></pre></div>

The external globals file can also contain:
- global test hooks
- a custom reporter
- test specific settings 

### Pre-defined Globals

The following `globals` can be used to control the behaviour of the test runner and are defined with the below-mentioned default values.

You can define these in two ways: 
- in your external globals file, specified by the `globals_path` config property, e.g. `lib/globals.js`
- directly in your `nightwatch.conf.js` config file

<div class="sample-test"><i>lib/globals.js</i>

<pre data-language="javascript">
<code class="language-javascript">
module.exports = {
  // this controls whether to abort the test execution when an assertion failed and skip the rest
  // it's being used in waitFor commands and expect assertions
  abortOnAssertionFailure: true,

  // this will overwrite the default polling interval (currently 500ms) for waitFor commands
  // and expect assertions that use retry
  waitForConditionPollInterval: 500,

  // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  // expect assertions
  waitForConditionTimeout : 5000,

  // since 1.4.0 – this controls whether to abort the test execution when an element cannot be located; an error
  // is logged in all cases, but this also enables skipping the rest of the testcase;
  // it's being used in element commands such as .click() or .getText()
  abortOnElementLocateError: false,

  // this will cause waitFor commands on elements to throw an error if multiple
  // elements are found using the given locate strategy and selector
  throwOnMultipleElementsReturned: false,

  // By default a warning is printed if multiple elements are found using the given locate strategy
  // and selector; set this to true to suppress those warnings
  suppressWarningsOnMultipleElementsReturned: false,

  // controls the timeout value for async hooks. Expects the done() callback to be invoked within this time
  // or an error is thrown
  asyncHookTimeout : 10000,

  // controls the timeout value for when running async unit tests. Expects the done() callback to be invoked within this time
  // or an error is thrown
  unitTestsTimeout : 2000,

  // controls the timeout value for when executing the global async reporter. Expects the done() callback to be 
  // invoked within this time or an error is thrown
  customReporterCallbackTimeout: 20000,

  // Automatically retrying failed assertions - You can tell Nightwatch to automatically retry failed assertions 
  // until a given timeout is reached, before the test runner gives up and fails the test.
  retryAssertionTimeout: 5000,

  // use the same browser session to run the individual  test suites
  reuseBrowserSession: false,

  // Custom reporter
  reporter: function(results, done) {
    // do something with the results
    done(results);
  },

  // External before hook is ran at the beginning of the tests run, before creating the Selenium session
  before(done) {
    done();
  },

  // External after hook is ran at the very end of the tests run, after closing the Selenium session
  after(done) {
    done();
  },

  // This will be run before each test suite is started
  beforeEach(browser, done) {
    done();
  },

  // This will be run after each test suite is finished
  afterEach(browser, done) {
    done();
  },

  // Called right after the command .navigateTo() is finished
  async onBrowserNavigate(browser) {
    return Promise.resolve();
  },

  // Called right before the command .quit() is finished
  async onBrowserQuit(browser) {
    return Promise.resolve();
  }
}</code></pre></div>

### Environment Specific Globals

Like other test settings, `globals` have the ability to be overwritten per test environment. 

Consider this configuration:

<div class="sample-test"><i>nightwatch.json</i>
<pre data-language="javascript"><code class="language-javascript">{
  "src_folders": [],
  <br>
  "test_settings": {
    "default": {
      "launch_url": "https://nightwatchjs.org",
      <br>
      "globals": {
        "myGlobalVar" : "some value",
        "otherGlobal" : "some other value"
      }
    },
    <br>
    "integration": {
      "globals": {
        "myGlobalVar" : "integrated global"
      }
    }
  }
}</code></pre>
</div> 

Let's try this out with a very basic test:

<div class="sample-test"><i>sampleTest.js</i>
<pre data-language="javascript"><code class="language-javascript">module.exports = {
  'Demo test' : function (browser) {
    console.log('myGlobalVar is: "', browser.globals.myGlobalVar, '"');
  }
};</code></pre></div>

Pass the `--env integration` option to the runner:

<pre><code class="language-bash">npx nightwatch --env integration</code></pre>

Then our globals object will look like:

<pre class="hide-indicator"><code class="language-bash">myGlobalVar is: "integrated global"
</code></pre>

### Recommended content
- [Use external globals in tests](/guide/writing-tests/using-test-globals.html)
- [Use global test hooks in tests](/guide/writing-tests/global-test-hooks.html)

 <div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/concepts/test-environments.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Test environments</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/concepts/session-capabilities.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Session capabilities</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
