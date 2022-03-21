import { useRouter } from "next/router";
import BoardReadUI from "../04-routed/DynamicRoutedBoard.presenter";
import { FETCH_BOARD } from "../04-routed/DynamicRoutedBoard.queries";
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

export default function BoardRead() {
  const router = useRouter();
  console.log(router);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { number: Number(router.query.number) },
  });

  console.log(data);

  return <BoardReadUI data={data}></BoardReadUI>;
}
