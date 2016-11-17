import Vue from 'vue';
import Typeahead from '../../src/Typeahead.vue';

new Vue({
  el: '#app',
  components: {
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
  }
});
