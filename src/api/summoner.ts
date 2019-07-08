import axios, { AxiosResponse } from 'axios';
import logger from '../utils/logger';

export class SummonerApi {
  /**
   * Get the summoner data by name
   * @param {string} name - The name of the summoner
   */
  static async getSummonerByName(name: string): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.API_KEY}`);
      return response;
    }
    catch (err) {
      logger('summoner', err, 'error');
    }
  }
}
