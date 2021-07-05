# TagInput

![tag-input.gif](tag-input.gif)

A versetile tag input component built with Vue 3 Composition API

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

