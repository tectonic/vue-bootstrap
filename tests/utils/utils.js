import Vue from 'vue';

/**
 * Initialise and mount a component for testing purposes
 */
export function initVM (Component, propsData) {
  const VM = Vue.extend(Component);

  return new VM({
    propsData: propsData
  }).$mount();
}
