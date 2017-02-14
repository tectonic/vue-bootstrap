import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils.js';
import Popover from '../src/Popover.vue';

describe('Popover', () => {
  it('initialises with default data', () => {
    expect(typeof Popover.data).to.equal('function');

    const data = Popover.data();

    expect(data.isOpen).to.be.false;
    expect(data.id).to.be.a.string;
  });

  it('can be toggled', () => {
    const vm = initVM(Popover);

    vm.toggle();

    expect(vm.isOpen).to.be.true;
  });

  it('renders title and content', (done) => {
    const vm = new Vue({
      template:  `<popover ref="test" title="Hello world!">
                    <a class="btn btn-primary">Click me</a>
                    <span slot="content">This is the content.</span>
                  </popover>`,
      components: {
        Popover
      }
    }).$mount();

    const popover = vm.$refs.test;

    popover.open();

    Vue.nextTick(() => {
      expect(popover.$el.querySelector('.popover-title').textContent).to.equal('Hello world!');
      expect(popover.$el.querySelector('.popover-content').textContent).to.equal('This is the content.');

      done();
    });
  });
});
