---
title: Firefox WebDriver (Gecko)
description: Learn about how to use Gecko Driver with Nightwatch.
---

## GeckoDriver

### Overview
[GeckoDriver](https://github.com/mozilla/geckodriver) is a standalone application used to interact with Gecko-based browsers, such as Firefox. It is written in Rust and maintained by Mozilla.

Starting with Firefox 48, GeckoDriver is the only way to automate Firefox, the legacy FirefoxDriver which used to be part of Selenium is no longer supported. Internally it translates the HTTP calls into [Marionette](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Marionette), Mozilla's automation protocol built into Firefox.

### Download

GeckoDriver can be downloaded from the [Releases page](https://github.com/mozilla/geckodriver/releases) on GitHub. Release notes are also available there. Or you can use the [geckodriver](https://www.npmjs.com/package/geckodriver) NPM package as a dependency in your project:

<pre><code class="language-javascript">npm install geckodriver --save-dev</code></pre>

Selenium 2.x users are advised to use version __v0.9__, whereas Selenium 3 users should use the latest version.

### Standalone Usage

Nightwatch can manage the GeckoDriver service automatically, as with other WebDriver services, such as ChromeDriver. To use GeckoDriver directly, add this to your `nightwatch.json`:

<pre><code class="language-javascript">{ 
  <strong>"webdriver"</strong>: {
    "start_process" : true,
    "server_path": "./bin/geckodriver-0.23",
    "cli_args": [
      "--log", "debug"
    ],
    "port": 4444
  },
  
  <strong>"test_settings"</strong> : {
    "default" : {
      "desiredCapabilities": {
        "browserName" : "firefox",
        "acceptInsecureCerts": true
      }
    }
  }
}
</code></pre>

### Usage with Selenium Server

If you're using GeckoDriver through Selenium Server, simply set the cli argument `"webdriver.gecko.driver"` to point to the location of the binary file. E.g.:

<pre><code class="language-javascript">{
  <strong>"selenium"</strong> : {
    "start_process" : true,
    "server_path" : "./bin/selenium-server-standalone-3.{VERSION}.jar",
    "log_path" : "",
    "port" : 4444,
    "cli_args" : {
      "webdriver.gecko.driver" : "./bin/geckodriver"
    }
  }
}
</code></pre>

GeckoDriver can also be used as a standalone application. Usage steps are documented on GitHub: https://github.com/mozilla/geckodriver#usage.
<br><br>
### Command line usage

<pre class="plaintext"><code>$ ./bin/geckodriver-0.23 -help
geckodriver 0.23.0

USAGE:
    geckodriver-0.23 [FLAGS] [OPTIONS]

FLAGS:
        --connect-existing    Connect to an existing Firefox instance
    -h, --help                Prints help information
        --no-e10s             Start Firefox without multiprocess support (e10s) enabled
    -V, --version             Prints version information
    -v                        Set the level of verbosity. Pass once for debug level logging and twice for trace level logging

OPTIONS:
    -b, --binary &lt;BINARY&gt;        Path to the Firefox binary, if no binary capability provided
        --log &lt;LEVEL&gt;            Set Gecko log level [values: fatal, error, warn, info, config, debug, trace]
        --marionette-port &lt;PORT&gt; Port to use to connect to gecko (default: random free port)
        --host &lt;HOST&gt;            Host ip to use for WebDriver server (default: 127.0.0.1)
    -p, --port &lt;PORT&gt;            Port to use for WebDriver server (default: 4444)
</code></pre>

##### Firefox Capabilities
GeckoDriver supports a capability named `firefoxOptions` which takes Firefox-specific preference values. Details are available on the GeckoDriver GitHub page: https://github.com/mozilla/geckodriver#firefox-capabilities.

##### Firefox Profile
Specifying the firefox profile can be done by setting the `profile` property in the `firefoxOptions` dictionary, as detailed above. This can be the base64-encoded zip of a profile directory and it may be used to install extensions or custom certificates.

##### Implementation Status
GeckoDriver is not yet feature complete, which means it does not yet offer full conformance with the WebDriver standard or complete compatibility with Selenium. Implementation status can be tracked on the [Marionette MDN page](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Marionette/WebDriver/status).

<div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/extending-nightwatch/adding-plugins.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Create Nightwatch plugins</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/browser-drivers/chromedriver.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">ChromeDriver</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
