import { getProvider } from "../providers/index";
import { CombineEpisodeMeta, EpisodeImage } from "../utils/EpisodeFunctions";
import { getMappings } from "./mappings";
import { IAnimeEpisode, META } from "@consumet/extensions/dist";
import Zoro from "@consumet/extensions/dist/providers/anime/zoro";

interface EpisodeResponse {
  sub: IAnimeEpisode[];
  dub: IAnimeEpisode[];
}

export interface UnifiedEpisode extends EpisodeImage {
  dubId?: string;
  isDub: boolean;
  dubUrl?: string;
}

interface MetaResponse {
  episodes: {
    [key: string]: IAnimeEpisode;
  };
}

const meta = new META.Anilist(
  new Zoro()
);

async function fetchEpisodeMeta(id: string): Promise<IAnimeEpisode[]> {
  try {
    const res = await fetch(`https://api.ani.zip/mappings?anilist_id=${id}`);
    const data: MetaResponse = await res.json();
    const episodesArray = Object.values(data?.episodes);
    return episodesArray || [];
  } catch (error) {
    console.error("Error fetching and processing meta:", error);
    return [];
  }
}

export const fetchEpisodesData = async (
  id: string,
  preferredProvider: string | null = null
): Promise<UnifiedEpisode[]> => {
  // Run mappings and meta fetch in parallel
  const [mappings, episodeMeta] = await Promise.all([
    getMappings(id, preferredProvider || ""),
    fetchEpisodeMeta(id),
  ]);

  if (!mappings) return [];

  // Process all providers in parallel
  const providerPromises = Object.entries(mappings)
    .filter(
      ([providerName]) =>
        !preferredProvider || providerName === preferredProvider
    )
    .map(async ([providerName, providerMappings]) => {
      const provider = getProvider(providerName);
      if (
        !provider ||
        !providerMappings ||
        Object.keys(providerMappings).length === 0
      ) {
        return null;
      }

      const episodes: EpisodeResponse = { sub: [], dub: [] };

      // Fetch sub and dub episodes in parallel
      await Promise.all([
        (async () => {
          if (
            providerMappings.uncensored ||
            providerMappings.sub ||
            providerMappings.tv
          ) {
            episodes.sub = await provider.fetchEpisodes(
              providerMappings.uncensored ||
                providerMappings.sub ||
                providerMappings.tv
            );
          }
        })(),
        (async () => {
          if (providerMappings.dub) {
            episodes.dub = await provider.fetchEpisodes(providerMappings.dub);
          }
          if(preferredProvider==="zoro" || preferredProvider==="animekai"){
            episodes.dub = await provider.fetchEpisodes(providerMappings.sub);
          }
        })(),
      ]);
      const unifiedEpisodes = unifyEpisodes(episodes.sub, episodes.dub,id);
      if (episodes.sub.length > 0 || episodes.dub.length > 0) {
        return unifiedEpisodes;
      }
      return null;
    });

  const results = (await Promise.all(providerPromises)).filter(
    (result) => result !== null
  );
  // console.log("Results:", results[0]);

  if (episodeMeta?.length > 0 && results[0]) {
    return await CombineEpisodeMeta(results[0], episodeMeta);
  }
  return results[0] || [];
};

export const getEpisodes = async (id: string): Promise<UnifiedEpisode[]> => {
  try {
    return await fetchEpisodesData(id);
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
};


function unifyEpisodes(
  sub: EpisodeImage[],
  dub: EpisodeImage[],
  anilistId:string
): UnifiedEpisode[] {
  const unifiedEpisodes: UnifiedEpisode[] = [];

  const dubMap = new Map(dub.map((d) => [d.number, d]));
  sub.forEach((subEpisode) => {
    const matchingDub = dubMap.get(subEpisode.number);

    unifiedEpisodes.push({
      id: subEpisode.id,
      dubId: matchingDub?.id,
      uniqueId: `${anilistId}$ep=${subEpisode.number}`,
      isDub: matchingDub?.isDubbed,
      number: subEpisode.number,
      url: subEpisode.url,
      dubUrl: matchingDub?.url,
      image: subEpisode.image ||matchingDub?.image,
      title: matchingDub?.title || subEpisode.title,
      description: subEpisode.description ||matchingDub?.description,
      airDate: subEpisode.airDate || matchingDub?.airDate ,
    });

    // Remove the matched dub to avoid duplicates in the next loop
    if (matchingDub) {
      dubMap.delete(subEpisode.number);
    }
  });

  // Add any remaining dub episodes that don't match sub episodes
  dubMap.forEach((dubEpisode) => {
    unifiedEpisodes.push({
      id: dubEpisode.id,
      dubId: undefined,
      isDub: true,
      number: dubEpisode.number,
      url: dubEpisode.url,
      image: dubEpisode.image,
      title: dubEpisode.title,
      description: dubEpisode.description,
      airDate: dubEpisode.airDate,
    });
  });

  return unifiedEpisodes;
}
