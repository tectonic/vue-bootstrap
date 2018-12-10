<template>
  <autocomplete
    :initial-items="initialItems"
    :initial-query="initialValue"
    :src="src"
    :limit="limit"
    dropdown-class="dropdown-typeahead"
    @autocompleted="handleAutocomplete"
    @reset="handleReset"
    @error="$emit('error', response)"
  >
    <template scope="{ autocompleteBindings, autocompleteHandlers }">
      <input type="text"
        v-bind="autocompleteBindings"
        v-on="autocompleteHandlers"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        class="form-control"
        autocomplete="off"
      />
      <input type="hidden" :value="selectedItem.id" v-if="hiddenInputName" :name="hiddenInputName">
    </template>
  </autocomplete>
</template>

<script>
import Autocomplete from './Autocomplete.vue';

export default {
  components: {
    Autocomplete
  },
  props: {
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
    handleAutocomplete (item) {
      this.select(item.id, item.value);

      this.$emit('selected', this.selectedItem);
    },
    handleReset () {
      this.select('', '');
    },
    select (id, value) {
      this.selectedItem = {
        id: id,
        value: value
      };
    }
  },
  mounted () {
    this.select(this.initialId, this.initialValue);
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
