<template>
  <div :class="[{ open: isDropdownOpen }, 'dropdown']">
    <input type="text"
      v-model="query"
      :id="id"
      :placeholder="placeholder"
      @input="onInput"
      @blur="isDropdownOpen = false"
      class="form-control"
      autocomplete="off"
    />
    <ul class="dropdown-menu">
      <li v-for="item in filteredItems">
        <a href="#" v-on:mousedown.prevent="onItemClick">{{ item }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
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
  computed: {
    filteredItems() {
      if (!this.items || !this.query) {
        return [];
      }

      return this.items.filter(item => {
        return item.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
      });
    }
  },
  methods: {
    onInput() {
      this.isDropdownOpen = this.filteredItems.length > 0
    },
    onItemClick(event) {
      this.query = event.target.innerText;
      this.isDropdownOpen = false;
    }
  },
  data () {
    return {
      query: '',
      isDropdownOpen: false
    }
  },
  mounted() {
    this.query = this.value;
  }
}
</script>

<style>
</style>
