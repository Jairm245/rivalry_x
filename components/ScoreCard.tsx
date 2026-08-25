import { Image, Text, View } from "react-native";
import { Game } from "../types/sports";

type ScoreCardProps = {
  game: Game;
};

export default function ScoreCard({ game }: ScoreCardProps) {
  return (
    <View>
      <View>
        <Image
          source={{ uri: game.homeTeam.logo }}
          style={{ width: 40, height: 40 }}
        />

        <Text>{game.homeTeam.name}</Text>
        <Text>{game.homeScore ?? "-"}</Text>
      </View>

      <View>
        <Image
          source={{ uri: game.awayTeam.logo }}
          style={{ width: 40, height: 40 }}
        />

        <Text>{game.awayTeam.name}</Text>
        <Text>{game.awayScore ?? "-"}</Text>
      </View>

      <Text>{game.status}</Text>
    </View>
  );
}