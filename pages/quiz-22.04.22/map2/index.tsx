// import { useRouter } from "next/router";
import Link from "next/link";

// 1. map2에서 이동시 오류 발생 코드
// export default function QuizMovePage() {
//   const router = useRouter();

//   const onClickMoveMap = () => {
//     router.push("/quiz-22.04.22/map1");
//   };

//   return (
//     <div>
//       <button onClick={onClickMoveMap}>이동하기</button>
//     </div>
//   );
// }

// 2. 정상 작동 코드
export default function QuizMovePage() {
  //   const router = useRouter();

  //   const onClickMoveMap = () => {
  //     router.push("/quiz-22.04.22/map1");
  //   };

  return (
    <div>
      {/* <button onClick={onClickMoveMap}>이동하기</button> */}
      <Link href={"/quiz-22.04.22/map1"}>
        <a>이동하기</a>
      </Link>
    </div>
  );
}
