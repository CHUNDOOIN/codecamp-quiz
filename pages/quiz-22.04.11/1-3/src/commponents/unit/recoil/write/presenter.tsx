import { useRecoilState } from "recoil";
import { isEditState } from "../../../commons/store";

export default function PresenterPage() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  return (
    <div>
      {/* <h1>{props.isEdit ? "수정" : "등록"}하기</h1> */}
      <h1>{isEdit ? "수정" : "등록"}하기</h1>
    </div>
  );
}
