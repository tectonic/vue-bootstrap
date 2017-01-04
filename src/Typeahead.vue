<template>
  <div :class="[{ 'open': isDropdownOpen }, 'dropdown']">
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
      @keydown.esc="resetDropdown"
      class="form-control"
      autocomplete="off"
      ref="input"
    />
    <ul class="dropdown-menu dropdown-menu-typeahead">
      <li v-for="(item, index) in filteredItems" v-bind:class="{ 'active': isMarked(index) }">
        <a href="#" v-on:mousedown.prevent="selectItem" v-on:mousemove="markItem(index)">{{ item.value }}</a>
      </li>
    </ul>
    <input type="hidden" :value="selectedItem.id" v-if="hiddenInputName" :name="hiddenInputName">
  </div>
</template>

<script>
import debounce from 'debounce';
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
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
    src: {
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
    limit: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    hiddenInputName: {
      type: String,
      default: ''
    },
    onSelect: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    filteredItems () {
      if (!this.query) {
        return [];
      }

      // Filter items by query
      let filteredItems = this.src ? this.items : this.items.filter(item => {
        return item.value.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
      });

      if (this.limit !== 0) {
        filteredItems = filteredItems.slice(0, this.limit);
      }

      return filteredItems;
    }
  },
  methods: {
    onInput () {
      this.openDropdown();

      if (this.src && this.query) {
        this.fetchItems();
      }
    },
    fetchItems () {
      Vue.http.get(this.src + this.query).then((response) => {
        this.items = response.data;

        // New items arrived - open drop-down menu
        this.openDropdown();
      }, (response) => {
        console.log('Typeahead: connection error');
      });
    },
    openDropdown () {
      this.isDropdownOpen = this.filteredItems.length > 0;
    },
    resetDropdown () {
      this.isDropdownOpen = false;
      this.currentItem = 0;
    },
    isMarked (index) {
      return this.currentItem === index;
    },
    markPreviousItem () {
      if (this.currentItem === 0) {
        this.currentItem = this.filteredItems.length - 1;
      } else {
        this.currentItem--;
      }
    },
    markNextItem () {
      if (this.currentItem < this.filteredItems.length - 1) {
        this.currentItem++;
      } else {
        this.currentItem = 0;
      }
    },
    markItem (index) {
      this.currentItem = index;
    },
    selectItem () {
      this.selectedItem = this.filteredItems[this.currentItem];
      this.query = this.selectedItem.value;

      this.resetDropdown();

      // Fire the callback
      this.onSelect(this.selectedItem);
    },
    onBlur () {
      this.resetDropdown();

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
  data () {
    return {
      query: '',
      isDropdownOpen: false,
      items: [],
      currentItem: 0,
      selectedItem: {
        id: '',
        value: ''
      }
    };
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

<style>
  .dropdown-menu-typeahead {
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
  }

  .dropdown-menu-typeahead::-webkit-scrollbar {
    width: 14px;
  }

  .dropdown-menu-typeahead::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 7px;
  }

  .dropdown-menu-typeahead::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .dropdown-menu-typeahead::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }

  .dropdown-menu-typeahead::-webkit-scrollbar-corner {
    background-color: transparent;
  }
</style>
