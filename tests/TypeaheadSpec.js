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
    expect(data.currentItem).to.equal(0);
  });

  it('sets query on mount', () => {
    const vm = initVM(Typeahead, {
      value: 'abc'
    });

    expect(vm.query).to.equal('abc');
  });

  it('opens drop-down menu when query is entered', (done) => {
    const vm = initVM(Typeahead, {
      items: ['hello', 'world']
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
      items: ['John', 'Jane', 'Jack']
    });

    vm.query = 'Ja';

    expect(vm.items).that.is.an('array')
      .to.deep.equal(['John', 'Jane', 'Jack']);

    expect(vm.filteredItems).that.is.an('array')
      .to.deep.equal(['Jane', 'Jack']);
  });

  it('filters items with limit', () => {
    const vm = initVM(Typeahead, {
      items: ['above', 'above all', 'above the fold', 'above the law', 'above-the-line']
    });

    vm.query = 'above';
    vm.limit = 3;

    expect(vm.filteredItems).that.is.an('array')
      .to.deep.equal(['above', 'above all', 'above the fold']);
  });
});
