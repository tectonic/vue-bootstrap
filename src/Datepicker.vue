<template>
  <div :class="[{ 'open': isOpen }, 'dropdown']">
    <input type="text"
      v-model="date"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :aria-expanded="isOpen"
      @focus="open"
      @keyup.esc="close"
      class="form-control"
    />
    <div class="dropdown-menu">
      <ul class="list-unstyled">
        <li>
          <table class="table-condensed">
            <thead>
              <tr>
                <th class="month-previous" @click="previousMonth"><span class="glyphicon glyphicon-chevron-left"></span></th>
                <th class="month-current" colspan="5">{{ months[month] }} {{ year }}</th>
                <th class="month-next" @click="nextMonth"><span class="glyphicon glyphicon-chevron-right"></span></th>
              </tr>
              <tr>
                <th class="day-of-week" v-for="dayOfWeek in daysOfWeek">{{ dayOfWeek }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="week in visibleWeeks">
                <td class="day" v-for="day in week">{{ day.getDate() }}</td>
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

export default {
  props: {
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
    }
  },
  data () {
    return {
      date: new Date(),
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
      this.isOpen = true;
    },
    close () {
      this.isOpen = false;
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
</style>
