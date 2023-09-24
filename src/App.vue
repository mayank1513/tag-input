<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RouterView, RouterLink, useRoute } from "vue-router";

const examples = [
  ["Autocomplete", "autocomplete"],
  ["Autocomplete with API", "autocomplete-with-api"],
  ["Validation", "validation"],
  ["Custom Delimeter", "custom-delimeter"],
  ["Input Params", "custom-placeholder"]
];
const route = useRoute();
const path = computed(() => route.path);
onMounted(() => {
  window.addEventListener('click', e => {
    // @ts-ignore 
    if (e.target?.tagName === "PRE") {
      // @ts-ignore
      navigator.clipboard.writeText(e.target.innerText);
      // @ts-ignore
      e.target.classList.add('copied')
      setTimeout(() => {
        // @ts-ignore
        e.target.classList.remove('copied')
      }, 2000);
    }
  });

})
</script>

<template>
  <div class="container">
    <aside>
      <h1>Vue Tag Input</h1>
      A versatile tag input component built with Vue 3 Composition API.
      <hr />
      <p>
        <router-link to="/" :class="{ active: path === '/' }">Features</router-link>
        <router-link to="/getting-started" :class="{ active: path === '/getting-started' }">Getting Started</router-link>
      <details open>
        <summary>Examples</summary>
        <router-link v-for="example in examples" :to="`/examples/${example[1]}`"
          :class="{ active: path === `/examples/${example[1]}` }">{{ example[0] }}</router-link>
      </details>
      <router-link to="/docs">Docs</router-link>
      </p>
    </aside>
    <main>
      <router-view />

      <div class="grow"></div>
      <footer>
        <p>
          License:
          <a href="https://github.com/mayank1513/tag-input/blob/master/LICENSE" target="_blank"
            rel="noopener noreferrer">MIT</a>
          <br />
          <br />
          Copyright © 2023
          <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a>
        </p>
      </footer>
    </main>
  </div>
</template>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}

details {
  padding: 15px;

  summary {
    margin-left: -5px;
    padding-bottom: 5px;
    cursor: pointer;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.container aside {
  $w: 300px;
  width: $w;
  min-width: $w;
  max-width: $w;
  background: #1e2a31;
  overflow: auto;
  padding: 10px;
  color: #b0c4cf;
  box-shadow: 0 0 5px #1e2a31;

  a {
    color: inherit;
    display: block;
    padding: 10px 60px;
    text-decoration: none;
    margin: 0 -50px;

    &.active,
    &:hover {
      font-weight: bold;
      background: #ff52;
    }

    &.active {
      background: #ff55;
    }
  }

  p {
    text-align: start;
  }
}

pre {
  position: relative;
  padding: 10px 15px;
  width: 900px;
  border-radius: 5px;
  background: #5552;
  border: 1px solid #0005;
  font-size: 16px;
  font-weight: 500;
  overflow: auto;
  pointer-events: none;

  &::after {
    position: absolute;
    top: 0px;
    right: 0px;
    content: "🗒";
    cursor: pointer;
    padding: 10px;
    pointer-events: all;
  }

  &.copied::after {
    content: "✅";
  }
}

.container main {
  display: flex;
  flex-direction: column;
  text-align: start;
  overflow: auto;
  flex-grow: 1;
  padding: 20px 30px;
  padding-bottom: 10px;
}

.grow {
  flex-grow: 1;
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;

    aside {
      height: 320px;
      overflow: hidden;
    }
  }
}
</style>
