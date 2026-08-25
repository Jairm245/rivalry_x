import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

import ScoreCard from "../../components/ScoreCard";
import { getGames, getLeagues, getTeam } from "../../services/sportsApi";
import { Game, League, Team } from "../../types/sports";



export default function TeamScreen() {
  const { teamId } = useLocalSearchParams();
const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [leagueName, setLeagueName] = useState<string | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const id = Number(teamId);
        const teamData = await getTeam(id);
        setTeam(teamData);
        const leagueData = await getLeagues(id);
        if(leagueData.length === 0) {
            setError("No leagues found for this team");
            return;
        }
        setLeagues(leagueData); 
        const firstleague = leagueData[0]; // Get the first league
        
        
        setSelectedLeague(firstleague);
        setLeagueName(firstleague.name);
        // Store the league name for display

        const data = await getGames(
          id,
          firstleague.id,
          firstleague.season
        );

        setGames(data);
      } catch (error) {
        console.error(error);
        setError("Could not load team games");
      }
    };

    if (teamId) {
      loadGames();
    }
  }, [teamId]);

const handleLeagueChange = async (league: League) => {
    try{
        const id = Number(teamId);
        setSelectedLeague(league);
        setLeagueName(league.name);
        const data = await getGames(id, league.id, league.season);
        setGames(data);
    } catch (error) {
        console.error(error);
        setError("Could not load games for the selected league");
    }
  };

  return (
  <View style={{ flex: 1 }}>
    {team && (
      <View>
        <Image source={{ uri: team.logo }} style={{ width: 100, height: 100 }} />
        <Text>Team: {team.name}</Text>
        <Text>Country: {team.country}</Text>
      </View>
    )}

    {leagueName && (
      <Text>
        {leagueName} • {selectedLeague?.season}
      </Text>
    )}

    {error && <Text>{error}</Text>}

    <FlatList
      horizontal
      data={leagues}
      keyExtractor={(league) => league.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleLeagueChange(item)}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            marginRight: 10,
            borderRadius: 20,
            backgroundColor:
              selectedLeague?.id === item.id
                ? "black"
                : "lightgray",
          }}
        >
          <Text
            style={{
              color:
                selectedLeague?.id === item.id
                  ? "white"
                  : "black",
            }}
          >
            {item.name}
          </Text>
        </Pressable>
      )}
    />

    <FlatList
      data={games}
      keyExtractor={(game) => game.id.toString()}
      renderItem={({ item }) => (
        <ScoreCard game={item} />
      )}
    />
  </View>
);
}