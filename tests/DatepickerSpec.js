import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils/utils.js';
import Datepicker from '../src/Datepicker.vue';

describe('Datepicker', () => {
  it('has a mounted hook', () => {
    expect(typeof Datepicker.mounted).to.equal('function');
  });

  it('initialises with default data', () => {
    expect(typeof Datepicker.data).to.equal('function');

    const data = Datepicker.data();

    expect(data.isOpen).to.be.false;
    expect(data.date).to.be.a('date');
  });

  it('should select all days in a month', () => {
    const vm = initVM(Datepicker);

    const days = vm.daysInMonth(1, 2017);

    expect(days).to.be.an('array');
    expect(days.length).to.equal(28);
    expect(days[0]).to.be.a('date');
  });

  it('should chunk an array', () => {
    const vm = initVM(Datepicker);

    const chunks = vm.chunk([1, 2, 3, 4], 2);

    expect(chunks).to.be.an('array');
    expect(chunks.length).to.equal(2);
    expect(chunks.length).to.deep.equal([[1, 2], [3, 4]]);
  });
});
