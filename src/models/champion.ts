import { Table, Column, Model, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'champions' })
export default class Champion extends Model<Champion> {
  @AllowNull(false)
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  name!: string;
}
