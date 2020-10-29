<template>
  <demo>
    <button class="btn btn-primary" @click="showModal = true">
      Show modal
    </button>
    <modal
      title="Hello world!"
      v-model="showModal"
      @closed="showModal = false"
    >
      This is the body.
    </modal>
  </demo>
</template>

<script>
export default {
  data() {
    return {
      showModal: false
    };
  }
};
</script>
