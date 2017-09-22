import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils.js';
import Modal from '../src/Modal.vue';

describe('Modal', () => {
  it('has a mounted hook', () => {
    expect(typeof Modal.mounted).to.equal('function');
  });

  it('initialises with default data', () => {
    expect(typeof Modal.data).to.equal('function');

    const data = Modal.data();

    expect(data.isVisible).to.be.false;
    expect(data.isIn).to.be.false;
  });
});
