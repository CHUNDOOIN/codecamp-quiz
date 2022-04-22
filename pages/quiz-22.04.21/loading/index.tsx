import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { withAuth } from "../withAuth/withAuth";

declare const window: typeof globalThis & {
  IMP: any;
};

function LoadingPage() {
  //   const [age, setAge] = useState("");
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  const requestPay = () => {
    const IMP = window.IMP; // 생략 가능 => 스크립트를 먼저 다운로드 받아야한다.
    IMP.init("imp57175576"); // Example: imp00000000 -> 관리자 아이디로 로그인 한 후 시스템 설정에 있는 가맹점 식별아이디를 복사한다.
    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011",  // 중복되면 안된다. 주석해놓으면 알아서 고유의 아이디를 랜덤으로 부여한다.
        name: "노르웨이 회전 의자",
        amount: amount,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/28-01-payment", // 모바일에서 결제가 끝나면 저 url로 이동
      },
      (rsp: any) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          console.log(rsp);
          console.log(rsp.paid_amount);
          alert("결제에 성공했습니다! 완료 페이지로 이동합니다.!");
          router.push(`/quiz-22.04.21/complete/${rsp.paid_amount}`);

          // 백엔드에 결제관련 데이터 넘겨주기(=> 즉, 뮤테이션 실행하기)
          // ex, createPointTransactionOfLoading
        } else {
          // 결제 실패 시 로직,
          alert("결제에 실패했습니다! 다시 시도해 주세요!");
        }
      }
    );
  };

  const handleChange = (
    event: ChangeEvent<{ name?: string; value: number }>
  ) => {
    setAmount(event.target.value as number);
  };

  return (
    <div>
      <Head>
        {/* <!-- jQuery --> */}
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        {/* <!-- iamport.payment.js --> */}
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">충전금액</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={amount}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={500}>500원</MenuItem>
            <MenuItem value={1000}>1,000원</MenuItem>
            <MenuItem value={2000}>2,000원</MenuItem>
            <MenuItem value={5000}>5,000원</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <button onClick={requestPay}>충전하기</button>
    </div>
  );
}
export default withAuth(LoadingPage);
