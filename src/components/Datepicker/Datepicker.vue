<template>
  <div class="form-group">
    <label class="mb-1" for="id">{{ label }}</label>
    <input
      id="id"
      :class="inputClasses"
      :value="value"
      type="date"
      @input="updateInput"
      @blur="checkInput"
      :max="maxDate"
      :min="minDate"
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
  data() {
    return {
      minDate: "1900-01-01",
    };
  },
  props: {
    label: {
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
  methods: {
    updateInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
