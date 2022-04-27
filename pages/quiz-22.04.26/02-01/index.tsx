import LazyLoad from "react-lazy-load";
import styled from "@emotion/styled";

const Img = styled.img`
  width: 500px;
  height: 500px;
`;

export default function QuizPage() {
  return (
    <div>
      나의 하와이 여행 사진
      <div className="filler" />
      <LazyLoad height={500} offsetVertical={500}>
        <Img src="https://velog.velcdn.com/images/dooin/post/c7ddf986-8a52-49dc-aa0e-b0fb8f658c35/image.jpg" />
      </LazyLoad>
      <LazyLoad height={500} offsetVertical={500}>
        <Img src="https://velog.velcdn.com/images/dooin/post/28daa7e5-a548-465b-83ea-39f840325d78/image.jpg" />
      </LazyLoad>
      <LazyLoad height={500} offsetVertical={500}>
        <Img src="https://velog.velcdn.com/images/dooin/post/86587255-e68c-4753-95ce-05f63651a71b/image.jpg" />
      </LazyLoad>
      <LazyLoad height={500} offsetVertical={500}>
        <Img src="https://velog.velcdn.com/images/dooin/post/ff7e39fc-61e5-4962-9727-ceb55fa6cfb4/image.jpg" />
      </LazyLoad>
      <LazyLoad height={500} offsetVertical={500}>
        <Img src="https://velog.velcdn.com/images/dooin/post/cefacfdf-c17e-4210-b9f5-59f11877109c/image.jpg" />
      </LazyLoad>
      <LazyLoad height={500} offsetVertical={500}>
        <Img src="https://velog.velcdn.com/images/dooin/post/1b5b1c4e-9080-4788-852c-16c99dd35bf9/image.jpg" />
      </LazyLoad>
      <LazyLoad height={500} offsetVertical={500}>
        <Img src="https://velog.velcdn.com/images/dooin/post/1a89e4ff-24c5-4387-ba5c-7531b79a5de2/image.jpg" />
      </LazyLoad>
      <LazyLoad height={500} offsetVertical={500}>
        <Img src="https://velog.velcdn.com/images/dooin/post/9154aec9-51fd-4a9c-9d98-41b8353f4e6a/image.jpg" />
      </LazyLoad>
      <LazyLoad height={500} offsetVertical={500}>
        <Img src="https://velog.velcdn.com/images/dooin/post/31ef8665-4685-4fc3-ab83-90956a35e846/image.jpg" />
      </LazyLoad>
      <LazyLoad height={500} offsetVertical={500}>
        <Img src="https://velog.velcdn.com/images/dooin/post/0556f360-53bc-4177-afcd-9c96adf72098/image.jpg" />
      </LazyLoad>
    </div>
  );
}
