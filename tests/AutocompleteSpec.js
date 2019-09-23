import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Autocomplete from '../src/Autocomplete.vue';

describe('Autocomplete', () => {
  it('triggers autocomplete when query is entered', (done) => {
    const autocomplete = shallowMount(Autocomplete, {
      propsData: {
        initialItems: [{ id: 1, value: 'hello'}, { id: 2, value: 'world' }]
      }
    });

    autocomplete.vm.onInput('h');

    autocomplete.vm.$nextTick(() => {
      expect(autocomplete.vm.autocompleting).to.be.true;
      done();
    });
  });

  it('filters items', () => {
    const autocomplete = shallowMount(Autocomplete, {
      propsData: {
        initialItems: [{ id: 1, value: 'Jane' }, { id: 2, value: 'Jack' }]
      }
    });

    autocomplete.vm.query = 'Jac';

    expect(autocomplete.vm.autocompleteItems).that.is.an('array')
      .to.deep.equal([{ id: 2, value: 'Jack' }]);
  });

  it('filters items with limit', () => {
    const autocomplete = shallowMount(Autocomplete, {
      propsData: {
        initialItems: [
          { id: 1, value: 'above' },
          { id: 2, value: 'above all' },
          { id: 3, value: 'above the fold' }
        ],
        limit: 1
      }
    });

    autocomplete.vm.query = 'above';

    expect(autocomplete.vm.autocompleteItems).that.is.an('array')
      .to.deep.equal([{ id: 1, value: 'above' }]);
  });

  it('marks next item', () => {
    const autocomplete = shallowMount(Autocomplete, {
      propsData: {
        initialItems: [
          { id: 1, value: 'Aaaa' },
          { id: 2, value: 'Aaa' },
          { id: 3, value: 'Aa' }
        ]
      }
    });

    autocomplete.vm.query = 'A';
    autocomplete.vm.currentItem = 1;
    autocomplete.vm.markNextItem();

    expect(autocomplete.vm.currentItem).to.equal(2);
  });

  it('marks previous item', () => {
    const autocomplete = shallowMount(Autocomplete, {
      propsData: {
        initialItems: [
          { id: 1, value: 'Aaaa' },
          { id: 2, value: 'Aaa' },
          { id: 3, value: 'Aa' }
        ]        
      }
    });

    autocomplete.vm.query = 'A';
    autocomplete.vm.currentItem = 1;
    autocomplete.vm.markPreviousItem();

    expect(autocomplete.vm.currentItem).to.equal(0);
  });

  it('knows current item', () => {
    const autocomplete = shallowMount(Autocomplete, {
      propsData: {
        initialItems: [
          { id: 1, value: 'Aaaa' },
          { id: 2, value: 'Aaa' },
          { id: 3, value: 'Aa' }
        ]
      }
    });

    autocomplete.vm.query = 'A';
    autocomplete.vm.currentItem = 1;

    expect(autocomplete.vm.isMarked(1)).to.be.true;
  });
});
