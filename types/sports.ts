export type Game = {
    id: number;
    date: string;
    homeTeam: 
    {
        id: number;
        name: string;
        logo: string;
    };
    awayTeam:
    {
        id: number;
        name: string;
        logo: string;
    };

    homeScore: number | null;
    awayScore: number | null;

    status: string;
  };

  export type Team = {
    id: number;
    name: string;
    logo: string;
    country: string;
  };

  export type League = {
    id: number;
    name: string;
    season: number;
  };