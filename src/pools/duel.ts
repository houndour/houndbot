import Discord, { TextChannel } from 'discord.js';
import UserChampion from '../models/user-champion';
import ChampionAbility from '../models/champion-ability';

let activeDuels: ActiveDuel[] = [];

export interface Participant {
  user: Discord.User;
  userChampion: UserChampion;
  selectedAbility?: ChampionAbility;
}

export class ActiveDuel {
  public readonly startDate: Date;
  public challenged: Discord.User;
  public participants: Participant[];

  /**
   * Challenges an user to a duel
   * @param challenger - The user who is challenging the other
   * @param challenged - The user who will be challenged
   */
  constructor(challenger: Participant, challenged: Discord.User) {
    this.participants = [challenger];
    this.challenged = challenged;
    this.startDate = new Date();
    activeDuels.push(this);
  }

  /**
   * Add a participant to the duel
   * @param participant - The user who will be added to the duel
   */
  public addParticipant(participant: Participant): void {
    this.participants.push(participant);
  }

  /**
   * Check if the duel has started
   */
  public hasStarted(): boolean {
    return this.participants.length > 1;
  }

  /**
   * Check if both players selected an ability
   * and starts the battle for the round
   * @param channel - Channel which is happening the battle
   */
  public battle(channel: TextChannel) {
    let playersReady = 0;
    for (const participant of this.participants) {
      if (participant.selectedAbility) playersReady++;
    }

    /**
     * If one of the players didn't use an ability do nothing
     */
    if (playersReady < 2) return;

    /**
     * Remove champion's HP
     */
    for (const participant of this.participants) {
      for (const oponent of this.participants) {
        if (participant == oponent) continue;
        participant.userChampion.health -= oponent.selectedAbility.damage;
      }
    }

    /**
     * Check for the winner
     */
    let losers = [];
    for (const participant of this.participants) {
      if (participant.userChampion.health < 1) {
        losers.push(participant);
      }
    }

    /**
     * Send message if duel ended
     */
    if (losers.length == 2) {
      channel.send('Both champions died, the duel ended in a draw.');
      this.destroy();
    }
    else if (losers.length == 1) {
      channel.send(`${losers[0].user} lost the duel.`);
      this.destroy();
    }
  }

  /**
   * Destroy the duel instance
   */
  public destroy(): void {
    activeDuels.splice(activeDuels.indexOf(this), 1);
  }
}

export default activeDuels;