# Multicheckbox

[[toc]]

## Demo

<multicheckbox-demo />

```vue
<multicheckbox
  name="stats"
  :options="players"
  :selected-options="[1, 2]"
  :subsets="[
    { id: 'steals', name: 'Steals' },
    { id: 'rebounds', name: 'Rebounds' },
    { id: 'points', name: 'Points' }
  ]"
  :selected-subset-options="{
    steals: [],
    rebounds: [1],
    points: [1, 2]
  }"
/>
```

## Props

<prop name="name" type="String" default-value="multicheckbox">
</prop>

<prop name="filter" type="Boolean" default-value="true">
  Show the keyword filter?
</prop>

<prop name="placeholder" type="String" default-value="Filter list">
</prop>

<prop name="select-all-label" type="String" default-value="Select all">
</prop>

<prop name="options" type="Array" default-value="[]">
  Example: <code>[{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }]</code>
</prop>

<prop name="selected-options" type="Array" default-value="[]">
  Example: <code>[1, 2]</code>
</prop>

<prop name="subset-name" type="String" default-value="subset">
</prop>

<prop name="subsets" type="Array" default-value="[]">
  Example:<br>
  <code>[{ id: 'steals', name: 'Steals' }, { id: 'rebounds', name: 'Rebounds' }, { id: 'points', name: 'Points' }]</code>
</prop>

<prop name="selected-subset-options" type="Array" default-value="[]">
  Example:<br>
  <code>[{ id: 'steals', name: 'Steals' }, { id: 'rebounds', name: 'Rebounds' }, { id: 'points', name: 'Points' }]</code>
</prop>

<prop name="disabled" type="Boolean" default-value="false">
</prop>

## Events

<event name="selected" parameters="Ids (Array), Selected subset ids (Array)">
  Emitted when a selection is made.
</event>
