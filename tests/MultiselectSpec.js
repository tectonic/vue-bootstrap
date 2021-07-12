import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Multiselect from '../src/Multiselect.vue';

let multiselect;

describe('Multiselect', () => {
  beforeEach(() => {
    const options = [
      { id: 1, name: 'option A', disabled: false },
      { id: 2, name: 'option B', disabled: false },
      { id: 3, name: 'option C', disabled: false,
        children: [
          { id: 4, name: 'option D', disabled: false },
          { id: 5, name: 'option E', disabled: false }
        ]
      }
    ];

    multiselect = shallowMount(Multiselect, {
      propsData: {
        options: options,
        selectedOptions: [1]
      }
    });
  });

  afterEach(() => {
    multiselect.vm.$destroy();
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
      { id: 1, name: 'option A', visible: true, selected: true, disabled: false },
      { id: 2, name: 'option B', visible: true, selected: false, disabled: false },
      { id: 3, name: 'option C', visible: true, selected: false, disabled: false,
        children: [
          { id: 4, name: 'option D', visible: true, selected: false, disabled: false },
          { id: 5, name: 'option E', visible: true, selected: false, disabled: false }
        ]
      }
    ];

    expect(multiselect.vm.tree).that.is.an('array').to.deep.equal(tree);
  });

  it('computes option ids', () => {
    expect(multiselect.vm.allIds).that.is.an('array').to.deep.equal([1, 2, 4, 5]);
  });

  it('computes selected option ids', () => {
    expect(multiselect.vm.selectedIds).that.is.an('array').to.deep.equal([1]);
  });

  it('toggles and untoggles all options', () => {
    multiselect.vm.toggleAll();

    expect(multiselect.vm.selectedIds).to.deep.equal([1, 2, 4, 5]);
    expect(multiselect.vm.allSelected()).to.be.true;

    multiselect.vm.toggleAll();

    expect(multiselect.vm.selectedIds).to.deep.equal([]);
    expect(multiselect.vm.allSelected()).to.be.false;
  });

  it('adjusts option visibility based on query', (done) => {
    multiselect.vm.query = 'ion B';

    multiselect.vm.$nextTick(() => {
      expect(multiselect.vm.tree[0].visible).to.be.false; // option A
      expect(multiselect.vm.tree[1].visible).to.be.true; // option B

      done();
    });
  });
});
