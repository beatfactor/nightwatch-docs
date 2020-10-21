<h3 id="finding-amp-interacting-with-elements"><span>Finding &amp; Interacting with Elements</span></h3>

Finding elements on a page is by far one of the most common functions during an end-to-end test. Nightwatch provides several techniques of locating elements and also an extensible assertion framework to perform verifications on them. 

Elements are searched for from the document root, using either a CSS selector or an Xpath selector. It is possible to use other locator strategies as well, refer to the [Webdriver docs][2] for details.

Elements are internally identified using a _[web element reference id][3]_. When interacting with elements, this step happens behind the scenes and Nightwatch has automatic retry mechanisms for locating the element before interacting with it or performing assertions.

<div class="alert alert-info">
<h5>Implicit Waits</h5>
When interacting with elements, Nightwatch polls the DOM for a configurable duration when trying to find any element. If the element is not found, a `NoSuchElementError` error is thrown. 
</div>

In the example below, the command `setValue` is first performing internally the element lookup and then calling the element set value command.  

<div class="sample-test">
<pre data-language="javascript"><code class="language-javascript">module.exports = {
  'Demo test ecosia.org': function (browser) {
    browser
      .url('https://www.ecosia.org/')
      .setValue('input[type=search]', 'nightwatch')
      .click('button[type=submit]')
      .assert.containsText('.mainline-results', 'Nightwatch.js')
      .end();
  }
};</code></pre>
</div>

#### Element Properties

An element can also be specified as an object if greater flexibility in locating and interacting with elements is needed. The object definition needs to contain at least the `selector` property. 
Next to the selector, other properties can be specified. 

Here's the full list:

- **selector** - the element selector name (e.g.: '#input-element')
- **locateStrategy** - e.g. 'css selector'
- **index** - used to target a specific element in a query that results in multiple elements returned. Normally, only the first element is used (index = 0) but using the `index` property, you can specify any element within the result. 
- **abortOnFailure** - used to overwrite this setting when using `waitForElement*` commands
- **timeout** - used to overwrite the default timeout for when using `waitForElement*` commands or assertions
- **retryInterval** - used to overwrite the default retry interval for when using `waitForElement*` commands or assertions
- **suppressNotFoundErrors** - Some element commands like `.click()` or `.getText()` will throw a `NoSuchElement` error if the element cannot be located, causing the test to fail. If this option is set to `true` then this error is ignored.

Say in the example above, the `input[type=search]` element selector returns 3 elements and you are interested in the second element. The element can be specified like so:

<div class="sample-test">
<pre data-language="javascript"><code class="language-javascript">>module.exports = {
  'Demo test ecosia.org': function (browser) {
    browser.setValue({selector: 'input[type=search]', index: 2}, 'nightwatch')
  }
};</code></pre>
</div>

- Previous: [Using ES6 async/await](/guide/using-nightwatch/using-es6-async.html)
- Next: [Writing Assertions](/guide/using-nightwatch/writing-assertions.html)

[2]:	https://www.w3.org/TR/webdriver/#locator-strategies
[3]:	https://www.w3.org/TR/webdriver/#elements
