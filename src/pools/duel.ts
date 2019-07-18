import Discord from 'discord.js';

let activeDuels: ActiveDuel[] = [];

export class ActiveDuel {
  public readonly startDate: Date;
  public challenged: Discord.User;
  public participants: Discord.User[];

  /**
   * Challenges an user to a duel
   * @param challenger - The user who is challenging the other
   * @param challenged - The user who will be challenged
   */
  constructor(challenger: Discord.User, challenged: Discord.User) {
    this.participants = [challenger];
    this.challenged = challenged;
    this.startDate = new Date();
    activeDuels.push(this);
  }

  /**
   * Add a participant to the duel
   * @param participant - The user who will be added to the duel
   */
  public addParticipant(participant: Discord.User): void {
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
