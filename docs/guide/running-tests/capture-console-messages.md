---
title: Capture console messages
description: Learn how to access/capture the console messages from the browser in your Nightwatch tests.
---

<div class="page-header"><h1>Capture browser console messages</h1></div>

### Overview
While developing your website, you might put some `console.log` statements in your code to help debug and then forget to remove those and now, you want to see all the console messages that gets logged into the DevTools console across different pages of your website.

Or maybe, you've put those console statements intentionally while testing your website to see if you get the correct data in the browser. Well, you can automate this process now with Nightwatch.

With [Chrome DevTools Protocol support](https://www.selenium.dev/documentation/webdriver/bidirectional/chrome_devtools/) now available in Selenium 4, Nightwatch now supports capturing the console messages being logged to the DevTools console of your browser.

<div class="alert alert-info">
  This command only works with Chromium based browsers such as Google Chrome and Microsoft Edge.
</div>

### Capture console messages

Capturing console messages being logged into the DevTools console of your browser allows you to access those messages in your test itself, where you can check if you are getting the expected data in your browser or if any unexpected console statement is present in your code which should not be logged into the browser console.

All you need to do is call the `browser.captureBrowserConsoleLogs()` command with the required parameters before navigating to your website.

`captureBrowserConsoleLogs()` accepts a callback function, which will receive an `event` object as an argument whenever a new console message is logged. The specifications of the received `event` object are as follows:

<table class="table table-bordered table-striped">
  <thead>
   <tr>
     <th style="width: 100px;">Name</th>
     <th style="width: 100px;">type</th>
     <th>description</th>
   </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td>Type of the call.<br>E.g.: <code>log</code>, <code>debug</code>, <code>info</code>, <code>error</code>, etc.</td>
    </tr>
    <tr>
      <td><code>timestamp</code></td>
      <td>number</td>
      <td>Time at which the console message was logged.</td>
    </tr>    
    <tr>
      <td><code>args</code><br></td>
      <td>array[object]</td>
      <td><code>value</code> property of object contains the log.<br>E.g. usage: <code>args[0].value</code>.<br>
        More details on the specifications of object available <a href="https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject">here</a>.
      </td>
    </tr>
  </tbody>
</table>

### Example

<div class="sample-test"><i>tests/capture-console-messages.js</i>
<pre class="line-numbers language-javascript">
<code class="language-javascript">describe('capture console events', function() {
  it('captures and logs console.log event', function() {
    browser
      .captureBrowserConsoleLogs((event) => {
        console.log(event.type, event.timestamp, event.args[0].value);
      })
      .navigateTo('https://www.google.com')
      .executeScript(function() {
        console.log('here');
      }, []);
  });
});
</code>
</pre></div>

Output of the example above:

<pre class="language-bash nocode-space">
  Running Capture console messages:
───────────────────────────────────────────────────────────────────────
error 2022-06-10T13:38:22.082Z here
No assertions ran.
</pre>

### Recommended content
- [Capture Browser JS Exceptions](/guide/running-tests/catch-js-exceptions.html)
- [Chrome DevTools Protocol in Selenium 4](https://www.selenium.dev/documentation/webdriver/bidirectional/chrome_devtools/)

 <div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/running-tests/programmatic-api.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Use programmatic API</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/running-tests/catch-js-exceptions.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Capture browser exceptions</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
