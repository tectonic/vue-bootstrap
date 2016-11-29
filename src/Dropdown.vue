<template>
  <div :class="[{ 'open': isOpen }, 'dropdown']">
    <button
      class="btn btn-default dropdown-toggle"
      type="button"
      :id="id"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="true"
      @click="toggle"
      @keyup.esc="isOpen = false">
      Dropdown <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" :aria-labelledby="id">
      <li><a href="#">Action</a></li>
      <li><a href="#">Another action</a></li>
      <li><a href="#">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a href="#">Separated link</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    toggle () {
      this.isOpen = (this.isOpen) ? false : true;
    }
  },
  data () {
    return {
      isOpen: false,
    };
  },
  mounted () {
    //
  }
};
</script>

<style>
</style>
