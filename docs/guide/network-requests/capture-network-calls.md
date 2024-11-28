---
title: Capture network requests
description: Learn how to access/capture all the network calls going out of your browser, in your Nightwatch tests.
---

<div class="page-header"><h1>Capture network requests</h1></div>

### Overview

While loading a single webpage, your browser has to make a lot of network calls to different URLs in order to fetch different resources to be served on the page. Now, it might happen that you want to check if the browser is making a request to a particular URL, or just collect all the network calls that are being made by the browser to load a website.

You can do so by going to the Network tab of the DevTools available in your browser and looking through all the network calls that are made, but there is an easy, automated way.

With [Chrome DevTools Protocol support](https://www.selenium.dev/documentation/webdriver/bidirectional/chrome_devtools/) now available in Selenium 4, Nightwatch now supports capturing all the network calls that are made while loading a website.

<div class="alert alert-info">
  This command only works with Chromium based browsers such as Google Chrome and Microsoft Edge.
</div>

### Capture network calls

This command allows you to capture all the network calls that are being made while loading a website, and send them back to you in your test run itelf, by calling the callback provided by you with the network call parameters as argument.

All you need to do is call the `browser.captureNetworkRequests()` command with the required parameters before navigating to your website.

`captureNetworkRequests()` accepts a callback function, which will receive a `requestParams` object as an argument whenever a network call is made by the browser. All the properties available in the received `requestParams` can be found [here](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent). Some important properties are as follows:

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
      <td>Time at which the network call was made.</td>
    </tr>    
    <tr>
      <td><code>request</code><br></td>
      <td>object</td>
      <td>
        The <code>request</code> object contains all the important details about the network call made, like URL, HTTP method used, HTTP headers, etc.<br>
        All the properties available in the <code>request</code> object can be read from <a href="https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject">here</a>.
      </td>
    </tr>
  </tbody>
</table>

### Example

<div class="sample-test"><i>tests/capture-network-calls.js</i>
<pre class="line-numbers language-javascript">
<code class="language-javascript">describe('capture network requests', function() {
  it('captures and logs network requests as they occur', function() {
    this.requestCount = 1;
    browser
      .captureNetworkRequests((requestParams) => {
        console.log('Request Number:', this.requestCount++);
        console.log('Request URL:', requestParams.request.url);
        console.log('Request method:', requestParams.request.method);
        console.log('Request headers:', requestParams.request.headers);
      })
      .navigateTo('https://www.google.com');
  });
});
</code>
</pre></div>

Output from one of the network calls in the example above:

<pre class="language-bash plaintext">
  Running Capture network calls:
───────────────────────────────────────────────────────────────────────────────────────────────────
Request Number: 35
Request URL: https://www.google.com/favicon.ico
Request method: GET
Request headers: {
  'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
  'sec-ch-ua-full-version-list': '" Not A;Brand";v="99.0.0.0", "Chromium";v="102.0.5005.61", "Google Chrome";v="102.0.5005.61"',
  'sec-ch-ua-mobile': '?0',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36',
  'sec-ch-ua-arch': '"x86"',
  'sec-ch-viewport-width': '1200',
  'sec-ch-ua-full-version': '"102.0.5005.61"',
  'sec-ch-ua-platform-version': '"12.1.0"',
  Referer: 'https://www.google.com/',
  'sec-ch-dpr': '2',
  'sec-ch-ua-bitness': '"64"',
  'sec-ch-ua-wow64': '?0',
  'sec-ch-ua-model': '',
  'sec-ch-ua-platform': '"macOS"'
}
</pre>

### Recommended content
- [Chrome DevTools Protocol in Selenium 4](https://www.selenium.dev/documentation/webdriver/bidirectional/chrome_devtools/)
- [Intercept network responses](/guide/network-requests/mock-network-response.html)

<div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/ci-integrations/run-nightwatch-on-circleci.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">CircleCI</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/network-requests/mock-network-response.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Mock network response</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
