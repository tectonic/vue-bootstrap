<template>
  <div>
    <transition enter-class=""
      enter-to-class=""
      enter-active-class=""
      leave-class=""
      leave-active-class=""
      leave-to-class=""
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave">
      <div v-show="isVisible"
        ref="modal"
        :class="['modal', 'fade', { 'in': isIn }]"
        :id="id"
        :aria-labelledby="uniqueId()"
        :aria-hidden="show"
        tabindex="-1"
        role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" aria-label="Close" @click.prevent="close">
                <slot name="close"><span aria-hidden="true">&times;</span></slot>
              </button>
              <h4 class="modal-title" :id="uniqueId()">
                <slot name="title">{{ title }}</slot>
              </h4>
            </div>
            <div class="modal-body">
              <slot name="body">{{ body }}</slot>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click.prevent="close">Close</button>
              <button type="button" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div v-if="isVisible" ref="backdrop" :class="['modal-backdrop', 'fade', { 'in': isIn }]"></div>
  </div>
</template>

<script>
import { addClass, removeClass, hasScrollbar, scrollbarWidth } from './lib/dom.js';

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal title'
    },
    body: {
      type: String,
      default: 'One fine body...'
    },
    id: {
      type: String
    }
  },
  data () {
    return {
      isVisible: false,
      isIn: false
    };
  },
  watch: {
    show (value) {
      this.isVisible = value ? true : false;
    }
  },
  methods: {
    uniqueId () {
      return 'modal-title-' + this._uid;
    },
    close () {
      this.$emit('closed');
      this.$emit('update:show', false);
    },
    onBeforeEnter () {
      // Adjust padding on the body accounting for the scrollbar width,
      // wchich is not going to be visible while the modal is open.
      if (hasScrollbar(document.documentElement)) {
        document.body.style.paddingRight = `${scrollbarWidth()}px`;
      }

      // Add the .modal-open class to the body
      addClass(document.body, 'modal-open');
    },
    onEnter () {
    },
    onAfterEnter () {
      this.isIn = true;
    },
    onBeforeLeave () {
    },
    onLeave () {
      this.isIn = false;
    },
    onAfterLeave () {
      // Reset padding on the body
      document.body.style.paddingRight = null;

      // Remove the .modal-open class from the body
      removeClass(document.body, 'modal-open');
    }
  }
};
</script>

<style scoped>
  .modal {
    display: block;
    transition: all .15s;
  }
</style>
