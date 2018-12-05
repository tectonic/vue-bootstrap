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
});
