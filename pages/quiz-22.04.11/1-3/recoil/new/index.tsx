import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isEditState } from "../../src/commponents/commons/store";
import ContainerPage from "../../src/commponents/unit/recoil/write/container";

export default function NewPage() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    setIsEdit(false);
  }, []);

  return <ContainerPage />;
}
