import { expect } from 'chai';
import { mount, shallowMount } from '@vue/test-utils';
import Typeahead from '../src/Typeahead.vue';

describe('Typeahead', () => {
  it('has a mounted hook', () => {
    expect(typeof Typeahead.mounted).to.equal('function');
  });

  it('initialises with default data', () => {
    expect(typeof Typeahead.data).to.equal('function');

    const data = Typeahead.data();

    expect(data.selectedItem).to.be.an('object');
    expect(data.selectedItem.id).to.equal('');
    expect(data.selectedItem.value).to.equal('');
  });

  it('sets selectedItem on mount', () => {
    const typeahead = shallowMount(Typeahead, {
      propsData: {
        initialValue: 'abc',
        initialId: '1'
      }
    });

    expect(typeahead.vm.selectedItem).to.deep.equal({ id: '1', value: 'abc' });
  });

  it('populates the hidden field', (done) => {
    const typeahead = mount(Typeahead, {
      propsData: {
        initialValue: 'Jane',
        initialId: '1',
        name: 'suggestion',
        hiddenInputName: 'hidden-field'
      }
    });

    typeahead.vm.$nextTick(() => {
      let inputFields, hiddenField;

      inputFields = typeahead.vm.$el.getElementsByTagName('input');
      hiddenField = inputFields[1];

      expect(inputFields.length).to.equal(2);
      expect(hiddenField.name).to.equal('hidden-field');
      expect(hiddenField.value).to.equal('1');

      done();
    });
  });
});
