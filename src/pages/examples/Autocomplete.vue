<script setup lang="ts">
import { ref } from "vue";
import TagInput from "../../../lib/TagInput.vue";

const options = [
  "No dependencies",
  "Autocompletion",
  "Keep Focused",
  "Fast Settup",
  "Mini Sized",
  "Customizable",
  "Backspace/Delete to remove tag",
  "Turns red when backspace/delete is pressed",
  "Examples",
  "Docs",
  "Copy/Paste",
]
const tags = ref<string[]>([]);
</script>

<template>
  <div class="main">
    <h1>Autocomplete</h1>
    <p>Provide options for autofill but also allow custom tags</p>
    <tag-input :options="options" v-model="tags" />
    <br />
    <p>
      Autofill options: <code v-for="(tag, i) in options"
        :key="tag"> "{{ tag }}"{{ i === options.length - 1 ? "" : ", " }}</code>
    </p>
  </div>
</template>
