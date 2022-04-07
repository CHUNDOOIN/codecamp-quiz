console.log("타입스크립트를 실행했어요!!!");

import { DataSource } from "typeorm";
import { Product } from "./Product.postgres";
import { ApolloServer, gql } from "apollo-server";
// const { ApolloServer, gql } = require('apollo-server');

// 1. 타입
const typeDefs = gql`
  input CreateProductInput {
    name: String
    detail: String
    price: Int
  }

  input UpdateProductInput {
    name: String
    detail: String
    price: Int
  }

  # createProduct - 상품 등록 해줘!
  type Mutation {
    deleteProduct(productId: ID, deletedAt: Int): Return
    updateProduct(
      productId: ID
      updateProductInput: UpdateProductInput!
    ): Return

    createProduct(
      seller: String!
      createProductInput: CreateProductInput!
    ): String # - 실제사용(backdend06)
  }

  # fetchProducts - 상품들 검색해줘!
  type Query {
    fetchProducts: [ProductReturn!]
  }
  type ProductReturn {
    name: String
    detail: String
    price: Int
  }

  # fetchProduct - 상품 검색해줘!
  type Query {
    fetchProduct: [ProductReturn]
  }

  type ProductReturn {
    seller: String
    name: String
    detail: String
    price: Int
  }

  type Return {
    _id: String
    number: Int
    message: String
    deletedAt: Int
  }
`;

// 2. API
const resolvers = {
  Query: {
    fetchProducts: async () => {
      // 데이터 베이스에 접속해서 게시물 가져오기

      const result = await Product.find();
      return result;
    },

    fetchProduct: async () => {
      const result2 = await Product.find();
      return result2;
    },
  },

  Mutation: {
    createProduct: async (_: any, args: any) => {
      // 데이터베이스에 접속해서 게시물 등록하기

      await Product.insert({
        seller: args.seller,
        ...args.createProductInput,
        // writer: args.createBoardInput.writer,
        // title: args.createBoardInput.title,
        // contents: args.createBoardInput.contents ,
      });

      // 수정하면?
      // Board.update({ writer: "철수" }, { title: "제목2" }); //

      // 삭제하면?
      // Board.delete({ writer: "철수" }); //실제로는 안쓰는게 좋다
      // Board.delete({ writer: "철수" }, { deletedAt: new Date() });

      return "게시물을 등록했습니다!";
    },

    updateProduct: async (_: any, args: any) => {
      await Product.update(
        { _id: args.productId },
        {
          ...args.updateProductInput,
          // name: args.updateProductInput.name,
          // detail: args.updateProductInput.detail,
          // price: args.updateProductInput.price,
        }
      );
      return "게시물을 수정했습니다.";
    },

    deleteProduct: async (_: any, args: any) => {
      await Product.update({ _id: args.productId }, { deleteAt: new Date() });
      return "게시물을 삭제했습니다.";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true, // 주소가 같지 않아도 가능해진다. 차단은 어디서? 브라우저에서...
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "34.64.124.189",
  port: 5009,
  username: "postgres",
  password: "postgres2021",
  database: "postgres",

  entities: [Product], // 테이블 만드는곳. 임포트 해서 갖고와랑
  synchronize: true, // 여기있는 그대로 동기화 해줄게.
  logging: true, // 로그 명령어 찍어줘
});

AppDataSource.initialize()
  .then(() => {
    console.log("연결성공!");
    // 성공하면 이쪽
    // 백엔드 API를 오픈-리슨(24시간 동안 접속 가능하게끔 대기상태로 만들어 주기)
    server.listen(4000).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })
  .catch(() => {
    console.log("연결실패!");
    // 실패하면 이쪽
  });

// import { DataSource } from "typeorm";
// import { Products } from "./Product.postgres";
// import { ApolloServer, gql } from "apollo-server";

// // type
// const typeDefs = gql`
//   type Products {
//     _id: String
//     number: Int
//     seller: String
//     name: String
//     detail: String
//     price: Int
//   }

//   type ProductReturn {
//     _id: ID
//     seller: String
//     name: String
//     detail: String
//     price: Int
//   }

//   input CreateProductInput {
//     name: String
//     detail: String
//     price: Int
//   }

//   input UpdateProductInput {
//     name: String
//     detail: String
//     price: Int
//   }

//   type Return {
//     _id: String
//     number: Int
//     message: String
//   }

//   type Query {
//     fetchProducts(page: Int): [ProductReturn]
//   }
//   type Query {
//     fetchProduct(productId: ID): ProductReturn
//   }
//   type Mutation {
//     createProduct(
//       seller: String!
//       createProductInput: CreateProductInput!
//     ): Return
//   }

//   type Mutation {
//     updateProduct(
//       productId: ID
//       updateProductInput: UpdateProductInput!
//     ): Return
//   }
// `;

// // api
// const resolvers = {
//   Query: {
//     fetchProducts: async () => {
//       // 데이터베이스에 접속해서 게시물 가져오기
//       const result = await Products.find();
//       return result;
//     },
//   },
//   Mutation: {
//     createProduct: async (_: any, args: any) => {
//       await Products.insert({
//         seller: args.seller,
//         ...args.createProductInput,
//       });

//       return "게시물을 등록했습니다";
//     },
//   },
// };

// // cors를 풀어주는 곳
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   cors: true,
// });

// const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "34.64.124.189",
//   port: 5010,
//   username: "postgres",
//   password: "postgres2021",
//   database: "postgres",
//   entities: [Products],
//   synchronize: true,
//   logging: true,
// });

// AppDataSource.initialize()
//   .then(() => {
//     console.log("연결성공");
//     server.listen(4000).then(({ url }) => {
//       console.log(`🚀 Server ready at ${url}`);
//     });
//   })
//   .catch((error) => {
//     // 연결에 실패하면
//     console.log(error.message);
//   });
