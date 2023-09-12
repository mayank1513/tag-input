<script setup lang="ts">
import { ref } from "vue";
import TagInput from "@mayank1513/vue-tag-input";
import "@mayank1513/vue-tag-input/style.css";

const tags = ref<string[]>([]);
</script>

<template>
  <div class="main">
    <h1>NPM Package test</h1>
    <tag-input v-model="tags" />
    <br />
    <span>Use <code>enter</code> key or <code>tab</code> key to create a new
      tag.</span>
    <hr />
    <hr />
  </div>
</template>
