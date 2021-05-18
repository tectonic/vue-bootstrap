# click outside

This mixin installs a directive that allows to detect a click outside a given element.

## Example

```vue
<template>
  <div v-on-click-outside="onClickOutside"></div>
</template>

<script>
import { clickOutside } from 'vue-bootstrap';

export default {
  mixins: [clickOutside],
  methods: {
    onClickOutside: {
      // your callback
    }
  }
}
</script>
```
