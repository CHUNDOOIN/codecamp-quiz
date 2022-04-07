//데코레이터는 뭘까요?
function qqq(aaaa: any) {
  console.log("====================");
  console.log(aaaa);
  console.log("====================");
}

@qqq
class Product {}
