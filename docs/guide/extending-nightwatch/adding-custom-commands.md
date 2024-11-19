---
title: Define custom commands
description: Learn how to extend Nightwatch capabilities by adding custom commands.
---

<div class="page-header"><h1>Define custom commands</h1></div>

### Overview
Most of the time you will need to extend the Nightwatch commands to suit your own application needs. To do so, create a new folder (e.g. `nightwatch/commands`) and start defining your own commands inside, each in its own file.

Then specify the path to that folder in the `nightwatch.json` file, as the `custom_commands_path` property. 

<div class="sample-test"><i>nightwatch.json</i>
<pre class="line-numbers" data-language="javascript"><code class=" language-javascript">{
  "custom_commands_path" : "nightwatch/commands"
}
</code></pre>
</div>

The command name is the name of the file itself.

### Define a custom command

There are two main ways in which you can define a custom command:

#### 1. Class-style commands
This is the recommended style of writing custom commands and it's also how most of the Nightwatch's own commands are written. Your command module needs to export a class constructor with a `command` instance method representing the command function. 

All Nightwatch commands are asynchronous which means that custom commands must signal the completion (in the `command` method). This can be achieved in two ways:
1. returning a `Promise`
2. emitting a "complete" event (in this case the class needs to inherit from Node's `EventEmitter`)

Returning a `Promise` is the recommended way. Class-based `command` methods are run in the context (the value of `this`) of the class instance. The `browser` object is available via `this.api`.

The example below performs the equivalent of the `.pause()` command. Note the two variations regarding the completion. 

##### The return value
You can also specify a return value, either as the argument with which the Promise will resolve, or as an argument to the "complete" event call.

##### Completion via a Promise
 
<div class="sample-test"><i>nightwatch/commands/customPause.js</i>
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">module.exports = class CustomPause {
  command(ms, cb) {
    // If we don't pass the milliseconds, the client will
    // be suspended indefinitely
    if (!ms) {
      return;
    }
    <br>
    const returnValue = {
      value: 'something'
    };
    <br>
    return new Promise((resolve) => {
      setTimeout(() => {
        // if we have a callback, call it right before the complete event
        if (cb) {
          cb.call(this.api);
        }
        <br>
        resolve(returnValue);
      }, ms);
    });
  }
}</code></pre></div>

The `command` method can also be `async`. In this case, you only need to return a value because `async` methods return a Promise already. 

Here's another example:

<div class="sample-test"><i>nightwatch/commands/customCommand.js</i>
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">module.exports = class CustomCommand {
  async command() {
    let returnValue;
    try {
      returnValue = await anotherAsyncFunction();
    } catch (err) {
      console.error('An error occurred', err);
      returnValue = {
        status: -1,
        error: err.message
      }
    }
    <br>
    return returnValue;
  }
}
</code></pre></div>

##### Completion via the "complete" event

<div class="sample-test"><i>nightwatch/commands/customPause.js</i>
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">const Events = require('events');
<br>
module.exports = class CustomPause extends Events {
  command(ms, cb) {
    // If we don't pass the milliseconds, the client will
    // be suspended indefinitely
    if (!ms) {
      return;
    }
    <br>
    const returnValue = {
      value: 'something'
    };
    <br>
    setTimeout(() => {
      // if we have a callback, call it right before the complete event
      if (cb) {
        cb.call(this.api);
      }
      <br>
      // This also works: this.complete(returnValue)
      this.emit('complete', returnValue);
    }, ms);
  }
}</code></pre>
</div>

### Using Nightwatch protocol actions
Since **v1.4**, you can also directly use the protocol actions (via `this.transportActions`) which Nightwatch uses for its own built-in APIs. These are direct HTTP mappings to [Selenium JsonWire](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) or [W3C Webdriver](https://www.w3.org/TR/webdriver/) protocol endpoints, depending on which one is currently in use.

Here's an example:

<div class="sample-test"><i>nightwatch/commands/customCommand.js</i>
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">module.exports = class CustomCommand {
  async command() {
    let returnValue;
    <br>
    // list all the avaialble transport actions
    // console.log(this.transportActions);
    <br>
    try {
      returnValue = await this.transportActions.getCurrentUrl();
    } catch (err) {
      console.error('An error occurred', err);
      returnValue = {
        status: -1,
        error: err.message
      }
    }
    <br>
    return returnValue;
  }
}
</code></pre></div>

