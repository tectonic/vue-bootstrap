import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils/utils.js';
import Typeahead from '../src/Typeahead.vue';

describe('Typeahead', () => {
  it('has a mounted hook', () => {
    expect(typeof Typeahead.mounted).to.equal('function');
  });

  it('initialises with default data', () => {
    expect(typeof Typeahead.data).to.equal('function');

    const data = Typeahead.data();

    expect(data.query).to.equal('');
    expect(data.isDropdownOpen).to.be.false;
    expect(data.items).to.deep.equal([]);
    expect(data.currentItem).to.equal(0);
  });

  it('sets query on mount', () => {
    const vm = initVM(Typeahead, {
      initialValue: 'abc'
    });

    expect(vm.query).to.equal('abc');
  });

  it('sets selectedItem on mount', () => {
    const vm = initVM(Typeahead, {
      initialValue: 'abc',
      initialId: '1'
    });

    expect(vm.selectedItem).to.deep.equal({ id: '1', value: 'abc' });
  });

  it('opens drop-down menu when query is entered', (done) => {
    const vm = initVM(Typeahead, {
      initialItems: [{ id: 1, value: 'hello'}, { id: 2, value: 'world' }]
    });

    vm.query = 'hello';
    vm.onInput();

    Vue.nextTick(() => {
      expect(vm.isDropdownOpen).to.be.true;
      done();
    });
  });

  it('filters items', () => {
    const vm = initVM(Typeahead, {
      initialItems: [{ id: 1, value: 'Jane' }, { id: 2, value: 'Jack' }]
    });

    vm.query = 'Jac';

    expect(vm.items).that.is.an('array')
      .to.deep.equal([{ id: 1, value: 'Jane' }, { id: 2, value: 'Jack' }]);

    expect(vm.filteredItems).that.is.an('array')
      .to.deep.equal([{ id: 2, value: 'Jack' }]);
  });

  it('filters items with limit', () => {
    const vm = initVM(Typeahead, {
      initialItems: [
        { id: 1, value: 'above' },
        { id: 2, value: 'above all' },
        { id: 3, value: 'above the fold' }
      ]
    });

    vm.query = 'above';
    vm.limit = 1;

    expect(vm.filteredItems).that.is.an('array')
      .to.deep.equal([{ id: 1, value: 'above' }]);
  });

  it('marks next item', () => {
    const vm = initVM(Typeahead, {
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
    const vm = initVM(Typeahead, {
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
    const vm = initVM(Typeahead, {
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

  it('populates the hidden field', (done) => {
    const vm = initVM(Typeahead, {
      initialValue: 'Jane',
      initialId: '1',
      name: 'hidden-field'
    });

    Vue.nextTick(() => {
      let inputFields, hiddenField;

      inputFields = vm.$el.getElementsByTagName('input');
      hiddenField = inputFields[1];

      expect(inputFields.length).to.equal(2);
      expect(hiddenField.name).to.equal('hidden-field');
      expect(hiddenField.value).to.equal('1');

      done();
    });
  });
});
