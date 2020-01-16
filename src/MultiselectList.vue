<template>
  <div :class="className()">
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
</style>
