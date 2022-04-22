// import Head from "next/head";
import { useEffect } from "react";

// 1. map2에서 이동시 오류 발생 코드
// declare const window: typeof globalThis & {
//   kakao: any;
// };

// export default function QuizPage() {
//   useEffect(() => {
//     const container = document.getElementById("map");
//     const options = {
//       center: new window.kakao.maps.LatLng(33.450701, 126.570667),
//       level: 3,
//     };

//     const map = new window.kakao.maps.Map(container, options);
//   }, []);

//   return (
//     <div>
//       <Head>
//         <script
//           type="text/javascript"
//           src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0fb5845cf7ef22a26e9ccf664fc4643f"
//         ></script>
//       </Head>
//       <div id="map" style={{ width: 500, height: 500 }}></div>
//     </div>
//   );
// }

// 2. 정상 작동 코드
declare const window: typeof globalThis & {
  kakao: any;
};

export default function QuizPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=0fb5845cf7ef22a26e9ccf664fc4643f&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667
        );

        const imageSrc =
          "https://codebootcamp.co.kr/images/curriculum/stack/Git_Hub.png"; // 마커이미지의 주소입니다
        const imageSize = new window.kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
        const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });
        const map = new window.kakao.maps.Map(container, options);

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            const latlng = mouseEvent.latLng;

            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);

            // let message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
            // message += "경도는 " + latlng.getLng() + " 입니다";

            // const resultDiv = document.getElementById("clickLatlng");
            // resultDiv.innerHTML = message;
          }
        );
      });
    };
  }, []);

  return (
    <div>
      {/* <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0fb5845cf7ef22a26e9ccf664fc4643f"
        ></script>
      </Head> */}
      <div id="map" style={{ width: 500, height: 500 }}></div>
    </div>
  );
}
