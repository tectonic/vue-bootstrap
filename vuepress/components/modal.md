# Modal

[[toc]]

## Demo

<modal-demo />

```vue
<button
  class="btn btn-primary"
  @click="showModal = true"
>
  Show modal
</button>

<modal
  title="Hello world!"
  v-model="showModal"
  @closed="showModal = false"
>
  This is the body.
</modal>
```

## Props

<prop name="value" type="Boolean" default-value="false">
  Used to open or close the modal
</prop>

<prop name="title" type="String" default-value="Modal title">
  Title of the modal
</prop>

<prop name="body" type="String" default-value="One fine body...">
  The body (content) of the modal
</prop>

<prop name="id" type="String">
  The <code>id</code> attribute of the modal
</prop>

<prop name="header" type="Boolean" default-value="true">
  Controls visibility of the header
</prop>

<prop name="header-close-button" type="Boolean" default-value="true">
  Controls visibility of the close button in the header
</prop>

<prop name="footer" type="Boolean" default-value="true">
  Controls visibility of the footer
</prop>

<prop name="confirm-button" type="Boolean" default-value="true">
  Controls visibility of the "Confirm" button
</prop>

<prop name="confirm-button-label" type="String" default-value="Confirm">
  "Confirm" button label
</prop>

<prop name="close-on-confirm" type="Boolean" default-value="true">
  Close the modal on "Confirm" button click?
</prop>

<prop name="close-button" type="Boolean" default-value="true">
  Controls visibility of the "Close" button
</prop>

<prop name="close-button-label" type="String" default-value="Close">
  "Close" button label
</prop>

## Events

<event name="opened">
  Emitted when the modal gets opened
</event>

<event name="closed">
  Emitted when the modal gets closed
</event>

<event name="confirmed">
  Emitted on "Confirm" button click
</event>
