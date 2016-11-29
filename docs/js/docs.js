import Vue from 'vue';
import Dropdown from '../../src/Dropdown.vue';
import Typeahead from '../../src/Typeahead.vue';

new Vue({
  el: '#app',
  components: {
    Dropdown,
    Typeahead
  },
  data () {
    return {
      typeaheadItems: [
        { id: 1, value: 'Ann' },
        { id: 2, value: 'Annemarie' },
        { id: 3, value: 'Bill' },
        { id: 4, value: 'Jack' },
        { id: 5, value: 'Joan' },
        { id: 6, value: 'John' },
        { id: 7, value: 'Mark' },
        { id: 8, value: 'Robert' },
        { id: 9, value: 'Susan' }
      ]
    };
  },
  methods: {
    onSelect (item) {
      console.log('Selected item\'s id: ' + item.id);
      console.log('Selected item\'s value: ' + item.value);
    }
  }
});
