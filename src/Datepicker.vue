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
              <tr>
                <td class="day">29</td>
                <td class="day">30</td>
                <td class="day">31</td>
                <td class="day">1</td>
                <td class="day">2</td>
                <td class="day">3</td>
                <td class="day">4</td>
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
      date: '',
      isOpen: false
    };
  },
  methods: {
    open () {
      this.isOpen = true;
    },
    close () {
      this.isOpen = false;
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
