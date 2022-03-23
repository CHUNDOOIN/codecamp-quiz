// 여기는 상세보기 페이지
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_PRODUCT = gql`
  query fetchProduct($productId: ID) {
    fetchProduct(productId: $productId) {
      _id
      seller
      name
      detail
      price
    }
  }
`;

export default function ProductDetailPage() {
  const router = useRouter();

  const { data } = useQuery(FETCH_PRODUCT, {
    variables: { productId: router.query.mynumber },
  });

  console.log(data);

  const onClickMove = () => {
    router.push(`/quiz-22.03.23/${router.query.mynumber}/edit`);
  };

  return (
    <div>
      <div>{data?.fetchProduct._id}게시글</div>
      <div>판매자명: {data?.fetchProduct.seller}</div>
      <div>판매상품: {data?.fetchProduct.name}</div>
      <div>상품설명: {data?.fetchProduct.detail}</div>
      <div>상품가격: {data?.fetchProduct.price}</div>
      <button onClick={onClickMove}>상품수정</button>
    </div>
  );
}
