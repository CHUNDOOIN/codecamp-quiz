import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board {
  @PrimaryGeneratedColumn("increment")
  number!: number;

  @Column({ type: "text" })
  writer!: string;

  @Column({ type: "text" })
  contents!: string;

  @Column({ type: "text" })
  filename!: string;

  // 어떤 테이블이 들어갈것인가
}
