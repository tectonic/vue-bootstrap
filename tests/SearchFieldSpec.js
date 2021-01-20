import { expect } from 'chai';
import { mount, shallowMount } from '@vue/test-utils';
import SearchField from '../src/SearchField.vue';

describe('SearchField', () => {
  it('initialises selectedItem', () => {
    const searchField = shallowMount(SearchField, {
      propsData: {
        initialValue: 'Jane',
        initialId: '1',
        valueProperty: 'text'
      }
    });

    expect(searchField.vm.selectedItem).to.deep.equal({
      id: '1',
      text: 'Jane'
    });
  });

  it('toggles visibility of the search box', () => {
    const searchField = shallowMount(SearchField);

    expect(searchField.vm.isOpen).to.equal(false);

    searchField.vm.toggle();
    expect(searchField.vm.isOpen).to.equal(true);
  });

  it('handles autocomplete', () => {
    const searchField = shallowMount(SearchField, {
      propsData: {
        initialOptions: [
          { id: 1, value: 'Jane' },
          { id: 2, value: 'Jo' },
          { id: 3, value: 'Jack' },
        ],
        initialValue: 'Jane',
        initialId: '1'
      }
    });

    searchField.setData({ isOpen: true });

    searchField.vm.handleAutocomplete({ id: 3, value: 'Jack' });

    expect(searchField.vm.selectedItem).to.deep.equal({ id: 3, value: 'Jack' });
    expect(searchField.vm.isOpen).to.equal(false);
    expect(Object.keys(searchField.emitted())).to.include('selected');
  });

  it('shifts focus to the input field', done => {
    const searchField = mount(SearchField, { attachToDocument: true });

    searchField.vm.onFocus();

    expect(searchField.vm.isOpen).to.equal(true);

    searchField.vm.$nextTick(() => {
      const input = searchField.find('input').element;
      expect(input).to.deep.equal(document.activeElement);

      done();
    });
  });
});
