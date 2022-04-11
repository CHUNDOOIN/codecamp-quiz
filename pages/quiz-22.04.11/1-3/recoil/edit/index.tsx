import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isEditState } from "../../src/commponents/commons/store";
import ContainerPage from "../../src/commponents/unit/recoil/write/container";

export default function EditPage() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  // return <ContainerPage isEdit={true} />;

  useEffect(() => {
    setIsEdit(true);
  }, []);

  return <ContainerPage />;
}
