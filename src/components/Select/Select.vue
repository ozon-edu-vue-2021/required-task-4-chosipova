<template>
  <select class="form-control" @input="updateInput">
    <option value="" disabled selected></option>
    <option v-for="option in options" :key="option._id">
      {{ option[textValue] }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: null,
    },
    textValue: {
      type: String,
      default: "",
    },
    value: {
      type: String,
    },
  },
  methods: {
    updateInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style scoped>
option:first-child {
  display: none;
}
select {
  cursor: pointer;
}
</style>
