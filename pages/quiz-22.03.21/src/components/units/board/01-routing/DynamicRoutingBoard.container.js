import { useRouter } from "next/router";
import DynamicRoutingBoardUI from "./DynamicRoutingBoard.presenter";

export default function DynamicRoutingBoard() {
  const router = useRouter();

  const onClickMove1 = () => {
    router.push("/quiz-22.03.21/05-06-dynamic-routed-board/83011");
  };

  const onClickMove2 = () => {
    router.push("/quiz-22.03.21/05-06-dynamic-routed-board/83012");
  };

  const onClickMove3 = () => {
    router.push("/quiz-22.03.21/05-06-dynamic-routed-board/83013");
  };

  return (
    <DynamicRoutingBoardUI
      onClickMove1={onClickMove1}
      onClickMove2={onClickMove2}
      onClickMove3={onClickMove3}
    ></DynamicRoutingBoardUI>
  );
}
