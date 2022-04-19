import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../store";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);

  // 이메일 입력
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  // 비밀번호 입력
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // 로그인 버튼
  const onClickLogin = async () => {
    const result = await loginUser({
      variables: {
        email,
        password,
      },
    });
    const accessToken = result.data.loginUser.accessToken;
    setAccessToken(accessToken);
    alert("로그인 성공");
    router.push("02-login-success");
    console.log(accessToken);

    //  catch (error) {
    //       alert("로그인 실패");
    //       router.push("01-login");
  };

  return (
    <div>
      ID : <input type="text" onChange={onChangeEmail}></input>
      <br />
      PW : <input type="password" onChange={onChangePassword}></input>
      <br />
      <button onClick={onClickLogin}>로그인</button>
    </div>
  );
}
