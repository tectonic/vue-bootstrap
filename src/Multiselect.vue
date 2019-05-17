<template>
  <div class="vue-multiselect">
    <div class="multiselect-filter" v-if="filter">
      <input type="text" :placeholder="placeholder" class="form-control" v-model="query">
    </div>
    <div class="multiselect-counter" v-if="counter">{{ selectedIds.length }}</div>
    <div class="multiselect-toggles">
      <div class="multiselect-subset" v-if="subset">
        {{ subsetLabel }}
      </div>
      <div class="checkbox multiselect-selectall" v-if="selectAll || randomizer">
        <label v-if="selectAll">
          <input :checked="allSelected()" type="checkbox" @click="toggleAll"> {{ selectAllLabel }}
        </label>
        <span v-if="selectAll && randomizer"> | </span>
        <span class="randomizer-toggle" v-if="randomizer">
          <a href="" @click.prevent="randomizerActive = !randomizerActive">{{ randomizerShow }}</a>
          <popover v-if="randomizerHelpText" :content="randomizerHelpText">
            <span :class="helpIconClass"></span>
          </popover>
        </span>
      </div>
      <multiselect-randomizer
        v-if="randomizerActive"
        :ids="allIds"
        @randomized="applyRandomSelection"
        :randomizer-how-many="randomizerHowMany"
        :randomizer-button="randomizerButton">
      </multiselect-randomizer>
    </div>
    <multiselect-list
      :options="tree"
      :name="name"
      :id-property="idProperty"
      :value-property="valueProperty"
      :extra-property="extraProperty"
      :subset="subset"
      :subsetType="subsetType"
      :subsetName="subsetName"
      :selectedSubsetOptions="selectedSubsetOptions"
      :infoIconClass="infoIconClass">
      <template scope="{item}">
        <slot :item="item"></slot>
      </template>
    </multiselect-list>
  </div>
</template>

<script>
import MultiselectList from './MultiselectList.vue';
import MultiselectRandomizer from './MultiselectRandomizer.vue';
import Popover from './Popover.vue';

export default {
  data () {
    return {
      tree: [],
      randomizerActive: false,
      query: ''
    };
  },
  components: {
    MultiselectList,
    MultiselectRandomizer,
    Popover
  },
  props: {
    name: {
      type: String,
      default: 'multiselect[]'
    },
    filter: {
      type: Boolean,
      default: true
    },
    counter: {
      type: Boolean,
      default: true
    },
    selectAll: {
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
    idProperty: {
      type: String,
      default: 'id'
    },
    valueProperty: {
      type: String,
      default: 'name'
    },
    extraProperty: {
      type: String,
      default: 'extra'
    },
    randomizer: {
      type: Boolean,
      default: false
    },
    randomizerShow: {
      type: String,
      default: 'Random selection'
    },
    randomizerHowMany: {
      type: String,
      default: 'How many?'
    },
    randomizerHelpText: {
      type: String
    },
    randomizerButton: {
      type: String,
      default: 'Go'
    },
    subset: {
      type: Boolean,
      default: false
    },
    subsetType: {
      type: String,
      default: 'radio',
      validator: (value) => {
        return value === 'radio' || value === 'checkbox';
      }
    },
    subsetName: {
      type: String,
      default: 'subset'
    },
    subsetLabel: {
      type: String,
      default: 'Default'
    },
    selectedSubsetOptions: {
      type: Array,
      default: () => []
    },
    infoIconClass: {
      type: String,
      default: 'glyphicon glyphicon-info-sign'
    },
    helpIconClass: {
      type: String,
      default: 'glyphicon glyphicon-question-sign'
    }
  },
  computed: {
    flatTree () {
      const options = [];

      const flattenTree = option => {
        if (this.hasChildren(option)) {
          option.children.forEach(flattenTree);
          return;
        }

        options.push(option);
      };

      this.tree.forEach(flattenTree);

      return options;
    },
    allIds () {
      return this.flatTree.map(o => o[this.idProperty]);
    },
    selectedIds () {
      return this.flatTree.filter(o => o.selected).map(o => o[this.idProperty]);
    }
  },
  watch: {
    query () {
      const mapOptions = option => {
        if (this.hasChildren(option)) {
          option.children.map(mapOptions);
        }

        option.visible = !this.hasChildren(option)
          ? option[this.valueProperty].toLowerCase().indexOf(this.query.toLowerCase()) !== -1
          : true;

        return option;
      };

      // Adjust option visibility based on query
      this.tree = this.tree.map(mapOptions);
    },
    options (newOptions, oldOptions) {
      if (JSON.stringify(newOptions) === JSON.stringify(oldOptions)) {
        return;
      }

      this.buildTree(newOptions);
    },
    selectedOptions (newOptions, oldOptions) {
      if (JSON.stringify(newOptions) === JSON.stringify(oldOptions)) {
        return;
      }

      this.buildTree(this.options, newOptions);
    },
    selectedIds () {
      this.$emit('selected', this.selectedIds);
    }
  },
  methods: {
    hasChildren (option) {
      return option.children && option.children.length;
    },
    allSelected () {
      return this.tree.length > 0 && this.allIds.length === this.selectedIds.length;
    },
    toggleAll () {
      const allSelected = this.allSelected();

      const mapOptions = option => {
        option.selected = !allSelected;

        if (this.hasChildren(option)) {
          option.children.map(mapOptions);
        }

        return option;
      };

      this.tree = this.tree.map(mapOptions);
    },
    applyRandomSelection (ids) {
      const mapOptions = option => {
        option.selected = ids.includes(option[this.idProperty]);

        if (this.hasChildren(option)) {
          option.children.map(mapOptions);
        }

        return option;
      };

      this.tree = this.tree.map(mapOptions);
    },
    buildTree (options, selectedOptions = []) {
      const mapOptions = option => {
        option.selected = selectedOptions.includes(option[this.idProperty]) ||
          selectedOptions.includes(String(option[this.idProperty]));

        option.visible = true;

        if (this.hasChildren(option)) {
          option.children.map(mapOptions);
        }

        return option;
      };

      // Clone the array first
      this.tree = JSON.parse(JSON.stringify(options)).map(mapOptions);
    }
  },
  created () {
    this.buildTree(this.options, this.selectedOptions);
  }
};
</script>

<style scoped>
  .vue-multiselect {
    position: relative;
  }

  .multiselect-filter {
    margin-bottom: 4px;
  }

  .multiselect-toggles {
    padding: 0 9px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .multiselect-toggles .multiselect-selectall {
    width: 45%;
    float: left;
  }

  .multiselect-toggles .multiselect-subset {
    width: 45%;
    float: right;
    text-align: right;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .multiselect-toggles .checkbox + .checkbox {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .multiselect-counter {
    float: right;
    margin: 0 0 5px 0;
    height: 38px;
    min-width: 40px;
    display: inline-block;
    padding: 5px 10px;
    background: #666;
    border-radius: 2px;
    color: #fff;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
  }
</style>
