<template>
  <span>
    <span ref="trigger" @click="onClick" @mouseover="onMouseover" @mouseout="onMouseout" :aria-describedby="id">
      <slot></slot>
    </span>
    <transition :name="effect">
      <div ref="popover" v-if="isOpen" :class="['popover', { 'in': isOpen }, placement]" role="tooltip" :id="id">
        <div class="arrow"></div>
        <h3 class="popover-title" v-if="title">
          <slot name="title">{{ title }}</slot>
        </h3>
        <div class="popover-content">
          <slot name="content">
            <span v-html="content"></span>
          </slot>
        </div>
      </div>
    </transition>
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    placement: {
      type: String,
      default: 'top',
      validator: (value) => {
        return ['top', 'bottom', 'right', 'left'].indexOf(value) >= 0;
      }
    },
    effect: {
      type: String,
      default: 'fade'
    },
    trigger: {
      type: String,
      default: 'click',
      validator: (value) => {
        return ['click', 'hover', 'manual'].indexOf(value) >= 0;
      }
    }
  },
  data () {
    return {
      isOpen: false,
      id: 'popover-' + this._uid
    };
  },
  methods: {
    onClick () {
      if (this.trigger !== 'click') {
        return;
      }

      this.toggle();
    },
    onMouseover () {
      if (this.trigger !== 'hover') {
        return;
      }

      this.open();
    },
    onMouseout () {
      if (this.trigger !== 'hover') {
        return;
      }

      this.close();
    },
    toggle () {
      this.isOpen ? this.close() : this.open();
    },
    open () {
      this.isOpen = true;
      this.position();
    },
    close () {
      this.isOpen = false;
    },
    setPosition () {
      const popover = this.$refs.popover;
      let trigger = this.$refs.trigger;
      let top, left;

      // If the trigger contains elements position the popover in relation
      // to the first element found.
      if (trigger.children.length > 0) {
        trigger = this.$refs.trigger.children[0];
      }

      switch (this.placement) {
        case 'top':
          left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
          top = trigger.offsetTop - popover.offsetHeight;
          break;
        case 'left':
          left = trigger.offsetLeft - popover.offsetWidth;
          top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2;
          break;
        case 'right':
          left = trigger.offsetLeft + trigger.offsetWidth;
          top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2;
          break;
        case 'bottom':
          left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
          top = trigger.offsetTop + trigger.offsetHeight;
          break;
      }

      popover.style.top = top + 'px';
      popover.style.left = left + 'px';
    },
    position () {
      this.$nextTick(() => {
        this.setPosition();
      });
    }
  },
  mounted () {
    this.onClickOutside = (event) => {
      if (this.$el !== null && !this.$el.contains(event.target)) {
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
  .popover.in {
    display: block;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
