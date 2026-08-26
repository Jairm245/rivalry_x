import { NewsArticle } from "../types/news";
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

function getHeaders() {
    return {
        "X-Api-Key": process.env.EXPO_PUBLIC_NEWS_API_KEY || ""
    };
}

export async function getTeamNews(
    teamName: string
): Promise<NewsArticle[]> {
const url = `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(teamName)}&language=en&sortBy=publishedAt`;


const response = await fetch(url,{
    method: "GET",
    headers: getHeaders(),
});

const data = await response.json();

if(!response.ok)
{
    throw new Error(
        `Failed to fetch news: ${response.status}`
    );
}
return data.articles.map((article:any) => ({
    title: article.title,
    description: article.description,
    image: article.urlToImage,
    url: article.url,
    publishedAt: article.publishedAt,
    source: article.source.name,
}))
}
