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
        role="button"
        ref="button">
        <slot name="label">
          {{ label }} <span class="caret"></span>
        </slot>
      </a>
    </slot>
    <slot name="items">
      <ul class="dropdown-menu" :aria-labelledby="id">
        <slot></slot>
      </ul>
    </slot>
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
      closeTimeout: 200,
      isOpen: false,
    };
  },
  mounted () {
    const button = this.$refs.button;

    button.addEventListener('blur', e => {
      // Wait in case any of the links were clicked, prevent the dropdown from closing too soon.
      setTimeout(() => {
        this.close();
      }, this.closeTimeout);
    });
  }
};
</script>

<style>
</style>