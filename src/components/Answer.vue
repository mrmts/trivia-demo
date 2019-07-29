<template>
<div @click="$emit('picked', answer.id)" class="answer" :class="classObj">{{answer.title}}</div>
</template>
<script>
export default {
  name: 'Answer',
  props: ['answer', 'question'],
  computed: {
    classObj() {
      const classes = [];
      if (this.question.answer === this.answer.id) {
        classes.push(this.answer.correct ? 'correct' : 'wrong');
      }
      return classes;
    }
  }
}
</script>