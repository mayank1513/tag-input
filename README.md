# TagInput

![tag-input.gif](tag-input.gif)

A versetile tag input component built with Vue 3 Composition API.

[live demo](https://mayank1513.github.io/tag-input/demo.html)

> Please checkout our [Vue JS course](https://www.udemy.com/course/vuejs-complete-course-plus-guide/?referralCode=93BDA4A1FE3F73C37CD2![image](https://user-images.githubusercontent.com/25501269/124417288-71335100-dd76-11eb-94d7-5138b38b9437.png)
)
> Use code HAPPY_LEARNING or get in touch for additional discounts 

## Install
### npm
```
npm i @mayank1513/tag-input
```
or
```
pnpm i @mayank1513/tag-input
```
or
```
yarn add @mayank1513/tag-input
```

### cdn
```
    <script src="https://unpkg.com/vue@3.0.11"></script>
    <script src="https://unpkg.com/@mayank1513/tag-input"></script>
    <link rel="stylesheet" href="https://unpkg.com/@mayank1513/tag-input@0.1.2/dist/TagInput.css">
```
## Usage
### npm
```
<template>
    ...
    <tag-input v-model="tags" />
    ...
</template>

<script>
import TagInput from '@mayank1513/tag-input'
import '@mayank1513/tag-input/dist/TagInput.css'
...

export default {
  name: 'App',
  data() {
    return {
      tags: [],
      ...
    };
  },
  components: {
    TagInput,
    ...
  },
  ...
}
</script>
```

### cdn
basic usage
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/vue@3.0.11"></script>
    <script src="https://unpkg.com/@mayank1513/tag-input"></script>
    <link rel="stylesheet" href="https://unpkg.com/@mayank1513/tag-input@0.1.2/dist/TagInput.css">
</head>

<body>
    <div id="app">
        <tag-input></tag-input>
    </div>
</body>
<script>
    Vue.createApp({
        components: {
            TagInput
        }
    }).mount('#app')
</script>

</html>
```

advanced usage

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/vue@3.0.11"></script>
    <script src="https://unpkg.com/@mayank1513/vue-tag-input"></script>
    <link rel="stylesheet" href="https://unpkg.com/@mayank1513/vue-tag-input@0.0.1/dist/TagInput.css">
    <style>
        #app {
            font-family: Avenir, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;
            color: #2c3e50;
            margin-top: 60px;
            max-width: 1400px;
            margin: auto;
        }
        
        .main {
            text-align: start;
        }
    </style>
</head>

<body>
    <div id="app">
        <img class="logo" alt="Krishna Apps logo" src="https://raw.githubusercontent.com/mayank1513/tag-input/master/src/assets/logo.png" />
        <br />
        <h2>Presents</h2>
        <h1>Vue Tag Input</h1>
        <hr />
        <div class="main">
            <h1>Default options</h1>
            <tag-input v-model="tags" />
            <br />
            <span>Use <code>enter</code> key or <code>tab</code> key to create a new tag.</span>
            <h1>With custom delimiter and colors</h1>
            <tag-input tagBgColor="lightgreen" tagTextColor="darkgreen" :customDelimiter="customDelimiter" v-model="tags" />
            <br>
            <span>Use <code>enter</code> key or <code>tab</code> key or any of the custom delimeters to create a new
                tag.</span>
            <p>Custom delimiters: <code v-for="delim in customDelimiter" :key="delim"> "{{delim}}"</code></p>
            <br>
            <h1>Do not allow custom tags</h1>
            <tag-input :options="options" :allowCustom="false" tagBgColor="blue" tagTextColor="lightblue" :customDelimiter="customDelimiter" v-model="tags" />
            <br> Try entering tag that is not in options and hit <code>enter</code>
            <br>
            <span>Use <code>enter</code> key or <code>tab</code> key or any of the custom delimeters to create a new
                tag.</span>
            <p>Allowed Tags: <code v-for="tag in options" :key="tag"> "{{tag}}"</code></p>
            <p>Custom delimiters: <code v-for="delim in customDelimiter" :key="delim"> "{{delim}}"</code></p>
            <br>
            <h1>Provide options for autofill but also allow custom tags</h1>
            <tag-input :options="options" tagBgColor="blue" tagTextColor="lightblue" :customDelimiter="customDelimiter" v-model="tags" />
            <br>
            <span>Use <code>enter</code> key or <code>tab</code> key or any of the custom delimeters to create a new
                tag.</span>
            <p>Allowed Tags: <code v-for="tag in options" :key="tag"> "{{tag}}"</code></p>
            <p>Custom delimiters: <code v-for="delim in customDelimiter" :key="delim"> "{{delim}}"</code></p>
            <br>
        </div>
    </div>

    <script>
        Vue.createApp({
            data() {
                return {
                    tags: [],
                    customDelimiter: [',', ' '],
                    options: ['vue', 'composition', 'js', 'mytag1', 'mayank1513']
                };
            },
            components: {
                TagInput
            }
        }).mount('#app')
    </script>
</body>

</html>
```
