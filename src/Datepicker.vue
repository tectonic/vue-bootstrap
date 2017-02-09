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
                <th class="month-previous"><span class="glyphicon glyphicon-chevron-left"></span></th>
                <th class="month-current" colspan="5">February 2017</th>
                <th class="month-next"><span class="glyphicon glyphicon-chevron-right"></span></th>
              </tr>
              <tr>
                <th class="day-of-week">Su</th>
                <th class="day-of-week">Mo</th>
                <th class="day-of-week">Tu</th>
                <th class="day-of-week">We</th>
                <th class="day-of-week">Th</th>
                <th class="day-of-week">Fr</th>
                <th class="day-of-week">Sa</th>
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
    }
  },
  data () {
    return {
      date: new Date(),
      isOpen: false
    };
  },
  computed: {
    visibleWeeks () {
      let days = this.daysInMonth(1, 2017);

      days = this.fillDays('past', days);
      days = this.fillDays('future', days);

      // Chunk days into weeks
      return this.chunk(days, 7);
    }
  },
  methods: {
    open () {
      this.isOpen = true;
    },
    close () {
      this.isOpen = false;
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
    fillDays (mode /* past/future */, days) {
      // Stop on first day of the week (Su) if filling dates in the past, stop on the
      // last day of the week (Sa) if filling all dates in the future.
      const dayOfWeek = (mode === 'past') ? 0 : 6;

      // Start from the first day of the month if filling dates in the past, start
      // from the last day of the month if filling dates in the future.
      const fromDate = (mode === 'past') ? days[0] : days[days.length - 1];

      let i = 1;
      let day;

      do {
        day = new Date();

        if (mode == 'past') {
          day.setDate(fromDate.getDate() - i);
          days.unshift(day);

        } else {
          day.setDate(fromDate.getDate() + i);
          days.push(day);
        }

        i++;

      } while (day.getDay() !== dayOfWeek);

      return days;
    },
    chunk (days, chunk) {
      let i, j;
      let array = [];
      let chunks = [];

      for (i = 0, j = days.length; i < j; i += chunk) {
          array = days.slice(i, i + chunk);
          chunks.push(array);
      }

      return chunks;      
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
