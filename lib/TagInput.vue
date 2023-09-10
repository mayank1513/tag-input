<script setup lang="ts">
import { ref, watch, nextTick, onMounted, computed } from "vue";
defineOptions({ name: "TagInput" });
export interface TagInputProps {
  modelValue: string[];
  options?: string[];
  allowCustom?: boolean;
  showCount?: boolean;
  tagTextColor?: string;
  tagBgColor?: string;
  tagClass?: string;
  customDelimiter?: string[] | string;
}

const props = withDefaults(defineProps<TagInputProps>(), {
  modelValue: () => [],
  options: () => [],
  allowCustom: true,
  showCount: false,
  tagTextColor: "white",
  tagBgColor: "rgb(120, 54, 10)",
  tagClass: "",
  customDelimiter: () => [],
});
const emit = defineEmits(["update:modelValue"]);
// Tags
const tags = ref<string[]>(props.modelValue);
const tagsClass = ref(props.tagClass);
const newTag = ref("");
const id = Math.random().toString(36).substring(7);
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
  if (!tag) return; // prevent empty tag
  // only allow predefined tags when allowCustom is false
  if (!props.allowCustom && !props.options.includes(tag)) {
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
const paddingLeft = ref(10);
const tagsUl = ref<HTMLUListElement | null>(null);
const onTagsChange = () => {
  // position cursor
  const extraCushion = 15;
  tagsUl.value?.style.setProperty("--tagBgColor", props.tagBgColor);
  tagsUl.value?.style.setProperty("--tagTextColor", props.tagTextColor);
  paddingLeft.value = (tagsUl.value?.clientWidth || 0) + extraCushion;
  // scroll to end of tags
  tagsUl.value?.scrollTo(tagsUl.value.scrollWidth, 0);
  // emit value on tags change
  emit("update:modelValue", tags.value);
};
watch(tags, () => nextTick(onTagsChange), { deep: true });
onMounted(onTagsChange);

// options
const availableOptions = computed(() => {
  if (!props.options) return false;
  return props.options.filter((option) => !tags.value.includes(option));
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
</script>

<template>
  <div
    class="tag-input"
    :class="{ 'with-count': showCount, duplicate: noMatchingTag }"
  >
    <input
      v-model="newTag"
      type="text"
      :list="id"
      autocomplete="off"
      @keydown.enter="addTag(newTag)"
      @keydown.prevent.tab="addTag(newTag)"
      @keydown.delete="deleteLastTag()"
      @input="addTagIfDelem(newTag)"
      :style="{ 'padding-left': `${paddingLeft}px` }"
    />

    <datalist v-if="options" :id="id">
      <option v-for="option in availableOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </datalist>

    <ul class="tags" ref="tagsUl">
      <li
        v-for="(tag, index) in tags"
        :key="tag"
        :class="{
          duplicate: tag === duplicate,
          tag: tagsClass.length == 0,
          del: shouldDelete && index === tags.length - 1,
          [tagsClass]: true,
        }"
      >
        {{ tag }}
        <button class="delete" @click="removeTag(index)">x</button>
      </li>
    </ul>
    <div v-if="showCount" class="count">
      <span>{{ tags.length }}</span> tags
    </div>
  </div>
  <small v-show="noMatchingTag" class="err">Custom tags not allowed</small>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.tag-input {
  position: relative;
}

ul {
  --tagBgColor: rgb(250, 104, 104);
  --tagTextColor: white;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  max-width: 75%;
  overflow-x: auto;
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

.duplicate input {
  outline: rgb(235, 27, 27);
  border: 1px solid rgb(235, 27, 27);
  animation: shake1 0.5s;
}

input {
  width: 100%;
  padding: 10px;
}

.count {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  display: block;
  font-size: 0.8rem;
  white-space: nowrap;
}

.count span {
  background: #eee;
  padding: 2px;
  border-radius: 2px;
}

.with-count input {
  padding-right: 60px;
}

.with-count ul {
  max-width: 60%;
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
