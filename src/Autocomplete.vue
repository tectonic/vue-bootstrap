<template>
  <div :class="[{ 'open': autocompleting }, 'dropdown', dropdownClass]">
    <slot
      :autocomplete-bindings="{ value: query }"
      :autocomplete-handlers="{
        input: (e) => { this.onInput(e.target.value) },
        blur: (e) => { this.onBlur(e.target.value) },
        keydown: onKeydown,
      }"
    ></slot>
    <ul class="dropdown-menu">
      <li v-for="(item, index) in autocompleteItems" :class="{ 'active': isMarked(index) }">
        <a href="" @mousedown.prevent="selectItem" @mousemove="markItem(index)">
          {{ item.value }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import debounce from 'debounce';

export default {
  props: {
    initialItems: {
      type: Array,
      default: () => []
    },
    initialQuery: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 0
    },
    clearOnSelect: {
      type: Boolean,
      default: false
    },
    partialInput: {
      type: Boolean,
      default: false
    },
    autocompleteOnBlur: {
      type: Boolean,
      default: false
    },
    dropdownClass: {
      type: String,
      default: ''
    },
    autocompleteKeys: {
      type: Array,
      default: () => [13]
    }
  },
  data () {
    return {
      availableItems: this.initialItems,
      query: this.initialQuery,
      autocompleting: false,
      currentItem: 0
    };
  },
  computed: {
    autocompleteItems () {
      if (!this.query) {
        return [];
      }

      // Filter items by query
      let autocompleteItems = this.src ? this.availableItems : this.availableItems.filter(item => {
        return item.value.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
      });

      if (this.limit !== 0) {
        autocompleteItems = autocompleteItems.slice(0, this.limit);
      }

      return autocompleteItems;
    }
  },
  methods: {
    onInput (value) {
      this.query = value;

      this.autocomplete();

      if (this.src && this.query) {
        this.fetchItems();
      }
    },
    onBlur (value) {
      this.stopAutocomplete();

      if (this.autocompleteOnBlur && this.partialInput && value) {
        this.query = '';
        this.$emit('autocompleted', value);
        return;
      }

      const validSelection = this.availableItems.find(item => {
        return value.toLowerCase() === item.value.toLowerCase();
      });

      if (!validSelection) {
        this.query = '';
        this.$emit('reset');
      }
    },
    onKeydown (e) {
      // up
      if (e.keyCode === 38) {
        this.markPreviousItem();
      }
      // down
      if (e.keyCode === 40) {
        this.markNextItem();
      }
      // enter (or any defined autocomplete keys)
      if (this.autocompleteKeys.includes(e.keyCode)) {
        e.preventDefault();
        this.selectItem();
      }
      // esc
      if (e.keyCode === 27) {
        this.stopAutocomplete();
      }
      // backspace
      if (e.keyCode === 8) {
        this.$emit('deleted', e.target.value);
      }
    },
    fetchItems () {
      this.$http.get(this.src + this.query).then((response) => {
        this.availableItems = response.data;

        // New items arrived - trigger autocomplete
        this.autocomplete();
      }, (response) => {
        this.$emit('error', response);
      });
    },
    autocomplete () {
      this.autocompleting = this.autocompleteItems.length > 0;
    },
    stopAutocomplete () {
      this.autocompleting = false;
      this.currentItem = 0;
    },
    isMarked (index) {
      return this.currentItem === index;
    },
    markPreviousItem () {
      if (this.currentItem === 0) {
        this.currentItem = this.autocompleteItems.length - 1;
      } else {
        this.currentItem--;
      }
    },
    markNextItem () {
      if (this.currentItem < this.autocompleteItems.length - 1) {
        this.currentItem++;
      } else {
        this.currentItem = 0;
      }
    },
    markItem (index) {
      this.currentItem = index;
    },
    selectItem () {
      const item = this.autocompleteItems[this.currentItem];

      if (item && this.autocompleting) {
        this.$emit('autocompleted', item);
        this.query = this.clearOnSelect ? '' : item.value;
        this.stopAutocomplete();

        return;
      }

      if (this.partialInput) {
        this.$emit('autocompleted', this.query);
        this.query = this.clearOnSelect ? '' : this.query;
        this.stopAutocomplete();
      }
    }
  },
  mounted () {
    this.fetchItems = debounce(this.fetchItems, 200);
  }
};
</script>

<style scoped>
  .dropdown-menu {
    width: 100%;
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
