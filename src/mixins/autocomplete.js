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
    autocompleteItems () {
      if (!this.query) {
        return [];
      }

      // Filter items by query
      let autocompleteItems = this.src ? this.items : this.items.filter(item => {
        return item.value.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
      });

      if (this.limit !== 0) {
        autocompleteItems = autocompleteItems.slice(0, this.limit);
      }

      return autocompleteItems;
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
      this.autocompleting = this.autocompleteItems.length > 0;
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
        this.currentItem = this.autocompleteItems.length - 1;
      } else {
        this.currentItem--;
      }
    },
    markNextItem () {
      if (this.currentItem < this.autocompleteItems.length - 1) {
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
