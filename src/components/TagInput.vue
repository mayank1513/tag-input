<template>
  <div class="tag-input" :class="{ 'with-count': showCount, duplicate: noMatchingTag }">
    <input
      v-model="newTag"
      type="text"
      :list="id"
      autocomplete="off"
      @keydown.enter="addTag(newTag)"
      @keydown.prevent.tab="addTag(newTag)"
      @keydown.delete="newTag.length || removeTag(tags.length - 1)"
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

<script>
import { ref, watch, nextTick, onMounted, computed } from "vue";

export default {
  name: "TagInput",
  props: {
    name: { type: String, default: "" },
    modelValue: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] },
    allowCustom: { type: Boolean, default: true },
    showCount: { type: Boolean, default: false },
    tagTextColor: { type: String, default: "white" },
    tagBgColor: { type: String, default: "rgb(250, 104, 104)" },
    tagClass: { type: String, default: "" },
    customDelimiter: {
      type: [String, Array],
      default: () => [],
      validator: (val) => {
        if (typeof val == "string") return val.length == 1;
        for (let i = 0; i < val.length; i++) {
          if (typeof val[i] != "string" || val[i].length != 1) return false;
        }
        return true;
      },
    },
  },
  setup(props, { emit }) {
    // Tags
    const tags = ref(props.modelValue);
    const tagsClass = ref(props.tagClass);
    const newTag = ref("");
    const id = Math.random().toString(36).substring(7);
    const customDelimiter = [
      ...new Set(
        (typeof props.customDelimiter == "string"
          ? [props.customDelimiter]
          : props.customDelimiter
        ).filter((it) => it.length == 1)
      ),
    ];

    // handling duplicates
    const duplicate = ref(null);
    const handleDuplicate = (tag) => {
      duplicate.value = tag;
      setTimeout(() => (duplicate.value = null), 1000);
      newTag.value = "";
    };
    const noMatchingTag = ref(false);
    function handleNoMatchingTag() {
      noMatchingTag.value = true;
      setTimeout(() => (noMatchingTag.value = false), 500);
      let v = newTag.value;
      if (customDelimiter.includes(v.charAt(v.length - 1)))
        newTag.value = v.substr(0, v.length - 1);
    }
    const addTag = (tag) => {
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
    const addTagIfDelem = (tag) => {
      if (!customDelimiter || customDelimiter.length == 0) return;
      if (customDelimiter.includes(tag.charAt(tag.length - 1)))
        addTag(tag.substr(0, tag.length - 1));
    };
    const removeTag = (index) => {
      tags.value.splice(index, 1);
    };

    // positioning and handling tag change
    const paddingLeft = ref(10);
    const tagsUl = ref(null);
    const onTagsChange = () => {
      // position cursor
      const extraCushion = 15;
      tagsUl.value.style.setProperty("--tagBgColor", props.tagBgColor);
      tagsUl.value.style.setProperty("--tagTextColor", props.tagTextColor);
      paddingLeft.value = tagsUl.value.clientWidth + extraCushion;
      // scroll to end of tags
      tagsUl.value.scrollTo(tagsUl.value.scrollWidth, 0);
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

    return {
      tags,
      tagsClass,
      newTag,
      addTag,
      addTagIfDelem,
      removeTag,
      paddingLeft,
      tagsUl,
      availableOptions,
      id,
      duplicate,
      noMatchingTag
    };
  },
};
</script>

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

.duplicate input{
  outline: rgb(235, 27, 27);
  border: 1px solid rgb(235, 27, 27);
  animation: shake1 .5s;
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
