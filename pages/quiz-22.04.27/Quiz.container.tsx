import { useCallback, useMemo, useState } from "react";
import QuizPresenterPage from "./Quiz.presenter";

export default function QuizContainerPage() {
  console.log("컨테이너 렌더링 확인");

  // 1. useMemo 사용
  // useMemo(() => {}, []);

  let count = 0;
  const [countState, setCountState] = useState(0);

  // 1. let 사용
  const onClickLet = useMemo(() => {
    return () => {
      console.log("나는 let", count + 1);
      count = count + 1;
    };
  }, []);

  //   const onClickLet = useCallback(() => {
  //   console.log("나는 let", count + 1);
  //   count = count + 1;
  //   }, []);

  //   const onClickLet = useMemo(() => {
  //     return () => {
  //       console.log("나는 let", count + 1);
  //       count = count + 1;
  //     };
  //   }, []);

  //   const onClickLet = () => {
  //     console.log("나는 let", count + 1);
  //     count = count + 1;
  //   };

  // 2. state 사용
  const onClickState = useMemo(() => {
    return () => {
      // console.log("나는 state", countState + 1);
      setCountState((prev) => prev + 1);
    };
  }, []);

  //   const onClickState = useCallback(() => {
  //   console.log("나는 state", countState + 1);
  //   setCountState((prev) => prev + 1);
  //   }, []);

  //   const onClickState = useMemo(() => {
  //     return () => {
  //       console.log("나는 state", countState + 1);
  //       setCountState(countState + 1);
  //     };
  //   }, []);

  //   const onClickState = () => {
  //     console.log("나는 state", countState + 1);
  //     setCountState((prev) => prev + 1);
  //   };

  return (
    <div>
      <button onClick={onClickLet}>let</button>
      <div>let 카운트 확인 : {count}</div>
      <div>=====================================================</div>
      <button onClick={onClickState}>state</button>
      <div>state 카운트 확인 : {countState}</div>
      <div>=====================================================</div>
      <QuizPresenterPage />
    </div>

    // <div>
    // <button onClick={onClickLet}>let</button>
    // <div>
    //   let 카운트 확인 :{" "}
    //   {() => {
    //     console.log("나는 let", count + 1);
    //     count = count + 1;
    //   }}
    // </div>
    // <div>=====================================================</div>
    // <button onClick={onClickState}>state</button>
    // <div>
    //   state 카운트 확인 :{" "}
    //   {() => {
    //     //   console.log("나는 state", countState + 1);
    //     setCountState((prev) => prev + 1);
    //   }}
    // </div>
    // <div>=====================================================</div>
    // <QuizPresenterPage />
    // </div>
  );
}
