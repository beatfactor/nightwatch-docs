---
title: Angular component testing
description: Learn how to do write and execute Angular component tests in Nightwatch.
---
<div class="page-header"><h1>Angular component testing in Nightwatch</h1></div>

### Overview
Angular component testing in Nightwatch is available using our official **[`@nightwatch/angular`][https://github.com/nightwatchjs/nightwatch-plugin-angular]** plugin, It uses the Webpack DevServer under the hood. Requires Nightwatch 2.4+  

<div style="text-align: center; max-width: 80%; margin-bottom: 30px; ">
<a href="https://github.com/nightwatchjs/nightwatch-plugin-angular"><img class="github-embed" src="https://opengraph.githubassets.com/default/nightwatchjs/nightwatch-plugin-angular" alt="nightwatch-angular-plugin on Github" /></a>
</div>

### Installation

#### Step 1.
The `@nightwatch/angular` plugin can be installed from NPM with:

<pre class="hide-indicator"><code class="language-bash">npm install @nightwatch/angular</code></pre>

#### Step 2.
Then update your Nightwatch configuration and add the plugin to the list:

<div class="sample-test">
<i>nightwatch.conf.js</i><pre class="line-numbers"><code class="language-javascript">module.exports = {
  plugins: ['@nightwatch/angular']
}
</code></pre></div>


### Write tests

This plugin provides only the `mountComponent` command which can be used to mount a component in isolation.

<div class="apimethod">
  <h4>.mountComponent(`componentPath`, `[callback]`)</h4>

<h5>Parameters:</h5>
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
      <tr>
        <th style="width: 100px;">Name</th>
        <th style="width: 100px;">Type</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>`componentPath`</td>
        <td>`string`</td>
        <td>Location of the component file (`.component`) to be mounted</td>
      </tr>
			<tr>
        <td>`callback`<br><span class="optional">Optional</span></td>
        <td>`function`</td>
        <td>An optional callback function which will be called with the component element.</td>
      </tr>
      </tbody>
    </table>
  </div>
</div>

### Configuration
We’ve designed the `@nightwatch/angular` plugin to work with sensible configuration defaults, but in some more advanced scenarios you may need to change some of the config options. 

##### - `projectRoot`
Specify the project root directory where tests are written. By default this is set as the current directory. This can be overridden using the projectRoot property

<div class="sample-test"><i>nightwatch.conf.js</i><pre class="line-numbers language-javascript"><code class="language-javascript">module.exports = {
  '@nightwatch/angular': {
    projectRoot: 'path/to/angular/project' // defaults to current directory
  },
  // other nightwatch settings...
}
</code></pre></div>

##### - `port`
The angular plugin uses webpack dev server to compile and render angular components. By default it uses port 5173 to serve the rendered pages. This can be overridden using Nightwatch config.

<div class="sample-test"><i>nightwatch.conf.js</i><pre class="line-numbers language-javascript"><code class="language-javascript">module.exports = {
  'webpack_dev_server': {
    port: 10096 // defaults to 5173
  },
  // other nightwatch settings...
}
</code></pre></div>

##### Example
<div class="sample-test"><pre data-language="javascript"><code class="language-javascript">const component = await browser.mountComponent('/src/components/Form.component')</code></pre></div>

<div class="sample-test"><i>test/sampleTest.js</i><pre class="line-numbers language-javascript"><code class="language-javascript">it('Test Form Component', async function (browser) {
  const component = await browser.mountComponent('/src/components/Form.component');
  expect(component).text.to.equal('form-component works!');
});
</code></pre>
</div>
