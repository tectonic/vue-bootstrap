<template>
  <div class="vue-multicheckbox">
    <div class="multicheckbox-filter" v-if="filter">
      <input
        type="text"
        :placeholder="placeholder"
        class="form-control"
        v-model="query"
      >
    </div>
    <div class="multicheckbox-toggles">
      <div
        class="checkbox multicheckbox-selectall subset"
        v-for="subset in subsets"
        :key="'subset-' + subset.id"
      >
        <label>
          <input
            type="checkbox"
            :checked="subsetSelected(subset)"
            :disabled="disabled"
            @click="toggleSubset(subset)"
          > {{ subset.name }}
        </label>
      </div>
      <div class="checkbox multicheckbox-selectall">
        <label>
          <input
            type="checkbox"
            :checked="allSelected"
            :disabled="disabled"
            @click="toggleAll"
          > {{ selectAllLabel }}
        </label>
      </div>
    </div>
    <div class="multicheckbox-options">
      <multicheckbox-option
        v-for="option in visibleOptions"
        :key="'option-' + option.id"
        :option="option"
        :subsets="subsets"
        :selection="selection"
        :subset-selection="subsetSelection"
        :disabled="disabled"
        @checked="handleChecked"
        @subsetChecked="handleSubsetChecked"
      />
    </div>
  </div>
</template>

<script>
import MulticheckboxOption from './MulticheckboxOption.vue';

export default {
  components: {
    MulticheckboxOption
  },
  data () {
    return {
      query: '',
      selection: JSON.parse(JSON.stringify(this.selectedOptions)),
      subsetSelection: JSON.parse(JSON.stringify(this.selectedSubsetOptions))
    };
  },
  props: {
    name: {
      type: String,
      default: 'multicheckbox[]'
    },
    filter: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Filter list'
    },
    selectAllLabel: {
      type: String,
      default: 'Select all'
    },
    options: {
      type: Array,
      default: () => []
    },
    selectedOptions: {
      type: Array,
      default: () => []
    },
    subsetName: {
      type: String,
      default: 'subset'
    },
    subsets: {
      type: Array,
      default: () => []
    },
    selectedSubsetOptions: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visibleOptions () {
      return this.options.filter(option => {
        return option.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
      });
    },
    allSelected () {
      return this.selection.length === this.options.length;
    },
    subsetSelected () {
      return subset => (this.subsetSelection[subset.id] || []).length === this.options.length;
    }
  },
  watch: {
    selection () {
      this.$emit('selected', this.selection, this.subsetSelection);
    },
    subsetSelection: {
      deep: true,
      handler: function () {
        this.$emit('selected', this.selection, this.subsetSelection)
      }
    }
  },
  methods: {
    toggleAll () {
      this.selection = this.allSelected
        ? []
        : this.options.map(option => option.id);
    },
    toggleSubset (subset) {
      this.$set(
        this.subsetSelection,
        subset.id,
        this.subsetSelected(subset)
          ? []
          : this.options.map(option => option.id)
      );
    },
    handleChecked (option, checked) {
      if (checked) {
        this.selection.push(option.id);
      } else {
        this.selection = this.selection.filter(id => id !== option.id);
      }
    },
    handleSubsetChecked (option, subset, checked) {
      if (checked) {
        this.$set(
          this.subsetSelection,
          subset.id,
          [...this.subsetSelection[subset.id], option.id]
        );
      } else {
        this.$set(
          this.subsetSelection,
          subset.id,
          this.subsetSelection[subset.id].filter(id => id !== option.id)
        );
      }
    }
  }
};
</script>

<style scoped>
  .vue-multicheckbox {
    position: relative;
  }

  .multicheckbox-filter {
    margin-bottom: 4px;
  }

  .multicheckbox-toggles {
    padding: 0 9px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .multicheckbox-toggles .multicheckbox-selectall {
    width: 40%;
    float: left;
  }

  .multicheckbox-toggles .multicheckbox-selectall.subset {
    width: 20%;
    float: right;
  }

  .multicheckbox-toggles .checkbox + .checkbox {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .multicheckbox-options {
    border: 1px solid #ddd;
    border-radius: 2px;
    clear: both;
    height: 202px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: white;
  }
</style>
