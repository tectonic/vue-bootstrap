<template>
  <div :class="className()">
    <div v-if="showNothingFound" class="multiselect-nothing-found">
      <div class="title">{{ nothingFoundLabel }}</div>
    </div>
    <multiselect-option
      v-for="option in options"
      :option="option"
      :key="option[idProperty]"
      :level="level"
      :name="name"
      :id-property="idProperty"
      :value-property="valueProperty"
      :extra-property="extraProperty"
      v-bind="$attrs"
      :disabled="disabled"
    >
      <template>
        <slot :item="option"></slot>
      </template>
    </multiselect-option>
  </div>
</template>

<script>
import MultiselectOption from './MultiselectOption.vue';

export default {
  inheritAttrs: false,
  components: {
    MultiselectOption
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    },
    name: String,
    idProperty: String,
    valueProperty: String,
    extraProperty: String,
    showNothingFound: {
      type: Boolean,
      default: false
    },
    nothingFoundLabel: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    topLevel () {
      return this.level === 0;
    }
  },
  methods: {
    className () {
      return this.topLevel
        ? 'multiselect-options'
        : 'multiselect-options-level-' + this.level;
    }
  }
};
</script>

<style scoped>
  .multiselect-options {
    border: 1px solid #ddd;
    border-radius: 2px;
    clear: both;
    height: 202px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: white;
  }

  .multiselect-nothing-found {
    padding: 15px 12px;
  }
</style>
