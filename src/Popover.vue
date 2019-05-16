<template>
  <span>
    <span ref="trigger" @click="onClick" @mouseover="onMouseover" @mouseout="onMouseout" :aria-describedby="id">
      <slot></slot>
    </span>
    <transition :name="effect">
      <div
        ref="popover"
        v-if="isOpen"
        :class="['popover', { 'in': isOpen }, placement, popoverClass]"
        role="tooltip"
        :id="id"
        v-on-click-outside="close"
      >
        <div class="arrow" ref="arrow"></div>
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
import { mixin as clickOutside } from './mixins/clickOutside.js';
import { isRtl } from './lib/dom.js';

export default {
  mixins: [
    clickOutside
  ],
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
    origin: {
      type: String,
      default: 'center',
      validator: (value) => {
        return ['top', 'bottom', 'right', 'left', 'center'].indexOf(value) >= 0;
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
    },
    appendTo: {
      type: String,
      default: 'body'
    },
    popoverClass: {
      type: String,
      default: ''
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
    triggerElement () {
      const trigger = this.$refs.trigger;

      // If the trigger contains multiple elements position the popover in relation
      // to the first element found.
      if (trigger.children.length > 0) {
        return trigger.children[0];
      }

      return trigger;
    },
    setPosition () {
      const popover = this.$refs.popover;
      const arrow = this.$refs.arrow;
      const arrowOffset = 20;
      const trigger = this.triggerElement();

      let top, left, arrowTop, arrowLeft;
      let documentElement;
      let containerScrollLeft, containerScrollTop;

      const container = (this.appendTo === 'body') ? document.body : document.querySelector(this.appendTo);

      if (this.appendTo === 'body') {
        documentElement = document.documentElement;

        containerScrollLeft = (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0);
        containerScrollTop = (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0);
      } else {
        containerScrollLeft = container.scrollLeft;
        containerScrollTop = container.scrollTop;
      }

      container.appendChild(popover);

      const arrowRect = arrow.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();

      // Calculate top position
      switch (this.placement) {
        case 'left':
        case 'right':
          switch (this.origin) {
            case 'top':
              top = containerScrollTop + triggerRect.top;
              arrowTop = arrowOffset;
              break;
            case 'bottom':
              top = containerScrollTop + triggerRect.top - (popoverRect.height - triggerRect.height);
              arrowTop = popoverRect.height - arrowOffset;
              break;
            default:
              top = containerScrollTop + triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
          }
          break;
        case 'top':
          top = containerScrollTop + triggerRect.top - popoverRect.height;
          break;
        case 'bottom':
          top = containerScrollTop + triggerRect.top + triggerRect.height;
          break;
      }

      // Calculate left position
      switch (this.placement) {
        case 'top':
        case 'bottom':
          switch (this.origin) {
            case 'left':
              left = containerScrollLeft + triggerRect.left;
              arrowLeft = arrowOffset;
              break;
            case 'right':
              left = containerScrollLeft + triggerRect.left - (popoverRect.width - triggerRect.width);
              arrowLeft = popoverRect.width - arrowOffset;
              break;
            default:
              left = containerScrollLeft + triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
          }
          break;
        case 'left':
          left = containerScrollLeft + triggerRect.left - popoverRect.width;
          break;
        case 'right':
          left = containerScrollLeft + triggerRect.left + triggerRect.width;
          break;
      }

      popover.style.top = top + 'px';
      popover.style.left = left + 'px';

      if (arrowTop) {
        arrow.style.top = arrowTop + 'px';
      }

      if (arrowLeft) {
        arrow.style.left = arrowLeft + 'px';
      }

      if (isRtl()) {
        popover.style.right = 'auto';
      }
    },
    position () {
      this.$nextTick(() => {
        this.setPosition();
      });
    }
  }
};
</script>

<style scoped>
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
