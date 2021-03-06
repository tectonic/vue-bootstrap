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
 * Check if the body is overflowing
 */
export function bodyIsOverflowing () {
  return document.body.clientWidth < window.innerWidth;
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

/**
 * Check if the directionality of the text is rtl
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/dir
 */
export function isRtl () {
  return document.dir === 'rtl';
};

export function matchesSelector (element, selector) {
  var matches = (element.matches || element.msMatchesSelector);
  try {
    return matches.call(element, selector);
  } catch (error) {
    return false;
  }
}
