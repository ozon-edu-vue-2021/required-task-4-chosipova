<template>
  <div class="form-group">
    <label class="mb-1" for="id">{{ label }}</label>
    <input
      id="id"
      :class="inputClasses"
      :value="value"
      type="date"
      @input="updateInput"
      @blur="blurInput"
      :max="maxDate"
      :min="minDate"
    />
    <div v-if="invalid" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invalid: false,
      minDate: "1900-01-01",
      error: "",
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    validators: {
      type: Array,
      default: null,
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    inputClasses() {
      return {
        "form-control": true,
        "is-invalid": this.invalid,
      };
    },
    maxDate() {
      const today = new Date(),
        dd =
          String(today.getDate()).length == 1
            ? `0${today.getDate()}`
            : today.getDate(),
        currentMonth = String(today.getMonth() + 1),
        mm = currentMonth.length == 1 ? `0${currentMonth}` : currentMonth,
        yy = today.getFullYear();
      let date = `${yy}-${mm}-${dd}`;
      return date;
    },
    checkDate() {
      return new Date(this.minDate) > new Date(this.value);
    },
  },
  inject: ["checkInput"],
  methods: {
    updateInput(e) {
      this.$emit("input", e.target.value);
    },
    blurInput() {
      this.checkInput(this);
    },
  },
};
</script>
