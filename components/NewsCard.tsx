import {
    Image,
    Linking,
    Pressable,
    Text,
    View
} from "react-native";

import { NewsArticle } from "../types/news";

type NewsCardProps = {
    article: NewsArticle;
};

export default function NewsCard({
    article,
}: NewsCardProps) 
{
return (
    <Pressable
    onPress={() => Linking.openURL(article.url)}
    >
        <View>
            {article.image && (
                <Image
                source={{
                    uri: article.image
                }}
                style={{
                    width: "100%",
                    height: 200,
                }}
                />
            )}
    <Text>{article.title}</Text>
    <Text>{article.source}</Text>
    <Text>{article.description}</Text>

        </View>
    </Pressable>
);
}