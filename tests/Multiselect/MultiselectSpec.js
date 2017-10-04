import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from '../utils.js';
import Multiselect from '../../src/Multiselect/Multiselect.vue';

let vm;

describe('Multiselect', () => {
  beforeEach(() => {
    const options = [
      { id: 1, name: 'option A' },
      { id: 2, name: 'option B' },
      { id: 3, name: 'option C', children: [
          { id: 4, name: 'option D' },
          { id: 5, name: 'option E' }
        ]
      },
    ];

    vm = initVM(Multiselect, {
      options: options,
      selectedOptions: [1]
    });
  });
   
  afterEach(() => {
    vm.$destroy();
  });

  it('initialises with default data', () => {
    expect(typeof Multiselect.data).to.equal('function');

    var data = Multiselect.data();

    expect(data.tree).that.is.an('array').to.deep.equal([]);
    expect(data.randomizerActive).to.be.false;
    expect(data.query).to.equal('');
  });

  it('builds the tree', () => {
    var tree = [
      { id: 1, name: 'option A', visible: true, selected: true },
      { id: 2, name: 'option B', visible: true, selected: false },
      { id: 3, name: 'option C', visible: true, selected: false,
        children: [
          { id: 4, name: 'option D', visible: true, selected: false },
          { id: 5, name: 'option E', visible: true, selected: false }
        ]
      },
    ];

    expect(vm.tree).that.is.an('array').to.deep.equal(tree);
  });

  it('computes option ids', () => {
    expect(vm.allIds).that.is.an('array').to.deep.equal([1, 2, 4, 5]);
  });

  it('computes selected option ids', () => {
    expect(vm.selectedIds).that.is.an('array').to.deep.equal([1]);
  });

  it('toggles and untoggles all options', () => {
    vm.toggleAll();

    expect(vm.selectedIds).to.deep.equal([1, 2, 4, 5]);
    expect(vm.allSelected()).to.be.true;

    vm.toggleAll();

    expect(vm.selectedIds).to.deep.equal([]);
    expect(vm.allSelected()).to.be.false;
  });

  it('adjusts option visibility based on query', (done) => {
    vm.query = 'ion B';

    Vue.nextTick(() => {
      expect(vm.tree[0].visible).to.be.false; // option A
      expect(vm.tree[1].visible).to.be.true; // option B

      done();
    });
  });
});
