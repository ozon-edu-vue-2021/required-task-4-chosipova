<template>
  <div class="form-group" v-click-outside="hideDropDown">
    <label class="mb-1">{{ label }}</label>
    <input
      ref="inputField"
      :class="inputClasses"
      v-model="search"
      @focus="showDropDown"
      @blur="blurInput"
      @keydown.down="activeItemDown"
      @keydown.up="activeItemUp"
      @keydown.enter.prevent="activeItemEnter"
    />
    <div v-if="invalid" class="invalid-feedback">Выберите значение</div>
    <div class="drop-down-group" v-if="isDropdownOpen">
      <ul class="list-group" v-if="itemsAll.length">
        <li
          v-for="(item, index) in itemsAll"
          :key="item._id"
          @click="selectItem(item)"
          :class="{ 'is-active': index === itemActive }"
        >
          {{ item[textValue] }}
        </li>
      </ul>
      <div v-else class="empty">Ничего не найдено</div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { throttle } from "../../helpers.js";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      default: undefined,
    },
    textValue: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: null,
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
  data() {
    return {
      invalid: false,
      itemsAll: this.items,
      isDropdownOpen: false,
      throttledSearchItems: null,
      search: "",
      itemActive: 0,
    };
  },
  created() {
    this.throttledSearchItems = throttle(this.getNewValue, 2000);
  },
  watch: {
    search(newValue) {
      if (newValue) {
        this.throttledSearchItems(newValue);
      } else {
        this.itemsAll = this.items;
        this.$emit("input", null);
      }
    },
  },
  computed: {
    getValueName() {
      return this.value ? this.value[this.textValue] : undefined;
    },
    inputClasses() {
      return [
        "form-control",
        {
          "is-invalid": this.invalid,
        },
      ];
    },
  },
  inject: ["checkInput"],
  methods: {
    showDropDown() {
      this.isDropdownOpen = true;
    },
    hideDropDown() {
      this.isDropdownOpen = false;
    },
    selectItem(selectedItem) {
      this.search = selectedItem[this.textValue];
      this.$emit("input", selectedItem);
      this.$emit("update:valid", false);
      this.isDropdownOpen = false;
      this.invalid = false;
    },
    getNewValue(searchWord) {
      this.itemsAll = this.items.filter((item) =>
        item[this.textValue]
          .toLowerCase()
          .includes(searchWord ? searchWord.toLowerCase() : searchWord)
      );
      this.isDropdownOpen = true;
    },
    blurInput() {
      this.checkInput(this);
    },
    activeItemDown() {
      this.itemActive < this.itemsAll.length - 1
        ? (this.itemActive += 1)
        : (this.itemActive = 0);
    },
    activeItemUp() {
      this.itemActive > 0
        ? (this.itemActive -= 1)
        : (this.itemActive = this.itemsAll.length - 1);
    },
    activeItemEnter() {
      const newValue = this.itemsAll[this.itemActive];
      this.selectItem(newValue);
      this.itemActive = 0;
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
.drop-down-group {
  position: relative;
}
ul {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  max-height: 15rem;
  background: #fff;
  overflow: auto;
  border: 1px solid #00000020;
  border-radius: 0.25rem;
}
li {
  padding: 0.25rem 1rem;
  cursor: pointer;
  transition: 0.1s ease;
}
li:hover,
.is-active {
  background: #0275d8;
  color: #fff;
}
</style>
