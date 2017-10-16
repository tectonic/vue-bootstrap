<template>
  <div class="multiselect-subset-control">
    <input type="radio" :name="subsetName" v-model="selectedOption" :value="option[idProperty]">
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedOption: ''
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
    this.selectedOption = this.selectedSubsetOptions.length > 0 ? this.selectedSubsetOptions[0] : '';
  }
};
</script>
