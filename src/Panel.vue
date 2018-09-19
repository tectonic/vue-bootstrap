<template>
  <div :class="['panel', 'panel-'+type, panelClass]">
    <div :class="['panel-heading', { 'clearfix': hasExtra }]" v-if="hasHeading || hasExtra">
      <span class="pull-left" v-if="hasHeading && hasExtra">
        <slot name="heading"></slot>
      </span>
      <slot name="heading" v-else></slot>
      <span class="pull-right" v-if="hasExtra">
        <slot name="extra"></slot>
      </span>
    </div>
    <div class="panel-body">
      <slot></slot>
    </div>
    <div class="panel-footer" v-if="hasFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    panelClass: String
  },
  computed: {
    hasHeading () {
      return this.$slots['heading'] !== undefined;
    },
    hasFooter () {
      return this.$slots['footer'] !== undefined;
    },
    hasExtra () {
      return this.$slots['extra'] !== undefined;
    }
  }
};
</script>
