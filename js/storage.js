(function () {
  'use strict';
  var KEY = 'aice-cbt-wrong-answers';

  function getAll() {
    try {
      var parsed = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(function (item) {
        return item && typeof item.questionId === 'string' && Number.isInteger(item.selectedAnswer) && typeof item.updatedAt === 'string';
      });
    } catch (error) { return []; }
  }

  function save(questionId, selectedAnswer) {
    var items = getAll();
    var record = { questionId: questionId, selectedAnswer: selectedAnswer, updatedAt: new Date().toISOString() };
    var index = items.findIndex(function (item) { return item.questionId === questionId; });
    if (index >= 0) items[index] = record; else items.push(record);
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function remove(questionId) {
    localStorage.setItem(KEY, JSON.stringify(getAll().filter(function (item) { return item.questionId !== questionId; })));
  }

  function updateCounts() {
    var count = getAll().length;
    document.querySelectorAll('[data-wrong-count]').forEach(function (el) {
      el.textContent = count;
      if (el.hasAttribute('hidden')) el.hidden = count === 0;
    });
  }

  window.WRONG_STORE = { getAll: getAll, save: save, remove: remove, updateCounts: updateCounts };
})();
