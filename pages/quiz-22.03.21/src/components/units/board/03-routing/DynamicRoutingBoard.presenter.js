import {
  Wrap,
  Writer,
  Title,
  Contents,
  SubmitButton,
} from "./DynamicRoutingBoard.styles";

export default function BoardWriteUI(props) {
  return (
    <Wrap>
      작성자: <Writer type="text" onChange={props.onChangeWriter} />
      제목: <Title type="text" onChange={props.onChangeTitle} />
      내용: <Contents type="text" onChange={props.onChangeContents} />
      <SubmitButton onClick={props.callGraphqlApi} isActive={props.isActive}>
        GRAPHQL-API 요청하기!!!
      </SubmitButton>
    </Wrap>
  );
}
