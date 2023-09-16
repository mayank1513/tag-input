<script setup lang="ts">
import { ref } from "vue";
import TagInput from "@/lib/TagInput.vue";
import "@mayank1513/vue-tag-input/style.css";

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
const tags = ref<string[]>([...options]);
</script>

<template>
  <div class="main">
    <h1>Vue Tag Input</h1>
    A versetile tag input component built with Vue 3 Composition API.
    <p dir="auto" class="git-tags">
      <a href="https://www.npmjs.com/package/@mayank1513/vue-tag-input" rel="nofollow"><img
          src="https://camo.githubusercontent.com/b3cefbae109b4ce0f8ae576eeec878b6e4761780cdb5c1f6508e8f6133d7ef57/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f406d6179616e6b313531332f7675652d7461672d696e7075742e7376673f636f6c6f72423d677265656e"
          alt="Version" data-canonical-src="https://img.shields.io/npm/v/@mayank1513/vue-tag-input.svg?colorB=green"
          style="max-width: 100%" /></a>
      <a href="https://codecov.io/gh/mayank1513/tag-input" rel="nofollow"><img
          src="https://camo.githubusercontent.com/43b7960de497ebbf7b33571e3b30fb1bfc9827125d0d7d8aebdda3f2bbc8ae35/68747470733a2f2f636f6465636f762e696f2f67682f6d6179616e6b313531332f7461672d696e7075742f67726170682f62616467652e737667"
          alt="codecov" data-canonical-src="https://codecov.io/gh/mayank1513/tag-input/graph/badge.svg"
          style="max-width: 100%" /></a>
      <a href="https://www.npmjs.com/package/@mayank1513/vue-tag-input" rel="nofollow"><img
          src="https://camo.githubusercontent.com/ac8040288c4017663796556c36c2ba7445de7a2b216e0ff837b315bb2df91169/68747470733a2f2f696d672e6a7364656c6976722e636f6d2f696d672e736869656c64732e696f2f6e706d2f64742f406d6179616e6b313531332f7675652d7461672d696e7075742e737667"
          alt="Downloads"
          data-canonical-src="https://img.jsdelivr.com/img.shields.io/npm/dt/@mayank1513/vue-tag-input.svg"
          style="max-width: 100%" /></a>
      <a href="https://www.npmjs.com/package/@mayank1513/vue-tag-input" rel="nofollow"><img
          src="https://camo.githubusercontent.com/edf5ba88cf7dc251c58b4311f905f16345a57570992d1cccd4fe14a024fb9ffa/68747470733a2f2f696d672e736869656c64732e696f2f62756e646c6570686f6269612f6d696e7a69702f406d6179616e6b313531332f7675652d7461672d696e707574"
          alt="npm bundle size" data-canonical-src="https://img.shields.io/bundlephobia/minzip/@mayank1513/vue-tag-input"
          style="max-width: 100%" /></a>
      <a href="https://github.com/mayank1513/tag-input/actions/workflows/publish-to-npm-on-new-release.yml"><img
          src="https://github.com/mayank1513/tag-input/actions/workflows/test.yml/badge.svg"
          alt="Publish to npm and GitHub" style="max-width: 100%" /></a>
      <a href="https://www.codementor.io/@mayank1513?refer=badge" rel="nofollow"><img
          src="https://github.com/mayank1513/tag-input/raw/master/codementor.svg" alt="Get help"
          style="max-width: 100%" /></a>
    </p>

    <br />
    <tag-input v-model="tags" :autocomplete-items="() => options" />
    <ul dir="auto">
      <li>✅ No dependencies</li>
      <li>
        ✅ Input box stays focused - no need to re-focus the input =&gt; better
        UX
      </li>
      <li>✅ Autocompletion</li>
      <li>✅ Fast setup</li>
      <li>✅ Works with Vuex</li>
      <li>✅ Small size: 1.6 kB gzipped</li>
      <li>✅ Many customization options</li>
      <li>✅ Delete tags on backspace / delete key</li>
      <li>
        ✅ Confirm before delete - tags turns red when backspace is pressed,
        gets deleted when backspace is pressed again
      </li>
      <li>✅ Works well with copy &amp; paste</li>
      <li>✅ Examples &amp; Docs</li>
    </ul>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  text-align: start;
  max-width: 1100px;
}

.grow {
  flex-grow: 1;
}

.git-tags {
  display: flex;
  gap: 15px;
}
</style>
