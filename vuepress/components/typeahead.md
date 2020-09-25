# Typeahead

[[toc]]

## Demo

<demo>
  <typeahead
    initial-id="14"
    initial-value="John Stockton"
    id="typeahead-input"
    placeholder="Type a name"
    :initial-items="[
      { id: 12, value: 'John Cleese' },
      { id: 13, value: 'John Malkovich' },
      { id: 14, value: 'John Stockton' }
    ]"
    hidden-input-name="typeaheadId"
  />
</demo>

```vue
<typeahead
  initial-id="14"
  initial-value="John Stockton"
  id="typeahead-input"
  placeholder="Type a name"
  :initial-items="[
    { id: 12, value: 'John Cleese' },
    { id: 13, value: 'John Malkovich' },
    { id: 14, value: 'John Stockton' }
  ]"
  hidden-input-name="typeaheadId"
/>
```

## Props

<prop name="initial-items" type="Array">
  An array of items that will be used to display autocomplete suggestions
  (<code>[{ id: 1, value: 'hey' }]</code>)
</prop>

<prop name="initial-value" type="String">
  Initial value of the autocomplete suggestion
</prop>

<prop name="initial-id" type="String">
  Initial id of the autocomplete suggestion
</prop>

<prop name="src" type="String">
  URL that will be used to fetch autocomplete suggestions (such as: <code>/user/search?q=</code>).
  A query will be appended to this URL.
  There is no need to define <code>initial-items</code> when a remote source is defined.
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

<prop name="name" type="String">
  The name of the input field
</prop>

<prop name="hidden-input-name" type="String">
  The name of a hidden input field that will be populated with autocomplete suggestion's id
</prop>

## Events

<event name="selected" parameters="Item (Object)">
  Emitted when an item gets selected
</event>

<event name="error" parameters="Response (Object)">
  Emitted when an error occurs while sending a request to the remote source
</event>
