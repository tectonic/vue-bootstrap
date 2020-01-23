<template>
  <div class="search-field" v-on-click-outside="close">
    <div class="form-control" @click="toggle">
      <div class="search-result">
        {{ selectedItem[valueProperty] }}
      </div>
    </div>
    <div v-if="isOpen" class="search-box">
      <autocomplete
        :initial-items="initialItems"
        :src="src"
        :limit="10"
        :clear-on-select="true"
        :value-property="valueProperty"
        :show-all-available="true"
        :autohide="false"
        container-class="search-container"
        @autocompleted="handleAutocomplete"
        @error="$emit('error', response)"
      >
        <template scope="{ autocompleteBindings, autocompleteHandlers }">
          <input type="text"
            v-bind="autocompleteBindings"
            v-on="autocompleteHandlers"
            :name="name"
            :id="id"
            class="form-control"
            autocomplete="off"
          />
          <slot name="search-icon">
            <span class="glyphicon glyphicon-search search-icon"></span>
          </slot>
        </template>
        <template slot="items" scope="{ autocompleteItems, searching, markItem, selectItem }">
          <div class="autocomplete-items">
            <div v-if="!autocompleteItems.length && searching">
              {{ searchingLabel }}
            </div>
            <ul v-else class="list-unstyled">
              <li v-for="(item, index) in autocompleteItems">
                <a href="" @mousedown.prevent="selectItem" @mousemove="markItem(index)">
                  {{ item[valueProperty] }}
                </a>
              </li>
            </ul>
          </div>
        </template>
      </autocomplete>
    </div>
    <slot name="caret">
      <span class="caret"></span>
    </slot>
  </div>
</template>

<script>
import Autocomplete from './Autocomplete.vue';
import { mixin as clickOutside } from './mixins/clickOutside.js';

export default {
  components: {
    Autocomplete
  },
  mixins: [
    clickOutside
  ],
  data () {
    const selectedItem = {};

    selectedItem[this.idProperty] = '';
    selectedItem[this.valueProperty] = '';

    return {
      isOpen: false,
      selectedItem: selectedItem
    };
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    initialItems: {
      type: Array,
      default: () => []
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
    searchingLabel: {
      type: String,
      default: 'Searching...'
    },
    idProperty: {
      type: String,
      default: 'id'
    },
    valueProperty: {
      type: String,
      default: 'value'
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen;
    },
    close () {
      this.isOpen = false;
    },
    select (id, value) {
      this.selectedItem[this.idProperty] = id;
      this.selectedItem[this.valueProperty] = value;
    },
    handleAutocomplete (item) {
      this.select(item[this.idProperty], item[this.valueProperty]);
      this.$emit('selected', this.selectedItem);
      this.close();
    }
  },
  created () {
    this.select(this.initialId, this.initialValue);
  }
};
</script>

<style scoped>
  .search-field {
    position: relative;
  }

  .search-result {
    overflow-x: hidden;
    white-space: nowrap;
    padding-right: 20px;
    cursor: default;
  }

  .search-icon {
    font-size: 12px;
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .caret {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .search-box {
    width: 100%;
    margin-top: -5px;
    position: absolute;
    border: 1px solid #ccc;
    border-top: none;
    background: white;
    padding: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 999;
  }

  .autocomplete-items {
    overflow-y: auto;
    max-height: 200px;
    margin-top: 10px;
  }

  .autocomplete-items ul {
    margin-bottom: 0;
  }

  .autocomplete-items ul li {
    padding: 3px 0;
  }

  .autocomplete-items ul li a {
    display: inline-block;
    width: 100%;
  }
</style>
