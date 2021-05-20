import { expect } from 'chai';
import { mount, shallowMount } from '@vue/test-utils';
import TagInput from '../src/TagInput.vue';

describe('TagInput', () => {
  it('accepts a string with tags as value', () => {
    const tagInput = shallowMount(TagInput, {
      propsData: {
        value: 'Magenta, Pink, Yellow'
      }
    });

    expect(tagInput.vm.tags).to.deep.equal(['Magenta', 'Pink', 'Yellow']);
  });

  it('adds a tag', () => {
    const tagInput = shallowMount(TagInput, {
      propsData: {
        value: ['Black']
      }
    });

    tagInput.vm.addTag('Orange');
    tagInput.vm.addTag({ id: 1, value: 'Blue' });

    expect(tagInput.vm.tags).to.deep.equal(['Black', 'Orange', 'Blue']);
  });

  it('removes a tag', () => {
    const tagInput = shallowMount(TagInput, {
      propsData: {
        value: ['Black']
      }
    });

    tagInput.vm.removeTag('Black');

    expect(tagInput.vm.tags).to.deep.equal([]);
  });

  it('ignores duplicate tags', () => {
    const tagInput = shallowMount(TagInput);

    tagInput.vm.addTag('Yellow');
    tagInput.vm.addTag('Yellow');
    tagInput.vm.addTag('Yellow');

    expect(tagInput.vm.tags).to.deep.equal(['Yellow']);
  });

  it('trims tags', () => {
    const tagInput = shallowMount(TagInput, {
      propsData: {
        value: ['Black']
      }
    });

    tagInput.vm.addTag('');
    tagInput.vm.addTag(' ');
    tagInput.vm.addTag('Orange   ');
    tagInput.vm.addTag({ id: 1, value: '     Purple   ' });

    expect(tagInput.vm.tags).to.deep.equal(['Black', 'Orange', 'Purple']);
  });

  it('handles backspace key', () => {
    const tagInput = shallowMount(TagInput, {
      propsData: {
        value: ['Purple', 'Black']
      }
    });

    tagInput.vm.onDelete('Yellow');
    expect(tagInput.vm.tags).to.deep.equal(['Purple', 'Black']);

    tagInput.vm.onDelete('');
    expect(tagInput.vm.tags).to.deep.equal(['Purple']);
  });

  it('formats tags', () => {
    const tagInput = shallowMount(TagInput, {
      propsData: {
        value: ['Pink', 'Blue', 'Green']
      }
    });

    expect(tagInput.vm.formattedTags).to.equal('Pink, Blue, Green');
  });

  it('populates the hidden field', (done) => {
    const tagInput = mount(TagInput, {
      propsData: {
        value: ['Black', 'Blue'],
        hiddenInputName: 'tags'
      }
    });

    tagInput.vm.$nextTick(() => {
      let inputFields, hiddenField;

      inputFields = tagInput.vm.$el.getElementsByTagName('input');
      hiddenField = inputFields[1];

      expect(inputFields.length).to.equal(2);
      expect(hiddenField.name).to.equal('tags');
      expect(hiddenField.value).to.equal('Black, Blue');

      done();
    });
  });

  it('truncate tags', (done) => {
    const tagInput = mount(TagInput, {
      propsData: {
        value: ['Normal tag', 'This tag has length of exactly 33', 'This is a tag that has length of 35', 'This is a tag that has length greater than 35']
      }
    });

    expect(tagInput.vm.$el.getElementsByClassName('name')[0].textContent).to.equal('Normal tag');
    expect(tagInput.vm.$el.getElementsByClassName('name')[0].getAttribute('title')).to.equal(null);
    expect(tagInput.vm.$el.getElementsByClassName('name')[1].textContent).to.equal('This tag has length of exactly 33');
    expect(tagInput.vm.$el.getElementsByClassName('name')[1].getAttribute('title')).to.equal(null);
    expect(tagInput.vm.$el.getElementsByClassName('name')[2].textContent).to.equal('This is a tag that has length of 35');
    expect(tagInput.vm.$el.getElementsByClassName('name')[2].getAttribute('title')).to.equal(null);
    expect(tagInput.vm.$el.getElementsByClassName('name')[3].textContent).to.equal('This is a tag that has length gr...');
    expect(tagInput.vm.$el.getElementsByClassName('name')[3].getAttribute('title')).to.equal('This is a tag that has length greater than 35');

    done();
  });
});
