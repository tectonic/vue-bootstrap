# Search field

[[toc]]

## Demo

<demo>
  <search-field
    :initial-items="[
      { id: 1, value: 'Alice Munro' },
      { id: 2, value: 'Bob Dylan' },
      { id: 3, value: 'Doris Lessing' },
      { id: 4, value: 'Elfriede Jelinek' },
      { id: 5, value: 'Gao Xingjian' }
    ]"
    initial-id="1"
    initial-value="Alice Munro"
  />
</demo>

```vue
<search-field
  :initial-items="[
    { id: 1, value: 'Alice Munro' },
    { id: 2, value: 'Bob Dylan' },
    { id: 3, value: 'Doris Lessing' },
    { id: 4, value: 'Elfriede Jelinek' },
    { id: 5, value: 'Gao Xingjian' }
  ]"
  initial-id="1"
  initial-value="Alice Munro"
/>
```

## Props

<prop name="id" type="String">
  The <code>id</code> of the input element
</prop>

<prop name="name" type="String">
  The <code>name</code> of the input element
</prop>

<prop name="initial-items" type="Array">
  An array of items that will be used to display autocomplete suggestions
  (<code>[{ id: 1, value: 'hey' }]</code>)
</prop>

<prop name="initial-value" type="String">
  Initial value
</prop>

<prop name="initial-id" type="String, Number">
  Initial id
</prop>

<prop name="src" type="String">
  URL that will be used to fetch autocomplete suggestions (such as: <code>/user/search?q=</code>).
  A query will be appended to this URL.
  There is no need to define <code>initial-items</code> when a remote source is defined.
</prop>

<prop name="searching-label" type="String" default-value="Searching...">
  Displayed while a search is in progress
</prop>

<prop name="id-property" type="String" default-value="id">
</prop>

<prop name="value-property" type="String" default-value="value">
</prop>

<prop name="disabled" type="Boolean" default-value="false">
  Disable input
</prop>

## Events

<event name="selected" parameters="Item (Object)">
  Emitted when an item gets selected
</event>
