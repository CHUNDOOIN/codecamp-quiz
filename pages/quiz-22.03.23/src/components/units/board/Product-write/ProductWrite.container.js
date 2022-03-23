// 여기는 컨테이너 컴포넌트
import { useState } from "react";
import { useMutation } from "@apollo/client";
import ProductWriteUI from "./ProductWrite.presenter";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "./ProductWrite.queries";
import { useRouter } from "next/router";

export default function ProductWrite(props) {
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  const [mySeller, setMySeller] = useState("");
  const [myName, setMyName] = useState("");
  const [myDetail, setMyDetail] = useState("");
  const [myPrice, setMyPrice] = useState("");

  const [data, setData] = useState("");
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const onClickUpdate = async () => {
    await updateProduct({
      variables: {
        seller: mySeller,
        productId: router.query.mynumber,
        updateProductInput: {
          name: myName,
          detail: myDetail,
          price: Number(myPrice),
        },
      },
    });
    alert("상품 수정 성공!!!");
    router.push(`/quiz-22.03.23/${router.query.mynumber}`);
  };

  const onClickProduct = async () => {
    // const result = await axios.get("https://koreanjson.com/posts/1") // rest-api 방식!!
    // const result = await axios.get("https://koreanjson.com/users/1")
    // const result = await axios.get("https://koreanjson.com/products/1")

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

    alert("상품 등록 성공!!!");
    router.push(`/quiz-22.03.23/${result.data.createProduct._id}`);
  };

  const onChangeMySeller = (event) => {
    setMySeller(event.target.value);

    if (
      event.target.value !== "" &&
      myName !== "" &&
      myDetail !== "" &&
      myPrice !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeMyName = (event) => {
    setMyName(event.target.value);

    if (
      mySeller !== "" &&
      event.target.value !== "" &&
      myDetail !== "" &&
      myPrice !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeMyDetail = (event) => {
    setMyDetail(event.target.value);

    if (
      mySeller !== "" &&
      myName !== "" &&
      event.target.value !== "" &&
      myPrice !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeMyPrice = (event) => {
    setMyPrice(event.target.value);

    if (
      mySeller !== "" &&
      myName !== "" &&
      myDetail !== "" &&
      event.target.value !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <ProductWriteUI
      onChangeMySeller={onChangeMySeller}
      onChangeMyName={onChangeMyName}
      onChangeMyDetail={onChangeMyDetail}
      onChangeMyPrice={onChangeMyPrice}
      onClickProduct={onClickProduct}
      onClickUpdate={onClickUpdate}
      isActive={isActive}
      isEdit={props.isEdit}
    />
  );
}
