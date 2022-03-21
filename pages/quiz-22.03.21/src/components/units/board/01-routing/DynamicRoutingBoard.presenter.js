import {
  ButtonWrap,
  Button1,
  Button2,
  Button3,
} from "./DynamicRoutingBoard.styles";

export default function DynamicRoutingBoardUI(props) {
  return (
    <ButtonWrap>
      <Button1 onClick={props.onClickMove1}>
        83011번 게시글로 이동하기!!!
      </Button1>
      <Button2 onClick={props.onClickMove2}>
        83012번 게시글로 이동하기!!!
      </Button2>
      <Button3 onClick={props.onClickMove3}>
        83013번 게시글로 이동하기!!!
      </Button3>
    </ButtonWrap>
  );
}
