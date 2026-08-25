import { Game, League, Team } from "../types/sports";

const API_BASE_URL = "https://v3.football.api-sports.io";
const FREE_PLAN_SEASON = 2024; // The season available in the free plan

function getHeaders() {
  
  return {
    "x-apisports-key": process.env.EXPO_PUBLIC_SPORTS_API_KEY || "",
  };
}

export async function getLeagues(
  teamId: number
): Promise<League[]> {
  const url = `${API_BASE_URL}/leagues?team=${teamId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch leagues: ${response.status}`);
  }

  return data.response
    .map((item: any) => {
      const season2024 = item.seasons.find(
        (season: any) => season.year === 2024
      );

      if (!season2024) {
        return null;
      }

      return {
        id: item.league.id,
        name: item.league.name,
        season: season2024.year,
      };
    })
    .filter(
      (league: League | null): league is League =>
        league !== null
    );
}

export async function searchTeams(search: string): Promise<Team[]> {
  const url = `${API_BASE_URL}/teams?search=${encodeURIComponent(search)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to search teams: ${response.status}`);
  }

  return data.response.map((team: any) => ({
    id: team.team.id,
    name: team.team.name,
    logo: team.team.logo,
    country: team.team.country,
  }));

}
export async function getTeam(
  teamId: number
): Promise<Team> {
  const url = `${API_BASE_URL}/teams?id=${teamId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch teams: ${response.status}`);
  }
  if(data.response.length === 0) {
    throw new Error(`No teams found for teamId: ${teamId}`);
  }
  const item = data.response[0];

  return {
    id: item.team.id,
    name: item.team.name,
    logo: item.team.logo,
    country: item.team.country,
  };
}

export async function getGames(
    teamId: number,
    leagueId: number,
    season: number
): Promise<Game[]> {
    
    
    const url = `${API_BASE_URL}/fixtures?team=${teamId}&league=${leagueId}&season=${season}`;
    const response = await fetch(url, {
        method: "GET",
        headers: getHeaders(),
    });

const data = await response.json();


  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.status}`);
  }
  
  console.log(data.response);

  return data.response.map((game: any) => ({
    id: game.fixture.id,
    date: game.fixture.date,

    homeTeam: {
      id: game.teams.home.id,
      name: game.teams.home.name,
      logo: game.teams.home.logo,
    },

    awayTeam: {
      id: game.teams.away.id,
      name: game.teams.away.name,
      logo: game.teams.away.logo,
    },

    homeScore: game.score.fulltime.home,
    awayScore: game.score.fulltime.away,

    status: game.fixture.status.short,
  }));
}   
  