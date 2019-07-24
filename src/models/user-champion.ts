import User from './user';
import Champion from './champion';
import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Default } from 'sequelize-typescript';

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
  championId!: number;

  @BelongsTo(() => Champion, { onDelete: 'CASCADE' })
  champion!: Champion;

  @AllowNull(false)
  @Column
  level!: number;

  @AllowNull(false)
  @Column
  experience!: number;

  @AllowNull(false)
  @Column
  health!: number;

  @AllowNull(false)
  @Column({ field: 'max_health' })
  maxHealth!: number;

  @Default(false)
  @AllowNull(false)
  @Column
  selected!: boolean;
}
