import { expect } from 'chai';
import { chunk } from '../../src/lib/array.js';

describe('chunk function', () => {
  it('should chunk an array', () => {
    const chunks = chunk([1, 2, 3, 4], 2);

    expect(chunks).to.be.an('array');
    expect(chunks.length).to.equal(2);
    expect(chunks).to.deep.equal([[1, 2], [3, 4]]);
  });
});
