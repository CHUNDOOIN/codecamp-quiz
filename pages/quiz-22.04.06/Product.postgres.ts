import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") _id!: string;
  @PrimaryGeneratedColumn("increment") number!: number;
  @Column({ type: "text" }) seller!: string;
  @Column({ type: "text" }) name!: string;
  @Column({ type: "text" }) detail!: string;
  @Column({ type: "text" }) price!: string;
  @DeleteDateColumn({ type: "timestamp" }) deleteAt?: Date;

  // deleteAt: Date soft-delete 방식
}

// import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// @Entity()
// export class Products extends BaseEntity {
//   @PrimaryGeneratedColumn("uuid") _id!: string;
//   @PrimaryGeneratedColumn("increment") number!: number;
//   @Column({ type: "text" }) seller!: string;
//   @Column({ type: "text" }) name!: string;
//   @Column({ type: "text" }) detail!: string;
//   @Column({ type: "text" }) price!: string;
// }
