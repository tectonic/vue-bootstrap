import Vue from 'vue';
import Datepicker from '../../src/Datepicker.vue';
import Dropdown from '../../src/Dropdown.vue';
import Popover from '../../src/Popover.vue';
import Typeahead from '../../src/Typeahead.vue';

new Vue({
  el: '#app',
  components: {
    Datepicker,
    Dropdown,
    Popover,
    Typeahead
  },
  data () {
    return {
      typeaheadItems: [
        { id: 1, value: 'Anne Sullivan' },
        { id: 2, value: 'Anne Hathaway' },
        { id: 3, value: 'Joan Allen' },
        { id: 4, value: 'Joan Collins' },
        { id: 5, value: 'Joan Baez' },
        { id: 6, value: 'Mark Twain' },
        { id: 7, value: 'Robert Redford' },
        { id: 8, value: 'Susan Sontag' },
        { id: 9, value: 'John Lee Hooker' },
        { id: 10, value: 'John Tyler' },
        { id: 11, value: 'John Terry' },
        { id: 12, value: 'John Cleese' },
        { id: 13, value: 'John Malkovich' },
        { id: 14, value: 'John Stockton' },
        { id: 15, value: 'John Ritter' },
        { id: 16, value: 'John McCain' },
        { id: 17, value: 'John Goodman' },
        { id: 18, value: 'John C. Reilly' },
        { id: 19, value: 'John Stamos' },
        { id: 20, value: 'John Mayer' },
        { id: 21, value: 'John Elway' },
        { id: 22, value: 'John Wayne Gacy' },
        { id: 23, value: 'John Denver' },
        { id: 24, value: 'John Travolta' },
        { id: 25, value: 'John Wayne' },
        { id: 26, value: 'John Lennon' },
        { id: 27, value: 'John F. Kennedy' }
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
