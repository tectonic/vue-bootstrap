/**
 * Prepend a protocol to the input field's value (https:// by default), dispatches
 * a native input event (CustomEvent)
 *
 * Example of use:
 *
 * <input type="text" v-format-url>
 */
import { customEvent } from '../lib/dom';

const HANDLER = 'v-bs-format-url-handler';

const bind = (el, binding, vnode) => {
  unbind(el);

  el[HANDLER] = event => {
    if (event.target.value && !event.target.value.match('^' + (binding.arg || 'https?') + '://')) {
      event.target.value = (binding.arg || 'https') + '://' + event.target.value;
      vnode.elm.dispatchEvent(customEvent('input'));
    }
  };

  el.addEventListener('focusout', el[HANDLER]);
};

const unbind = el => {
  el.removeEventListener('focusout', el[HANDLER]);
  delete el[HANDLER];
};

export const directive = {
  bind: bind,
  unbind: unbind
};

export const mixin = {
  directives: { formatUrl: directive }
};
