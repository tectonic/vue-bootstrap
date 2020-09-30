<template>
  <demo>
    <nav class="navigation">
      <tabs :tabs="tabs" v-model="tab"></tabs>
    </nav>
    <div class="content">
      Selected tab: {{ tab }}
    </div>
  </demo>
</template>

<script>
export default {
  data() {
    return {
      tab: 1,
      tabs: [
        { id: 1, name: 'Tab 1' },
        { id: 2, name: 'Tab 2' },
        { id: 3, name: 'Tab 3', disabled: true }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.navigation
.content
  margin-bottom 10px
</style>
