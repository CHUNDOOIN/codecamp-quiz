import { memo } from "react";

function QuizPresenterPage() {
  console.log("프리젠터 렌더링 확인");
  return (
    <div>
      <div>프리젠터 렌더링 되니?</div>
    </div>
  );
}

export default memo(QuizPresenterPage);
