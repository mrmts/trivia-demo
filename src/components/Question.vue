<template>
<div class="question">
  <h2>{{item.title}}</h2>
  <div class="answers">
    <Answer @picked="mark" v-for="answer in item.answers" :key="answer.id" :answer="answer" :question="item"></Answer>
  </div>
</div>
</template>
<script>
import Answer from '@/components/Answer.vue';
import { mapState } from 'vuex';

export default {
  name: 'Question',
  props: ['item'],
  components: {
    Answer
  },
  data() {
    return {
      selected: null,
    }
  },
  computed: {
    ...mapState(['progress', 'answers']),
  },
  methods: {
    mark(id) {
      if (this.item.answer === null) {
        this.$store.dispatch('submitAnswer', {question: this.item.id, answer: id});
      }
    }
  }
}
</script>