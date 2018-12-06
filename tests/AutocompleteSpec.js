import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils.js';
import Autocomplete from '../src/Autocomplete.vue';

describe('Autocomplete', () => {
  it('triggers autocomplete when query is entered', (done) => {
    const vm = initVM(Autocomplete, {
      initialItems: [{ id: 1, value: 'hello'}, { id: 2, value: 'world' }]
    });

    vm.onInput('h');

    Vue.nextTick(() => {
      expect(vm.autocompleting).to.be.true;
      done();
    });
  });

  it('filters items', () => {
    const vm = initVM(Autocomplete, {
      initialItems: [{ id: 1, value: 'Jane' }, { id: 2, value: 'Jack' }]
    });

    vm.query = 'Jac';

    expect(vm.autocompleteItems).that.is.an('array')
      .to.deep.equal([{ id: 2, value: 'Jack' }]);
  });

  it('filters items with limit', () => {
    const vm = initVM(Autocomplete, {
      initialItems: [
        { id: 1, value: 'above' },
        { id: 2, value: 'above all' },
        { id: 3, value: 'above the fold' }
      ]
    });

    vm.query = 'above';
    vm.limit = 1;

    expect(vm.autocompleteItems).that.is.an('array')
      .to.deep.equal([{ id: 1, value: 'above' }]);
  });

  it('marks next item', () => {
    const vm = initVM(Autocomplete, {
      initialItems: [
        { id: 1, value: 'Aaaa' },
        { id: 2, value: 'Aaa' },
        { id: 3, value: 'Aa' }
      ]
    });

    vm.query = 'A';
    vm.currentItem = 1;
    vm.markNextItem();

    expect(vm.currentItem).to.equal(2);
  });

  it('marks previous item', () => {
    const vm = initVM(Autocomplete, {
      initialItems: [
        { id: 1, value: 'Aaaa' },
        { id: 2, value: 'Aaa' },
        { id: 3, value: 'Aa' }
      ]
    });

    vm.query = 'A';
    vm.currentItem = 1;
    vm.markPreviousItem();

    expect(vm.currentItem).to.equal(0);
  });

  it('knows current item', () => {
    const vm = initVM(Autocomplete, {
      initialItems: [
        { id: 1, value: 'Aaaa' },
        { id: 2, value: 'Aaa' },
        { id: 3, value: 'Aa' }
      ]
    });

    vm.query = 'A';
    vm.currentItem = 1;

    expect(vm.isMarked(1)).to.be.true;
  });
});
