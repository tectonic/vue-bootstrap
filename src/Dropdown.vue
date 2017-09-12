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
      <ul :class="['dropdown-menu', menuClass]" :aria-labelledby="id" ref="ul">
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
    },
    menuClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      closeTimeout: 200,
      isOpen: false
    };
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen;
    },
    close () {
      this.isOpen = false;
    }
  },
  mounted () {
    this.onClickOutside = (event) => {
      if (!this.$refs.ul.contains(event.target) && !this.$refs.button.contains(event.target)) {
        this.close();
      }
    };

    document.addEventListener('click', this.onClickOutside);
  },
  beforeDestroy () {
    document.removeEventListener('click', this.onClickOutside);
  }
};
</script>

<style>
</style>
