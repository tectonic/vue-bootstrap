import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import SelectField from '../src/SelectField.vue';

const items = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
  { id: 3, name: 'Parent item',
    children: [
      { id: 4, name: 'Item C' }
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
    const selectField = shallowMount(SelectField, {
      propsData: {
        items: items,
        value: 1
      }
    });

    expect(selectField.vm.selected).to.equal(1);

    selectField.vm.select(2);

    expect(selectField.vm.selected).to.equal(2);
  });

  it('resets selection', () => {
    const selectField = shallowMount(SelectField, {
      propsData: {
        items: items,
        value: 1
      }
    });

    selectField.vm.reset();

    expect(selectField.vm.selected).to.be.null;
  });

  it('ignores non-existing option', () => {
    const selectField = shallowMount(SelectField, {
      propsData: {
        items: items,
        value: 999
      }
    });

    expect(selectField.vm.selected).to.be.null;
  });

  it('gets an item by id', () => {
    const selectField = shallowMount(SelectField, {
      propsData: {
        items: items
      }
    });

    const item = selectField.vm.getItem(4);

    expect(item).to.be.an('object');
    expect(item.name).to.equal('Item C');
  });

  it('flattens items', () => {
    const selectField = shallowMount(SelectField, {
      propsData: {
        items: items
      }
    });

    expect(selectField.vm.flatItems).to.be.an('array');
    expect(selectField.vm.flatItems.length).to.equal(3);
    expect(selectField.vm.flatItems.map(item => item.name)).to.deep.equal(['Item A', 'Item B', 'Item C']);
  });
});
