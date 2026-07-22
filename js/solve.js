(function () {
  'use strict';
  var params = new URLSearchParams(location.search);
  var id = params.get('id');
  var question = QUESTIONS.find(function (item) { return item.id === id; });
  var index = question ? QUESTIONS.findIndex(function (item) { return item.id === question.id; }) : -1;
  var selectedAnswer = null;
  var submitted = false;

  function showInvalid() {
    document.getElementById('not-found').hidden = false;
    document.getElementById('quiz-area').hidden = true;
  }

  function optionTemplate(option, optionIndex) {
    return '<label class="option"><input type="radio" name="answer" value="' + optionIndex + '"><span class="option-num">' + (optionIndex + 1) + '</span><span class="option-text">' + option + '</span><span class="option-state"></span></label>';
  }

  function initQuestion() {
    if (!question) { showInvalid(); return; }
    document.getElementById('quiz-area').hidden = false;
    document.getElementById('progress-text').textContent = (index + 1) + ' / ' + QUESTIONS.length;
    document.getElementById('progress-bar').style.width = ((index + 1) / QUESTIONS.length * 100) + '%';
    document.getElementById('q-num').textContent = 'Q' + (index + 1);
    document.getElementById('q-category').textContent = question.category;
    var level = document.getElementById('q-level'); level.textContent = question.level; level.classList.add('level-' + question.level);
    document.getElementById('q-title').textContent = question.question;
    document.getElementById('option-list').insertAdjacentHTML('beforeend', question.options.map(optionTemplate).join(''));
    document.getElementById('retry-chip').hidden = !WRONG_STORE.getAll().some(function (item) { return item.questionId === question.id; });
  }

  function markOptions() {
    document.querySelectorAll('.option').forEach(function (label, optionIndex) {
      label.classList.toggle('is-correct', optionIndex === question.answer);
      label.classList.toggle('is-wrong', optionIndex === selectedAnswer && optionIndex !== question.answer);
      var state = label.querySelector('.option-state');
      if (optionIndex === question.answer) state.textContent = '정답';
      else if (optionIndex === selectedAnswer) state.textContent = '내 답';
    });
  }

  function showResult() {
    var correct = selectedAnswer === question.answer;
    if (correct) WRONG_STORE.remove(question.id); else WRONG_STORE.save(question.id, selectedAnswer);
    WRONG_STORE.updateCounts(); markOptions();
    document.querySelectorAll('input[name="answer"]').forEach(function (input) { input.disabled = true; });
    document.getElementById('submit-button').hidden = true;
    var panel = document.getElementById('result-panel');
    panel.hidden = false; panel.classList.add(correct ? 'is-correct' : 'is-wrong');
    document.getElementById('result-icon').textContent = correct ? '✓' : '!';
    document.getElementById('result-heading').textContent = correct ? '정답입니다!' : '아쉽지만 오답입니다.';
    document.getElementById('result-summary').textContent = correct ? '핵심 개념을 정확하게 이해하고 있습니다.' : '정답은 ' + (question.answer + 1) + '번입니다. 해설로 개념을 확인해보세요.';
    document.getElementById('explanation-text').textContent = question.explanation;
    var actions = document.getElementById('result-actions');
    if (index < QUESTIONS.length - 1) actions.innerHTML = '<a class="btn btn-main" href="./solve.html?id=' + QUESTIONS[index + 1].id + '">다음 문제 <span>→</span></a>';
    else actions.innerHTML = '<a class="btn btn-sub" href="./index.html">문제 목록으로</a><a class="btn btn-main" href="./wrong-note.html">오답노트 보기</a>';
  }

  document.getElementById('option-list').addEventListener('change', function (event) {
    if (submitted || event.target.name !== 'answer') return;
    selectedAnswer = Number(event.target.value);
    document.getElementById('form-notice').textContent = '';
    document.querySelectorAll('.option').forEach(function (label) { label.classList.remove('is-selected'); });
    event.target.closest('.option').classList.add('is-selected');
  });

  document.getElementById('answer-form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (submitted || !question) return;
    if (selectedAnswer === null) { document.getElementById('form-notice').textContent = '답을 먼저 선택해주세요.'; return; }
    submitted = true; showResult();
  });

  WRONG_STORE.updateCounts(); initQuestion();
})();
