import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import DynamicRoutedBoardUI from "../02-routed/DynamicRoutedBoard.presenter";
import { FETCH_BOARD } from "./DynamicRoutedBoard.queries";

export default function DynamicRoutedBoard() {
  const router = useRouter();
  console.log(router);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { number: Number(router.query.number) },
  });

  return <DynamicRoutedBoardUI data={data}></DynamicRoutedBoardUI>;
}
