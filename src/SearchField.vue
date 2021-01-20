<template>
  <div
    class="search-field"
    tabindex="0"
    role="combobox"
    :aria-expanded="isOpen"
    aria-autocomplete="list"
    aria-haspopup="listbox"
    v-on-click-outside="close"
    @focus="onFocus"
  >
    <div class="form-control" :disabled="disabled">
      <div class="search-result">
        {{ selectedItem[valueProperty] }}
      </div>
    </div>
    <div v-if="isOpen" class="search-panel">
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
            ref="input"
          />
          <slot name="search-icon">
            <span class="glyphicon glyphicon-search search-icon"></span>
          </slot>
        </template>
        <template
          slot="items"
          scope="{ autocompleteItems, searching, isMarked, markItem, selectItem }"
        >
          <div class="autocomplete-items">
            <div v-if="!autocompleteItems.length && searching">
              {{ searchingLabel }}
            </div>
            <ul v-else class="list-unstyled" role="listbox">
              <li v-for="(item, index) in autocompleteItems">
                <a
                  href
                  role="option"
                  :aria-selected="item[idProperty] === selectedItem[idProperty]"
                  @mousedown.prevent="selectItem"
                  @mousemove="markItem(index)"
                >
                  <b v-if="isMarked(index)">
                    {{ item[valueProperty] }}
                  </b>
                  <template v-else>
                    {{ item[valueProperty] }}
                  </template>
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

    selectedItem[this.idProperty] = this.initialId;
    selectedItem[this.valueProperty] = this.initialValue;

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
      type: [String, Number],
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle () {
      if (this.disabled) {
        return;
      }

      this.isOpen = !this.isOpen;
    },
    open () {
      if (this.disabled) {
        return;
      }

      this.isOpen = true;
    },
    close () {
      this.isOpen = false;
    },
    handleAutocomplete (item) {
      this.selectedItem = item;
      this.$emit('selected', this.selectedItem);
      this.close();
    },
    onFocus () {
      if (!this.isOpen) {
        this.open();
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    }
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
    user-select: none;
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

  .search-panel {
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
