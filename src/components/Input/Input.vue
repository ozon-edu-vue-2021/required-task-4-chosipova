<template>
  <div class="form-group">
    <label class="mb-1" for="id">{{ label }}</label>
    <input
      :class="inputClasses"
      :value="value"
      :type="type"
      @input="updateInput"
      @blur="checkInput"
    />
    <div v-if="invalid" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script>
import InputMixin from "@/components/InputMixin";

export default {
  mixins: [InputMixin],
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  computed: {
    inputClasses() {
      return {
        "form-control": true,
        "is-invalid": this.invalid,
      };
    },
  },
  methods: {
    updateInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
