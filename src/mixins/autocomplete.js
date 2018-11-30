/**
 * Autocomplete mixin - contains shared logic for the Typeahead and TagInput components.
 */
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      query: '',
      autocompleting: false,
      items: [],
      currentItem: 0
    };
  },
  computed: {
    filteredItems () {
      if (!this.query) {
        return [];
      }

      // Filter items by query
      let filteredItems = this.src ? this.items : this.items.filter(item => {
        return item.value.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
      });

      if (this.limit !== 0) {
        filteredItems = filteredItems.slice(0, this.limit);
      }

      return filteredItems;
    }
  },
  methods: {
    onInput () {
      this.autocomplete();

      if (this.src && this.query) {
        this.fetchItems();
      }
    },
    fetchItems () {
      this.$http.get(this.src + this.query).then((response) => {
        this.items = response.data;

        // New items arrived - trigger autocomplete
        this.autocomplete();
      }, (response) => {
        this.$emit('error', response);
      });
    },
    autocomplete () {
      this.autocompleting = this.filteredItems.length > 0;
    },
    stopAutocomplete () {
      this.autocompleting = false;
      this.currentItem = 0;
    },
    isMarked (index) {
      return this.currentItem === index;
    },
    markPreviousItem () {
      if (this.currentItem === 0) {
        this.currentItem = this.filteredItems.length - 1;
      } else {
        this.currentItem--;
      }
    },
    markNextItem () {
      if (this.currentItem < this.filteredItems.length - 1) {
        this.currentItem++;
      } else {
        this.currentItem = 0;
      }
    },
    markItem (index) {
      this.currentItem = index;
    }
  }
};
