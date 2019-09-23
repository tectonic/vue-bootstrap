import Vue from 'vue';
import Datepicker from '../../src/Datepicker.vue';
import Dropdown from '../../src/Dropdown.vue';
import Modal from '../../src/Modal.vue';
import Multiselect from '../../src/Multiselect.vue';
import Panel from '../../src/Panel.vue';
import Popover from '../../src/Popover.vue';
import SelectField from '../../src/SelectField.vue';
import Tabs from '../../src/Tabs.vue';
import TagInput from '../../src/TagInput.vue';
import Typeahead from '../../src/Typeahead.vue';

new Vue({
  el: '#app',
  components: {
    Datepicker,
    Dropdown,
    Modal,
    Multiselect,
    Panel,
    Popover,
    SelectField,
    Tabs,
    TagInput,
    Typeahead
  },
  data () {
    return {
      showModal: false,
      selectFieldItems: [
        { id: 1, name: 'Item A' },
        { id: 2, name: 'Item B' },
        { id: 3, name: 'Parent item',
          children: [
            { id: 4, name: 'Item C' }
          ]
        }
      ],
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
      ],
      multiselectOptions: [
        { id: 1, name: 'Action',
          children: [
            { id: 2, name: 'Martial Arts', extra: 'Extra information.' },
            { id: 3, name: 'Treasure Hunts' },
            { id: 4, name: 'Adventures',
              children: [
                { id: 5, name: 'Sea Adventures', extra: 'Extra information.' },
                { id: 6, name: 'Underwater Adventures' }
              ]
            }
          ]
        },
        { id: 7, name: 'Comedy',
          children: [
            { id: 8, name: 'Parody' },
            { id: 9, name: 'Spoofs' },
            { id: 10, name: 'Slapstick' }
          ]
        },
        { id: 11, name: 'Crime & Gangster',
          children: [
            { id: 12, name: 'Lovers on the run' },
            { id: 13, name: 'Mysteries' },
            { id: 14, name: 'Film Noir' }
          ]
        },
        { id: 15, name: 'Drama',
          children: [
            { id: 16, name: 'High School' },
            { id: 17, name: 'Love Story' },
            { id: 18, name: 'Soap Opera' },
            { id: 19, name: 'Medical' }
          ]
        },
        { id: 20, name: 'Horror' },
        { id: 21, name: 'Science Fiction' }
      ],
      multiselectOptionsFlat: [
        { id: 20, name: 'Horror' },
        { id: 21, name: 'Science Fiction' }
      ],
      availableTags: [
        { id: 1, value: 'Red' },
        { id: 2, value: 'Orange' },
        { id: 3, value: 'Yellow' },
        { id: 4, value: 'Green' },
        { id: 5, value: 'Cyan' },
        { id: 6, value: 'Blue' },
        { id: 7, value: 'Indigo' },
        { id: 8, value: 'Violet' },
        { id: 9, value: 'Purple' },
        { id: 10, value: 'Magenta' },
        { id: 11, value: 'Pink' },
        { id: 12, value: 'Brown' },
        { id: 13, value: 'White' },
        { id: 14, value: 'Gray' },
        { id: 15, value: 'Black' }
      ],
      tabs: [
        { id: 1, name: 'Tab 1'},
        { id: 2, name: 'Tab 2' },
        { id: 3, name: 'Tab 3', disabled: true }
      ],
      tab: 2
    };
  },
  methods: {
    onSelect (item) {
      console.log('Selected item\'s id: ' + item.id);
      console.log('Selected item\'s value: ' + item.value);
    }
  }
});
