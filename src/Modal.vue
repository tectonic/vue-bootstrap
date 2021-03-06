<template>
  <div>
    <transition
      v-bind="transitionClasses"
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
        :aria-labelledby="uniqueTitleId()"
        :aria-hidden="!isVisible"
        tabindex="-1"
        role="dialog"
        @keydown.enter.prevent="confirm"
        @keydown.esc.prevent="close"
        @click="onBackdropClick">
        <div class="modal-dialog" role="document">
          <slot name="before-content"></slot>
          <div class="modal-content">
            <div class="modal-header" v-if="header">
              <button type="button" class="close" aria-label="Close" @click.prevent="close" v-if="headerCloseButton">
                <slot name="close"><span aria-hidden="true">&times;</span></slot>
              </button>
              <h4 class="modal-title" :id="uniqueTitleId()">
                <slot name="title">{{ title }}</slot>
              </h4>
            </div>
            <div class="modal-body">
              <slot>{{ body }}</slot>
            </div>
            <div class="modal-footer" v-if="footer">
              <button type="button" class="btn btn-default" @click.prevent="close" v-if="closeButton">
                {{ closeButtonLabel }}
              </button>
              <button type="button" class="btn btn-primary" @click.prevent="confirm" v-if="confirmButton">
                {{ confirmButtonLabel }}
              </button>
            </div>
          </div>
          <slot name="after-content"></slot>
        </div>
      </div>
    </transition>
    <div v-if="isVisible" ref="backdrop" :class="['modal-backdrop', 'fade', { 'in': isIn }]"></div>
  </div>
</template>

<script>
import { addClass, removeClass, bodyIsOverflowing, scrollbarWidth } from './lib/dom.js';

export default {
  props: {
    value: {
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
    },
    header: {
      type: Boolean,
      default: true
    },
    headerCloseButton: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    confirmButton: {
      type: Boolean,
      default: true
    },
    confirmButtonLabel: {
      type: String,
      default: 'Confirm'
    },
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    closeButton: {
      type: Boolean,
      default: true
    },
    closeButtonLabel: {
      type: String,
      default: 'Close'
    }
  },
  data () {
    return {
      isVisible: false,
      isIn: false,
      transitionClasses: {
        'enter-class': '',
        'enter-to-class': '',
        'enter-active-class': '',
        'leave-class': '',
        'leave-to-class': '',
        'leave-active-class': ''
      }
    };
  },
  watch: {
    value (v) {
      if (v) {
        this.open();
      } else {
        this.close();
      }
    }
  },
  methods: {
    uniqueTitleId () {
      return 'v-bs-modal-title-' + this._uid;
    },
    open () {
      this.isVisible = true;
      this.$emit('opened');
    },
    close () {
      this.isVisible = false;
      this.$emit('closed');
    },
    confirm () {
      this.$emit('confirmed');

      if (this.closeOnConfirm) {
        this.close();
      }
    },
    onBackdropClick (event) {
      // This will ignore clicks on any elements inside the modal.
      if (this.$refs.modal === event.target) {
        this.close();
      }
    },
    onBeforeEnter () {
      // Adjust padding on the body accounting for the scrollbar width,
      // which is not going to be visible while the modal is open.
      if (bodyIsOverflowing()) {
        document.body.style.paddingRight = `${scrollbarWidth()}px`;
      }

      // Add the .modal-open class to the body
      addClass(document.body, 'modal-open');
    },
    onEnter () {
    },
    onAfterEnter () {
      this.isIn = true;

      // Focus on the modal - this allows to react to the Esc button press
      // from this point on.
      this.$refs.modal.focus();
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
  },
  mounted () {
    if (this.value) {
      this.open();
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
