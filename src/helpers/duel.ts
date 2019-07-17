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
}
