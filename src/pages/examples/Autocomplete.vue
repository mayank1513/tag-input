<script setup lang="ts">
import { ref } from "vue";
import TagInput from "@/lib/TagInput.vue";

const autocompleteItems = [
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
    <p>Provide autocompleteItems but also allow custom tags.</p>
    <tag-input :autocomplete-items="autocompleteItems" v-model="tags" />
    <br />
    ✅ Use arrow keys to navigate and enter key to select autocomplete options
    <br />
    <pre>&lt;script setup lang="ts"&gt;
import { ref } from "vue";
import TagInput from "@mayank1513/vue-tag-input";
import "@mayank1513/vue-tag-input/style.css";

const autocompleteItems = [
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
const tags = ref&lt;string[]&gt;([]);
&lt;/script&gt;

&lt;template&gt;
  &lt;tag-input :autocomplete-items="autocompleteItems" v-model="tags" /&gt;
&lt;/template&gt;</pre>
  </div>
</template>
