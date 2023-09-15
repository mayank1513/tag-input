<script setup lang="ts">
import { ref, watch, nextTick, onMounted, computed, InputHTMLAttributes } from "vue";
defineOptions({ name: "TagInput" });
export interface TagInputProps {
  modelValue: string[];
  options?: string[];
  validator?: string[] | RegExp | ((tag: string) => boolean | string[]);
  /**
   * - if RegExp or function returning boolean is provide it will only do validation
   * - if string[] or function returning string array is provided it will act as validator as well as supply options if not present
   */
  allowCustom?: boolean;
  showCount?: boolean;
  tagTextColor?: string;
  tagBgColor?: string;
  tagClass?: string;
  customDelimiter?: string[] | string;
  singleLine?: boolean
  inputProps?: InputHTMLAttributes
}

const props = withDefaults(defineProps<TagInputProps>(), {
  modelValue: () => [],
  options: undefined,
  validator: undefined,
  allowCustom: true,
  showCount: false,
  tagTextColor: "white",
  tagBgColor: "rgb(120, 54, 10)",
  tagClass: "",
  customDelimiter: () => [],
  singleLine: false
});
const emit = defineEmits(["update:modelValue"]);
// Tags
const tags = ref<string[]>(props.modelValue);
const tagsClass = ref(props.tagClass);
const newTag = ref("");
const focused = ref(false);
const activeOptionInd = ref(-1);
const customDelimiter = computed<string[] | string>(() => [
  ...new Set(
    (typeof props.customDelimiter == "string"
      ? props.customDelimiter.split("")
      : props.customDelimiter
    ).flatMap((delim) => delim.split(""))
  ),
]);

// handling duplicates
const duplicate = ref<string | null>(null);
const handleDuplicate = (tag: string) => {
  duplicate.value = tag;
  setTimeout(() => (duplicate.value = null), 1000);
  newTag.value = "";
};
const noMatchingTag = ref(false);
function handleNoMatchingTag() {
  noMatchingTag.value = true;
  setTimeout(() => (noMatchingTag.value = false), 500);
  let v = newTag.value;
  if (customDelimiter.value.includes(v.charAt(v.length - 1)))
    newTag.value = v.slice(0, v.length - 1);
}
const addTag = (tag: string) => {
  tag = tag.trim();
  if (!tag) {
    handleNoMatchingTag()
    return; // prevent empty tag
  }
  let options = props.options;
  if (props.validator !== undefined) {
    let v: boolean | string[] | RegExp | ((tag: string) => boolean | string[]) = props.validator;
    if (typeof v === 'function') v = v(tag);
    if (Array.isArray(v) && options === undefined) options = v;
    else if ((typeof v === 'boolean' && !v) || (v instanceof RegExp && !v.test(tag))) {
      handleNoMatchingTag();
      return;
    }
  }
  // only allow predefined tags when allowCustom is false
  if (!props.allowCustom && options && !options.includes(tag)) {
    //   display not a valid tag
    handleNoMatchingTag();
    return;
  }
  // return early if duplicate
  if (tags.value.includes(tag)) {
    handleDuplicate(tag);
    return;
  }
  tags.value.push(tag);
  newTag.value = ""; // reset newTag
  activeOptionInd.value = -1;
};
const addTagIfDelem = (tag: string) => {
  if (!customDelimiter.value || customDelimiter.value.length == 0) return;
  if (customDelimiter.value.includes(tag.charAt(tag.length - 1)))
    addTag(tag.slice(0, tag.length - 1));
};
const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};

// positioning and handling tag change
const tagsUl = ref<HTMLUListElement | null>(null);
const onTagsChange = () => {
  tagsUl.value?.style.setProperty("--tagBgColor", props.tagBgColor);
  tagsUl.value?.style.setProperty("--tagTextColor", props.tagTextColor);
  // scroll to end of tags
  tagsUl.value?.scrollTo(tagsUl.value.scrollWidth, 0);
  // emit value on tags change
  emit("update:modelValue", tags.value);
};
watch(tags, () => nextTick(onTagsChange), { deep: true });
onMounted(onTagsChange);

// options
const availableOptions = computed(() => {
  let options = props.options;
  if (options === undefined) {
    if (Array.isArray(props.validator)) options = props.validator;
    else if (typeof props.validator === 'function') {
      const v = props.validator(newTag.value);
      if (Array.isArray(v)) options = v;
    }
  }
  if (!options) return [];
  return options.filter((option) => newTag.value && !tags.value.includes(option) && option.match(new RegExp(newTag.value, 'i')));
});

