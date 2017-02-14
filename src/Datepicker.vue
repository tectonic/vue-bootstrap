<template>
  <div :class="[{ 'open': isOpen }, 'dropdown', containerClass]">
    <input type="text"
      v-model="dateInput"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @focus="open"
      @keyup.esc="close"
      class="form-control"
      autocomplete="off"
    />
    <div class="datepicker dropdown-menu">
      <ul class="list-unstyled">
        <li>
          <table :class="[{ 'hidden': view !== 'calendar' }, 'calendar', 'table-condensed']">
            <thead>
              <tr>
                <th class="previous-month" @click="previousMonth"><span :class="icons.left"></span></th>
                <th class="current-month" colspan="5">{{ months[month] }} {{ year }}</th>
                <th class="next-month" @click="nextMonth"><span :class="icons.right"></span></th>
              </tr>
              <tr>
                <th class="day-of-week" v-for="dayOfWeek in daysOfWeek">{{ dayOfWeek }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="week in visibleWeeks">
                <td v-for="day in week" :class="['day', { 'muted': !isWithinCurrentMonth(day), 'selected': isSelected(day) }]" @click="select(day)">
                  {{ day.getDate() }}
                </td>
              </tr>
            </tbody>
          </table>
          <table :class="[{ 'hidden': view !== 'clock' }, 'clock', 'table-condensed']">
            <tbody>
              <tr>
                <td class="set-clock" @click="setClock('hours', 'increment')">
                  <span :class="icons.up"></span>
                </td>
                <td></td>
                <td class="set-clock" @click="setClock('minutes', 'increment')">
                  <span :class="icons.up"></span>
                </td>
              </tr>
              <tr>
                <td class="hours">{{ pad(date.getHours()) }}</td>
                <td class="colon">:</td>
                <td class="minutes">{{ pad(date.getMinutes()) }}</td>
              </tr>
              <tr>
                <td class="set-clock" @click="setClock('hours', 'decrement')">
                  <span :class="icons.down"></span>
                </td>
                <td></td>
                <td class="set-clock" @click="setClock('minutes', 'decrement')">
                  <span :class="icons.down"></span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="switcher" v-if="mode === 'datetime'">
            <span @click="toggleView" v-if="view === 'clock'">
              <i :class="icons.calendar"></i> {{ formatDate(date) }}
            </span>
            <span @click="toggleView" v-else>
              <i :class="icons.time"></i> {{ formatTime(date) }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { chunk } from './lib/array.js';

export default {
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
    placeholder: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'date',
      validator: (value) => {
        return value === 'date' || value === 'datetime';
      }
    },
    containerClass: {
      type: String,
      default: ''
    },
    daysOfWeek: {
      type: Array,
      default: () => {
        return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
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
    icons: {
      type: Object,
      default: () => {
        return {
          left: 'glyphicon glyphicon-chevron-left',
          right: 'glyphicon glyphicon-chevron-right',
          up: 'glyphicon glyphicon-chevron-up',
          down: 'glyphicon glyphicon-chevron-down',
          calendar: 'glyphicon glyphicon-calendar',
          time: 'glyphicon glyphicon-time'
        };
      }
    }
  },
  data () {
    return {
      view: 'calendar',
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
    }
  },
  methods: {
    open () {
      this.getDateFromInput();

      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();

      this.isOpen = true;
    },
    close () {
      this.isOpen = false;
    },
    getDateFromInput () {
      const date = this.parseDate(this.dateInput);

      this.date = date || new Date();
    },
    toggleView () {
      this.view = this.view === 'calendar' ? 'clock' : 'calendar';
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
    isWithinCurrentMonth (date) {
      return date.getMonth() === this.month && date.getFullYear() === this.year;
    },
    isSelected (date) {
      return date.getDate() === this.date.getDate() &&
        date.getMonth() === this.date.getMonth() &&
        date.getFullYear() === this.date.getFullYear();
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
    },
    formatDateTime (date) {
      let formattedDate = this.formatDate(date);

      if (this.mode === 'datetime') {
        formattedDate = formattedDate + ' ' + this.formatTime(date);
      }

      return formattedDate;
    },
    formatDate (date) {
      return date.getFullYear() +
        '-' + this.pad(date.getMonth() + 1) +
        '-' + this.pad(date.getDate());
    },
    formatTime (date) {
      return this.pad(date.getHours()) + ':' + this.pad(date.getMinutes());
    },
    pad (value) {
      return ('0' + value).slice(-2);
    },
    validFormat (date) {
      // Accept dates in the format of '2017-03-01' or '2017-03-01 12:10'.
      return (date.length === 10 && /^[0-9-]+$/.test(date)) ||
        (date.length === 16 && /^[0-9-\s:]+$/.test(date));
    },
    parseDate (date) {
      let parsedDate;

      if (date && this.validFormat(date)) {
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
    setClock (type, operation) {
      const hours = this.date.getHours();
      const minutes = Math.round(this.date.getMinutes() / 5) * 5;

      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        type === 'hours' ? (operation === 'increment' ? hours + 1 : hours - 1) : hours,
        type === 'minutes' ? (operation === 'increment' ? minutes + 5 : minutes - 5) : minutes
      );

      this.dateInput = this.formatDateTime(this.date);
    }
  },
  created () {
    this.dateInput = this.value;
    this.getDateFromInput();
  },
  mounted () {
    this.onClickOutside = (event) => {
      if (this.$el !== null && !this.$el.contains(event.target)) {
        this.close();
      }
    };

    document.addEventListener('click', this.onClickOutside);
  },
  beforeDestroy () {
    document.removeEventListener('click', this.onClickOutside);
  }
};
</script>

<style>
  .datepicker ul {
    margin-bottom: 0;
  }

  .datepicker table {
    margin: 0 5px;
    table-layout: fixed;
    min-width: 280px;
  }

  .datepicker th,
  .datepicker td {
    text-align: center;
    padding: 5px;
  }

  .datepicker .day {
    width: 14.2857%;
  }

  .datepicker .set-clock,
  .datepicker .next-month,
  .datepicker .previous-month,
  .datepicker .day {
    border-radius: 2px;
  }

  .datepicker .set-clock:hover,
  .datepicker .switcher span:hover,
  .datepicker .next-month:hover,
  .datepicker .previous-month:hover,
  .datepicker .day:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }

  .datepicker .day.muted {
    color: #d9d9d9;
  }

  .datepicker .day.selected {
    background-color: #333;
    color: #fff;
  }

  .datepicker .day.selected:hover {
    background-color: #333;
    color: #fff;
  }

  .datepicker .clock .hours,
  .datepicker .clock .minutes,
  .datepicker .clock .colon {
    font-size: 1.25em;
  }

  .datepicker .switcher {
    width: 100%;
    text-align: center;
    padding: 5px 5px 0 5px;
  }

  .datepicker .switcher span {
    display: block;
    padding: 5px;
  }

  .datepicker .switcher i {
    margin-right: 3px;
  }
</style>
