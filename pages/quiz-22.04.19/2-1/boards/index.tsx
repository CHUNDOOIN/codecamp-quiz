import { useQuery, gql } from "@apollo/client";
import BasketItemPage from "../basketItem";
import { withAuth } from "../withAuth/withAuth";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;
function BasketPage() {
  const { data } = useQuery(FETCH_BOARDS);
  console.log(data);

  //   const onClickDelete = (el) => () => {};

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <BasketItemPage key={el._id} el={el} data={data} />

        // <MyRow key={el._id}>
        //   <MyColumn>{el.writer}</MyColumn>
        //   <MyColumn>{el.title}</MyColumn>
        //   <MyButton
        //     onClick={
        //       clickId === el._id
        //         ? onclickDelete(el)(el._id)
        //         : onclickBasket(el)(el._id)
        //     }
        //     id={el._id}
        //   >
        //     {clickId === el._id ? "담기취소" : "게시물 담기"}
        //   </MyButton>
        // </MyRow>
      ))}
    </div>
  );
}

export default withAuth(BasketPage);
