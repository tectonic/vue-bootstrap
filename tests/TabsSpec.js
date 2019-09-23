import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils.js';
import Tabs from '../src/Tabs.vue';

const tabs = [
  { id: 1, name: 'Tab A' },
  { id: 2, name: 'Tab B' },
  { id: 3, name: 'Tab C', disabled: true }
];

describe('Tabs', () => {
  it('initialises with default data', () => {
    expect(typeof Tabs.data).to.equal('function');

    const data = Tabs.data();

    expect(data.selected).to.be.null;
  });

  it('selects tabs', () => {
    expect(typeof Tabs.data).to.equal('function');

    const vm = initVM(Tabs, { tabs: tabs, active: 1 });

    vm.select(tabs[1]); // Tab B

    expect(vm.selected).to.equal(2);
  });

  it('ignores disabled tabs', () => {
    expect(typeof Tabs.data).to.equal('function');

    const vm = initVM(Tabs, { tabs: tabs, active: 1 });

    vm.select(tabs[2]); // Tab C

    expect(vm.selected).to.equal(1);
  });
});
