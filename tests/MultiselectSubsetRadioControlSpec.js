import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import MultiselectSubsetRadioControl from '../src/MultiselectSubsetRadioControl.vue';

const baseProps = {
  option: { id: 'en_GB', name: 'English' },
  idProperty: 'id',
  subsetName: 'language'
};

describe('MultiselectSubsetRadioControl', () => {
  it('option is selected', () => {
    const props = Object.assign({ selectedSubsetOptions: ['en_GB'] }, baseProps);
    const radio = shallowMount(MultiselectSubsetRadioControl, {
      propsData: props
    });

    expect(radio.vm.selectedOption).to.equal('en_GB');
  });

  it('option is unselected', () => {
    const props = Object.assign({ selectedSubsetOptions: [] }, baseProps);
    const radio = shallowMount(MultiselectSubsetRadioControl, {
      propsData: props
    });

    expect(radio.vm.selectedOption).to.equal('');
  });
});
