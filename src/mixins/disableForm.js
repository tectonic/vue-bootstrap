/**
 * Disable all form elements
 *
 * Example of use:
 *
 * <form method="post" v-disable-form>...</form>
 */
const bind = (el, binding, vnode) => {
  // Handle the v-disable-form="false" case
  if (
    binding.hasOwnProperty('value') &&
    binding.value === false
  ) {
    return;
  }

  const tags = ['input', 'button', 'textarea', 'select'];

  tags.forEach(tagName => {
    const nodes = el.getElementsByTagName(tagName);

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].disabled = true;
      nodes[i].tabIndex = -1;
    }
  });
};

export const directive = {
  bind: bind
};

export const mixin = {
  directives: { disableForm: directive }
};
