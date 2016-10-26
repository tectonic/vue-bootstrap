<template>
  <div class="dropdown open">
    <input type="text" :id="id" :placeholder="placeholder" class="form-control" autocomplete="off" />
    <ul class="dropdown-menu">
      <li v-for="item in items">
        <a>{{ item }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    },
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  created() {
    console.log('created');
  },
  mounted() {
    console.log('mounted');
  }
}
</script>

<style>
</style>
