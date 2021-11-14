export default {
  name: "InputMixin",
  data() {
    return {
      invalid: false,
      error: null,
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    validForm: {
      type: Boolean,
      default: true,
    },
    validators: {
      type: Array,
      default: null,
    },
    bus: {},
  },
  methods: {
    checkInput() {
      for (let validator of this.validators) {
        const error = validator(this.value);
        if (error) {
          this.invalid = true;
          this.error = error;
          this.$emit("update:validForm", false);
          return;
        }
      }
      this.error = null;
      this.invalid = false;
    },
  },
  mounted() {
    this.bus.$on("submit", this.checkInput);
  },
};
