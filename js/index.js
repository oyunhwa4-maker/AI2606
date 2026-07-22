(function () {
  'use strict';
  var activeCategory = '전체';
  var list = document.getElementById('question-list');
  var filters = document.getElementById('category-filters');
  var categories = ['전체'].concat(Array.from(new Set(QUESTIONS.map(function (q) { return q.category; }))));

  function renderFilters() {
    filters.innerHTML = categories.map(function (category) {
      return '<button type="button" role="tab" aria-selected="' + (category === activeCategory) + '" class="' + (category === activeCategory ? 'is-active' : '') + '" data-category="' + category + '">' + category + '</button>';
    }).join('');
  }

  function renderQuestions() {
    var wrongIds = WRONG_STORE.getAll().map(function (item) { return item.questionId; });
    var items = QUESTIONS.filter(function (q) { return activeCategory === '전체' || q.category === activeCategory; });
    list.innerHTML = items.map(function (q) {
      var number = QUESTIONS.findIndex(function (item) { return item.id === q.id; }) + 1;
      var wrong = wrongIds.includes(q.id) ? '<span class="wrong-mark">오답 기록</span>' : '';
      return '<article class="question-card"><div class="card-top"><span class="card-number">' + String(number).padStart(2, '0') + '</span>' + wrong + '</div><div class="meta-row"><span class="chip chip-category">' + q.category + '</span><span class="chip level-' + q.level + '">' + q.level + '</span></div><h3>' + q.question + '</h3><a href="./solve.html?id=' + q.id + '">문제 풀기 <span>→</span></a></article>';
    }).join('');
  }

  filters.addEventListener('click', function (event) {
    var button = event.target.closest('[data-category]');
    if (!button) return;
    activeCategory = button.dataset.category;
    renderFilters(); renderQuestions();
  });

  document.getElementById('total-count').textContent = QUESTIONS.length;
  WRONG_STORE.updateCounts(); renderFilters(); renderQuestions();
})();
