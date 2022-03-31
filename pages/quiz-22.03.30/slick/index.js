import React, { Component } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

const settings = {
  dots: true,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 2,
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: gray;
`;

export default function LazyLoad() {
  return (
    <Wrap>
      <h2> 코드캠프 퀴즈</h2>
      <Slider {...settings}>
        <div>
          <Image
            src="/hawaii-01.jpg
          "
            alt="last supper"
            width={640}
            height={320}
          />

          {/* <img src={"/hawaii-01"} /> */}
        </div>
        <div>
          <Image
            src="/hawaii-02.jpg"
            alt="last supper"
            width={640}
            height={320}
          />
          {/* <img src={"/hawaii-02"} /> */}
        </div>
        <div>
          <Image
            src="/hawaii-03.jpg"
            alt="last supper"
            width={640}
            height={320}
          />
          {/* <img src={"/hawaii-03"} /> */}
        </div>
        <div>
          <Image
            src="/hawaii-04.jpg"
            alt="last supper"
            width={640}
            height={320}
          />
          {/* <img src={"/hawaii-04"} /> */}
        </div>
      </Slider>
    </Wrap>
  );
}
