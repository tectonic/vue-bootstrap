<template>
  <ul :class="['nav', 'nav-'+type, { 'nav-stacked' : stacked }]">
    <li
      v-for="tab in tabs"
      role="presentation"
      :class="[{ 'active': tab.id == selected }, { 'disabled': tab.disabled }]"
    >
      <a href @click.prevent="select(tab)">
        {{ tab.name }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'active',
    event: 'selected'
  },
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
    },
    preselectFirstTab: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    select (tab) {
      if (tab.disabled) {
        return;
      }

      this.selected = tab.id;
      this.$emit('selected', this.selected);
    }
  },
  created () {
    let tab;

    if (this.active) {
      tab = this.tabs.find(tab => tab.id === this.active);
    } else if (this.preselectFirstTab && this.tabs.length) {
      tab = this.tabs[0];
    }

    if (tab) {
      this.select(tab);
    }
  }
};
</script>
