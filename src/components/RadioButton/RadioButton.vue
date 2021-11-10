<template>
  <label class="radio-inline">
    <input
      type="radio"
      :name="name"
      :checked="shouldBeChecked"
      :value="value"
      @change="updateInput"
    />
    {{ label }}
  </label>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      default: undefined,
    },
    modelValue: {
      default: undefined,
    },
    name: {
      type: String,
      default: "",
    },
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue === this.value;
    },
  },
  methods: {
    updateInput() {
      this.$emit("change", this.value);
    },
  },
};
</script>

<style scoped>
label,
input {
  cursor: pointer;
}
</style>
