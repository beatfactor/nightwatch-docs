---
title: Create custom reporters
description: Learn how to extend Nightwatch capabilities by adding custom reporters.
---

<div class="page-header"><h1>Create custom reporters</h1></div>

### Overview

If you'd like to define your own reporter in addition to the built-in ones (stdout and jUnit-xml) you can do so in two ways:

### `--reporter` command-line argument
Define your reporter in a separate file, using the below interface, and then specify the path to the file using the `--reporter` cli argument.

#### Interface:
<div class="sample-test"><i>custom_reporter.js</i>
<pre class="line-numbers"><code class="language-javascript">module.exports = {
  write : function(results, options, done) {
    done();
  }
};</code></pre></div>

### via external globals

Add your reporter in the external globals file. Read more about [external globals](/guide/concepts/test-globals.html).

See the provided [globalsModule.js](https://github.com/nightwatchjs/nightwatch/blob/main/examples/globalsModule.js) for an example.

#### Example:
<div class="sample-test"><i>globals.js</i>
<pre class="line-numbers"><code class="language-javascript">module.exports = {
  reporter : function(results, done) {
    console.log(results);
    done();
  }
};</code></pre>
</div>

