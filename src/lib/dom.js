/**
 * Measure scrollbar width
 */
export function scrollbarWidth () {
  const el = document.createElement('div');
  let scrollbarWidth;

  // The .modal-scrollbar-measure class is provided by Bootstrap and is used
  // here to measure scrollbar width, which differs across browsers and systems.
  el.className = 'modal-scrollbar-measure';

  document.body.appendChild(el);
  scrollbarWidth = el.getBoundingClientRect().width - el.clientWidth;
  document.body.removeChild(el);

  return scrollbarWidth;
};

/**
 * Check if an element has a scrollbar
 */
export function hasScrollbar (el) {
  return el.scrollHeight > el.clientHeight;
};

/**
 * Add a class to an element
 */
export function addClass (el, className) {
  el.classList.add(className);
};

/**
 * Remove a class from an element
 */
export function removeClass (el, className) {
  el.classList.remove(className);
};
