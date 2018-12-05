import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils.js';
import TagInput from '../src/TagInput.vue';

describe('TagInput', () => {
  it('should add a tag', () => {
    const vm = initVM(TagInput, {
      value: ['Black']
    });

    vm.addTag('Orange');
    vm.addTag({ id: 1, value: 'Blue' });

    expect(vm.tags).to.deep.equal(['Black', 'Orange', 'Blue']);
  });

  it('should remove a tag', () => {
    const vm = initVM(TagInput, {
      value: ['Black']
    });

    vm.removeTag('Black');

    expect(vm.tags).to.deep.equal([]);
  });

  it('should ignore duplicate tags', () => {
    const vm = initVM(TagInput);

    vm.addTag('Yellow');
    vm.addTag('Yellow');
    vm.addTag('Yellow');

    expect(vm.tags).to.deep.equal(['Yellow']);
  });

  it('should format tags', () => {
    const vm = initVM(TagInput, {
      value: ['Pink', 'Blue', 'Green']
    });

    expect(vm.formattedTags).to.equal('Pink, Blue, Green');
  });

  it('should populate the hidden field', (done) => {
    const vm = initVM(TagInput, {
      value: ['Black', 'Blue'],
      hiddenInputName: 'tags'
    });

    Vue.nextTick(() => {
      let inputFields, hiddenField;

      inputFields = vm.$el.getElementsByTagName('input');
      hiddenField = inputFields[1];

      expect(inputFields.length).to.equal(2);
      expect(hiddenField.name).to.equal('tags');
      expect(hiddenField.value).to.equal('Black, Blue');

      done();
    });
  });
});
