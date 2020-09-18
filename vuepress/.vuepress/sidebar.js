module.exports = [
  '/',
  {
    title: "Components",
    collapsable: false,
    children: prefix('components', [
      'datepicker',
      'taginput',
      'typeahead'
    ]),
  }
];

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}
