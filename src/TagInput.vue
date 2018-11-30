<template>
  <div :class="[{ 'open': autocompleting }, 'dropdown']">
    <div class="tags form-control">
      <div class="tag" v-for="tag in tags">
        <span class="name">{{ tag }}</span><a class="close" tabindex="-1">×</a>
      </div>
      <input type="text"
        v-model="query"
        :id="id"
        :placeholder="placeholder"
        @input="onInput"
        @keydown.up="markPreviousItem"
        @keydown.down="markNextItem"
        @keydown.enter.prevent="selectItem"
        @keydown.esc="stopAutocomplete"
        class="tag-input"
        autocomplete="off"
        tabindex="0"
      />
    </div>
    <ul class="dropdown-menu">
      <li v-for="(item, index) in filteredItems" v-bind:class="{ 'active': isMarked(index) }">
        <a href="#" v-on:mousedown.prevent="selectItem" v-on:mousemove="markItem(index)">{{ item.value }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import debounce from 'debounce';
import autocomplete from './mixins/autocomplete.js';

export default {
  mixins: [autocomplete],
  props: {
    availableTags: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tags: []
    };
  },
  methods: {
    selectItem () {
      console.log('Tag selected!');
    }    
  },
  mounted () {
    this.items = this.availableTags;
    this.tags = this.value;

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
