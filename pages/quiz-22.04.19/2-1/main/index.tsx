import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState, userInfoState } from "../store";

// import {
//   accessTokenState,
//   userInfoState,
// } from "../../src/components/commons/store/index";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

function LoginPage() {
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setUserInfo] = useRecoilState(userInfoState);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);

  const client = useApolloClient();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickLogin = async () => {
    // 1. 로그인 하기
    const result = await loginUser({
      variables: {
        email,
        password,
      },
    });

    const accessToken = result.data.loginUser.accessToken;
    console.log(accessToken);

    // 2. 유저정보 받아오기
    const resultUserInfo = await client.query({
      query: FETCH_USER_LOGGED_IN,
      context: {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    });

    const userInfo = resultUserInfo.data.fetchUserLoggedIn;
    console.log(userInfo);

    // 3. 글로벌스테이트에 저장하기
    setAccessToken(accessToken); // 새로고침하면 날라감..
    setUserInfo(userInfo);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userInfo", JSON.stringify(userInfo)); // 객체는 로컬 스토리지에 못들어간다...

    // 4. 로그인 성공 페이지로 이동하기
    alert("로그인에 성공하였습니다.");

    // 5. 장바구니 확인하기
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    console.log(baskets[0]);
    if (baskets.length !== 0) {
      if (
        confirm(
          "비회원으로 담긴 게시물 장바구니가 존재합니다. 이동하시겠습니까?"
        )
      ) {
        router.push("/quiz-22.04.19/2-1/basket");
      } else {
        router.push("/quiz-22.04.19/2-1/boards");
      }
    } else {
      router.push("/quiz-22.04.19/2-1/boards");
    }
  };

  return (
    <div>
      이메일: <input type="text" onChange={onChangeEmail}></input>
      <br />
      비밀번호: <input type="password" onChange={onChangePassword}></input>
      <br />
      <button onClick={onClickLogin}>로그인하기</button>
      {/* <button type="submit">등록하기</button>
      <button type="button" onClick={}>나만의버튼</button>
      <button type="reset"> 초기화하기</button> */}
    </div>
  );
}

export default LoginPage;
