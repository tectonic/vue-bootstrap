import Vue from 'vue';
import { expect } from 'chai';
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
  });

  it('sets query on mount', () => {
    const VM = Vue.extend(Typeahead);

    const vm = new VM({
      propsData: {
        value: 'abc'
      }
    }).$mount();

    expect(vm.query).to.equal('abc');
  });

  it('opens drop-down menu when query is entered', (done) => {
    const VM = Vue.extend(Typeahead);

    const vm = new VM({
      propsData: {
        items: ['hello', 'world']
      }
    }).$mount();

    vm.query = 'hello';
    vm.onInput();

    Vue.nextTick(() => {
      expect(vm.isDropdownOpen).to.be.true;
      done();
    });
  });

  it('filters items', () => {
    const VM = Vue.extend(Typeahead);

    const vm = new VM({
      propsData: {
        items: ['John', 'Jane', 'Jack']
      }
    }).$mount();

    vm.query = 'Ja';

    expect(vm.items).that.is.an('array')
      .to.deep.equal(['John', 'Jane', 'Jack']);

    expect(vm.filteredItems).that.is.an('array')
      .to.deep.equal(['Jane', 'Jack']);
  });

  it('filters items with limit', () => {
    const VM = Vue.extend(Typeahead);

    const vm = new VM({
      propsData: {
        items: ['above', 'above all', 'above the fold', 'above the law', 'above-the-line']
      }
    }).$mount();

    vm.query = 'above';
    vm.limit = 3;

    expect(vm.filteredItems).that.is.an('array')
      .to.deep.equal(['above', 'above all', 'above the fold']);
  });
});
