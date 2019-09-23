import Vue from 'vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
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
    const wrapper = shallowMount(Tabs, {
      propsData: { tabs: tabs, active: 1 }
    });

    wrapper.vm.select(tabs[1]); // Tab B

    expect(wrapper.vm.selected).to.equal(2);
    expect(Object.keys(wrapper.emitted())).to.include('selected');
  });

  it('preselects first tab', () => {
    const wrapper = shallowMount(Tabs, {
      propsData: { tabs: tabs, preselectFirstTab: true }
    });

    expect(wrapper.vm.selected).to.equal(1);
  });

  it('ignores disabled tabs', () => {
    const wrapper = shallowMount(Tabs, {
      propsData: { tabs: tabs, preselectFirstTab: false }
    });

    wrapper.vm.select(tabs[2]); // Tab C

    expect(wrapper.vm.selected).to.be.null;
    expect(Object.keys(wrapper.emitted())).to.not.include('selected');
  });
});
