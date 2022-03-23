// 여기는 프리젠터 컴포넌트
import { SubmitButton, WriterInput } from "./ProductWrite.styles";

export default function ProductWriteUI(props) {
  return (
    <div>
      <h1>{props.isEdit ? "상품 수정" : "상품 등록"}</h1>
      판매자명: <input type="text" onChange={props.onChangeMySeller} />
      <br />
      판매상품: <input type="text" onChange={props.onChangeMyName} />
      <br />
      상품설명: <input type="text" onChange={props.onChangeMyDetail} />
      <br />
      상품가격: <input type="text" onChange={props.onChangeMyPrice} />
      <br />
      <SubmitButton
        onClick={props.isEdit ? props.onClickUpdate : props.onClickProduct}
        isActive={props.isActive}
      >
        {props.isEdit ? "상품 수정" : "상품 등록"}
      </SubmitButton>
    </div>
  );
}
