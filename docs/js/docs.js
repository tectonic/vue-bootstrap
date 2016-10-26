import Vue from 'vue';
import Typeahead from '../../src/Typeahead.vue';

var vm = new Vue({
  el: '#app',
  components: {
    Typeahead,
  },
  data() {
    return {
      typeaheadItems: ['Ann', 'Annemarie', 'Bill', 'Jack', 'Joan', 'John', 'Mark', 'Robert', 'Susan']
    }
  },
});
