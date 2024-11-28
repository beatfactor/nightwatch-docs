---
description: Learn how to use nightwatch with appium for mobile testing
---

<div class="page-header"><h1>Use Nightwatch with Appium for mobile web testing</h1></div>

### Overview
[Appium](https://appium.io/) is an open-source tool for automating native, mobile web, and hybrid applications on iOS mobile, Android mobile, and Windows desktop platforms. This guide primarily focuses on runing Nightwatch tests on mobile devices.

### Theory of Operation

Appium is a Node JS based server that exposes REST APIs compliant with Web driver protocol that wraps automation libraries from vendors (UIAutomator2/Espresso, Apple XCUITest/UIAutomation). 

In an end-end scenario Nightwatch makes request to Appium server, server talks to native framework using different platform drivers for executing commands and finally returns HTTP response back to Nightwatch.

![appium-nightwatch](https://user-images.githubusercontent.com/28780767/141315676-148b9da3-7785-4eea-91f9-d1107e88696b.png)

### Install Appium

First step is to [download and setup Appium](https://appium.io/docs/en/about-appium/getting-started/?lang=en#installing-appium). 

### Configuration
We can add configuration in Nightwatch to run our tests on mobile devices running locally against the Appium server:

<div class="sample-test"><i>nightwatch.conf.js</i><pre class="hide-indicator line-numbers"><code class="language-bash">appium_ios: {
  selenium: {
    host: 'localhost',
    port: 4723
  },
  disable_error_log: true,
  webdriver: {
    timeout_options: {
      timeout: 150000,
      retry_attempts: 3
    },
    keep_alive: false,
    start_process: false
  },
  desiredCapabilities: {
    browserName: 'Safari', //not required incase using app
    javascriptEnabled: true,
    platformName: 'iOS', //android or iOS
    platformVersion: '15.0',
    deviceName: 'iPhone 13'
    // "app": APP_PATH + "ios/PieDrive.app", // path for the ios app you want to test
  }
}
</code></pre></div>

You can find more details regarding capabilities and on [Appium docs](http://appium.io/docs/en/writing-running-appium/caps/)

### Write a basic test

Here is a demo test that searches for the term "Night Watch" on the [Rijks Museum](https://www.rijksmuseum.nl/en) website.

<div class="sample-test"><i>tests/sampleTest.js</i><pre class="line-numbers"><code class="language-bash">describe('Nightwatch Website tests', function() {
    <br>
    it('Searching the Rijksmuseum ', async function(){
    browser.navigateTo('https://www.rijksmuseum.nl/en');
    const cookieDialogVisible = await browser.isVisible({
      selector: '.cookie-consent-bar-wrap',
      suppressNotFoundErrors: true
    });
    <br>
    if (cookieDialogVisible) {
      browser.click('.cookie-consent-bar-wrap button.link');
    }
    browser.pause(1000).click('a[aria-label="Search"]');
    <br>
    return browser.setValue('input.search-bar-input[type=text]', ['night watch'])
      .click('button.button.search-bar-button')
      .pause(1000)
      .assert.containsText('.search-results', 'The Night Watch, Rembrandt van Rijn, 1642');
  });
});</code></pre></div>

To execute the test, run Appium server locally using command `appium` and run your test against the `appium_ios` environment.

### Using Gestures
Gestures are widely used while interacting with mobile devices. There are two ways to generate gestures on mobile devices.

##### 1) Using non-standard APIs from Appium 

These APIs are platform specific. You can refer more on this on [Appium docs](https://appium.io/docs/en/about-appium/intro/). To generate a swipe gesture on an iOS device the command would look like:

<div class="sample-test"><pre class="language-javascript"><code>browser.execute('mobile: swipe', args);</code></pre></div>

##### 2) Using the Actions API 

The [Actions API](/api/useractions/) is very general and platform independent. It relies on the concept of input sources (key, pointer, wheel). Following code generates a swipe and a pinch zoom gesture using Actions API:

<div class="sample-test"><i>tests/sampleTest.js</i><pre class="line-numbers"><code class="language-bash">describe('W3C Actions API', function() {
  it('swipe down and zoom in the page - w3c actions api ', async function(){
    //Scroll down the page
    await  browser.perform(function(){
      const actions = this.actions();
      <br>
      return actions.move({x: 100, y: 100}).press().move({origin: 'pointer', y: -300, duration: 50}).release();
    });
    <br>
    await browser.pause(2000);
    <br>
    //Pinch zoom
    await browser.perform(function(){
      const actions= this.actions();
      const pointer1 = new Device('finger-1', 'touch');
      const pointer2 = new Device('finger-2', 'touch');
      actions.insert(pointer1, pointer1.move({duration: 0, x: 100, y: 70}), pointer1.press(), {type: 'pause', duration: 500}, pointer1.move({duration: 1000, origin: 'pointer', x: 0, y: -20}), pointer1.release());
      actions.insert(pointer2, pointer2.move({duration: 0, x: 100, y: 100}), pointer2.press(), {type: 'pause', duration: 500}, pointer2.move({duration: 1000, origin: 'pointer', x: 0, y: 20}), pointer2.release());
      <br>
      return actions; 
    });
  });
});</code></pre></div>

<div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/reporters/create-custom-reporter.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Add customer reporter</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/mobile-web-testing/override-device-dimensions.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Override device dimensions</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
