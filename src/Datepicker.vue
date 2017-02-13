<template>
  <div :class="[{ 'open': isOpen }, 'dropdown']">
    <input type="text"
      v-model="formattedDate"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @focus="open"
      @keyup.esc="close"
      class="form-control"
    />
    <div class="datepicker dropdown-menu">
      <ul class="list-unstyled">
        <li>
          <table :class="[{ 'hidden': view !== 'calendar' }, 'calendar', 'table-condensed']">
            <thead>
              <tr>
                <th class="month-previous" @click="previousMonth"><span :class="icons.left"></span></th>
                <th class="month-current" colspan="5">{{ months[month] }} {{ year }}</th>
                <th class="month-next" @click="nextMonth"><span :class="icons.right"></span></th>
              </tr>
              <tr>
                <th class="day-of-week" v-for="dayOfWeek in daysOfWeek">{{ dayOfWeek }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="week in visibleWeeks">
                <td v-for="day in week" :class="['day', { 'muted': !withinCurrentMonth(day), 'selected': isSelected(day) }]" @click="select(day)">
                  {{ day.getDate() }}
                </td>
              </tr>
            </tbody>
          </table>
          <table :class="[{ 'hidden': view !== 'clock' }, 'clock', 'table-condensed']">
            <tbody>
              <tr>
                <td class="clock-set">
                  <span :class="icons.up"></span>
                </td>
                <td></td>
                <td class="clock-set">
                  <span :class="icons.up"></span>
                </td>
              </tr>
              <tr>
                <td>{{ pad(date.getHours()) }}</td>
                <td>:</td>
                <td>{{ pad(date.getMinutes()) }}</td>
              </tr>
              <tr>
                <td class="clock-set">
                  <span :class="icons.down"></span>
                </td>
                <td></td>
                <td class="clock-set">
                  <span :class="icons.down"></span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="switcher">
            <span @click="toggleView" v-if="view === 'clock'">{{ formatDate(date) }}</span>
            <span @click="toggleView" v-else>{{ formatTime(date) }}</span>
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
    value: {
      type: String,
      default: ''
    },
    name: {
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
    time: {
      type: Boolean,
      default: true
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
          down: 'glyphicon glyphicon-chevron-down'
        }
      }
    }
  },
  data () {
    return {
      view: 'calendar',
      date: new Date(),
      formattedDate: '',
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      isOpen: false
    };
  },
  computed: {
    visibleWeeks () {
      let days = this.daysInMonth(this.month, this.year);

      let pastDays = this.pastDays(days);
      let futureDays = this.futureDays(days);

      // Chunk days into weeks
      return chunk([...pastDays, ...days, ...futureDays], 7);
    }
  },
  methods: {
    open () {
      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();

      this.isOpen = true;
    },
    close () {
      this.isOpen = false;
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
    withinCurrentMonth (date) {
      return date.getMonth() === this.month && date.getFullYear() === this.year;
    },
    isSelected (date) {
      return date.getDate() === this.date.getDate()
        && date.getMonth() === this.date.getMonth()
        && date.getFullYear() === this.date.getFullYear();
    },
    select (date) {
      this.date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        this.date.getHours(),
        this.date.getMinutes()
      );

      this.formattedDate = this.formatDateTime(this.date);

      this.isOpen = false;
    },
    formatDateTime (date) {
      let formattedDate = this.formatDate(date);

      if (this.time) {
        formattedDate = formattedDate + ' ' + this.formatTime(date);
      }

      return formattedDate;
    },
    formatDate (date) {
      return date.getFullYear()
        + '-' + this.pad(date.getMonth() + 1)
        + '-' + this.pad(date.getDate());
    },
    formatTime (date) {
      return this.pad(date.getHours()) + ':' + this.pad(date.getMinutes());
    },
    pad (value) {
      return ('0' + value).slice(-2);
    },
    parseDate (date) {
      let parsedDate;

      if (date && (date.length === 10 && /^[0-9-]+$/.test(date)) || (date.length === 16 && /^[0-9-\s:]+$/.test(date))) {
        parsedDate = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10));

        if (date.length === 16) {
          parsedDate.setHours(date.substring(11, 13));
          parsedDate.setMinutes(date.substring(14, 16));
        }

      } else {
        parsedDate = new Date();
      }

      // Check if the parse was successful
      return isNaN(parsedDate.getFullYear()) ? new Date() : parsedDate;
    },
    daysInMonth (month, year) {
     let date = new Date(year, month, 1);
     let days = [];

     while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }

     return days;
    },
    pastDays (daysInMonth) {
      let fromDate = daysInMonth[0];

      let i = 1;
      let day;
      let days = [];

      do {
        day = new Date(fromDate);
        day.setDate(fromDate.getDate() - i);
        days.unshift(day);
        i++;
      } while (day.getDay() !== 0); // Sunday

      return days;
    },
    futureDays (daysInMonth) {
      let fromDate = daysInMonth[daysInMonth.length - 1];

      let i = 1;
      let day;
      let days = [];

      do {
        day = new Date(fromDate);
        day.setDate(fromDate.getDate() + i);
        days.push(day);
        i++;
      } while (day.getDay() !== 6); // Saturday

      return days;
    }
  },
  mounted () {
    const date = this.parseDate(this.value);

    this.date = date;
    this.formattedDate = this.formatDateTime(this.date);

    this.onClickOutside = (event) => {
      if (this.$el !== null && !this.$el.contains(event.target)) {
        this.close();
      }
    }

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

  .datepicker .clock-setter,
  .datepicker .month-next,
  .datepicker .month-previous,
  .datepicker .day {
    border-radius: 2px;
  }

  .datepicker .clock-set:hover,
  .datepicker .switcher span:hover,
  .datepicker .month-next:hover,
  .datepicker .month-previous:hover,
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

  .datepicker .switcher {
    width: 100%;
    text-align: center;
    padding: 5px 5px 0 5px;
  }

  .datepicker .switcher span {
    display: block;
    padding: 5px;
  }
</style>
