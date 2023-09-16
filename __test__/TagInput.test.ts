import { describe, test, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import TagInput from "@/lib/TagInput.vue";

describe.concurrent("TagInput", () => {
  let input;
  let wrapper;

  beforeEach(async () => {
    wrapper = await mount(TagInput, {});
    input = wrapper.find("input");
  });

  test("Add new tag on pressing tab/enter (default)", async ({ expect }) => {
    input.setValue("Tag1");
    input.trigger("keydown", { key: "tab" });
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1"]);
    input.setValue("Tag2");
    input.trigger("keydown", { key: "enter" });
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1", "Tag2"]);
  });

  test("Do not add empty tag", async ({ expect }) => {
    await wrapper.setProps({ modelValue: ["Tag1"] });
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1"]);
    input.setValue(" ");
    input.trigger("keydown", { key: "enter" });
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1"]);
  });

  test("Do not add duplicate tag", async ({ expect }) => {
    input.setValue("Tag1");
    input.trigger("keydown", { key: "tab" });
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1"]);
    input.setValue("Tag1");
    input.trigger("keydown", { key: "enter" });
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1"]);
  });

  test("Restrict tags to options provided", async ({ expect }) => {
    await wrapper.setProps({
      allowCustom: false,
      options: ["tag1", "tag2"],
      showCount: true,
    });
    await input.setValue("tag1");
    input.trigger("keydown", { key: "tab" });
    expect(wrapper.props("modelValue")).toStrictEqual(["tag1"]);
    input.setValue("NotInOption");
    input.trigger("keydown", { key: "enter" });
    expect(wrapper.props("modelValue")).toStrictEqual(["tag1"]);
  });

  test("Delete Tag", async ({ expect }) => {
    input.setValue("Tag1");
    input.trigger("keydown", { key: "tab" });
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1"]);
    input.trigger("keydown", { key: "delete" });
    input.trigger("keydown", { key: "delete" }); // need to press delete or backspace twice
    expect(wrapper.props("modelValue")).toStrictEqual([]);
  });

  test("Custom Delimiter", async ({ expect }) => {
    await wrapper.setProps({ customDelimiter: [",;", ":"] });
    input.setValue("Tag1,");
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1"]);
    input.setValue("Tag2;");
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1", "Tag2"]);
  });

  test("Custom Delimiter as a string", async ({ expect }) => {
    await wrapper.setProps({ customDelimiter: ",;" });
    input.setValue("Tag1,");
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1"]);
    input.setValue("Tag2;");
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1", "Tag2"]);
  });

  /** Validator and autocompleteItems */
  test("Restrict tags to autocompleteItems provided", async ({ expect }) => {
    await wrapper.setProps({
      validator: "onlyAutocompleteItems",
      autocompleteItems: ["tag1", "tag2"],
    });
    await input.setValue("tag1");
    input.trigger("keydown", { key: "tab" });
    expect(wrapper.props("modelValue")).toStrictEqual(["tag1"]);
    input.setValue("NotInAutocompleteItems");
    input.trigger("keydown", { key: "enter" });
    expect(wrapper.props("modelValue")).toStrictEqual(["tag1"]);
  });

  test("Validator RegExp", async ({ expect }) => {
    await wrapper.setProps({ validator: /tag/i });
    input.setValue("tag1");
    input.trigger("keydown", { key: "tab" });
    expect(wrapper.props("modelValue")).toStrictEqual(["tag1"]);
    input.setValue("NotInAutocompleteItems");
    input.trigger("keydown", { key: "enter" });
    expect(wrapper.props("modelValue")).toStrictEqual(["tag1"]);
  });

  test("Validator function", async ({ expect }) => {
    await wrapper.setProps({
      validator: (tag, options) => options.includes(tag),
      autocompleteItems: () => ["tag1", "tag2"],
    });
    await input.setValue("tag1");
    input.trigger("keydown", { key: "tab" });
    expect(wrapper.props("modelValue")).toStrictEqual(["tag1"]);
    input.setValue("NotInAutocompleteItems");
    input.trigger("keydown", { key: "enter" });
    expect(wrapper.props("modelValue")).toStrictEqual(["tag1"]);
  });

  test("Custom Delimiter with validator", async ({ expect }) => {
    await wrapper.setProps({ customDelimiter: ",;", validator: /tag/i });
    input.setValue("Tag1,");
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1"]);
    input.setValue("Tg2;");
    expect(wrapper.props("modelValue")).toStrictEqual(["Tag1"]);
  });
});
