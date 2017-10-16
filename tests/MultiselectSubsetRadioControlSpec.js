import { expect } from 'chai';
import { initVM } from './utils.js';
import MultiselectSubsetRadioControl from '../src/MultiselectSubsetRadioControl.vue';

const baseProps = {
  option: { id: 'en_GB', name: 'English' },
  idProperty: 'id',
  subsetName: 'language'
};

describe('MultiselectSubsetRadioControl', () => {
  it('option is selected', () => {
    const props = Object.assign({ selectedSubsetOptions: ['en_GB'] }, baseProps);
    const vm = initVM(MultiselectSubsetRadioControl, props);

    expect(vm.selectedOption).to.equal('en_GB');
  });

  it('option is unselected', () => {
    const props = Object.assign({ selectedSubsetOptions: [] }, baseProps);
    const vm = initVM(MultiselectSubsetRadioControl, props);

    expect(vm.selectedOption).to.equal('');
  });
});
