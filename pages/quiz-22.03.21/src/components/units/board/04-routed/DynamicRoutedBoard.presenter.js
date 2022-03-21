import {
  BoardWrap,
  BoardNumber,
  BoardWriter,
  BoardTitle,
  BoardContents,
} from "./DynamicRoutedBoard.styles";

export default function BoardReadUI(props) {
  return (
    <BoardWrap>
      <BoardNumber>
        {props.data?.fetchBoard.number}번 게시글에 오신 것을 환영합니다!!
      </BoardNumber>
      <BoardWriter>작성자: {props.data?.fetchBoard.writer}</BoardWriter>
      <BoardTitle>제목: {props.data?.fetchBoard.title}</BoardTitle>
      <BoardContents>
        내용: {props.data?.fetchBoard.contents}번 게시글에 오신 것을
        환영합니다!!
      </BoardContents>
    </BoardWrap>
  );
}
