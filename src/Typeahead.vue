<template>
  <div :class="[{ 'open': isDropdownOpen }, 'dropdown']">
    <input type="text"
      v-model="query"
      :id="id"
      :placeholder="placeholder"
      @input="onInput"
      @blur="isDropdownOpen = false"
      @keydown.up="markPreviousItem"
      @keydown.down="markNextItem"
      @keydown.enter.prevent="selectItem"
      @keydown.esc="resetDropdown"
      class="form-control"
      autocomplete="off"
    />
    <ul class="dropdown-menu">
      <li v-for="(item, index) in filteredItems" v-bind:class="{ 'active': isMarked(index) }">
        <a href="#" v-on:mousedown.prevent="selectItem" v-on:mousemove="markItem(index)">{{ item.value }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import debounce from 'debounce';
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    initialItems: {
      type: Array,
      default: () => {
        return [];
      }
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
      default: 10
    }
  },
  computed: {
    filteredItems () {
      if (!this.query) {
        return [];
      }

      const filteredItems = this.items.filter(item => {
        return item.value.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
      });

      return filteredItems.slice(0, this.limit);
    }
  },
  methods: {
    onInput () {
      if (this.src && this.query) {
        this.fetchItems();
      }

      this.isDropdownOpen = this.filteredItems.length > 0;
    },
    fetchItems() {
      Vue.http.get(this.src + this.query).then((response) => {
        this.items = response.data;
      }, (response) => {
        console.log('Typeahead: connection error');
      });
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
      this.query = this.filteredItems[this.currentItem].value;
      this.resetDropdown();
    },
    resetDropdown () {
      this.isDropdownOpen = false;
      this.currentItem = 0;
    }
  },
  data () {
    return {
      query: '',
      isDropdownOpen: false,
      items: [],
      currentItem: 0
    };
  },
  mounted () {
    this.query = this.value;
    this.items = this.initialItems;

    this.fetchItems = debounce(this.fetchItems, 300);
  }
};
</script>

<style>
</style>
