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
  # query fetchBoard($number: Int) {
  #   fetchBoard(number: $number) {
  #     number
  #     writer
  #     title
  #     contents
  #   }
  # }
`;

export default function DynamicRoutedPage() {
  const router = useRouter();
  console.log(router);

  const { data } = useQuery(FETCH_PRODUCT, {
    variables: { productId: "09dbf78e-a8c0-4c1c-becc-26632f525afe" },
  });

  console.log(data);

  return (
    <div>
      {/* {data === data?.fetchProduct.seller
        ? " loading... "
        : data?.fetchProduct.seller}
      <br />
      {data === data?.fetchProduct.name
        ? " loading... "
        : data?.fetchProduct.name}
      <br />
      {data === data?.fetchProduct.detail
        ? " loading... "
        : data?.fetchProduct.detail}
      <br />
      {data === data?.fetchProduct.price
        ? " loading... "
        : data?.fetchProduct.price} */}

      <div>
        판매자:{" "}
        {data === data?.fetchProduct.seller
          ? " loading... "
          : data?.fetchProduct.seller}
      </div>
      <div>
        상품명:{" "}
        {data === data?.fetchProduct.name
          ? " loading... "
          : data?.fetchProduct.name}
      </div>
      <div>
        상품내용:{" "}
        {data === data?.fetchProduct.detail
          ? " loading... "
          : data?.fetchProduct.detail}
      </div>
      <div>
        상품가격:{" "}
        {data === data?.fetchProduct.price
          ? " loading... "
          : data?.fetchProduct.price}
      </div>
    </div>
  );
}
