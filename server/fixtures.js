const category = require('./fixtures/categories.json');
const question = require('./fixtures/questions.json');
module.exports = function() {
  return {
    category,
    question,
  }
}