# Datepicker

[[toc]]

## Demo

<demo>
  <datepicker value="2019-08-31 23:55" mode="datetime"></datepicker>
</demo>

```vue
<datepicker value="2019-08-31 23:55" mode="datetime"></datepicker>
```

## Props

<prop name="name" type="String">
  The <code>name</code> attribute of the input element
</prop>

<prop name="value" type="String">
  Initial value, it needs to have a format such as 2017-03-01 or 2017-03-01 12:10
</prop>

<prop name="id" type="String">
  The <code>id</code> attribute of the input element
</prop>

<prop name="container-class" type="String">
  The class/classes of the container element
</prop>

<prop name="formatter" type="Function" default-value="null">
  <p>
    Callback used for formatting the date input.
    It receives current date in "YYYY-MM-DD (HH:MM)" format as a parameter.
    Can be easily used with <code>moment.js</code>:
  </p>

```js
formatter(date) {
  return moment(date)
    .locale(this.momentLocale)
    .format(this.format);
}
```
</prop>

<prop name="use-am" type="Boolean" default-value="false">
  If true the hour will be displayed in AM/PM format
</prop>

<prop name="days-of-week" type="Array" default-value="['Su', 'Mo', 'Tu', ...]">
  Days of the week
</prop>

<prop name="highlight-today" type="Boolean" default-value="true">
  Highlights today in the calendar
</prop>

<prop name="icons" type="Object" default-value="{ left: 'glyphicon glyphicon-chevron-left', ... }">
  Icons for UI buttons
</prop>

<prop name="mode" type="String" default-value="date">
  Mode can be set to date, datetime or time
</prop>

<prop name="months" type="Array" default-value="['January', 'February', 'March', ...]">
  Month names
</prop>

<prop name="months-short" type="Array" default-value="['Jan', 'Feb', 'Mar', ...]">
  Short month names, used on the month selector view
</prop>

<prop name="placeholder" type="String">
  The <code>placeholder</code> attribute of the input element
</prop>

<prop name="translations" type="Object" default-value="{ today: 'Go to today', clear: 'Clear selection', ... }">
  Allows to override tooltips with messages in another language
</prop>

<prop name="disabled" type="Boolean" default-value="false">
  Disable input
</prop>

## Events

<event name="changed" parameters="Selected date (String)">
  Emitted when the date is changed
</event>
