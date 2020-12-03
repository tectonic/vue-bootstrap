# format URL

This mixin installs a directive that prepends a protocol to an input field's value (https:// by default).

## Example

```vue
<template>
  <div>
    <input type="text" v-format-url>
    <input type="text" v-format-url:http>
    <input type="text" v-format-url:ftp>
  </div>
</template>

<script>
import { formatUrl } from 'vue-bootstrap';

export default {
  mixins: [formatUrl]
}
</script>
```
