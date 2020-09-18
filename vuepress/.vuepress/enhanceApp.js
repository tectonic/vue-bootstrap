import Datepicker from '../../src/Datepicker';
import Dropdown from '../../src/Dropdown';
import Modal from '../../src/Modal';
import Multiselect from '../../src/Multiselect';
import Panel from '../../src/Panel';
import Popover from '../../src/Popover';
import SearchField from '../../src/SearchField';
import SelectField from '../../src/SelectField';
import Tabs from '../../src/Tabs';
import TagInput from '../../src/TagInput';
import Typeahead from '../../src/Typeahead';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer // is this enhancement applied in server-rendering or client
}) => {
  Vue.component('Datepicker', Datepicker);
  Vue.component('Dropdown', Dropdown);
  Vue.component('Modal', Modal);
  Vue.component('Multiselect', Multiselect);
  Vue.component('Panel', Panel);
  Vue.component('Popover', Popover);
  Vue.component('SearchField', SearchField);
  Vue.component('SelectField', SelectField);
  Vue.component('Tabs', Tabs);
  Vue.component('TagInput', TagInput);
  Vue.component('Typeahead', Typeahead);
}
