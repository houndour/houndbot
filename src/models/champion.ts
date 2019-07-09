import { Table, Column, Model, AllowNull, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'champions' })
export default class Champion extends Model<Champion> {
  @AllowNull(false)
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  name!: string;
}
