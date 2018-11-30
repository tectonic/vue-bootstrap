<template>
  <div :class="[{ 'open': isOpen }, 'dropdown']">
    <input type="text"
      v-model="query"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      @input="onInput"
      @blur="onBlur"
      @keydown.up="markPreviousItem"
      @keydown.down="markNextItem"
      @keydown.enter.prevent="selectItem"
      @keydown.esc="close"
      class="form-control"
      autocomplete="off"
      ref="input"
    />
    <ul class="dropdown-menu">
      <li v-for="(item, index) in filteredItems" v-bind:class="{ 'active': isMarked(index) }">
        <a href="#" v-on:mousedown.prevent="selectItem" v-on:mousemove="markItem(index)">{{ item.value }}</a>
      </li>
    </ul>
    <input type="hidden" :value="selectedItem.id" v-if="hiddenInputName" :name="hiddenInputName">
  </div>
</template>

<script>
import debounce from 'debounce';
import autocomplete from './mixins/autocomplete.js';

export default {
  mixins: [autocomplete],
  props: {
    initialItems: {
      type: Array,
      default: () => {
        return [];
      }
    },
    initialValue: {
      type: String,
      default: ''
    },
    initialId: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    hiddenInputName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedItem: {
        id: '',
        value: ''
      }
    };
  },
  methods: {
    selectItem () {
      this.selectedItem = this.filteredItems[this.currentItem];
      this.query = this.selectedItem.value;

      this.close();

      this.$emit('selected', this.selectedItem);
    },
    onBlur () {
      this.close();

      // If the input field contains initial value, reset selected
      // item to initial state.
      if (this.$refs.input.value === this.initialValue) {
        this.resetSelectedItem(this.initialId, this.initialValue);

        return;
      }

      // Otherwise, check whether input field contains a valid value.
      // The 'selectedItem' needs to hold the correct data for
      // the hidden field to be populated correctly on blur.
      const validItem = this.items.find(item => {
        return this.$refs.input.value.toLowerCase() === item.value.toLowerCase();
      });

      if (validItem) {
        this.selectedItem = validItem;
      } else {
        this.resetSelectedItem('', '');
      }
    },
    resetSelectedItem (id, value) {
      this.selectedItem = {
        id: id,
        value: value
      };

      this.query = value;
    }
  },
  mounted () {
    this.query = this.initialValue;
    this.items = this.initialItems;

    this.selectedItem = {
      id: this.initialId,
      value: this.initialValue
    };

    this.fetchItems = debounce(this.fetchItems, 200);
  }
};
</script>

<style scoped>
  .dropdown-menu {
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
