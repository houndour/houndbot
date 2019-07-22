import Discord from "discord.js";
import activeDuels from "../pools/duel";

export class DuelHelper {
  /**
   * Checks if a user is in an active duel
   * @param user - The discord user to be checked
   */
  static isUserInDuel(user: Discord.User): boolean {
    for (const duel of activeDuels) {
      if (duel.participants.includes(user)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets the duel instance which the user is in
   * @param user - The discord user
   */
  static getDuelInstance(user: Discord.User) {
    for (const duel of activeDuels) {
      if (duel.participants.includes(user)) {
        return duel;
      }
    }
    return null;
  }

  /**
   * Send the battle instructions to the user
   * @param user - The discord user
   */
  static sendDuelInstructions(user: Discord.User) {
    if (!this.isUserInDuel(user)) return;

    const embedMessage = new Discord.RichEmbed().setTitle('Legends Battle').setColor('#0099ff');
    embedMessage.description = 'Use a skill by typing the corresponding command in the channel where you started the duel.';
    user.send(embedMessage);
  }
}
