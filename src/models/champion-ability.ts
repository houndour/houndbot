import Champion from './champion';
import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Default } from 'sequelize-typescript';

@Table({ tableName: 'champion_abilities', timestamps: false })
export default class ChampionAbility extends Model<ChampionAbility> {
  @ForeignKey(() => Champion)
  @AllowNull(false)
  @Column({ field: 'champion_id' })
  championId!: number;

  @BelongsTo(() => Champion, { onDelete: 'CASCADE' })
  champion!: Champion;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  damage!: number;

  @AllowNull(false)
  @Column
  cooldown!: number;

  @AllowNull(false)
  @Column
  cost!: number;

  @Default('mana')
  @AllowNull(false)
  @Column({ field: 'cost_type' })
  costType!: string;
}
