import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import MultiselectSubsetCheckboxControl from '../src/MultiselectSubsetCheckboxControl.vue';

const baseProps = {
  option: { id: 'en_GB', name: 'English' },
  idProperty: 'id',
  subsetName: 'language'
};

describe('MultiselectSubsetCheckboxControl', () => {
  it('checkbox is checked', () => {
    const props = Object.assign({ selectedSubsetOptions: ['en_GB', 'de_DE'] }, baseProps);
    const checkbox = shallowMount(MultiselectSubsetCheckboxControl, {
      propsData: props
    });

    expect(checkbox.vm.checked).to.be.true;
  });

  it('checkbox is unchecked', () => {
    const props = Object.assign({ selectedSubsetOptions: ['de_DE'] }, baseProps);
    const checkbox = shallowMount(MultiselectSubsetCheckboxControl, {
      propsData: props
    });

    expect(checkbox.vm.checked).to.be.false;
  });
});
