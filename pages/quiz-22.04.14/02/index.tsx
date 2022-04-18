import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Error = styled.div`
  /* color: red; */
  font-size: 15px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.isActive ? "yellow" : "")};
`;

const schema = yup.object({
  writer: yup
    .string()
    .max(5, "작성자는 5글자 이내 문자열입니다.")
    .required("작성자는 필수 입력 사항입니다."),
  password: yup
    .string()
    .matches(
      /^.*(?=^.{1,8}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
      "비밀번호는 영문, 숫자, 특수문자를 포함한 8자리 이내 문자열입니다."
    )
    .required("비밀번호는 필수 입력 사항입니다."),
  title: yup
    .string()
    .max(100, "제목은 100자 이내 문자열입니다.")
    .required("제목은 필수 입력 사항입니다."),
  contents: yup
    .string()
    .max(1000, "내용은 1000자 이내 문자열입니다.")
    .required("내용은 필수 입력 사항입니다."),
});

export default function FormPage() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  interface IFormValues {
    writer?: string;
    password?: string;
    title?: string;
    contents?: string;
  }

  const onClickSubmit = (data: IFormValues) => {
    console.log(data);
    alert("성공");
  };

  console.log("리렌더링 체크");

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자
      <br />
      <input type="text" {...register("writer")}></input>
      <Error style={{ color: "red" }}>{formState.errors.writer?.message}</Error>
      <br />
      비밀번호
      <br />
      <input type="text" {...register("password")}></input>
      <Error style={{ color: "red" }}>
        {formState.errors.password?.message}
      </Error>
      <br />
      제목
      <br />
      <input type="text" {...register("title")}></input>
      <Error style={{ color: "red" }}>{formState.errors.title?.message}</Error>
      <br />
      내용
      <br />
      <input type="text" {...register("contents")}></input>
      <Error style={{ color: "red" }}>
        {formState.errors.contents?.message}
      </Error>
      <br />
      <Button isActive={formState.isValid}>게시물 등록하기</Button>
    </form>
  );
}
