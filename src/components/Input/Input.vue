<template>
  <div class="form-group">
    <label class="mb-1" for="id">{{ label }}</label>
    <input
      v-if="type == 'date'"
      id="id"
      :class="inputClasses"
      :value="value"
      :type="type"
      @input="updateInput"
      @blur="checkInput"
      :max="maxDate"
      :min="minDate"
    />
    <input
      v-else
      id="id"
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
const uniqueId = require("lodash.uniqueid");

export default {
  data() {
    return {
      invalid: false,
      minDate: "1900-01-01",
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    value: {
      type: String,
    },
    rule: {
      type: RegExp,
      default: undefined,
    },
    error: {
      type: String,
      default: "",
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    id() {
      return uniqueId("id");
    },
    inputClasses() {
      return [
        "form-control",
        {
          "is-invalid": this.invalid,
        },
      ];
    },
    maxDate() {
      const today = new Date(),
        dd =
          String(today.getDate()).length == 1
            ? `0${today.getDate()}`
            : today.getDate(),
        mm =
          String(today.getMonth() + 1).length == 1
            ? `0${today.getMonth() + 1}`
            : today.getMonth() + 1,
        yy = today.getFullYear();

      let date = `${yy}-${mm}-${dd}`;
      return date;
    },
  },
  methods: {
    updateInput(e) {
      this.$emit("input", e.target.value);
    },
    checkInput() {
      if (
        (this.value && this.rule && !this.value.match(this.rule)) ||
        this.value.length === 0
      ) {
        this.invalid = true;
        this.$emit("update:valid", false);
      } else if (
        this.type == "date" &&
        new Date(this.minDate) > new Date(this.value)
      ) {
        this.invalid = true;
        this.$emit("update:valid", false);
      } else {
        this.invalid = false;
      }
    },
  },
};
</script>
