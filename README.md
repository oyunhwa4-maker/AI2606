# AICE STUDY CBT

브라우저에서 실행되는 수업용 AI 기초 CBT MVP입니다.

## 실행

`index.html`을 로컬 서버로 열어 실행합니다. 문제 목록 → 문제 풀이 → 채점·해설 → 오답노트 → 재풀이 흐름을 지원합니다.

## 파일 역할

- `index.html`: 문제 목록
- `solve.html`: 문제 풀이·채점·해설
- `wrong-note.html`: 오답노트
- `js/questions.js`: 문제 원본 데이터
- `js/storage.js`: 오답 저장·갱신·삭제·조회
- 화면별 JS: 해당 화면 출력과 상호작용
- `css/common.css`: 공통 디자인 기준
- 화면별 CSS: 해당 화면 고유 배치

## 수정 규칙

- 문제 추가·수정은 `js/questions.js`에서 진행합니다.
- 정답 번호는 0부터 시작합니다. 첫 번째 선택지는 `0`, 두 번째는 `1`입니다.
- 오답 데이터에는 `questionId`, `selectedAnswer`, `updatedAt`만 저장합니다.
- 정답은 저장하지 않고 항상 문제 원본의 `answer`를 조회합니다.
- 같은 문제를 다시 틀리면 기존 기록을 갱신하고, 다시 풀어 맞히면 오답에서 제거합니다.
