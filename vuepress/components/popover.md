# Popover

[[toc]]

## Demo

<demo>
  <popover
    title="Hello world!"
    placement="top"
    origin="left"
  >
    <a class="btn btn-primary">Click me</a>
    <div slot="content">
      This is the content
    </div>
  </popover>
</demo>

```vue
<popover
  title="Hello world!"
  placement="top"
  origin="left"
>
  <a class="btn btn-primary">Click me</a>
  <div slot="content">
    This is the content
  </div>
</popover>
```

## Props

<prop name="title" type="String">
</prop>

<prop name="content" type="String">
  Content of the popover.
  A slot can also be used to inject content (like in the example above).
</prop>

<prop name="placement" type="String" default-value="top">
  Placement (top, bottom, left or right)
</prop>

<prop name="origin" type="String" default-value="center">
  Origin (top, bottom, left, right or center).<br><br>
  It only makes sense to use certain combinations of placement and origin:<br><br>
  - If the placement is top or bottom, the origin can be left, right or center.<br>
  - If the placement is left or right, the origing can be top, bottom or center.<br><br>
  The origin defaults to center.
</prop>

<prop name="effect" type="String" default-value="fade">
  Effect (currently only the fade effect is supported)
</prop>

<prop name="trigger" type="String" default-value="click">
  Trigger (click, hover or manual)
</prop>

<prop name="append-to" type="String" default-value="body">
  The element to which to append the popover
</prop>

<prop name="popover-class" type="String">
  Additional class for the popover
</prop>
