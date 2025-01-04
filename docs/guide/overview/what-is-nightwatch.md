---
title: What is Nightwatch?
description: Nightwatch is an integrated framework for performing automated end-to-end testing on web applications and websites, across all major browsers.
---

<div class="page-header"><h1>What is Nightwatch?</h1></div>

<img src="/images/nightwatch-circle.png" alt="Nightwatch.js" title="Nightwatch.js" id="whatis-logo" />Nightwatch.js is an integrated framework for performing automated end-to-end testing on web applications and websites, across all major browsers. It is written in [Node.js][1] and uses the [W3C WebDriver API][2] to interact with various browsers.

<p>It is a complete solution for end-to-end and cross-browser testing. It aims to simplify the process of writing and running various types of tests, including:</p>

<ul class="introduction">
    <li>end-to-end tests on all major web browsers</li>
    <li>unit tests of Node.js services</li>
    <li>integration tests of HTTP APIs</li>
</ul>

<p class="secondary-text">Nightwatch was created in 2014 in Amsterdam, The Netherlands, and the name was inspired by the famous painting <a href="https://www.rijksmuseum.nl/en/collection/SK-C-5">The Night Watch</a> by Dutch 17th century artist <a href="https://www.rembrandthuis.nl/en/meet-rembrandt/">Rembrandt van Rijn</a>. The masterpiece is prominently displayed in the Rijksmuseum, in Amsterdam. Read more about how Nightwatch was created <a href="/about">here</a>.</p>

### Architecture overview

Nightwatch is distributed as an easy to use CLI tool and has built-in support for all major browsers: Chrome, Firefox, Safari, and Edge.

Nightwatch performs the browser automation by taking advantage of the industry standard protocol **WebDriver**, which is defined as a W3C standard specification.

![Theory of Operation][image-1]

## What is WebDriver?

<p class="whatis-logo w3c-logo"><img src="https://www.w3.org/StyleSheets/TR/2016/logos/W3C" alt="W3C WebDriver" title="W3C WebDriver" class="whatis"></p>

[WebDriver][7] is a general purpose library for automating web browsers, part of the [Selenium][5] project. It is now a [W3C specification][10] which standardises browser automation, providing a reliable and consistent protocol to remotely control web browsers via a restful **HTTP API**.

Created more than a decade ago, **Selenium** is by far the most widely used project in the automated testing industry, providing a comprehensive set of tools for browser automation, initially written for Java but now with support for most programming languages.

Internally, Nightwatch uses the [W3C WebDriver API][6] to perform the browser automation related tasks, such as opening windows or clicking links.

### Support for Selenium Grid and Cloud Providers

Nightwatch can also be used for distributed cross-browser end-to-end testing at scale together with the [Selenium Server][13] (also known as **Selenium Grid**), which is an open-source project written in Java that manages a network of WebDriver nodes.

Nightwatch also can be integrated with cloud-based testing platforms like [Browserstack][14], [SauceLabs][15], [CrossBrowserTesting][16], [LambdaTest][17] or [TestingBot][20].

![Selenium Server Operation][image-2]

### Supported browsers

WebDriver is implemented by all major browser vendors as a W3C compliant HTTP service.
<div style="overflow-x:auto">
<table class="table table-bordered table-striped w-100">
<thead>
 <tr>
   <th style="width: 200px;">Browser Driver</th>
   <th style="width: 100px; text-align:center">Browser</th>
   <th>Description</th>
 </tr>
</thead>
<tbody>
  <tr>
    <td><a class="local-nav" href="/gettingstarted/installation/#install-geckodriver">GeckoDriver</a></td>
    <td class="browser"><img alt="Mozilla Firefox" src="https://nightwatchjs.org/img/logos/Firefox_Logo_2017.png"/></td>
    <td>Standalone application which implements the <a href="https://w3c.github.io/webdriver/#protocol">W3C WebDriver API</a> to communicate with Firefox.</td>
  </tr>

  <tr>
    <td><a class="local-nav" href="/gettingstarted/installation/#install-chromedriver">ChromeDriver</a></td>
    <td class="browser"><img alt="Google Chrome" src="https://nightwatchjs.org/img/logos/1200px-Google_Chrome_icon.svg.png"/></td>
    <td>Standalone application which implements the <a href="https://w3c.github.io/webdriver/#protocol">W3C WebDriver API</a> for Chromium.<br><br>Available for Chrome on Android and Chrome on Desktop (Mac, Linux, Windows and ChromeOS).</td>
  </tr>

  <tr>
     <td><a class="local-nav" href="/gettingstarted/installation/#install-microsoftedge">Microsoft Edge Driver</a></td>
     <td class="browser"><img alt="Microsoft Edge" src="https://nightwatchjs.org/img/logos/Microsoft_Edge_logo.svg.png"/></td>
     <td>Standalone application which is used to drive the recent Edge browser, based on Chromium, which works similar to ChromeDriver.</td>
  </tr>

  <tr>
    <td><a class="local-nav" href="/gettingstarted/installation/#install-safaridriver">SafariDriver</a></td>
    <td class="browser"><img alt="Microsoft Edge" src="https://nightwatchjs.org/img/logos/safari_icon_large_2x.png"/></td>
    <td>The <code>/usr/bin/safaridriver</code> binary comes pre-installed with recent versions of MacOS and it's available to use following the instructions on <a href="https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari">Apple Developer website</a>.
    <br><br>More information is available on <a href="https://developer.apple.com/documentation/webkit/about_webdriver_for_safari" target="_blank">About WebDriver for Safari</a> page.
    </td>
  </tr>

 </tbody>
</table>
</div>

[1]:    https://nodejs.org/
[2]:    https://www.w3.org/TR/webdriver/
[3]:    https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol
[4]:    /about
[5]:    https://selenium.dev/
[6]:    https://www.w3.org/TR/webdriver
[7]:    https://www.w3.org/TR/webdriver
[8]:    https://sites.google.com/a/chromium.org/chromedriver/
[9]:    https://github.com/mozilla/geckodriver
[10]:   https://www.w3.org/TR/webdriver/
[11]:   https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol
[12]:   /gettingstarted/installation/#webdriver-service
[13]:   https://selenium.dev/downloads/
[14]:   https://www.browserstack.com/
[15]:   https://saucelabs.com/
[16]:   https://crossbrowsertesting.com/
[17]:   https://www.lambdatest.com/
[18]:   https://selenium.dev/downloads/
[19]:   https://selenium.dev/downloads/
[20]:   https://testingbot.com/

[image-1]:  /img/operation.png
[image-2]:  /img/operation-cloud.png

### Recommended content
- [Nightwatch release notes](/guide/overview/whats-new.html)
- [Selenium WebDriver Docs](https://www.selenium.dev/documentation/webdriver/)
- [WebDriver Docs on MDN](https://developer.mozilla.org/en-US/docs/Web/WebDriver)

<div class="doc-pagination justify-content-end pt-40">
  <div class="next">
    <a href="/guide/overview/whats-new-in-v3.html">
        <div class="d-flex flex-column"><span class="smallT">Next Page</span><span class="bigT">What's new in v3?</span></div>
        <span>→</span>
    </a>
  </div>
</div>

