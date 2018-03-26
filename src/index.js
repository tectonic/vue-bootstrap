// Mixins
import { mixin as clickOutside } from './mixins/clickOutside.js';

const mixins = {
  clickOutside
};

// Components
import Datepicker from './Datepicker.vue';
import Dropdown from './Dropdown.vue';
import Modal from './Modal.vue';
import Multiselect from './Multiselect.vue';
import Panel from './Panel.vue';
import Popover from './Popover.vue';
import Typeahead from './Typeahead.vue';

const components = {
  Datepicker,
  Dropdown,
  Modal,
  Multiselect,
  Panel,
  Popover,
  Typeahead
};

module.exports = Object.assign(mixins, components);
