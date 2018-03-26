<template>
  <div :class="['panel', 'panel-'+type, panelClass]">
    <div class="panel-heading" v-if="hasHeading">
      <slot name="heading"></slot>
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
    }
  }
};
</script>
