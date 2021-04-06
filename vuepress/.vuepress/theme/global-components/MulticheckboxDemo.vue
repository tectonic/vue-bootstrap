<template>
  <demo>
    <div class="panel panel-default">
      <div class="panel-body">
        <multicheckbox
          name="stats"
          :options="players"
          :selected-options="[1, 2]"
          :subsets="[
            { id: 'steals', name: 'Steals' },
            { id: 'rebounds', name: 'Rebounds' },
            { id: 'points', name: 'Points' }
          ]"
          :selected-subset-options="{
            steals: [],
            rebounds: [1],
            points: [1, 2]
          }"
        />
      </div>
    </div>
  </demo>
</template>

<script>
export default {
  data() {
    return {
      players: [
        { id: 1, name: 'Chris Paul' },
        { id: 2, name: 'Allen Iverson' },
        { id: 3, name: 'John Stockton' },
        { id: 4, name: 'Isiah Thomas' }
      ]
    };
  }
};
</script>
