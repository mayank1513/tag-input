<script setup lang="ts">
</script>

<template>
  <div>
    <h1>Props</h1>
    <h2>autocompleteItems</h2>
    <pre>Type: string[]
Default: undefined</pre>
    <h2>validator</h2>
    <pre>Type: RegExp | ((tag: string, items?: AutocompleteItemType[]) => boolean) | "onlyAutocompleteItems"
Default: "onlyAutocompleteItems"</pre>
    <h2>validationMessage</h2>
    <pre>Type: string
Default: "Invalid tag: custom tags not allowed"</pre>
    <h2>autocompleteItems</h2>
    <pre>Type: string[] | ((tag: string) => string[] | Promise&lt;string[]&gt;) | undefined
Default: undefined</pre>
    <h2>showCount</h2>
    <pre>Type: boolean
Default: false</pre>
    <h2>tagTextColor</h2>
    <pre>Type: string
Default: "white"</pre>
    <h2>tagBgColor</h2>
    <pre>Type: string
Default: "rgb(120, 54, 10)"</pre>
    <h2>tagClass</h2>
    <pre>Type: string
Default: ""</pre>
    <h2>customDelimiter</h2>
    <pre>Type: string[] | string
Default: []</pre>
    <h2>singleLine</h2>
    <pre>Type: boolean
Default: false</pre>
    <h2>inputProps</h2>
    <pre>Type: InputHTMLAttributes | undefined
Default: undefined</pre>
  </div>
</template>
