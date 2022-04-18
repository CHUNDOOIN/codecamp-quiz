import { atom } from "recoil";

// 글로벌 스테이트 다른 컴포넌트에서 사용가능
export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});
