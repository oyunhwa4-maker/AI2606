(function () {
  'use strict';
  var records = WRONG_STORE.getAll();
  var list = document.getElementById('wrong-list');
  var items = records.map(function (record) {
    return { record: record, question: QUESTIONS.find(function (q) { return q.id === record.questionId; }) };
  }).filter(function (item) { return item.question; });

  WRONG_STORE.updateCounts();
  if (!items.length) { document.getElementById('empty-state').hidden = false; return; }

  list.innerHTML = items.map(function (item) {
    var q = item.question; var record = item.record;
    var number = QUESTIONS.findIndex(function (question) { return question.id === q.id; }) + 1;
    var date = new Date(record.updatedAt).toLocaleDateString('ko-KR');
    return '<article class="wrong-card"><div class="wrong-top"><div class="meta-row"><span class="q-num">Q' + number + '</span><span class="chip chip-category">' + q.category + '</span><span class="chip level-' + q.level + '">' + q.level + '</span></div><span class="saved-date">최근 기록 ' + date + '</span></div><h2>' + q.question + '</h2><div class="answer-compare"><p><span>내가 선택한 답</span><strong>' + (record.selectedAnswer + 1) + '. ' + q.options[record.selectedAnswer] + '</strong></p><p><span>정답</span><strong>' + (q.answer + 1) + '. ' + q.options[q.answer] + '</strong></p></div><a class="retry-btn" href="./solve.html?id=' + q.id + '">다시 풀기 <span>→</span></a></article>';
  }).join('');
})();
