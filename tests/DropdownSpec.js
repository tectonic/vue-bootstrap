import Vue from 'vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Dropdown from '../src/Dropdown.vue';

describe('Dropdown', () => {
  it('initialises with default data', () => {
    expect(typeof Dropdown.data).to.equal('function');

    const data = Dropdown.data();

    expect(data.isOpen).to.be.false;
  });

  it('can be toggled', () => {
    const dropdown = shallowMount(Dropdown);

    dropdown.vm.toggle();

    expect(dropdown.vm.isOpen).to.be.true;
  });

  it('closes on esc key press', () => {
    const dropdown = shallowMount(Dropdown);

    dropdown.vm.toggle();
    expect(dropdown.vm.isOpen).to.be.true;

    dropdown.find('.btn').trigger('keyup.esc');
    expect(dropdown.vm.isOpen).to.be.false;
  });

  it('positions the dropdown', () => {
    const dropdown = shallowMount(Dropdown, {
      propsData: {
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    });

    expect(dropdown.vm.horizontalPositionClass).to.equal('dropdown-menu-right');
    expect(dropdown.vm.verticalPositionClass).to.equal('dropup');
  });

  it('uses a custom menu element', () => {
    const dropdown = shallowMount(Dropdown, {
      propsData: {
        menuElement: 'div'
      }
    });

    expect(dropdown.vm.$refs.ul.nodeName.toLowerCase()).to.equal('div');
  });
});
