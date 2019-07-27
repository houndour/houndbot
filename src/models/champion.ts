import ChampionAbility from './champion-ability';
import { Table, Column, Model, AllowNull, Default, PrimaryKey, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'champions', timestamps: false })
export default class Champion extends Model<Champion> {
  @AllowNull(false)
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  name!: string;

  @Column
  title!: string;

  @AllowNull(false)
  @Column
  health!: number;

  @AllowNull(false)
  @Column({ field: 'mana_regen' })
  manaRegen!: number;

  @Default(false)
  @AllowNull(false)
  @Column({ field: 'is_starter' })
  isStarter!: boolean;

  @HasMany(() => ChampionAbility)
  abilities!: ChampionAbility[];
}
