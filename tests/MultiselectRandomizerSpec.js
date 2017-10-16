import { expect } from 'chai';
import { initVM } from './utils.js';
import MultiselectRandomizer from '../src/MultiselectRandomizer.vue';

describe('MultiselectRandomizer', () => {
  it('randomizes ids', () => {
    const ids = [1, 2, 3, 4, 5];

    const vm = initVM(MultiselectRandomizer, {
      ids: ids
    });

    vm.howMany = 2;
    vm.randomize();

    expect(vm.randomIds).to.be.an.array;
    expect(vm.randomIds.length).to.equal(2);

    expect(ids.includes(vm.randomIds[0])).to.be.true;
    expect(ids.includes(vm.randomIds[1])).to.be.true;
  });
});
