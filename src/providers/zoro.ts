import { ANIME } from "@consumet/extensions";
import { Provider } from "./base";
import { findSimilarTitles } from "../lib/stringSimilarity";
import {
  IAnimeInfo,
  AnimeTitle,
  Mappings,
  SearchResponse,
  SearchResult,
  EpisodeData,
} from "../utils/types";

export class ZoroProvider extends Provider {
  constructor() {
    super("zoro");
  }
  client = new ANIME.Zoro();

  async fetchEpisodes(id: string): Promise<EpisodeData[]> {
    try {
      const data = await this.client.fetchAnimeInfo(id);
      const episodes = data?.episodes || [];
      // @ts-ignore
      return episodes.map((episode) => ({
        ...episode,
        // id: this.transformEpisodeId(episode.id),
        id: episode.id,
      }));
    } catch (error) {
      console.error(
        `Error fetching ${this.name}:`,
        error instanceof Error ? error.message : "Unknown error"
      );
      return [];
    }
  }

  async getMapping(title: AnimeTitle): Promise<Mappings> {
    try {
      // Run searches in parallel
      const searchTerm =
        title?.romaji || title?.english || title?.userPreferred || "";
      const searchResults = await this.client.search(searchTerm);

      if (!searchResults?.results) {
        return {};
      }

      // Run similar title searches in parallel
      const [mappedEng, mappedRom] = await Promise.all([
        Promise.resolve(
          findSimilarTitles(title?.english || "", searchResults.results)
        ),
        Promise.resolve(
          findSimilarTitles(title?.romaji || "", searchResults.results)
        ),
      ]);

      // Use Set for efficient deduplication
            const uniqueResults = Array.from(
          new Set([...mappedEng, ...mappedRom].map(item => JSON.stringify(item)))
      ).map(str => JSON.parse(str));

      // Sort by similarity score
      uniqueResults.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));

      // Single pass mapping
      const mappings: Mappings = {};
      for (const obj of uniqueResults) {
        const match = obj.title.replace(/\(TV\)/g, "").match(/\(([^)0-9]+)\)/);
        const key = match ? match[1].replace(/\s+/g, "-").toLowerCase() : "sub";

        if (!mappings[key]) {
          mappings[key] = obj.id;
        }

        // Early return if we have both sub and dub
        if (mappings.sub && mappings.dub) break;
      }

      return mappings;
    } catch (error) {
      console.error(
        "Error in getMapping:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return {};
    }
  }

  // private transformEpisodeId(episodeId: string): string {
  //   const regex = /^([^$]*)\$episode\$([^$]*)/;
  //   const match = episodeId.match(regex);
  //   return match && match[1] && match[2]
  //     ? `${match[1]}?ep=${match[2]}`
  //     : episodeId;
  // }
}
