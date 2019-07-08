import UserChampion from './user-champion';
import { Table, Column, Model, AllowNull, DataType, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export default class User extends Model<User> {
  @AllowNull(false)
  @Column({ type: DataType.BIGINT, field: 'discord_id' })
  discordId!: number;

  @HasMany(() => UserChampion)
  champions!: UserChampion[];
}
