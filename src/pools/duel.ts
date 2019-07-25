import Discord from 'discord.js';
import UserChampion from '../models/user-champion';

let activeDuels: ActiveDuel[] = [];

export interface Participant {
  user: Discord.User;
  userChampion: UserChampion;
  selectedAbilityId?: number;
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
   * Destroy the duel instance
   */
  public destroy(): void {
    activeDuels.splice(activeDuels.indexOf(this), 1);
  }
}

export default activeDuels;
