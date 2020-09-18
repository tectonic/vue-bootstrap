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
      { id: 15, value: 'Black' }
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
    { id: 15, value: 'Black' }
  ]"
  hidden-input-name="tags"
/>
```
