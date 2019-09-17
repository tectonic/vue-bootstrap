<template>
  <div :class="['vue-datetimepicker-widget', { 'open': isOpen }, 'dropdown', containerClass]" v-on-click-outside="close">
    <input type="text"
      :value="dateInput"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @focus="open"
      @keyup.esc="close"
      @keyup.delete="clearDate"
      class="form-control"
      autocomplete="off"
      readonly
    />
    <div class="datepicker dropdown-menu">
      <ul class="list-unstyled">
        <li>
          <!-- Calendar view -->
          <table :class="[{ 'hidden': view !== 'calendar' }, 'calendar', 'table-condensed']">
            <thead>
              <tr>
                <th class="previous-month control-button" :title="translate('prev_month')" @click="previousMonth"><span :class="icons.left"></span></th>
                <th class="current-month control-button" colspan="5" @click="changeView('months')">{{ months[month] }} {{ year }}</th>
                <th class="next-month control-button" :title="translate('next_month')" @click="nextMonth"><span :class="icons.right"></span></th>
              </tr>
              <tr>
                <th class="day-of-week" v-for="dayOfWeek in daysOfWeek">{{ dayOfWeek }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="week in visibleWeeks">
                <td v-for="day in week" :class="['day', { 'muted': !isWithinCurrentMonth(day), 'selected active': isSelected(day), 'today': (highlightToday && isToday(day))}]" @click="select(day)">
                  {{ day.getDate() }}
                </td>
              </tr>
            </tbody>
          </table>
          <hr :class="[{ 'hidden': ['clock', 'months', 'hours', 'minutes'].indexOf(view) > -1 }, 'separator']">
          <table>
            <tbody>
              <tr class="control-buttons">
                <td class="set-now" :title="translate('today')" @click="setNow()">
                  <a data-action>
                    <span :class="icons.now"></span>
                  </a>
                </td>
                <td class="show-calendar" v-if="mode === 'datetime' && view === 'clock'" @click="changeView('calendar')">
                  <a data-action>
                    <span :class="icons.calendar"></span>
                  </a>
                </td>
                <td class="show-clock" v-if="mode === 'datetime' && view !== 'clock'" :title="translate('select_time')" @click="changeView('clock')">
                  <a data-action>
                    <span :class="icons.time"></span>
                  </a>
                </td>
                <td class="clear-selection" :title="translate('clear')" @click="clearDate()">
                  <a data-action>
                    <span :class="icons.trash"></span>
                  </a>
                </td>
                <td class="close-picker" :title="translate('close')" @click="close()">
                  <a data-action>
                    <span :class="icons.close"></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <hr :class="[{ 'hidden': ['months', 'hours', 'minutes'].indexOf(view) === -1 }, 'separator']">
          <div :class="{ 'hidden': view !== 'months' }">
            <!-- Months selector -->
            <table>
              <tbody>
              <tr v-for="(monthRow, index) in monthsChunked()" :key="monthRow[index]['id']" class="control-buttons control-buttons-lg">
                <td @click="showMonth(monthRow[0]['id'])">{{ monthRow[0]['name'] }}</td>
                <td @click="showMonth(monthRow[1]['id'])">{{ monthRow[1]['name'] }}</td>
                <td @click="showMonth(monthRow[2]['id'])">{{ monthRow[2]['name'] }}</td>
                <td @click="showMonth(monthRow[3]['id'])">{{ monthRow[3]['name'] }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div :class="{ 'hidden': view !== 'clock' }">
            <hr class="separator">
            <table :class="['clock', 'table-condensed']">
              <tbody>
              <tr>
                <td class="control-button" :title="translate('increment_hour')" @click="setClock('hours', 'increment')">
                  <a data-action>
                    <span :class="icons.up"></span>
                  </a>
                </td>
                <td></td>
                <td class="control-button" :title="translate('increment_minute')" @click="setClock('minutes', 'increment')">
                  <a data-action>
                    <span :class="icons.up"></span>
                  </a>
                </td>
              </tr>
              <tr>
                <td class="hours" :title="translate('pick_hour')" @click="changeView('hours')">
                    {{ hoursFormatted() }}
                </td>
                <td class="colon">:</td>
                <td class="minutes" :title="translate('pick_minute')" @click="changeView('minutes')">
                    {{ minutesFormatted() }}
                </td>
                <td class="am-pm" v-if="useAmPm">
                  <button type="button" class="btn btn-primary" @click="toggleAmPm">{{ amOrPm }}</button>
                </td>
              </tr>
              <tr>
                <td class="control-button" :title="translate('decrement_hour')" @click="setClock('hours', 'decrement')">
                  <a data-action>
                    <span :class="icons.down"></span>
                  </a>
                </td>
                <td></td>
                <td class="control-button" :title="translate('decrement_minute')" @click="setClock('minutes', 'decrement')">
                  <a data-action>
                    <span :class="icons.down"></span>
                  </a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <!-- Hours selector -->
          <table :class="{ 'hidden': view !== 'hours' }">
            <tbody>
              <tr v-for="(hourRow, index) in hours()" :key="hourRow[index]" class="control-buttons">
                <td @click="setHour(hourRow[0])">{{ hourRow[0] }}</td>
                <td @click="setHour(hourRow[1])">{{ hourRow[1] }}</td>
                <td @click="setHour(hourRow[2])">{{ hourRow[2] }}</td>
                <td @click="setHour(hourRow[3])">{{ hourRow[3] }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Minutes selector -->
          <table :class="{ 'hidden': view !== 'minutes' }">
            <tbody>
              <tr v-for="(minutesRow, index) in minutes()" :key="minutesRow[index]" class="control-buttons control-buttons-lg">
                <td @click="setMinutes(minutesRow[0])">{{ minutesRow[0] }}</td>
                <td @click="setMinutes(minutesRow[1])">{{ minutesRow[1] }}</td>
                <td @click="setMinutes(minutesRow[2])">{{ minutesRow[2] }}</td>
                <td @click="setMinutes(minutesRow[3])">{{ minutesRow[3] }}</td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { chunk } from './lib/array.js';
import { mixin as clickOutside } from './mixins/clickOutside.js';

export default {
  mixins: [
    clickOutside
  ],
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    containerClass: {
      type: String,
      default: ''
    },
    formatter: {
      type: Function,
      default: null
    },
    useAmPm: {
      type: Boolean,
      default: false
    },
    daysOfWeek: {
      type: Array,
      default: () => {
        return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      }
    },
    highlightToday: {
      type: Boolean,
      default: true
    },
    icons: {
      type: Object,
      default: () => {
        return {
          left: 'glyphicon glyphicon-chevron-left',
          right: 'glyphicon glyphicon-chevron-right',
          up: 'glyphicon glyphicon-chevron-up',
          down: 'glyphicon glyphicon-chevron-down',
          calendar: 'glyphicon glyphicon-calendar',
          close: 'glyphicon glyphicon-remove',
          now: 'glyphicon glyphicon-screenshot',
          time: 'glyphicon glyphicon-time',
          trash: 'glyphicon glyphicon-trash'
        };
      }
    },
    mode: {
      type: String,
      default: 'date',
      validator: (value) => {
        return value === 'date' || value === 'datetime' || value === 'time';
      }
    },
    months: {
      type: Array,
      default: () => {
        return [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
      }
    },
    monthsShort: {
      type: Array,
      default: () => {
        return [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    // Key-values translations to be used in UI
    translations: {
      type: Object,
      default: () => {
        return {
          today: 'Go to today',
          clear: 'Clear selection',
          close: 'Close the picker',
          prev_month: 'Previous Month',
          next_month: 'Next Month',
          pick_hour: 'Pick Hour',
          increment_hour: 'Increment Hour',
          decrement_hour: 'Decrement Hour',
          pick_minute: 'Pick Minute',
          increment_minute: 'Increment Minute',
          decrement_minute: 'Decrement Minute',
          select_time: 'Select Time',
          am: 'AM',
          pm: 'PM',
        };
      }
    }
  },
  data () {
    return {
      view: this.mode === 'time' ? 'clock' : 'calendar',
      date: null,
      dateInput: '',
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      isOpen: false
    };
  },
  computed: {
    visibleWeeks () {
      const days = this.daysInMonth(this.month, this.year);

      const pastDays = this.pastDays(days);
      const futureDays = this.futureDays(days);

      // Chunk days into weeks
      return chunk([...pastDays, ...days, ...futureDays], 7);
    },
    amOrPm () {
      if (this.date.getHours() < 12) {
        return this.translate('am') || 'AM';
      }
      return this.translate('pm') || 'PM';
    }
  },
  methods: {
    open () {
      if (this.date === null) {
        this.date = this.dateNow();
        this.dateInput = this.formatDateTime(this.date);
      }

      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();
      this.isOpen = true;
    },
    close () {
      this.isOpen = false;
    },
    changeView (newView) {
      this.view = newView;
    },
    nextMonth () {
      if (this.month < 11) {
        this.month++;
      } else {
        this.month = 0;
        this.year++;
      }
    },
    previousMonth () {
      if (this.month > 0) {
        this.month--;
      } else {
        this.month = 11;
        this.year--;
      }
    },
    showMonth (month) {
      this.month = month;
      this.view = 'calendar';
    },
    isWithinCurrentMonth (date) {
      return date.getMonth() === this.month && date.getFullYear() === this.year;
    },
    isSelected (date) {
      if (!this.dateInput) {
        return false;
      }

      return date.getDate() === this.date.getDate() &&
        date.getMonth() === this.date.getMonth() &&
        date.getFullYear() === this.date.getFullYear();
    },
    isToday (date) {
      var today = new Date();
      return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    },
    select (date) {
      this.date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        this.date.getHours(),
        this.date.getMinutes()
      );

      this.dateInput = this.formatDateTime(this.date);

      // Don't close the datepicker in datetime mode as someone may
      // want to select time after selecting the date.
      if (this.mode !== 'datetime') {
        this.isOpen = false;
      }

      this.$emit('changed', this.formatDateTime(this.date, true));
    },
    clearDate () {
      this.dateInput = '';

      this.$emit('changed', '');
    },
    formatDateTime (date, forceDefaultFormat = false) {
      if (!forceDefaultFormat && this.formatter) {
        return this.formatter(date);
      }

      let formattedDate = '';
      if (this.mode === 'date' || this.mode === 'datetime') {
        formattedDate = this.formatDate(date, forceDefaultFormat);
      }
      if (this.mode === 'datetime' || this.mode === 'time') {
        formattedDate += ' ' + this.formatTime(date);
      }

      return formattedDate;
    },
    formatDate (date, forceDefaultFormat = false) {
      if (!forceDefaultFormat && this.formatter) {
        return this.formatter(date);
      }

      return date.getFullYear() +
        '-' + this.pad(date.getMonth() + 1) +
        '-' + this.pad(date.getDate());
    },
    formatTime (date) {
      return this.hoursFormatted(date.getHours()) + ':' + this.minutesFormatted();
    },
    hoursFormatted (hours = null) {
      if (hours === null) {
        hours = this.date === null ? this.dateNow().getHours() : this.date.getHours();
      }
      return this.pad(this.useAmPm ? ((hours % 12) || 12) : hours);
    },
    minutesFormatted (minutes = null) {
      if (minutes === null) {
        minutes = this.date === null ? this.dateNow().getMinutes() : this.date.getMinutes();
      }
      return this.pad(minutes);
    },
    pad (value) {
      return ('0' + value).slice(-2);
    },
    validFormat (date) {
      // Accept dates in the format of '2017-03-01' or '2017-03-01 12:10' or '23:09'.
      return (date.length === 10 && /^[0-9-]+$/.test(date)) ||
        (date.length === 16 && /^[0-9-\s:]+$/.test(date)) ||
        (date.length === 5 && /^\d{2}:\d{2}$/.test(date));
    },
    parseDate (date) {
      let parsedDate;

      if (date && this.validFormat(date)) {
        if (this.mode === 'time') {
          parsedDate = new Date();
          parsedDate.setHours(date.substring(0, 2));
          parsedDate.setMinutes(date.substring(3, 5));
          parsedDate.setSeconds(0);

          return parsedDate;
        }

        parsedDate = new Date(
          date.substring(0, 4),
          date.substring(5, 7) - 1,
          date.substring(8, 10)
        );

        if (date.length === 16) {
          parsedDate.setHours(date.substring(11, 13));
          parsedDate.setMinutes(date.substring(14, 16));
        }
      }

      return parsedDate;
    },
    daysInMonth (month, year) {
      const date = new Date(year, month, 1);
      const days = [];

      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }

      return days;
    },
    pastDays (daysInMonth) {
      const fromDate = daysInMonth[0];

      let i = 1;
      let day;
      const days = [];

      do {
        day = new Date(fromDate);
        day.setDate(fromDate.getDate() - i);
        days.unshift(day);
        i++;
      } while (day.getDay() !== 0); // Sunday

      return days;
    },
    futureDays (daysInMonth) {
      const fromDate = daysInMonth[daysInMonth.length - 1];

      let i = 1;
      let day;
      const days = [];

      do {
        day = new Date(fromDate);
        day.setDate(fromDate.getDate() + i);
        days.push(day);
        i++;
      } while (day.getDay() !== 6); // Saturday

      return days;
    },
    setClock (type, operation, hoursStep = 1, minutesStep = 5) {
      const hours = this.date.getHours();
      const minutes = Math.round(this.date.getMinutes() / 5) * 5;

      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        type === 'hours' ? (operation === 'increment' ? hours + hoursStep : hours - hoursStep) : hours,
        type === 'minutes' ? (operation === 'increment' ? minutes + minutesStep : minutes - minutesStep) : minutes
      );

      this.dateInput = this.formatDateTime(this.date);

      this.$emit('changed', this.formatDateTime(this.date, true));
    },
    updateDateInput() {
      if (this.mode === 'time') {
        this.dateInput = this.formatTime(this.date);
      } else {
        this.dateInput = this.formatDateTime(this.date);
      }
    },
    dateNow () {
      const now = new Date();

      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        Math.round(now.getMinutes() / 5) * 5
      );
    },
    setNow () {
      this.date = this.dateNow();
      this.dateInput = this.formatDateTime(this.date);

      this.$emit('changed', this.formatDateTime(this.date, true));
    },
    setHour (hour) {
      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        hour,
        this.date.getMinutes()
      );

      this.updateDateInput();

      this.view = 'clock';
    },
    setMinutes (minutes) {
      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        this.date.getHours(),
        minutes
      );

      this.updateDateInput();

      this.view = 'clock';
    },
    monthsChunked () {
      return chunk(this.monthsShort.map((value, index) => {
        return { id: index, name: value };
      }), 4);
    },
    hours () {
      const hours = (new Array(24)).fill(0, 0, 24).map((value, index) => (index < 10 ? ('0' + index) : ('' + index)));
      return chunk(hours, 4);
    },
    minutes () {
      const minutes = (new Array(12)).fill(0, 0, 12).map((value, index) => (5 * index < 10 ? ('0' + 5 * index) : ('' + 5 * index)));
      return chunk(minutes, 4);
    },
    toggleAmPm () {
      this.setClock('hours', this.date.getHours() < 12 ? 'increment' : 'decrement', 12);
    },
    translate (key) {
      if (key in this.translations) {
        return this.translations[key];
      }

      return null;
    }
  },
  created () {
    if (this.value) {
      this.date = this.parseDate(this.value);
      this.dateInput = this.formatDateTime(this.date);
    }
  }
};
</script>

<style scoped>
  .open > .dropdown-menu {
    margin-bottom: 15px;
  }

  .form-control[readonly], input {
    background-color: inherit;
  }

  ul {
    margin-bottom: 0;
  }

  table {
    margin: 0 5px;
    table-layout: fixed;
    min-width: 280px;
  }

  table th,
  table td {
    text-align: center;
    vertical-align: middle;
    padding: 5px;
  }

  .day {
    width: 14.2857%;
  }

  .control-button,
  .control-buttons > td {
    padding: 12px 10px !important;
  }

  .control-buttons-lg > td {
    padding: 16px 10px !important;
  }

  .control-buttons > td,
  .day {
    cursor: pointer;
    border-radius: 2px;
  }

  .hours,
  .colon,
  .minutes {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .hours:hover,
  .minutes:hover,
  .control-buttons td:hover,
  .control-button:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }

  .day.muted {
    color: #d9d9d9;
  }

  .day.selected {
    background: #333;
    color: #fff;
  }

  .clock .hours,
  .clock .minutes,
  .clock .colon {
    font-size: 1.25em;
    user-select: none;
  }

  .am-pm {
    width: 25px;
    padding-left: 5px;
  }

  .am-pm button {
    padding: 8px 10px;
  }

  .separator {
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
