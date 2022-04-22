import { useRouter } from "next/router";

export default function CompletePage() {
  const router = useRouter();
  const won = Number(router.query.won);

  return (
    <div>
      <div>{won}원 충전 완료!!</div>
    </div>
  );
}
