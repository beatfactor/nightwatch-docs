## Expect API

### Overview

Nightwatch provides a fluent BDD-style interface for performing assertions on elements, defined on the `expect` namespace on the main Nightwatch instance.
It is based on the <a href="https://chaijs.com/api/bdd/" target="_blank">Chai Expect</a> assertion library and provides a greater level of flexibility,
also adding new capabilities over the classic `assert` interface.

It uses a chain-able language to construct assertions given an element specified by a css/xpath selector. A simple example looks like the following:

<div class="sample-test">
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">describe('expect example', function() {
  it('sample test', function (browser) {
    // start with identifying the element
    // and then assert the element is present
    browser.expect.element('#main').to.be.present;
    // or assert the element is visible
    browser.expect.element('#main').to.be.visible;
  });
}
</code></pre>
</div>

<h3 id="expect-chains">Language Chains</h3>

The following are provided as chainable getters to improve the readability of your assertions. They do not provide testing capabilities and the order is not important.

- to
- be
- been
- is
- that
- which
- and
- has
- have
- with
- at
- does
- of


<h3 id="expect-matchers">.equal(<code>value</code>)/.contain(<code>value</code>)/.match(<code>regex</code>)</h3>

These methods will perform assertions on the specified target on the current element. The targets can be an attribute value, the element's inner text and a css property.

<div class="sample-test">
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">this.demoTest = function (browser) {
  browser.expect.element('#main').text.to.equal('The Night Watch');
  browser.expect.element('#main').text.to.contain('The Night Watch');
  browser.expect.element('#main').to.have.css('display').which.equals('block');
};
</code></pre>
</div>

<div class="apimethod">
<h3 id="expect-startend">.startWith(<code>value</code>)/.endWith(<code>value</code>)</h3>

<p>Same as <code>equal</code> / <code>contain</code> / <code>match</code>.</p>

<div class="sample-test">
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">this.demoTest = function (browser) {
  browser.expect.element('#main').text.to.endWith('Watch');
  <br>
  browser.expect.element('#main').text.to.startWith('The');
};</code></pre>
  </div>
</div>

<div class="apimethod">
  <h3 id="expect-negation">.not</h3>
  <p>Negates any of assertions following in the chain.</p>

  <div class="sample-test">
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">this.demoTest = function (browser) {
  browser.expect.element('#main').text.to.not.equal('The Night Watch');
  <br>
  browser.expect.element('#main').text.to.not.contain('The Night Watch');
  <br>
  browser.expect.element('#main').to.have.css('display').which.does.not.equal('block');
};</code></pre>
  </div>
</div>

<div class="apimethod">
  <h3 id="expect-before">.before(<code>ms</code>)/.after(<code>ms</code>)</h3>
  <p>These methods perform the same thing which is essentially retrying the assertion for the given amount of time (in milliseconds). <code>before</code> or <code>after</code> can be chained to any assertion and thus adding retry capability.</p>

  <p>You can change the polling interval by defining a <code>waitForConditionPollInterval</code> property (in milliseconds) as a global property in your <code>nightwatch.json</code> or in your external globals file.
  Similarly, a default timeout can be specified as a global <code>waitForConditionTimeout</code> property (in milliseconds).</p>

<div class="sample-test">
<pre data-language="javascript"><code class="language-javascript">this.demoTest = function (browser) {
  browser.expect.element('#main').text.to.contain('The Night Watch').before(1000);
  <br>
  browser.expect.element('#main').text.to.not.contain('The Night Watch').after(500);
};</code></pre>
  </div>
</div>


<h2 id="expect-cookie">expect.cookie()</h2>
<div class="apimethod">

Expect assertions operating on a single cookie after retrieving the entire cookie string, using `.getCookies()`.

<h5>Syntax:</h5>
<div class="sample-test" style="max-width:600px">
  <pre data-language="javascript" style="padding-top: 10px" class="default-theme language-javascript"><code class="default-theme language-javascript">browser.expect.cookie('cookie-name', ['cookie-domain'])</code></pre>
</div>

<div class="sample-test">
 <pre class="line-numbers" data-language="javascript"><code class="language-javascript">this.demoTest = function (browser) {
  browser.expect.cookie('cookie-name').to.contain('cookie-value');
  browser.expect.cookie('cookie-name').to.match(/regex/);
  browser.expect.cookie('loginCookie', 'example.org').to.contain('cookie-value');
};</code></pre>
</div>
   
<h5>Parameters:</h5>
<div class="table-responsive">
  <table class="table table-bordered table-striped">
    <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 100px;">Type</th>
      <th>description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td><code>name</code></td>
      <td>String</td>
      <td>The name of the cookie to be inspected.</td>
    </tr>
    <tr>
      <td><code>domain</code><br><span class="optional">Optional</span></td>
      <td>String</td>
      <td>The domain name on which the cookie is set to.</td>
    </tr>
    </tbody>
  </table>
</div>
</div>



<h2 id="expect-element">expect.element()</h2>

### Assertions:
- [to.be.active](/api/expect/element/active.html)
- [to.have.attribute()](/api/expect/element/attribute.html)
- [to.have.css()](/api/expect/element/css.html)
- [to.be.enabled](/api/expect/element/enabled.html)
- [to.be.present](/api/expect/element/present.html)
- [to.be.property](/api/expect/element/property.html)
- [to.be.selected](/api/expect/element/selected.html)
- [to.have.text()](/api/expect/element/text.html)
- [to.be.a()](/api/expect/element/type.html)
- [to.have.value()](/api/expect/element/value.html)
- [to.be.visible](/api/expect/element/visible.html)

<h2 id="expect-elements">expect.elements()</h2>

### Assertions:
- [count()](/api/expect/elements/count.html)

<h2 id="expect-title">expect.title()</h2>

<div class="apimethod">

Retrieves the page title value in order to be used for performing `equal`, `match` or `contains` assertions on it.

<h5>Usage:</h5>
<div class="sample-test">
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">this.demoTest = function (browser) {
  browser.expect.title().to.contain('value');
  browser.expect.title().to.match(/value/);
};</code></pre>
</div>
</div>


<h2 id="expect-url">expect.url()</h3>
<div class="apimethod">

Retrieves the page url value in order to be used for performing `equal`, `match` or `contains` assertions on it.

<h5>Usage:</h5>
<div class="sample-test">
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">this.demoTest = function (browser) {
  browser.expect.url().to.contain('https://');
  browser.expect.url().to.endWith('.org');
};</code></pre>
</div>
</div>