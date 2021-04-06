import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Multicheckbox from '../src/Multicheckbox.vue';
import MulticheckboxOption from '../src/MulticheckboxOption.vue';

let multicheckbox, options, subsets;

describe('Multicheckbox', () => {
  beforeEach(() => {
    options = [
      { id: 1, name: 'Chris Paul' },
      { id: 2, name: 'Allen Iverson' },
      { id: 3, name: 'John Stockton' },
      { id: 4, name: 'Isiah Thomas' }
    ];

    subsets = [
      { id: 'steals', name: 'Steals' },
      { id: 'rebounds', name: 'Rebounds' },
      { id: 'points', name: 'Points' }
    ];

    multicheckbox = shallowMount(Multicheckbox, {
      propsData: {
        options: options,
        subsets: subsets,
        selectedOptions: [1, 2]
      }
    });
  });

  afterEach(() => {
    multicheckbox.vm.$destroy();
  });

  it('displays options', () => {
    expect(multicheckbox.findAll(MulticheckboxOption).length).to.equal(4);
  });

  it('toggles options', () => {
    expect(multicheckbox.vm.selection.length).to.equal(2);

    multicheckbox.vm.toggleAll();
    expect(multicheckbox.vm.selection.length).to.equal(4);

    multicheckbox.vm.toggleAll();
    expect(multicheckbox.vm.selection.length).to.equal(0);
  });

  it('toggles subset options', () => {
    expect(multicheckbox.vm.subsetSelection['steals']).to.be.undefined;

    multicheckbox.vm.toggleSubset(subsets[0]);
    expect(multicheckbox.vm.subsetSelection['steals'].length).to.equal(4);
  });

  it('handles checked event', () => {
    expect(multicheckbox.vm.selection.includes(options[0].id)).to.be.true;

    multicheckbox.vm.handleChecked(options[0], false);
    expect(multicheckbox.vm.selection.includes(options[0].id)).to.be.false;
  });

  it('handles subset checked event', () => {
    expect(multicheckbox.vm.subsetSelection['steals']).to.be.undefined;

    multicheckbox.vm.handleSubsetChecked(options[0], subsets[0], true);
    expect(multicheckbox.vm.subsetSelection['steals'].includes(options[0].id)).to.be.true;
  });
});