const shouldDelete = ref<boolean>(false);
let timer: NodeJS.Timeout | null = null;

const deleteLastTag = () => {
  if (newTag.value.length === 0 && tags.value.length > 0) {
    if (shouldDelete.value) {
      timer && clearTimeout(timer);
      shouldDelete.value = false;
      removeTag(tags.value.length - 1);
    } else {
      shouldDelete.value = true;
      timer && clearTimeout(timer);
      timer = setTimeout(() => (shouldDelete.value = false), 3000);
    }
  }
};
const id = Math.random().toString(36).substring(7);
const inputElId = `tag-input${id}`
</script>

<template>
  <label :for="inputElId">
    <ul class="tags" ref="tagsUl" tabindex="0" :class="{ duplicate, focused, noMatchingTag, singleLine }">
      <li v-for="(tag, index) in tags" :key="tag" :class="{
        duplicate: tag === duplicate,
        tag: tagsClass.length == 0,
        del: shouldDelete && index === tags.length - 1,
        [tagsClass]: true,
      }">
        {{ tag }}
        <button class="delete" @click="removeTag(index)">x</button>
      </li>
      <div class="tag-input">
        <input v-model="newTag" :id="inputElId" type="text" autocomplete="off"
          @keydown.enter="addTag(activeOptionInd > -1 ? availableOptions[activeOptionInd] : newTag)"
          @keydown.prevent.tab="addTag(newTag)" @keydown.delete="deleteLastTag()" @input="addTagIfDelem(newTag)"
          @keydown.down="activeOptionInd = (activeOptionInd + 1) % availableOptions.length"
          @keydown.up="activeOptionInd = (availableOptions.length + activeOptionInd - 1) % availableOptions.length"
          placeholder="Enter tag" @focus="focused = true" @blur="focused = false" v-bind="inputProps" />

        <ul class="options">
          <li v-for="(option, i) in availableOptions" :key="option" @click="addTag(option)"
            :class="{ active: i === activeOptionInd }">
            {{ option }}
          </li>
        </ul>
      </div>
      <div v-if="showCount" class="count">
        <span>{{ tags.length }}</span> tags
      </div>
    </ul>
  </label>
  <small v-show="noMatchingTag" class="err">Custom tags not allowed</small>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.options {
  position: absolute;
  top: 35px;
  list-style-type: none;
  padding: 0;
  visibility: hidden;
  transition: visibility 1s;
  overflow: auto;
}

input:focus~.options {
  visibility: visible;
}

.options li {
  padding: 10px;
  background: #333;
  color: #eee;
  cursor: pointer;
}

.options li:hover,
.options li.active {
  background: #555;
}

.tag-input {
  position: relative;
  width: 250px;
}

.tags {
  --tagBgColor: rgb(250, 104, 104);
  --tagTextColor: white;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 10px;
  left: 10px;
  border-bottom: 1px solid #5558;
  cursor: text;

  &.singleLine {
    flex-wrap: nowrap;
    overflow: auto;
  }

  &.focused {
    border-bottom: 2px solid #55fa;
  }

  &.duplicate {
    border-bottom: 1px solid rgb(235, 27, 27);
  }

  &.noMatchingTag {
    outline: rgb(235, 27, 27);
    border: 1px solid rgb(235, 27, 27);
    animation: shake1 0.5s;
  }
}

.tag {
  background: var(--tagBgColor);
  padding: 5px;
  border-radius: 4px;
  color: var(--tagTextColor);
  white-space: nowrap;
  transition: 0.1s ease background;
}

.del {
  background: red;
}

.delete {
  color: var(--tagTextColor);
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
}

.tag.duplicate {
  background: rgb(235, 27, 27);
  animation: shake 1s;
}

input {
  all: unset;
}

.count {
  font-size: 0.8rem;
  white-space: nowrap;
  flex-grow: 1;
  text-align: end;
}

.count span {
  background: #eee;
  padding: 2px;
  border-radius: 2px;
}

.err {
  color: red;
}

@keyframes shake {

  10%,
  90% {
    transform: scale(0.9) translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: scale(0.9) translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: scale(0.9) translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: scale(0.9) translate3d(4px, 0, 0);
  }
}

@keyframes shake1 {

  10%,
  90% {
    transform: scale(0.99) translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: scale(0.98) translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: scale(1) translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: scale(0.98) translate3d(4px, 0, 0);
  }
}
</style>