### Directly calling Selenium/Webdriver endpoints
Also, since **v1.4** you can (via `this.httpRequest(options)`) directly call the HTTP endpoints available on the Selenium/Webdriver server from custom commands. 
This can be a convenient way to extend the provided API protocol, since it is using the same [HTTP request](https://github.com/nightwatchjs/nightwatch/blob/main/lib/http/request.js) interface as for the other protocol actions. 

It can be especially useful when using a service which provides additional endpoints, like [Appium](http://appium.io/).

Here's an example:

<div class="sample-test"><i>nightwatch/commands/customCommand.js</i>
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">module.exports = class CustomCommand {
  async command() {
    let returnValue;
    <br>
    try {
      returnValue = await this.httpRequest({
        // the pathname of the endpoint to call
        path: '/session/:sessionId/url',
        <br>
        // the current Selenium/Webdriver sessionId
        sessionId: this.api.sessionId,
        <br>
        // host and port are normally not necessary, since it is the current Webdriver hostname/port
        //host: '',
        //port: '',
        <br>
        // the body of the request
        data: {
          url: 'http://localhost/test_url'
        },
        <br>
        method: 'POST'
      });
    } catch (err) {
      console.error('An error occurred', err);
      returnValue = {
        status: -1,
        error: err.message
      }
    }
    <br>
    return returnValue;
  }
}
</code></pre></div>

#### 2. Function-style commands

<p class="alert alert-warning">This style of writing custom-commands has now been <b>deprecated</b>. Use class-based approach instead.</p>

This is a simpler form in which commands can be defined, however they are also quite limited.

The command module needs to export a `command` function, which needs to call at least one Nightwatch api method (such as `.execute()`). This is due to a limitation of how the asynchronous queueing system of commands works. You can also wrap everything in a `.perform()` call. Client commands like `execute` and `perform` are available via `this`.

<div class="sample-test"><i>nightwatch/commands/customCommand.js</i>
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">module.exports.command = function(file, callback) {
  var self = this;
  var imageData;
  var fs = require('fs');
  <br>
  try {
    var originalData = fs.readFileSync(file);
    var base64Image = new Buffer(originalData, 'binary').toString('base64');
    imageData = 'data:image/jpeg;base64,' + base64Image;
  } catch (err) {
    console.log(err);
    throw "Unable to open file: " + file;
  }
  <br>
  this.execute(function(data) {
    // execute application specific code
    App.resizePicture(data);
    return true;
  },
  [imageData], // arguments array to be passed
  function(result) {
    if (typeof callback === "function") {
      callback.call(self, result);
    }
  });
  <br>
  return this;
};</code></pre>
</div>

The example above defines a command (e.g. resizePicture.js) which loads an image file as `data-URI` and calls a method named `resizePicture` (via `.execute()`), defined inside the application.

With this command, the test will look something like:

<div class="sample-test"><i>tests/sampleTest.js</i>
<pre class="line-numbers" data-language="javascript"><code class="language-javascript">module.exports = {
  "testing resize picture" : function (browser) {
    browser
      .url("http://app.host")
      .waitForElementVisible("body")
      .resizePicture("/var/www/pics/moon.jpg")
      .assert.element(".container .picture-large")
      .end();
  }
};</code></pre>
</div>

### Using async/await
You can also use ES6 `async`/`await` syntax inside function-style custom commands. Here's another custom command example:

<div class="sample-test">
<pre data-language="javascript"><code class="language-javascript">module.exports = {
  command: async function () {
    this.url('http://nightwatchjs.org');
    this.waitForElementVisible('section#index-container');
    <br>
    const result = await this.elements('css selector', '#index-container ul.features li');
    this.assert.strictEqual(result.value.length, 7, 'Feature elements number is correct');
  }
};
</code></pre></div>

### Recommended content
- [Define custom assertions](/guide/extending-nightwatch/adding-custom-assertions.html)

<div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/mobile-web-testing/override-device-dimensions.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Override device dimensions</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/extending-nightwatch/adding-custom-assertions.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Define custom assertions</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>
