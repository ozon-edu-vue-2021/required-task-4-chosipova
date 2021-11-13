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
      const validatorsMasseges = [];
      if (this.validators) {
        this.validators.forEach((validator) => {
          const validatorResult = validator(this.value);
          if (validatorResult) {
            validatorsMasseges.push(validatorResult);
          }
        });
      }
      if (validatorsMasseges.length) {
        this.invalid = true;
        this.error = validatorsMasseges[validatorsMasseges.length - 1];
        this.$emit("update:validForm", false);
      } else {
        this.invalid = false;
      }
    },
  },
  mounted() {
    this.bus.$on("submit", this.checkInput);
  },
};
