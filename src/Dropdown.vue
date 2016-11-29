<template>
  <div :class="[{ 'open': isOpen }, 'dropdown', containerClass]">
    <slot name="button">
      <a href=""
        :class="buttonClass"
        :id="id"
        aria-haspopup="true"
        :aria-expanded="isOpen"
        @click.prevent="toggle"
        @keyup.esc="close"
        ref="button">
        {{ label }} <span class="caret"></span>
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
    },
    label: {
      type: String,
      default: ''
    },
    buttonClass: {
      type: String,
      default: 'btn btn-default'
    },
    containerClass: {
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
