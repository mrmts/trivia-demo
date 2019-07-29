<template>
  <div id="app">
    <ProgressBar></ProgressBar>
    <Question v-if="currentQuestion" :item="currentQuestion"></Question>
    <Finished v-if="finished"></Finished>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Finished from '@/components/Finished.vue';
import Question from '@/components/Question.vue';
import ProgressBar from '@/components/ProgressBar.vue';

export default {
  name: 'app',
  components: {
    Finished,
    ProgressBar,
    Question,
  },
  created() {
    this.$store.dispatch('load');
  },
  computed: {
    ...mapState(['finished']),
    ...mapGetters(['currentQuestion']),
  },
  methods: {
    ...mapActions(['nextQuestion']),
  }
}
</script>

<style lang="scss">
@import './assets/icofont.css';
@import './styles/index.scss';

</style>
