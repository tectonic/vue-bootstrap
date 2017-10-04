/**
 * Chunk an array
 */
export function chunk (input, chunk) {
  let i, j;
  let array = [];
  let chunks = [];

  for (i = 0, j = input.length; i < j; i += chunk) {
    array = input.slice(i, i + chunk);
    chunks.push(array);
  }

  return chunks;
};

/**
 * Shuffle an array
 * https://bost.ocks.org/mike/shuffle/
 */
export function shuffle (input) {
  let index, temp;
  let counter = array.length;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);

    counter--;

    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
