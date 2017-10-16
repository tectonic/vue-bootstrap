<template>
  <div class="multiselect-subset-control">
    <input type="checkbox" :name="subsetName + '[]'" v-model="checked" :value="option[idProperty]">
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: false
    };
  },
  props: {
    option: {
      type: Object,
      required: true
    },
    selectedSubsetOptions: {
      type: Array,
      required: true
    },
    idProperty: String,
    subsetName: String
  },
  created () {
    this.checked = this.selectedSubsetOptions.includes(this.option[this.idProperty]);
  }
};
</script>
