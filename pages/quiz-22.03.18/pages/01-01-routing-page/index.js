// import axios from "axios";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import {
  PageWrap,
  Wrap,
  Title,
  Seller,
  Name,
  Detail,
  Price,
  Button,
} from "../../styles/emotion";

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

export default function DynamicRoutingPage() {
  const [mySeller, setMySeller] = useState("");
  const [myName, setMyName] = useState("");
  const [myDetail, setMyDetail] = useState("");
  const [myPrice, setMyPrice] = useState("");

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [data, setData] = useState("");
  const router = useRouter();

  const onClickSubmit = async () => {
    try {
      const result = await createProduct({
        variables: {
          seller: mySeller,
          createProductInput: {
            name: myName,
            detail: myDetail,
            price: myPrice,
          },
        },
      });
      // router.push(`/01-02-routed-page/${result.data.createBoard.number}`);
      router.push(`/01-02-routed-page/${result.data.createProduct._id}`);
      // setData(result.data.createProduct.message);
      alert("상품 등록에 성공했어요!");
    } catch (error) {
      alert(error.message);
    }
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
    setMyPrice(Number(e.target.value));
  };

  return (
    // <div>
    //   판매자:
    //   <input type="text" onChange={onChangeSeller} />
    //   <br />
    //   판매명:
    //   <input type="text" onChange={onChangeName} />
    //   <br />
    //   설명:
    //   <input type="text" onChange={onChangeDetail} />
    //   <br />
    //   가격:
    //   <input type="text"  />
    //   <br />
    //   <button onClick={onClickSubmit}>상품 등록</button>
    // </div>

    <PageWrap>
      <Wrap>
        <Title>판매자명</Title>
        <Seller onChange={onChangeSeller}></Seller>
      </Wrap>

      <Wrap>
        <Title>판매물건</Title>
        <Name onChange={onChangeName}></Name>
      </Wrap>

      <Wrap>
        <Title>판매내용</Title>
        <Detail onChange={onChangeDetail}></Detail>
      </Wrap>

      <Wrap>
        <Title>판매가격</Title>
        <Price onChange={onChangePrice}></Price>
      </Wrap>

      <Wrap>
        <Title>상품등록</Title>
        <Button onClick={onClickSubmit}>등록하기</Button>
      </Wrap>
    </PageWrap>
  );
}
