<template>
  <div :class="[{ 'open': isOpen }, verticalPositionClass, containerClass]" ref="container">
    <slot name="button">
      <a href=""
        :class="buttonClass"
        :id="id"
        aria-haspopup="true"
        :aria-expanded="isOpen"
        @click.prevent="handleClick"
        @keyup.esc="close"
        role="button"
        ref="button">
        <slot name="label">
          {{ label }} <span class="caret"></span>
        </slot>
      </a>
    </slot>
    <slot name="items">
      <ul :class="['dropdown-menu', horizontalPositionClass, menuClass]" :aria-labelledby="id" ref="ul">
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
    },
    horizontalPosition: {
      type: String,
      default: 'left',
      validator: (value) => {
        return value === 'left' || value === 'right';
      }
    },
    verticalPosition: {
      type: String,
      default: 'bottom',
      validator: (value) => {
        return value === 'bottom' || value === 'top';
      }
    },
    manual: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      closeTimeout: 200,
      isOpen: false
    };
  },
  computed: {
    horizontalPositionClass () {
      return this.horizontalPosition === 'left' ? '' : 'dropdown-menu-right';
    },
    verticalPositionClass () {
      return this.verticalPosition === 'bottom' ? 'dropdown' : 'dropup';
    }
  },
  methods: {
    handleClick () {
      if (this.manual) {
        return;
      }

      this.toggle();
    },
    toggle () {
      this.isOpen = !this.isOpen;
    },
    open () {
      this.isOpen = true;
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
