import User from './user';
import Champion from './champion';
import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'user_champions' })
export default class UserChampion extends Model<UserChampion> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ field: 'user_id' })
  userId!: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @ForeignKey(() => Champion)
  @AllowNull(false)
  @Column({ field: 'champion_id' })
  itemId!: number;

  @BelongsTo(() => Champion, { onDelete: 'CASCADE' })
  champion!: Champion;

  @AllowNull(false)
  @Column
  level!: number;

  @AllowNull(false)
  @Column
  experience!: number;
}
