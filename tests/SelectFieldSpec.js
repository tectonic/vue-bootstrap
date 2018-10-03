import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils.js';
import SelectField from '../src/SelectField.vue';

const items = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
  { id: 3, name: 'Parent item',
    children: [
      { id: 4, name: 'Item C' },
    ]
  }
];

describe('SelectField', () => {
  it('initialises with default data', () => {
    expect(typeof SelectField.data).to.equal('function');

    const data = SelectField.data();

    expect(data.selected).to.be.null;
  });

  it('selects an option', () => {
    const vm = initVM(SelectField, {
      items: items,
      value: 1
    });

    expect(vm.selected).to.equal(1);

    vm.select(2);

    expect(vm.selected).to.equal(2);
  });

  it('resets selection', () => {
    const vm = initVM(SelectField, {
      items: items,
      value: 1
    });

    vm.reset();

    expect(vm.selected).to.be.null;
  });

  it('ignores non-existing option', () => {
    const vm = initVM(SelectField, {
      items: items,
      value: 999
    });

    expect(vm.selected).to.be.null;
  });

  it('gets an item by id', () => {
    const vm = initVM(SelectField, {
      items: items
    });

    const item = vm.getItem(4);

    expect(item).to.be.an.object;
    expect(item.name).to.equal('Item C');
  });

  it('flattens items', () => {
    const vm = initVM(SelectField, {
      items: items
    });

    expect(vm.flatItems).to.be.an.array;
    expect(vm.flatItems.length).to.equal(3);
    expect(vm.flatItems.map(item => item.name)).to.deep.equal(['Item A', 'Item B', 'Item C']);
  });
});
