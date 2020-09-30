# Dropdown

[[toc]]

## Demo

<demo>
  <dropdown label="Dropdown" id="menu">
    <li>
      <a href>Action</a>
    </li>
    <li>
      <a href>Another action</a>
    </li>
  </dropdown>
</demo>

```vue
<dropdown label="Dropdown" id="menu">
  <li>
    <a href>Action</a>
  </li>
  <li>
    <a href>Another action</a>
  </li>
</dropdown>
```

## Props

<prop name="id" type="String">
  The <code>id</code> attribute of the button
</prop>

<prop name="label" type="String">
  Button label
</prop>

<prop name="button-class" type="String" default-value="btn btn-default">
  The class/classes of the button element
</prop>

<prop name="container-class" type="String">
  The class/classes of the container element
</prop>

<prop name="menu-class" type="String">
  The class/classes of the menu element
</prop>

<prop name="menu-element" type="String" default-value="ul">
  Customise the menu element
</prop>

<prop name="horizontal-position" type="String" default-value="left">
  Horizontal position of the dropdown (left or right)
</prop>

<prop name="vertical-position" type="String" default-value="bottom">
  Vertical position of the dropdown (bottom or top)
</prop>

<prop name="manual" type="Boolean" default-value="false">
  In manual mode the dropdown can be opened using the <code>open</code>, <code>close</code>
  or <code>toggle</code> methods
</prop>
