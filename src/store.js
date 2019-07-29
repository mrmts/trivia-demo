import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from 'underscore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    progress: null,
    current: null,
    finished: false,
  },
  getters: {
    points: state => state.questions.reduce((sum, current) => {
      const answer = current.answers.find((answer) => answer.id === current.answer);
      
      return (answer.correct) ? sum+1 : sum;
    }, 0),
    currentQuestion: state => (state.questions.length && state.questions[state.progress] !== undefined) ? state.questions[state.progress] : null
  },
  mutations: {
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    SET_PROGRESS(state, payload) {
      state.progress = payload;
    },
    FINISH_GAME(state) {
      state.progress = null;
      state.finished = true;
    }
  },
  actions: {
    load({commit}) {
      axios.get('/api/question?category=Art').then((response) => {
        let questions = _.shuffle(response.data);
        questions.splice(5 - questions.length);
        let parsedQuestions = questions.map((rawItem, questionId) => {
          let answers = [
            rawItem.correct_answer,
            ...rawItem.incorrect_answers
          ].map((answer, index) => { return {
            title: answer,
            id: index,
            correct: (index === 0),
          }});
          return {
            id: questionId,
            answer: null,
            title: rawItem.question,
            answers: _.shuffle(answers),
          }
        });
        
        commit('SET_QUESTIONS', parsedQuestions);
        commit('SET_PROGRESS', 0);
      });
    },
    nextQuestion({commit, state}) {
      if (state.progress >= 4) {
        commit('FINISH_GAME');
      } else {
        commit('SET_PROGRESS', state.progress+1);
      }
    },
    submitAnswer({commit, dispatch, state}, payload) {
      const element = state.questions.find((item) => item.id === payload.question);
      element.answer = payload.answer;
      commit('SET_QUESTIONS', state.questions);
      setTimeout(() => dispatch('nextQuestion'), 2000);
    }
  }
});