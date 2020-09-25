# Multiselect

[[toc]]

## Demo

<multiselect-demo />

```vue
<multiselect
  :options="multiselectOptions"
  :subset="true"
  subset-label="Total"
  :randomizer="true"
  randomizer-help-text="Help text."
/>
```

## Props

<prop name="name" type="String" default-value="multiselect[]">
</prop>

<prop name="filter" type="Boolean" default-value="true">
  Show the keyword filter?
</prop>

<prop name="counter" type="Boolean" default-value="true">
  Show the counter?
</prop>

<prop name="select-all" type="Boolean" default-value="true">
  Show the "Select all" control?
</prop>

<prop name="placeholder" type="String" default-value="Filter list">
</prop>

<prop name="select-all-label" type="String" default-value="Select all">
</prop>

<prop name="options" type="Array" default-value="[]">
  Available options
</prop>

<prop name="selected-options" type="Array" default-value="[]">
  Selected options
</prop>

<prop name="id-property" type="String" default-value="id">
</prop>

<prop name="value-property" type="String" default-value="name">
</prop>

<prop name="extra-property" type="String" default-value="extra">
  Property name that will be used to access extra information.
  When provided the extra information will be displayed in a popover next to the option.
</prop>

<prop name="remember-selection" type="Boolean" default-value="false">
  Remember selected options even when the options list changes?
</prop>

<prop name="randomizer" type="Boolean" default-value="false">
  Show the randomizer?
</prop>

<prop name="randomizer-show" type="String" default-value="Random selection">
</prop>

<prop name="randomizer-how-many" type="String" default-value="How many?">
</prop>

<prop name="randomizer-help-text" type="String">
</prop>

<prop name="randomizer-button" type="String" default-value="Go">
</prop>

<prop name="subset" type="Boolean" default-value="false">
  Enable subset selection?
</prop>

<prop name="subset-type" type="String" default-value="radio">
</prop>

<prop name="subset-name" type="String" default-value="subset">
</prop>

<prop name="subset-label" type="String" default-value="Default">
</prop>

<prop name="selected-subset-options" type="Array" default-value="[]">
</prop>

<prop name="info-icon-class" type="String" default-value="glyphicon glyphicon-info-sign">
</prop>

<prop name="help-icon-class" type="String" default-value="glyphicon glyphicon-question-sign">
</prop>

<prop name="disabled" type="Boolean" default-value="false">
  Disable input
</prop>

<prop name="show-nothing-found" type="Boolean" default-value="false">
  Display a label when there are no results?
</prop>

<prop name="nothing-found-label" type="String" default-value="Nothing found">
  Use together with <code>show-nothing-found</code> prop
</prop>

## Events

<event name="selected" parameters="Ids (Array)">
  Emitted when the selection is changed.
</event>
