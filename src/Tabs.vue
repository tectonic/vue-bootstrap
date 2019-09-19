<template>
  <ul :class="['nav', 'nav-'+type, { 'nav-stacked' : stacked }]">
    <li
      v-for="tab in tabs"
      role="presentation"
      :class="{ 'active': tab.id == selected }"
    >
      <a href @click.prevent="select(tab.id)">
        {{ tab.name }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      selected: null
    };
  },
  props: {
    tabs: {
      type: Array,
      required: true
    },
    active: {
      type: [Number, String],
      default: null
    },
    type: {
      type: String,
      default: 'tabs',
      validator: type => {
        return ['tabs', 'pills'].includes(type);
      }
    },
    stacked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    select (tabId) {
      this.selected = tabId;
      this.$emit('selected', this.selected);
    }
  },
  created () {
    this.selected = this.active;
  }
};
</script>
