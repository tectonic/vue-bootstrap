<template>
  <div :class="[{ 'open': isOpen }, 'dropdown']">
    <div class="tags form-control" v-if="tagInput">
      <div class="tag" v-for="tag in tags">
        <span class="name">{{ tag }}</span><a class="close" tabindex="-1">×</a>
      </div>
      <input type="text"
        v-model="query"
        @input="onInput"
        class="tag-input"
        autocomplete="off"
        tabindex="0"
      />
    </div>
    <input type="text"
      v-else
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
    tagInput: {
      type: Boolean,
      default: false
    },
    initialTags: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      query: '',
      isOpen: false,
      items: [],
      currentItem: 0,
      selectedItem: {
        id: '',
        value: ''
      },
      tags: []
    };
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
      this.open();

      if (this.src && this.query) {
        this.fetchItems();
      }
    },
    fetchItems () {
      this.$http.get(this.src + this.query).then((response) => {
        this.items = response.data;

        // New items arrived - open drop-down menu
        this.open();
      }, (response) => {
        this.$emit('error', response);
      });
    },
    open () {
      this.isOpen = this.filteredItems.length > 0;
    },
    close () {
      this.isOpen = false;
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
    this.items = this.initialItems;
    this.tags = this.initialTags;

    if (!this.tagInput) {
      this.query = this.initialValue;

      this.selectedItem = {
        id: this.initialId,
        value: this.initialValue
      };
    }

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

  .dropdown-menu::-webkit-scrollbar {
    background: #fff;
    width: 14px;
  }

  .dropdown-menu::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 7px;
  }

  .dropdown-menu::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .dropdown-menu::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }

  .dropdown-menu::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  .tags {
    padding: 8px 8px 0 8px;
    height: auto;
    min-height: 37px;
  }

  .tag {
    border-radius: 2px;
    display: inline-block;
    border: 1px solid #d9d9d9;
    background-color: #ededed;
    white-space: nowrap;
    margin: -2px 5px 5px 0;
    height: 22px;
    vertical-align: top;
    cursor: default;
  }

  .tag:hover {
    border-color: #b9b9b9;
  }

  .tag .name {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 4px;
    vertical-align: top;
  }

  .tag .close {
    font-family: Arial;
    display: inline-block;
    font-size: 1.1em;
    line-height: 1.4em;
    margin-left: 5px;
    float: none;
    height: 100%;
    vertical-align: top;
    padding-right: 4px;
    outline: none;
  }

  .tag-input {
    border: 0;
    padding: 0;
    outline: none;
  }
</style>
