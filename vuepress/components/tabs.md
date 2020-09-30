# Tabs

[[toc]]

## Demo

<demo>
  <tabs-demo />
</demo>

```vue
  <nav class="navigation">
    <tabs :tabs="tabs" v-model="tab"></tabs>
  </nav>

  <div class="content">
    Selected tab: {{ tab }}
  </div>
```

## Props

<prop name="tabs" type="Array">
  An array representing the tabs (<code>[{ id: 1, name: 'Tab 1', disabled: false }]</code>)
</prop>

<prop name="active" type="Number, String">
  The <code>id</code> of the active tab
</prop>

<prop name="type" type="String" default-value="tabs">
  Can be one of: tabs, pills
</prop>

<prop name="stacked" type="Boolean" default-value="false">
  Should the tabs be stacked?
</prop>

<prop name="preselect-first-tab" type="Boolean" default-value="true">
  Preselect the first tab if an active tab isn't specified
</prop>

## Events

<event name="selected" parameters="Active tab id (String, Number)">
  Emitted when a tab gets selected
</event>
