# disable form

This mixin disables all form elements (input, button, textarea, select).

## Example

```vue
<template>
  <form method="POST" v-disable-form>
    ...
  </form>
</template>

<script>
import { disableForm } from 'vue-bootstrap';

export default {
  mixins: [disableForm]
}
</script>
```
