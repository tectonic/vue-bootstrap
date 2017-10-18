/**
 * Detect a click outside of an element and execute a callback function
 *
 * Import and install the mixin and add a 'v-on-click-outside' attribute to an element:
 *
 * <div v-on-click-outside="callback"></div>
 */
const HANDLER = 'v-bs-click-outside-handler';

const bind = (el, binding) => {
  const callback = binding.value;
  let macrotaskEnded = false;

  setTimeout(() => {
    macrotaskEnded = true;
  }, 0);

  unbind(el);

  el[HANDLER] = (event) => {
    if (macrotaskEnded && !(el === event.target) && !el.contains(event.target)) {
      return callback(event);
    }
  };

  document.documentElement.addEventListener('click', el[HANDLER], false);
};

const unbind = (el) => {
  document.documentElement.removeEventListener('click', el[HANDLER], false);
  delete el[HANDLER];
};

export const directive = {
  bind: bind,
  unbind: unbind
};

export const mixin = {
  directives: { onClickOutside: directive }
};
