<script setup lang="ts">
import { ref } from "vue";
import TagInput from "../../../lib/TagInput.vue";

const tags = ref<string[]>([]);
const placeholder = ref<string>('');
</script>

<template>
  <div class="main">
    <h1>Custom placeholder</h1>
    <label for="delim">
      Custom placeholder:
      <input id="delim" type="text" v-model="placeholder" placeholder="Enter custom delimeters">
    </label>
    <br />
    <br />
    <tag-input v-model="tags" :input-props="{ placeholder }" />
    <br />
  </div>
</template>
