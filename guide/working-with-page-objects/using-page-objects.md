### Using Page Objects

The Page Objects methodology is a popular pattern to write end-to-end tests by wrapping the pages or page fragments of a web app into objects.
The purpose of a page object is to allow a software client to do anything and see anything that a human can by abstracting away the underlying html actions needed to access and manipulate the page.

A comprehensive introduction to Page Objects can be found in <a href="http://martinfowler.com/bliki/PageObject.html" target="_blank">this article</a>.

<div class="alert alert-info">
As of version `0.7` Nightwatch provides an enhanced and more powerful interface for creating page objects, significantly improved over the previous support. Page objects created prior to `v0.7` will still continue to work however we recommend upgrading to the new version.

To use the new version, your page object must contain either the `elements` or `sections` property. Otherwise, Nightwatch will defer to the old.
</div>


#### Configuring Page Objects

To create a page object simply create an object with properties that describe the page. Each page object should be located in a separate file, located in a designated folder. Nightwatch reads the page objects from the folder (or folders) specified in the `page_objects_path` configuration property.

The `page_objects_path` property can also be an array of folders, allowing you thus to logically split the page objects into smaller groups.


#### The Url property

You can optionally add a `url` property that designates the page's URL. To navigate to the page, you can call the `navigate` method on the page object.

The URL will usually be defined as a string:

<div class="sample-test">
<pre data-language="javascript"><code class="language-javascript">
module.exports = {
  url: 'http://google.com',
  elements: {}
};
</code></pre>
</div>

It can also be a function in case the URL is dynamic. One use case for this is to support different test environments. You can create a function that gets called in the context of the page, thus allowing you to do:

<div class="sample-test">
<pre data-language="javascript"><code class="language-javascript">
module.exports = {
  url: function() { 
    return this.api.launchUrl + '/login'; 
  },
  elements: {}
};
</code></pre>
</div>

