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
