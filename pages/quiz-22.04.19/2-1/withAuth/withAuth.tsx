import { useRouter } from "next/router";
import { useEffect } from "react";

// @ts-ignore
export const withAuth = (Component) => (props) => {
  const router = useRouter();

  // 권한분기 로직
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("로그인 후 이용 가능합니다!");
      router.push("/quiz-22.04.19/2-1/main");
    }
  }, []);

  return <Component {...props} />;
};
