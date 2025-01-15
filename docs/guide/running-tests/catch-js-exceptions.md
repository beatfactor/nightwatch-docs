---
title: Catch JS Exceptions
description: Learn how to listen to all the JavaScript exceptions happening during the run-time of your website, in your Nightwatch tests.
---

<div class="page-header"><h1>Capture Browser JS Exceptions</h1></div>

### Overview
Since v2.2, Nightwatch allows you to listen to the JavaScript exceptions happening during the run-time of your website and make them available in the test itself via a callback. 

This is made possible with the [Chrome DevTools Protocol support](https://www.selenium.dev/documentation/webdriver/bidirectional/chrome_devtools/) now available in Selenium 4.

<div class="alert alert-info">
  The `captureBrowserExceptions()` command only works with Chromium based browsers such as Google Chrome and Microsoft Edge.
</div>

### Capture JS exceptions

Use the `browser.captureBrowserExceptions()` command with the required parameters before navigating to your website.

`captureBrowserExceptions()` accepts a callback function, which will receive an `event` object as an argument whenever a new `Error` is thrown. The specifications of the received `event` object are as follows:

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
      <td><code>timestamp</code></td>
      <td>number</td>
      <td>Time at which the JS exception was captured.</td>
    </tr>    
    <tr>
      <td><code>exceptionDetails</code><br></td>
      <td>object</td>
      <td>A JS object with all the details of the exception occurred.<br>Specifications of the object can be read from <a href="https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-ExceptionDetails">here</a>.</td>
    </tr>
  </tbody>
</table>

### Example

<div class="sample-test"><i>tests/catch-js-exceptions.js</i>
<pre class="line-numbers language-javascript">
<code class="language-javascript">describe('catch browser exceptions', function() {
  it('captures the js exceptions thrown in the browser', async function() {
    await browser.captureBrowserExceptions((event) => {
      console.log('>>> Exception:', event);
    });
    <br>
    await browser.navigateTo('https://duckduckgo.com/');
    <br>
    const searchBoxElement = await browser.findElement('input[name=q]');
    await browser.executeScript(function(_searchBoxElement) {
      _searchBoxElement.setAttribute('onclick', 'throw new Error("Hello world!")');
    }, [searchBoxElement]);
    <br>
    await browser.elementIdClick(searchBoxElement.getId());
  });
});
</code>
</pre></div>

Output of the example above:

<pre class="hide-indicator"><code class="language-bash">Running captureBrowserExceptions():
────────────────────────────────────────────────────────────────────────────────
{
  exceptionDetails: {
    exceptionId: 1,
    text: 'Uncaught',
    lineNumber: 0,
    columnNumber: 6,
    scriptId: '55',
    url: 'https://duckduckgo.com/',
    stackTrace: { callFrames: [Array] },
    exception: {
      type: 'object',
      subtype: 'error',
      className: 'Error',
      description: 'Error: Hello world!\n' +
        '    at HTMLAnchorElement.onclick (https://duckduckgo.com/:1:7)',
      objectId: '6711588812373266697.1.1',
      preview: [Object]
    },
    executionContextId: 1
  },
  timestamp: 2022-06-10T13:14:52.722Z
}
No assertions ran.
</code>
</pre>


### Recommended content
- [Capture browser console messages](/guide/running-tests/capture-console-messages.html)
- [Chrome DevTools Protocol in Selenium 4](https://www.selenium.dev/documentation/webdriver/bidirectional/chrome_devtools/)

 <div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/running-tests/capture-console-messages.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Capture browser logs</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/running-tests/take-heap-snapshot.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Take heap snapshot</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>