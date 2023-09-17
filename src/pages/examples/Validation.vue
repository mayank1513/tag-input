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
const tags2 = ref<string[]>([]);
</script>

<template>
  <div class="main">
    <h1>Autocomplete</h1>
    <p>Only allow tags form provided autocompleteItems.</p>
    <tag-input :autocomplete-items="autocompleteItems" v-model="tags" validator="onlyAutocompleteItems" />
    <br />
    ✅ Use arrow keys to navigate and enter key to select autocomplete options
    <br />
    <pre>&lt;script setup lang="ts"&gt;
import { ref } from "vue";
import TagInput, { AutocompleteItemType } from "@mayank1513/vue-tag-input";
import "@mayank1513/vue-tag-input/style.css";

const autocompleteItems = [
{{ autocompleteItems.map(item => `  "${item}"`).join('\n') }}
]
const tags = ref&lt;string[]&gt;([]);
&lt;/script&gt;

&lt;template&gt;
  &lt;tag-input :autocomplete-items="autocompleteItems" v-model="tags" validator="onlyAutocompleteItems" /&gt;
&lt;/template&gt;</pre>

    <h2>Other validation options</h2>
    <p>The simplest validation is to allow only `onlyAutocompleteItems`. Apart from this, you can also provide RegExp or a
      function for validation.</p>
    <h3>Validate with validator function</h3>
    <pre>&lt;script setup lang="ts"&gt;
import { ref } from "vue";
import TagInput from "@mayank1513/vue-tag-input";
import "@mayank1513/vue-tag-input/style.css";

const autocompleteItems = [
{{ autocompleteItems.map(item => `  "${item}"`).join('\n') }}
]
const tags = ref&lt;string[]&gt;([]);
const validator = (tag: string, items: AutocompleteItemType[]) => {
  return items.includes(tag);
}
&lt;/script&gt;

&lt;template&gt;
  &lt;tag-input :autocomplete-items="autocompleteItems" v-model="tags" :validator="validator" /&gt;
&lt;/template&gt;</pre>
    <ul>
      <li>as of now `AutocompleteItemType` is only `string`. In future release we are planning to introduce option
        to pass objects.</li>
    </ul>
    <br />
    <h3>Validate with RegExp and custom validationMessage</h3>
    <p>Example: Tags should contain the word `tag`</p>
    <tag-input v-model="tags2" :validator="/tag/i" validation-message="tag should contain `tag`" />
    <br />
    <pre>&lt;tag-input v-model="tags2" :validator="/tag/i" validation-message="tag should contain `tag`" /&gt;</pre>
  </div>
</template>
