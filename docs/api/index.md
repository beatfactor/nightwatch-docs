Nightwatch works by loading all the necessary commands, settings, and other properties on a single API object which is made available at runtime to all test scripts as the single argument.
This is so that everything is ready to get started with writing the actual test script and not have to instantiate other objects.

### The "browser" object
We are referring to the main API object as `browser` – for consistency with other Selenium related JS test frameworks and also because since v2, it is also available as a `global`:

<div class="sample-test" style="max-width:800px; position: relative;">
  <pre data-language="javascript" class="language-javascript">
    <code class="language-javascript">module.exports = {
        demoTest: function (browser) {
          browser.init();
        }
      };
    </code>
  </pre>
  <button class="copy-btn" onclick="copyToClipboard(this)">Copy</button>
</div>

<style>
  .copy-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 8px 12px;
    background-color: #b5b5b5; /* Green background */
    color: #000000; /* White text */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  /* Hover effect */
  .copy-btn:hover {
    background-color: #ffffff; /* Darker green */
    transform: scale(1.05); /* Slight zoom effect */
  }

  /* Active state */
  .copy-btn:active {
    background-color: #bcbcbc; /* Even darker green */
    transform: scale(0.95); /* Slight shrink effect */
  }

  /* Focus state for accessibility */
  .copy-btn:focus {
    outline: 2px solid #2e7d32; /* Green outline */
  }
</style>
<script>
  function copyToClipboard(button) {
    var code = button.previousElementSibling.querySelector('code').textContent;
    var textArea = document.createElement('textarea');
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    // Change button text for feedback
    button.textContent = 'Copied!';
    setTimeout(function() {
      button.textContent = 'Copy';
    }, 1500);
  }
</script>





You might also see examples from previous versions of Nightwatch, using `client`. It is of course perfectly fine, although it might be confusing to users who are new to JavaScript syntax. 

<div class="sample-test" style="max-width:800px; position: relative;">
  <pre data-language="javascript" class="language-javascript"><code class="language-javascript">module.exports = {
    demoTest: function (browser) {
      browser.init();
    }
  };</code>
  </pre>
  <button class="copy-btn" onclick="copyToClipboard(this)">Copy</button>
</div>


#### Using as Global
From Nightwatch 2, `browser` is available as a global, so this is also valid:

<div class="sample-test" style="max-width:800px; position: relative;">
  <pre data-language="javascript" class="language-javascript">
    <code class="language-javascript">module.exports = {
        demoTest: function () {
          browser.init();
        }
      };</code>
  </pre>
  <button class="copy-btn" onclick="copyToClipboard(this)">Copy</button>
</div>

As well as this:

