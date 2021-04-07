<template>
  <div class="checkbox multicheckbox-option">
    <template v-if="selection.includes(option.id)">
      <div
        class="multicheckbox-subset-control column"
        v-for="subset in subsets"
      >
        <input
          type="checkbox"
          :name="`${name}[${option.id}][${subset.id}]`"
          :checked="(subsetSelection[subset.id] || []).includes(option.id)"
          :id="`${name}-${option.id}-${subset.id}`"
          :value="option.id"
          :disabled="disabled"
          @change="event => $emit('subsetChecked', option, subset, event.target.checked)"
        />
      </div>
    </template>
    <label>
      <input
        type="checkbox"
        :name="`${name}[${option.id}][enabled]`"
        :checked="selection.includes(option.id)"
        :id="`${name}-${option.id}-enabled`"
        :value="option.id"
        :disabled="disabled"
        @change="event => $emit('checked', option, event.target.checked)"
      > {{ option.name }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      required: true
    },
    selection: {
      type: Array,
      default: () => []
    },
    subsetSelection: {
      type: Object,
      default: () => ({})
    },
    subsets: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
  .multicheckbox-option {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    margin: 0;
  }

  .multicheckbox-option label {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .multicheckbox-subset-control {
    float: right;
    width: 20%;
  }

  .multicheckbox-subset-control input {
    margin-left: 0;
    position: relative;
  }
</style>
