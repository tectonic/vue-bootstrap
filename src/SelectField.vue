<template>
  <select :id="id" :name="name" class="form-control" ref="select">
    <option v-if="emptyOption"></option>
    <template v-for="item in items">
      <template v-if="item.children">
        <optgroup :label="item[valueProperty]">
          <option
            v-for="child in item.children"
            :value="child[idProperty]"
            :selected="child[idProperty] == selected"
          >
            {{ child[valueProperty] }}
          </option>
        </optgroup>
      </template>
      <template v-else>
        <option
          :value="item[idProperty]"
          :selected="item[idProperty] == selected"
        >
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
    value: [String, Number]
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
      if (!id || !this.getItem(id)) {
        return;
      }

      this.selected = id;
    },
    getItem (id) {
      return this.flatItems.find(item => item[this.idProperty].toString() === id.toString());
    },
    reset () {
      this.selected = null;
    },
    onChange (event) {
      this.select(event.target.value);
    }
  },
  created () {
    this.select(this.value);
  },
  mounted () {
    this.$refs.select.addEventListener('change', this.onChange, false);
  },
  beforeDestroy () {
    this.$refs.select.removeEventListener('change', this.onChange, false);

    // Prevent a memory leak - https://github.com/vuejs/vue/issues/9823
    this.$el.parentNode.removeChild(this.$refs.select);
  }
};
</script>
