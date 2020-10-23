<template>
  <select :id="id" :name="name" v-model="selected" class="form-control">
    <option v-if="emptyOption"></option>
    <template v-for="item in items">
      <template v-if="item.children">
        <optgroup :label="item[valueProperty]">
          <option v-for="child in item.children" :value="child[idProperty]">
            {{ child[valueProperty] }}
          </option>
        </optgroup>
      </template>
      <template v-else>
        <option :value="item[idProperty]">
          {{ item[valueProperty] }}
        </option>
      </template>
    </template>
  </select>
</template>

<script>
export default {
  data () {
    return {
      selected: null
    };
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    emptyOption: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    idProperty: {
      type: String,
      default: 'id'
    },
    valueProperty: {
      type: String,
      default: 'name'
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    flatItems () {
      return [].concat(...this.items.map(item => {
        if (item.hasOwnProperty('children')) {
          return item.children;
        }

        return [item];
      }));
    }
  },
  watch: {
    selected () {
      this.$emit('selected', this.name, this.selected);
    }
  },
  methods: {
    select (id) {
      if (id === null || !this.getItem(id)) {
        return;
      }

      this.selected = id;
    },
    getItem (id) {
      return this.flatItems.find(item => item[this.idProperty].toString() === id.toString());
    },
    reset () {
      this.selected = null;
    }
  },
  created () {
    this.select(this.value);
  }
};
</script>
