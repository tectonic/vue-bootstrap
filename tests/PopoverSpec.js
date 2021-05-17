import Vue from 'vue';
import { expect } from 'chai';
import { mount, shallowMount } from '@vue/test-utils';
import Popover from '../src/Popover.vue';

Vue.config.devtools = false;
Vue.config.productionTip = false;

describe('Popover', () => {
  it('initialises with default data', () => {
    expect(typeof Popover.data).to.equal('function');

    const data = Popover.data();

    expect(data.isOpen).to.be.false;
    expect(data.id).to.be.a.string;
  });

  it('can be toggled', () => {
    const popover = shallowMount(Popover);

    popover.vm.toggle();

    expect(popover.vm.isOpen).to.be.true;
  });

  it('renders title and content', (done) => {
    const Parent = Vue.component('Parent', {
      template:  `<popover ref="popover" title="Hello world!">
                    <a class="btn btn-primary">Click me</a>
                    <span slot="content">This is the content.</span>
                  </popover>`,
      components: {
        Popover
      }
    });

    const parent = mount(Parent);
    const popover = parent.vm.$refs.popover;

    popover.open();

    Vue.nextTick(() => {
      expect(popover.$refs.popover.querySelector('.popover-title').textContent).to.equal('Hello world!');
      expect(popover.$refs.popover.querySelector('.popover-content').textContent).to.equal('This is the content.');

      done();
    });
  });

  it('closes on escape', () => {
    const popover = shallowMount(Popover);
    popover.vm.toggle();
    expect(popover.vm.isOpen).to.be.true;

    document.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Escape', 'keyCode': 27 }));

    expect(popover.vm.isOpen).to.be.false;
  });
});
