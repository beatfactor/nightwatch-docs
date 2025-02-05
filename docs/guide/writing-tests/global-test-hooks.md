---
title: Nightwatch global test hooks 
description: Learn how to Nightwatch global test hooks that would be applicable to the entire test suite.
---


<div class="page-header"><h1>Global Test Hooks</h1></div>

The same set of hooks as per test suite is also available globally, outside the scope of the test. In the case of global hooks, the `beforeEach` and `afterEach` refers to a test suite (i.e. test file), and are ran before and after a _test suite_.

#### Global before[Each] and after[Each]

You can also have global `before` and `after` [asynchronous] methods that can perform an operation before starting the test runner and right before exiting, when all the tests have finished executing.

Similarly, global `beforeEach` and `afterEach` will be invoked before and after each test suite (i.e. test file). These ones do receive the Nightwatch `browser` object.

The methods are defined in the external `globals` file and invoked using the `globals` object as context. The `callback` is the only argument passed and **must be called** when the operation finishes.

#### Example:
<div class="sample-test"><pre class="line-numbers"><code class="language-javascript">module.exports = {
  'default' : {
    isLocal : true,
  },
  <br>
  'integration' : {
    isLocal : false
  },
  <br>
  // External before hook is ran at the beginning of the tests run, before creating the Selenium session
  before(done) {
    // run this only for the local-env
    if (this.isLocal) {
      // start the local server
      App.startServer(function() {
        // server listening
        done();
      });
    } else {
      done();
    }
  },
  <br>
  // External after hook is ran at the very end of the tests run, after closing the Selenium session
  after(done) {
    // run this only for the local-env
    if (this.isLocal) {
      // stop the local server
      App.stopServer(function() {
        // shutting down
        done();
      });
    } else {
      done();
    }
  },
  <br>
  // This will be run before each test suite is started
  beforeEach(browser, done) {
    // getting the session info
    browser.status(function(result) {
      console.log(result.value);
      done();
    });
  },
  <br>
  // This will be run after each test suite is finished
  afterEach(browser, done) {
    console.log(browser.currentTest);
    done();
  },
  <br>
  // Called right after the command .navigateTo() is finished
  async onBrowserNavigate(browser) {
    return Promise.resolve();
  },
  <br>
  // Called right before the command .quit() is finished
  async onBrowserQuit(browser) {
    return Promise.resolve();
};</code></pre></div>
  }

<div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/writing-tests/using-test-globals.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Use test globals</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/using-nightwatch/accessibility-testing.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Accessibility testing</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
