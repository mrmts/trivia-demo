<template>
<div class="progress-bar">
  <div class="progress" :style="{width: percentage}"></div>
</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'ProgressBar',
  computed: {
    ...mapState(['progress']),
    percentage() {
      return `${Math.round(this.progress*100/5)}%`;
    }
  }
}
</script>