<div class="sample-test" style="max-width:800px; position: relative;"><pre data-language="javascript" class="language-javascript"><code class="language-javascript">describe('Nightwatch APIs', function() {
  it('demoTest', function () {
    browser.init();
  })
};
</code></pre>
<button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></div>

### API Content

Below is a list of all public properties and methods that are made available on the `browser` object. 

<div class="browser-methods"></div>

- #### WEBDRIVER_ELEMENT_ID

  Type: `string`

  The W3C web element identifier, equals to the string constant: `"element-6066-11e4-a52e-4f735466cecf"`

- #### browserName

  Type: `string`

  The browserName specified in the capabilities object.

- #### isChrome

  Type: `function isChrome(): boolean`

  Returns `true`|`false` whether or not the browser used is Google Chrome.

- #### isFirefox

  Type: `function isFirefox(): boolean`

  Returns `true`|`false` whether or not the browser used is Mozilla Firefox.

- #### isSafari

  Type: `function isSafari(): boolean`

  Returns `true`|`false` whether or not the browser used is Apple Safari.

- #### isEdge

  Type: `function isEdge(): boolean`

  Returns `true`|`false` whether or not the browser used is Microsoft Edge.

- #### isInternetExplorer

  Type: `function isInternetExplorer(): boolean`

  Returns `true`|`false` whether or not the browser used is Microsoft InternetExplorer.

- #### isOpera

  Type: `function isOpera(): boolean`

  Returns `true`|`false` whether or not the browser used is Opera.

- #### baseUrl

  Type: `string`

  Returns `true`|`false` whether or not the browser used is Opera.

  The value of `baseUrl` as defined in the Nightwatch config and which will be used as the default url for the command `.init()`.
  Other aliases are: `base_url`, `launch_url`, or `launchUrl`.

- #### actions

  Type: `function actions(options?: { async?: boolean; bridge?: boolean }): Actions`

  Returns a new instance of the `Actions` class from Selenium. See the [User Actions API](/api/useractions/) section for details.

- #### capabilities

  Type: `object`

  The WebDriver session capabilities, used by the browser driver to communicate the features supported.
  
  WebDriver capabilities are used to communicate the features supported by a session. A client may also use capabilities to define which features it requires the driver to satisfy when creating a new session.

  When a WebDriver session is created it returns a set of capabilities describing the negotiated, effective capabilities of the session. Some of the capabilities included in this set are standard and shared between all browsers, but the set may also contain browser-specific capabilities and these are always prefixed.
  More on [WebDriver Capabilities](https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities).
  
  ###### Example:
<div class="sample-test" style="max-width:800px; position: relative;"><pre data-language="javascript" class="language-javascript"><code class="language-javascript">
  {
    acceptInsecureCerts: false,
    browserName: 'chrome',
    browserVersion: '96.0.4664.55',
    'goog:chromeOptions': { debuggerAddress: 'localhost:50427' },
    // ... continued
  }
</code></pre><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button>
</div>

- #### currentTest

  Type: `NightwatchTestSuite`

  An object containing information about the current running testcase.

  ###### Available properties:

<div class="sample-test" style="max-width:800px; position:relative;"><pre data-language="javascript" class="language-javascript"><code class="language-javascript">
  {
    // name of the current running testcase
    name: ' ... ',
    // name of the current running testsuite, i.e. the test file
    module: ' ... ',
    // name of the current running test group, if any
    group: '', 
    // the results object is shared among all testcases in the current testsuite
    results: {
      time: 0,
      assertions: [Array],
      passed: 0,
      errors: 0,
      failed: 0,
      retries: [Number],
      skipped: 0,
      tests: 0,
      steps: [],
      stackTrace: '',
      // an object accumulating the results of each testcase
      testcases: [Object]
    },
    // the current timestamp, in the format: Wed, 01 Dec 2021 08:34:00 GMT
    timestamp: ''
  }
</code></pre><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button>
</div>


- #### desiredCapabilities

  Type: `NightwatchDesiredCapabilities`

  An object containing the capabilities sent by Nightwatch to WebDriver, as defined in the Nightwatch config file (see the [Configuration section](/guide/configuration/nightwatch-configuration-file.html) for details).

  ###### Example:

<div class="sample-test" style="max-width:800px; position: relative;"><pre data-language="javascript" class="language-javascript"><code class="language-javascript">
  {
    browserName: 'chrome',
    'goog:chromeOptions': {},
    name: 'Example Test'
  }
</code></pre><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button>
</div>


- #### driver

  Type: `WebDriver`

  The [Selenium WebDriver](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html) instance which Nightwatch uses under the hood. Can be useful in custom commands when it is needed to extend the main functionality offered by Nightwatch.
  If uses in regular testcase scripts, this needs to be wrapped in a `.perform()` command.

  ###### Example:

  In the below example we will retrieve the [WebDriver Session](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/session_exports_Session.html) instance.

<div class="sample-test" style="max-width:800px; position: relative;"><pre data-language="javascript" class="language-javascript"><code class="language-javascript">
  describe('Nightwatch APIs', function() {
    it('driver demoTest', async function () {
      const session = await browser
        .init()
        .perform(function() {
          return this.driver.getSession();
        });
    })
  };
</code></pre><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button>
</div>

- #### sessionId

  Type: `string`

  The WebDriver session ID. WebDriver gives each session a unique session ID that can be used to differentiate one session from another. More info on WebDriver session is available on the [W3C WebDriver page](https://w3c.github.io/webdriver/#sessions) and the [Selenium WebDriver Docs](https://www.selenium.dev/documentation/webdriver/).

  ###### Example

<div class="sample-test" style="max-width:800px; position: relative"><pre data-language="javascript" class="language-javascript"><code class="language-javascript">
  console.log(browser.sessionId); // e0b40362dcec8ec501ac2b42b62bdce2
</code></pre><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button>
</div>

- #### globals

  Type: `NightwatchGlobals`

  The processed Nightwatch globals object which contains all the currently global properties and methods. See the [Test Globals section](/guide/concepts/test-globals.html) for details.
  
- #### options

  Type: `NightwatchOptions`

  The processed Nightwatch config object which contains all the currently used properties and settings. See the [Configuration section](/guide/reference/settings.html) for details.
  
- #### Keys

  Type: `NightwatchKeys`

  A link to the [Key](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html) enumeration from Selenium, which contains all the pressable keys that aren't text. This is usually needed when working with commands that send text to a page, like `.sendKeys()`.
  
- #### page

  Type: `NightwatchPage & NightwatchCustomPageObjects`

  Contains a dictionary of the current page objects, created for the currently running testcase.
  See [Working with Page Objects](/guide/concepts/page-object-model.html) section for details.

- #### assert

  Type: `Assert`

  See [Assert API](/api/assert/) section for details.

- #### verify

  Type: `Assert`

  See [Assert API](/api/assert/) section for details.

- #### ensure

  Type: `Ensure`

  See [Ensure API](/api/ensure/) section for details.
  
- #### expect

  Type: `Expect`

  See [Expect API](/api/expect/) section for details.

- #### chrome

  Type: `object`

  Chromium specific commands. See [API Commands](/api/commands/) section for details.

- #### firefox

  Type: `object`

  Firefox specific commands. See [API Commands](/api/commands/) section for details.
