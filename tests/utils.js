import Vue from 'vue';

Vue.config.devtools = false;
Vue.config.productionTip = false;

/**
 * Initialise and mount a component for testing purposes
 */
export function initVM (Component, propsData) {
  const VM = Vue.extend(Component);

  return new VM({
    propsData: propsData
  }).$mount();
}
