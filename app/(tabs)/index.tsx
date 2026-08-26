import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";

import { getTeamNews } from "@/services/newsApi";
import NewsCard from "../../components/NewsCard";
import { getFollowedTeams } from "../../services/follow";
import { NewsArticle } from "../../types/news";
import { FollowedTeam } from "../../types/sports";

export default function HomeScreen() {
  const [teams,setTeams] = useState<FollowedTeam[]>([]);
  const [articles,setArticle] = useState<NewsArticle[]>([]);
  const [error,setError] = useState<string | null>(null);
  
  useFocusEffect(
  useCallback(() => {
    const loadTeams = async ()=> {
      try {
        const data = await getFollowedTeams();

        setTeams(data);
        setError(null);
        const articles = await getTeamNews("Real Madrid");

        console.log("Real Madrid news:", articles);
      }
      catch(error)
       {
        console.error("Could not load following teams",error)
        setError("Could not load your teams");
      }
    };
    loadTeams()
  }, [])
);

useEffect(() => {
  const loadNews = async () => {
    try {
      const data = await getTeamNews("Real Madrid");

      setArticle(data);
    }
    catch(error)
    {
      console.error("Could not laoad news:", error);
    }
  };
  loadNews();
},[]);

  return (
    <ScrollView
    style={{flex: 1}}>
    <View
      style={{
        flex: 1,
      }}
     
    >
      <Text
      style={{
        fontSize: 22,
        fontWeight: "bold",
        marginHorizontal: 16,
        marginBottom: 12,
      }}>
        My Teams
        </Text>
      {error && <Text>{error}</Text>}

      <FlatList
      horizontal
      data={teams}
      keyExtractor={(team)=> team.id}
      showsHorizontalScrollIndicator={false}
      style={{
        maxHeight: 100,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap:16
      }}
      renderItem={({item}) => (
        <Pressable
        onPress={() =>
          router.push(`/team/${item.sports_api_id}`)
        }
        >
          <View
          style={{
            alignItems: "center",
            width:80,
          }}>
            <Image
            source={{uri: item.logo_url}}
            style={{
              width: 60,
              height:60,
              resizeMode: "contain",
            }}
            />
            <Text 
            numberOfLines={1}
            style={{
              marginTop: 6,
              textAlign: "center",
              width: 80,
            }}>
              {item.name}
              </Text>
          </View>
        </Pressable>
      )}
      />
      <View>
        <Text
        style= {{
          fontSize: 22,
          fontWeight: "bold",
          marginHorizontal: 16,
          marginTop: 20,
          marginBottom: 12,
        }}>
          Real Madrid News
        </Text>

        {articles.map((article) => (
          <NewsCard
          key={article.url}
          article={article}
          />
        ))}
      </View>
    </View>
    </ScrollView>
    
  );
}
