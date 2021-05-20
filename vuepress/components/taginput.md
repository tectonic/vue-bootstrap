# Tag input

[[toc]]

## Demo

<demo>
  <tag-input
    value="Orange, Black"
    id="tag-input"
    placeholder="Add tag"
    :available-tags="[
      { id: 1, value: 'Red' },
      { id: 2, value: 'Orange' },
      { id: 3, value: 'Black' },
      { id: 4, value: 'This is a tag that has length greater than 35'}
    ]"
    hidden-input-name="tags"
  />
</demo>

```vue
<tag-input
  value="Orange, Black"
  id="tag-input"
  placeholder="Add tag"
  :available-tags="[
    { id: 1, value: 'Red' },
    { id: 2, value: 'Orange' },
    { id: 3, value: 'Black' },
    { id: 4, value: 'This is a tag that has length greater than 35'}
  ]"
  hidden-input-name="tags"
/>
```

## Props

<prop name="available-tags" type="Array">
  An array with available tags (<code>[{ id: 1, value: 'hey' }]</code>)
</prop>

<prop name="value" type="Array, String">
  An array or comma separated string with tags (<code>['hey', 'there']</code> or <code>hey, there</code>).
</prop>

<prop name="src" type="String">
  URL that will be used to fetch autocomplete suggestions (such as: <code>/tag/search?q=</code>).
  A query will be appended to this URL.
  There is no need to define <code>available-tags</code> when a remote source is defined.
</prop>

<prop name="id" type="String">
  The <code>id</code> attribute of the input element
</prop>

<prop name="placeholder" type="String">
  The <code>placeholder</code> attribute of the input element
</prop>

<prop name="limit" type="Number" default-value="0">
  Limit the number of autocomplete suggestions, no limit is applied by default
</prop>

<prop name="hidden-input-name" type="String">
  Name of a hidden input field that will be populated with tags
</prop>

## Events

<event name="input" parameters="Tags (Array)">
  Emitted on user input
</event>

<event name="error" parameters="Response (Object)">
  Emitted when an error occurs while sending a request to the remote source
</event>
