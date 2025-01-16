import { IAnimeInfo } from "../utils/types";
import { animeinfo } from "./anilistqueries";


export const AnimeInfoAnilist = async (animeid: string): Promise<IAnimeInfo | undefined> => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: animeinfo,
        variables: {
          id: animeid,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data?.Media as IAnimeInfo; // Ensure the result matches the AnimeInfo type
  } catch (error) {
    console.error('Error fetching data from AniList:', error);
    return undefined; // Return undefined in case of an error
  }
};
