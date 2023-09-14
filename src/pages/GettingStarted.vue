<script setup lang="ts">
import TagInput from "@/lib/TagInput.vue";
</script>
<template>
  <div>
    <h1>Getting Started</h1>
    <h2>Demo</h2>
    <TagInput />

    <h2>Installation</h2>
    <h3>NodeJS</h3>
    <pre>npm i @mayank1513/vue-tag-input --production</pre>
    or
    <pre>pnpm i @mayank1513/vue-tag-input --production</pre>
    or
    <pre>yarn add @mayank1513/vue-tag-input --production</pre>

    <h3>CDN</h3>
    <pre>&lt;script src="https://unpkg.com/vue@3/dist/vue.global.js" /&gt;
&lt;script src="https://unpkg.com/@mayank1513/vue-tag-input" /&gt;
&lt;link rel="stylesheet" href="https://unpkg.com/@mayank1513/vue-tag-input@1.0.0/dist/style.css"&gt;</pre>

    <!-- <div class="zeroclipboard-container position-absolute right-0 top-0">
        <clipboard-copy aria-label="Copy" class="ClipboardButton btn js-clipboard-copy m-2 p-0 tooltipped-no-delay"
          data-copy-feedback="Copied!" data-tooltip-direction="w" value="npm i @mayank1513/vue-tag-input --production"
          tabindex="0" role="button">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"
            class="octicon octicon-copy js-clipboard-copy-icon m-2">
            <path
              d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z">
            </path>
            <path
              d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z">
            </path>
          </svg>
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"
            class="octicon octicon-check js-clipboard-check-icon color-fg-success d-none m-2">
            <path
              d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z">
            </path>
          </svg>
        </clipboard-copy>
      </div> -->
    <h2>Usage</h2>
    <h3>NodeJS</h3>
    <pre>&lt;template&gt;
  ...
  &lt;tag-input v-model="tags" /&gt;
  ...
&lt;/template&gt;

&lt;script&gt;
import TagInput from '@mayank1513/vue-tag-input'
import '@mayank1513/vue-tag-input/style.css'
...

export default {
  name: 'App',
  data() {
    return {
      tags: [],
      ...
    };
  },
  components: {
    TagInput,
    ...
  },
  ...
}
&lt;/script&gt;</pre>

    <h3>CDN</h3>
    <pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;title&gt;Vue Tag Input Demo&lt;/title&gt;
    &lt;script src="https://unpkg.com/vue@3/dist/vue.global.js"&gt;&lt;/script&gt;
    &lt;script src="https://unpkg.com/@mayank1513/vue-tag-input"&gt;&lt;/script&gt;
    &lt;link
      rel="stylesheet"
      href="https://unpkg.com/@mayank1513/vue-tag-input@1.0.0/style.css"
    /&gt;
  &lt;/head&gt;

  &lt;body&gt;
    &lt;div id="app"&gt;
      &lt;tag-input&gt;&lt;/tag-input&gt;
    &lt;/div&gt;
  &lt;/body&gt;
  &lt;script&gt;
    Vue.createApp({
      components: {
        TagInput,
      },
    }).mount("#app");
  &lt;/script&gt;
&lt;/html&gt;</pre>
    <br>
    <ul>
      <li>
        <p dir="auto">
          Please read
          <a href="https://mayank1513.medium.com/creating-a-tag-input-component-using-the-vue-3-composition-api-feae06d58492"
            rel="nofollow">this article</a>
          to learn how to build this package step by step and the background story.
        </p>
      </li>
      <li>
        <p dir="auto">
          To learn vue js please check out our courses
          <a href="https://www.udemy.com/course/vuejs-complete-course-plus-guide/?referralCode=93BDA4A1FE3F73C37CD2"
            rel="nofollow">Vue.js Complete Course + Guide</a>
          and
          <a href="https://www.udemy.com/course/vue-3-essentials/?referralCode=E6D2FDE2B8B06C1991F1" rel="nofollow">Vue 3
            Essentials</a>
        </p>
      </li>
      <li>
        <p dir="auto">
          Follow us on
          <a href="https://www.facebook.com/Learn-Vue-Js-104953725168718/" rel="nofollow">FaceBook</a>
          to get the latest discount coupons and update to our articles and
          packages.
        </p>
      </li>
    </ul>
  </div>
</template>
