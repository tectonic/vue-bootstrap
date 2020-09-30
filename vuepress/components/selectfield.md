# Select field

[[toc]]

## Demo

<demo>
  <select-field :items="[
      { id: 1, name: 'Item A' },
      { id: 2, name: 'Item B' },
      { id: 3, name: 'Parent item',
        children: [
          { id: 4, name: 'Item C' }
        ]
      }
    ]"
    value="1"
    :empty-option="true"
  />
</demo>

```vue
  <select-field :items="[
      { id: 1, name: 'Item A' },
      { id: 2, name: 'Item B' },
      { id: 3, name: 'Parent item',
        children: [
          { id: 4, name: 'Item C' }
        ]
      }
    ]"
    value="1"
    :empty-option="true"
  />
```

## Props

<prop name="id" type="String">
  The <code>id</code> attribute of the select field
</prop>

<prop name="name" type="String">
  The <code>name</code> attribute of the select field
</prop>

<prop name="empty-option" type="Boolean" default-value="false">
  Prepend an empty option to the select field?
</prop>

<prop name="items" type="Array" default-value="[]">
</prop>

<prop name="id-property" type="String" default-value="id">
</prop>

<prop name="value-property" type="String" default-value="name">
</prop>

<prop name="value" type="String, Number">
  Initial value
</prop>

## Events

<event name="selected" parameters="Name (String), Value (String, Number)">
  Emitted when an item gets selected
</event>
