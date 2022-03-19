// import axios from "axios";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlApiPage() {
  const [mySeller, setMySeller] = useState("");
  const [myName, setMyName] = useState("");
  const [myDetail, setMyDetail] = useState("");
  const [myPrice, setMyPrice] = useState("");

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [data, setData] = useState("");

  const onClickSubmit = async () => {
    const result = await createProduct({
      variables: {
        seller: mySeller,
        createProductInput: {
          name: myName,
          detail: myDetail,
          price: Number(myPrice),
        },
      },
    });

    setData(result.data.createProduct.message);
  };

  const onChangeSeller = (e) => {
    setMySeller(e.target.value);
  };

  const onChangeName = (e) => {
    setMyName(e.target.value);
  };

  const onChangeDetail = (e) => {
    setMyDetail(e.target.value);
  };

  const onChangePrice = (e) => {
    setMyPrice(e.target.value);
  };

  return (
    <div>
      판매자:
      <input type="text" onChange={onChangeSeller} />
      <br />
      판매명:
      <input type="text" onChange={onChangeName} />
      <br />
      설명:
      <input type="text" onChange={onChangeDetail} />
      <br />
      가격:
      <input type="text" onChange={onChangePrice} />
      <br />
      <input type="number" />
      <button onClick={onClickSubmit}>상품 등록</button>
    </div>
  );
}
