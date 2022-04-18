import { gql, useQuery } from "@apollo/client";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { useRecoilState } from "recoil";
// import { accessTokenState } from "../../quiz-22.04.12/store";
import { withAuth } from "../withAuth/withAuth";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

function LoginSuccessPage() {
  // const router = useRouter();
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  // 키가 없을때
  // useEffect(() => {
  //   if (!accessToken) {
  //     alert("로그인 해주세요!");
  //     router.push("01-login");
  //     return () => {};
  //   }
  // }, []);

  return <div>{data?.fetchUserLoggedIn.name}님 환영합니다!</div>;
}

export default withAuth(LoginSuccessPage);
