### Using mocha as a test runner

Starting with version `1.3` Nightwatch supports writing tests using the BDD _describe_ interface which perhaps removes the need for using Mocha.
 
Still, you can use Mocha and take advantage of its interfaces and reporters.

There are two main ways in which you can use Mocha with Nightwatch.

#### From Nightwatch
Mocha is used as an alternative test runner to the built-in one. This is done by specifying the `"test_runner"` option in the `nightwatch.json` configuration file.

Custom options can also be specified for Mocha:

<div class="sample-test">
<pre><code class="language-javascript">
{
  ...
  "test_runner" : {
    "type" : "mocha",
    "options" : {
      "ui" : "bdd",
      "reporter" : "list"
    }
  }
  ...
}
</code></pre>
</div>

or simply:

<div class="sample-test">
<pre><code class="language-javascript">{
  "test_runner" : "mocha"
}
</code></pre>
</div>

A complete list of Mocha options that are supported can be found [here](https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically#set-options).

The `test_runner` option can also be specified at test environment level:

<div class="sample-test">
<pre><code class="language-javascript">{
  "test_settings" : {
    "mocha_tests" : {
      "test_runner" : {
        "type" : "mocha",
        "options" : {
          "ui" : "bdd",
          "reporter" : "list"
        }
      }
    }
  }
  ...
}
</code></pre>
</div>

##### Example:
Writing a test in Mocha is the same as writing it in Nightwatch. Each testcase receives the `browser` object, `hooks` also receiving a `done` callback for async operations.

<div class="sample-test">
<pre><code class="language-javascript">describe('Google demo test for Mocha', function() {

  describe('with Nightwatch', function() {

    before(function(browser, done) {
      done();
    });

    after(function(browser, done) {
      browser.end(function() {
        done();
      });
    });

    afterEach(function(browser, done) {
      done();
    });

    beforeEach(function(browser, done) {
      done();
    });

    it('uses BDD to run the Google simple test', function(browser) {
      browser
        .url('https://google.com')
        .expect.element('body').to.be.present.before(1000);

      browser.setValue('input[type=text]', ['nightwatch', browser.Keys.ENTER])
        .pause(1000)
        .assert.containsText('#main', 'Night Watch');
    });
  });
});
</code></pre>
</div>

<p class="alert alert-warning">When using the mocha test runner from Nightwatch some cli options are not available, like `--retries`, `--suiteRetries`, `--reporter`.</p>

#### Using the standard Mocha
Running Nightwatch tests with the standard Mocha it's also possible, though a bit more boilerplate code is involved and you need to manage the selenium server.

##### Example:
<div class="sample-test">
<pre><code class="language-javascript">
var nightwatch = require('nightwatch');

describe('Github', function() {
  var client = nightwatch.initClient({
    silent : true
  });

  var browser = client.api();

  this.timeout(99999999);

  before(function() {

    browser.perform(function() {
      console.log('beforeAll')
    });

  });

  beforeEach(function(done) {
    browser.perform(function() {
      console.log('beforeEach')
    });

    client.start(done);
  });


  it('Demo test GitHub', function (done) {
    browser
      .url('https://github.com/nightwatchjs/nightwatch')
      .waitForElementVisible('body', 5000)
      .assert.title('nightwatchjs/nightwatch · GitHub')
      .waitForElementVisible('body', 1000)
      .assert.visible('.container .breadcrumb a span')
      .assert.containsText('.container .breadcrumb a span', 'nightwatch', 'Checking project title is set to nightwatch');

    client.start(done);
  });

  afterEach(function() {
    browser.perform(function() {
      console.log('afterEach')
    });
  });

  after(function(done) {
    browser.end(function() {
      console.log('afterAll')
    });

    client.start(done);
  });

});

</code></pre>
</div>

- Previous: [Using the Nightwatch programmatic API ](/guide/running-tests/programmatic-api.html)
