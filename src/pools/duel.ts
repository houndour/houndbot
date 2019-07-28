import Discord, { TextChannel } from 'discord.js';
import UserChampion from '../models/user-champion';
import ChampionAbility from '../models/champion-ability';

let activeDuels: ActiveDuel[] = [];

export interface Participant {
  user: Discord.User;
  userChampion: UserChampion;
  selectedAbility?: ChampionAbility;
  abilities: ChampionAbility[];
}

export class ActiveDuel {
  public readonly startDate: Date;
  public challenged: Discord.User;
  public participants: Participant[];
  public channel: TextChannel;

  /**
   * Challenges an user to a duel
   * @param challenger - The user who is challenging the other
   * @param challenged - The user who will be challenged
   */
  constructor(challenger: Participant, challenged: Discord.User, channel: TextChannel) {
    this.participants = [challenger];
    this.challenged = challenged;
    this.startDate = new Date();
    this.channel = channel;
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
  public async battle() {
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
      for (const opponent of this.participants) {
        if (participant == opponent) continue;
        participant.userChampion.health -= opponent.selectedAbility.damage;
      }
    }

    /**
     * Check for the winner
     */
    let losers: Participant[] = [];
    for (const participant of this.participants) {
      if (participant.userChampion.health < 1) {
        losers.push(participant);
      }
    }

    /**
     * Send message if duel ended
     * or reset variables if round ended
     */
    if (losers.length == 2) {
      this.channel.send('Both champions died, the duel ended in a draw.');
      this.destroy();
    }
    else if (losers.length == 1) {
      const winner = this.participants.find((w) => { return w.user != losers[0].user });
      this.channel.send(`${winner.user} defeated ${losers[0].user} in the duel.`);
      this.destroy();
    }
    else {
      for (const participant of this.participants) {
        for (const ability of participant.abilities) {
          if (ability.cooldown > 0 && participant.selectedAbility != ability) {
            ability.cooldown--;
          }
        }

        participant.userChampion.mana -= participant.selectedAbility.cost;
        participant.userChampion.mana = ((participant.userChampion.mana + participant.userChampion.champion.manaRegen) > 100) ? 100 : participant.userChampion.mana + participant.userChampion.champion.manaRegen;
        participant.selectedAbility = null;
      }
      await this.sendSummary();
      this.channel.send(`Round ended, select your abilities.`);
    }
  }
  
  /**
   * Send the duel summary (current champions health, mana...)
   */
  public async sendSummary() {
    if (!this.hasStarted()) return;

    const embedMessage = new Discord.RichEmbed();
    embedMessage.setColor('#0099ff');
    embedMessage.setTitle(`${this.participants[0].user.username} VS ${this.participants[1].user.username}`);
    embedMessage.setThumbnail('https://cdn2.iconfinder.com/data/icons/long-live-the-queen-1/60/swords-512.png');
    
    embedMessage.addField(this.participants[0].userChampion.champion.name, this.participants[0].userChampion.champion.title, true);
    embedMessage.addField(this.participants[1].userChampion.champion.name, this.participants[1].userChampion.champion.title, true);

    embedMessage.addField('Health', `${this.participants[0].userChampion.health}/${this.participants[0].userChampion.maxHealth}`, true);
    embedMessage.addField('Health', `${this.participants[1].userChampion.health}/${this.participants[1].userChampion.maxHealth}`, true);

    embedMessage.addField('Mana', `${this.participants[0].userChampion.mana}/100`, true);
    embedMessage.addField('Mana', `${this.participants[1].userChampion.mana}/100`, true);

    embedMessage.addField('Level', this.participants[0].userChampion.level, true);
    embedMessage.addField('Level', this.participants[1].userChampion.level, true);

    embedMessage.addField('Experience', `${this.participants[0].userChampion.experience}/${this.participants[0].userChampion.level * 10}`, true);
    embedMessage.addField('Experience', `${this.participants[1].userChampion.experience}/${this.participants[1].userChampion.level * 10}`, true);

    await this.channel.send(embedMessage);
  }

  /**
   * Destroy the duel instance
   */
  public destroy(): void {
    activeDuels.splice(activeDuels.indexOf(this), 1);
  }
}

export default activeDuels;
