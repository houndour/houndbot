import Discord from "discord.js";
import activeDuels from "../pools/duel";

export class DuelHelper {
  /**
   * Checks if a user is in an active duel
   * @param user - The discord user to be checked
   */
  static isUserInDuel(user: Discord.User): boolean {
    for (const duel of activeDuels) {
      for (const participant of duel.participants) {
        if (participant.user == user) {
          return true;
        }
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
      for (const participant of duel.participants) {
        if (participant.user == user) {
          return duel;
        }
      }
    }
    return null;
  }

  /**
   * Get the abilities the user can use
   * @param user - The discord user
   */
  static getUserChampionAbilities(user: Discord.User) {
    for (const duel of activeDuels) {
      for (const participant of duel.participants) {
        if (participant.user == user) {
          return participant.userChampion.champion.abilities;
        }
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

    const abilities = this.getUserChampionAbilities(user);

    const embedMessage = new Discord.RichEmbed().setTitle('Legends Battle').setColor('#0099ff');
    embedMessage.description = 'Use a skill by typing the corresponding command in the channel where you started the duel.';
    embedMessage.addBlankField();
    embedMessage.addField('Available skills:', `Use ${process.env.PREFIX} use [name of skill]`);
    embedMessage.addBlankField();
    for (const ability of abilities) {
      embedMessage.addField(ability.name, `Damage: ${ability.damage} - Cooldown: ${ability.cooldown} turns - Cost: ${ability.cost} ${ability.costType}`);
    }
    user.send(embedMessage);
  }
}
