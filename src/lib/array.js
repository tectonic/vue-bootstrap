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
