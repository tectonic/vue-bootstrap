<template>
  <div :class="[{ 'open': isOpen }, 'dropdown']">
    <slot name="button">
      <a href=""
        class="btn btn-default dropdown-toggle"
        type="button"
        :id="id"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
        @click.prevent="toggle"
        @keyup.esc="isOpen = false"
        ref="button">
        Dropdown <span class="caret"></span>
      </a>
    </slot>
    <ul class="dropdown-menu" :aria-labelledby="id">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    toggle () {
      this.isOpen = (this.isOpen) ? false : true;
    },
    close () {
      this.isOpen = false;
    }
  },
  data () {
    return {
      isOpen: false,
    };
  },
  mounted () {
    const button = this.$refs.button;

    button.addEventListener('blur', e => {
      setTimeout(() => {
        this.close();
      }, 200);
    });
  }
};
</script>

<style>
</style>
