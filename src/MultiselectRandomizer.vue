<template>
  <div class="randomizer-selector">
    <span>{{ randomizerHowMany }}</span>
    <input type="text" size="3" class="input-sm form-control" v-model="howMany">
    <a class="btn btn-default" @click.prevent="randomize">{{ randomizerButton }}</a>
  </div>
</template>

<script>
import { shuffle } from './lib/array.js';

export default {
  data () {
    return {
      howMany: 0,
      randomIds: []
    };
  },
  props: {
    ids: {
      type: Array,
      required: true
    },
    randomizerHowMany: {
      type: String,
      default: 'How many?'
    },
    randomizerButton: {
      type: String,
      default: 'Go'
    }
  },
  watch: {
    randomIds () {
      this.$emit('randomized', this.randomIds);
    }
  },
  methods: {
    randomize () {
      this.randomIds = shuffle(this.ids).slice(0, this.howMany);
    }
  }
};
</script>

<style scoped>
  .randomizer-selector {
    clear: both;
    margin-bottom: 5px;
  }

  .randomizer-selector input[type="text"] {
    height: 32px;
  }

  .randomizer-selector .form-control {
    display: inline;
    width: 50px;
  }
</style>
