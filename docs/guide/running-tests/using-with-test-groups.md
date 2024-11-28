---
title: Grouping tests with Nightwatch
description: Learn how to group tests together for better organization of the test suite.
---

<div class="page-header"><h1>Grouping tests with Nightwatch</h1></div>

### Overview
Nightwatch makes it possible to organize your test scripts into groups and run them as needed. To group tests together just place them in the same sub-folder. The folder name is the name of the group.

### Example
<pre class="nocode-space">
lib/
  ├── selenium-server-standalone.jar
custom-commands/
  ├── loginUser.js
  ├── attachPicture.js
tests/
  ├── logingroup
  |   ├── login_test.js
  |   └── otherlogin_test.js
  ├── addressbook
  |   ├── addressbook_test.js
  |   └── contact_test.js
  ├── chat
  |   ├── chatwindow_test.js
  |   ├── chatmessage_test.js
  |   └── otherchat_test.js
  └── smoketests
      ├── smoke_test.js
      └── othersmoke_test.js
</pre>

To run only the `smoketests` group you would do the following:

<pre><code class="language-bash">nightwatch --group smoketests</code></pre>

Also, if you would want to skip running the `smoketests` group you would do the following:

<pre><code class="language-bash">nightwatch --skipgroup smoketests</code></pre>

To skip multiple groups, just add them as comma-separated:

<pre><code class="language-bash">nightwatch --skipgroup addressbook,chat</code></pre>

 <div class="doc-pagination pt-40">
  <div class="previous">
    <a href="/guide/running-tests/filtering-by-test-tags.html">
      <span>←</span>
        <div class="d-flex flex-column">
          <span class="smallT">Back</span>
          <span class="bigT">Filter by test tags</span>
        </div>
    </a>
  </div>
  <div class="next">
    <a href="/guide/running-tests/programmatic-api.html">
        <div class="d-flex flex-column">
          <span class="smallT">Next Page</span>
          <span class="bigT">Use the programmatic API</span>
        </div>
        <span>→</span>
    </a>
  </div>
</div>

