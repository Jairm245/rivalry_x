import { Game } from "@/types/sports";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ScoreCard from "../../components/ScoreCard";
import { getGames } from "../../services/sportsApi";

export default function ScoresScreen() {
  const [games, setGames] = useState<Game[]>([]);
  const [error,setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await getGames(541, 140, 2024); // Example teamId, leagueId, and season
        console.log("Fetched games:", data);
        setGames(data ?? []);
      } catch (error) {
        console.error("Error fetching games:", error);
        setError("Could not load games");
      }
    };

    loadGames();
  }, []);

  return (
    <View>
      <Text>Scores</Text>
      {error ? <Text>{error}</Text> : null}

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