import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils/utils.js';
import Dropdown from '../src/Dropdown.vue';

describe('Dropdown', () => {
  it('has a mounted hook', () => {
    expect(typeof Dropdown.mounted).to.equal('function');
  });

  it('initialises with default data', () => {
    expect(typeof Dropdown.data).to.equal('function');

    const data = Dropdown.data();

    expect(data.isOpen).to.be.false;
  });

  it('can be toggled', () => {
    const vm = initVM(Dropdown);

    vm.toggle();

    expect(vm.isOpen).to.be.true;
  });

  it('closes on blur', () => {
    const vm = initVM(Dropdown);

    vm.toggle();

    vm.$refs.button.blur();

    setTimeout(() => {
      expect(vm.isOpen).to.be.false;
    }, vm.closeTimeout + 100);
  });
});
