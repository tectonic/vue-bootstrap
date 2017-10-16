<template>
  <div>
    <template v-if="isParent">
      <div class="checkbox radio multiselect-option">
        <label :style="indentStyle()">
          <input type="checkbox" v-model="option.selected" @change="toggleParent">
          <strong>{{ option[valueProperty] }}</strong>
        </label>
      </div>
      <multiselect-list
        :level="level + 1"
        :options="option.children"
        :name="name"
        :id-property="idProperty"
        :value-property="valueProperty"
        :subset="subset"
        :subsetType="subsetType"
        :subsetName="$attrs.subsetName"
        :selectedSubsetOptions="$attrs.selectedSubsetOptions">
      </multiselect-list>
    </template>
    <template v-else>
      <div v-show="option.visible" class="checkbox radio multiselect-option">
        <template v-if="subset && option.selected">
          <multiselect-subset-radio-control
            v-if="subsetType === 'radio'"
            :option="option"
            :id-property="idProperty"
            :subsetName="$attrs.subsetName"
            :selectedSubsetOptions="$attrs.selectedSubsetOptions">
          </multiselect-subset-radio-control>
          <multiselect-subset-checkbox-control
            v-else
            :option="option"
            :id-property="idProperty"
            :subsetName="$attrs.subsetName"
            :selectedSubsetOptions="$attrs.selectedSubsetOptions">
          </multiselect-subset-checkbox-control>
        </template>
        <label :style="indentStyle()">
          <input type="checkbox" :name="name" v-model="option.selected" :value="option[idProperty]">
          {{ option[valueProperty] }}
        </label>
      </div>
    </template>
  </div>
</template>

<script>
import MultiselectSubsetCheckboxControl from './MultiselectSubsetCheckboxControl.vue';
import MultiselectSubsetRadioControl from './MultiselectSubsetRadioControl.vue';

export default {
  inheritAttrs: false,
  components: {
    MultiselectSubsetCheckboxControl,
    MultiselectSubsetRadioControl
  },
  props: {
    option: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    name: String,
    idProperty: String,
    valueProperty: String,
    subset: Boolean,
    subsetType: String
  },
  computed: {
    isParent () {
      return this.hasChildren(this.option);
    }
  },
  methods: {
    hasChildren (option) {
      return option.children && option.children.length;
    },
    indentStyle () {
      return {
        marginLeft: 20 * this.level + 'px'
      };
    },
    toggleParent () {
      const state = this.option.selected;

      const adjustTreeState = option => {
        if (this.hasChildren(option)) {
          option.children.map(adjustTreeState);
        }

        option.selected = state;
      };

      this.option.children.map(adjustTreeState);
    }
  },
  beforeCreate () {
    // Load the component in the beforeCreate hook to prevent a circular reference problem
    // https://vuejs.org/v2/guide/components.html#Circular-References-Between-Components
    this.$options.components.MultiselectList = require('./MultiselectList.vue');
  }
};
</script>

<style scoped>
  .multiselect-option {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    margin: 0;
  }

  .multiselect-option.header {
    font-weight: bold;
  }

  .multiselect-option .multiselect-subset-control {
    float: right;
  }

  .multiselect-option label {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
