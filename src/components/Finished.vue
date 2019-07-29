<template>
<div class="finished-container">
  <div class="finished">
    <h2>Gratulacje</h2>
    <h3>Punktacja: {{points}} / 5</h3>
    <i class="icofont-trophy"/>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Finished',
  computed: {
    ...mapGetters(['points']),
  }
}
</script>