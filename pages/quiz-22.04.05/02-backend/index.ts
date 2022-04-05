import { DataSource } from "typeorm";
import { Board } from "./postgres";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "34.64.124.189",
  port: 5009,
  username: "postgres",
  password: "postgres2021",
  database: "postgres",
  //
  synchronize: true,
  logging: true,
  entities: [Board],
});

AppDataSource.initialize()
  .then(() => {
    // 성공하면 이쪽
    console.log("연결성공!");
  })
  .catch(() => {
    // 실패하면 이쪽
    console.log("연결실패!");
  });
