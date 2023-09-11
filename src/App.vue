<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div class="container">
    <aside>
      <h1>Vue Tag Input</h1>
      A versatile tag input component built with Vue 3 Composition API.
      <hr />
      <p>
        <router-link to="/">Home</router-link>
        <router-link to="/getting-started">Getting Started</router-link>
        <details>
          <summary>Examples</summary>
        </details>
      </p>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}
a {
  color: inherit;
  display: block;
  padding: 10px;
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
  width: 400px;
  background: #1e2a31;
  overflow: auto;
  padding: 10px;
  color: #b0c4cf;
  box-shadow: 0 0 5px #1e2a31;
  p {
    text-align: start;
  }
}
.container main {
  overflow: auto;
  flex-grow: 1;
  padding: 10px;
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
