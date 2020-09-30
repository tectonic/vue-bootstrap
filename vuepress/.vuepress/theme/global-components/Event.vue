<template>
  <table class="event">
    <tr>
      <td class="name">
        {{ name }}
      </td>
      <td>
        <p>
          <small>Parameters</small><br>
          {{ parameters }}
        </p>
        <div class="description">
          <small>Description</small><br>
          <slot></slot>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    parameters: {
      type: String,
      default: '-'
    }
  }
}
</script>

<style lang="stylus" scoped>
.event
  width 100%
  border-bottom 1px solid #eaecef
.name
  width 200px
  vertical-align top
  padding 1rem 0
  font-weight: bold
.description
  margin: 1rem 0
</style>
