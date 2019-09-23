import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import MultiselectRandomizer from '../src/MultiselectRandomizer.vue';

describe('MultiselectRandomizer', () => {
  it('randomizes ids', () => {
    const ids = [1, 2, 3, 4, 5];

    const randomizer = shallowMount(MultiselectRandomizer, {
      propsData: {
        ids: ids
      }
    });

    randomizer.vm.howMany = 2;
    randomizer.vm.randomize();

    expect(randomizer.vm.randomIds).to.be.an('array');
    expect(randomizer.vm.randomIds.length).to.equal(2);

    expect(ids.includes(randomizer.vm.randomIds[0])).to.be.true;
    expect(ids.includes(randomizer.vm.randomIds[1])).to.be.true;
  });
});
