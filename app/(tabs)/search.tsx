import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";


import { router } from "expo-router";
import { searchTeams } from "../../services/sportsApi";
import { Team } from "../../types/sports";
export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if(!search.trim()) {
      setError("Please enter a search term");
      return;
    }
    try {
      setError(null);

      const data = await searchTeams(search);

      setTeams(data);
    } catch (error) {
      console.error(error);
      setError("Could not search teams");
    }
  };

  return (
    <View>
      <Text>Search Teams</Text>

      <TextInput
        placeholder="Search for a team"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
      />

      {error && <Text>{error}</Text>}

      <FlatList
        data={teams}
        keyExtractor={(team) => team.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push(`/team/${item.id}`);
            }}
          >
            <View>
              <Image
                source={{ uri: item.logo }}
                style={{
                  width: 50,
                  height: 50,
                }}
              />

              <Text>{item.name}</Text>
              <Text>{item.country}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}