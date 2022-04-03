import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";

// 게시물 10개씩 보여줌
const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

//총 게시물 몇개?
const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

const MyRow = styled.div`
  display: flex;
`;

const MyCol = styled.div`
  width: calc(100% / 3);
`;

const Scroll = styled.div`
  width: 100%;
  height: 500px;

  overflow: auto;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default function MapBoardPage() {
  const { data: data2 } = useQuery(FETCH_BOARDS_COUNT);
  console.log("데이터 잘가니2", data2);
  const { data, fetchMore } = useQuery(FETCH_BOARDS);
  console.log("데이터 잘가니", data);

  const onLoadMore = () => {
    // 데이터 값이 없으면 리턴해
    if (!data) return;

    //현재 페이지보다 +1페이지를 더 추가로 가져와
    fetchMore({
      variables: { page: Math.ceil(data.fetchBoards.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoards)
          return { fetchBoards: [...prev.fetchBoards] };
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <Scroll>
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={true}
        useWindow={false}
      >
        {data?.fetchBoards.map((el: any, index: any) => (
          <MyRow key={el._id}>
            <MyCol>{data2?.fetchBoardsCount - index}번</MyCol>
            {/* <MyCol>{el._id.slice(0, 6)}</MyCol> */}
            <MyCol>{el.writer}</MyCol>
            <MyCol>{el.title}</MyCol>
          </MyRow>
        ))}{" "}
        || <div></div>
      </InfiniteScroll>
    </Scroll>
  );
}
