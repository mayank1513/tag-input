<script setup lang="ts">
import { ref } from "vue";
import TagInput from "../../lib/TagInput.vue";

const tags = ref<string[]>([]);
const customDelimiter = ref<string[] | string>([",", " "]);
const options = ref<string[]>([
  "vue",
  "composition",
  "js",
  "mytag1",
  "mayank1513",
]);
</script>
<template>
  <div class="main">
    <h1>Default options</h1>
    <tag-input v-model="tags" />
    <br />
    <span
      >Use <code>enter</code> key or <code>tab</code> key to create a new
      tag.</span
    >
    <h1>With custom delimiter and colors</h1>
    <tag-input
      tagBgColor="lightgreen"
      tagTextColor="darkgreen"
      :customDelimiter="customDelimiter"
      v-model="tags"
    />
    <br />
    <span
      >Use <code>enter</code> key or <code>tab</code> key or any of the custom
      delimeters to create a new tag.</span
    >
    <p>
      Custom delimiters:
      <code v-for="delim in customDelimiter" :key="delim"> "{{ delim }}"</code>
    </p>
    <br />
    <h1>Do not allow custom tags</h1>
    <tag-input
      :options="options"
      :allowCustom="false"
      tagBgColor="blue"
      tagTextColor="lightblue"
      :customDelimiter="customDelimiter"
      v-model="tags"
    />
    <br />
    Try entering tag that is not in options and hit <code>enter</code>
    <br />
    <span
      >Use <code>enter</code> key or <code>tab</code> key or any of the custom
      delimeters to create a new tag.</span
    >
    <p>
      Allowed Tags: <code v-for="tag in options" :key="tag"> "{{ tag }}"</code>
    </p>
    <p>
      Custom delimiters:
      <code v-for="delim in customDelimiter" :key="delim"> "{{ delim }}"</code>
    </p>
    <br />
    <h1>Provide options for autofill but also allow custom tags</h1>
    <tag-input
      :options="options"
      tagBgColor="blue"
      tagTextColor="lightblue"
      :customDelimiter="customDelimiter"
      v-model="tags"
      :showCount="true"
    />
    <br />
    <span
      >Use <code>enter</code> key or <code>tab</code> key or any of the custom
      delimeters to create a new tag.</span
    >
    <p>
      Allowed Tags: <code v-for="tag in options" :key="tag"> "{{ tag }}"</code>
    </p>
    <p>
      Custom delimiters:
      <code v-for="delim in customDelimiter" :key="delim"> "{{ delim }}"</code>
    </p>
    <br />
  </div>
</template>

<style scoped>
.main {
  text-align: start;
}
.logo {
  width: 70%;
  max-width: 250px;
}
.tag1 {
  background: green;
  color: red;
  padding: 5px;
  border-radius: 4px;
  white-space: nowrap;
  transition: 0.1s ease background;
}
</style>
