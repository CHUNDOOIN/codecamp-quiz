import "react-quill/dist/quill.snow.css"; // ES6
import dynamic from "next/dynamic";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function QuizBoardPage() {
  const router = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);

  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const onChangeContents = (value: string) => {
    console.log(value);

    // register로 등록하지 않고, 강제로 값을 넣어주는 기능!!!
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // onChange 됐다고 react-hook-form에 알려주는 기능!!!
    trigger("contents");
  };

  const onClickSubmit = async (data) => {
    if (!(data.writer && data.password && data.title && data.contents)) {
      alert("모두 입력해 주세요!");
      return;
    }

    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: data.writer,
            password: data.password,
            title: data.title,
            contents: data.contents,
          },
        },
      });
      alert("게시글 등록 성공!!!");
      router.push(`/quiz-22.04.20/${result.data?.createBoard._id}`);
    } catch (error) {
      alert("게시글 등록 실패!!!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자 : <input type="text" {...register("writer")}></input>
      <br />
      비밀번호 : <input type="password" {...register("password")}></input>
      <br />
      제목 : <input type="text" {...register("title")}></input>
      <br />
      내용 : <ReactQuill onChange={onChangeContents}></ReactQuill>
      <br />
      <button>등록하기</button>
    </form>
  );
}
