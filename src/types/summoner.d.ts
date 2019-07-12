interface Summoner {
  profileIconId: number;
  name: string;
  puuid: string;
  summonerLevel: number;
  accountId: string;
  id: string;
  revisionDate: number;
}

interface SummonerLeague {
  queueType: string;
  summonerName: string;
  hotStreak: boolean;
  miniSeries: MiniSeriesDTO;
  wins: number;
  veteran: boolean;
  losses: number;
  rank: string;
  leagueId: string;
  inactive: boolean;
  freshBlood: boolean;
  tier: string;
  summonerId: string;
  leaguePoints: number;
}
