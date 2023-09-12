<script setup lang="ts">
import { ref } from "vue";
import TagInput from "../../../lib/TagInput.vue";

const tags = ref<string[]>([]);
const delimeters = ref<string[] | string>([]);
</script>

<template>
  <div class="main">
    <h1>Custom delimiter</h1>
    <label for="delim">
      Custom delimeters:
      <input id="delim" type="text" v-model="delimeters" placeholder="Enter custom delimeters">
    </label>
    <br />
    <br />
    <tag-input v-model="tags" :custom-delimiter="delimeters" />
    <br />
  </div>
</template>
