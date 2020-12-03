module.exports = [
  '/',
  {
    title: 'Components',
    collapsable: false,
    children: prefix('components', [
      'datepicker',
      'dropdown',
      'modal',
      'multiselect',
      'panel',
      'popover',
      'searchfield',
      'selectfield',
      'tabs',
      'taginput',
      'typeahead'
    ]),
  },
  {
    title: 'Mixins',
    collapsable: false,
    children: prefix('mixins', [
      'clickoutside',
      'formaturl'
    ]),
  }
];

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}
