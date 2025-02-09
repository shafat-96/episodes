import { META } from "@consumet/extensions";
import { Provider } from "../base";
import { FetchEpisodesSources, Stream } from "../../utils/types";
import { allGetStream } from "../../extractors";

const allowedServers: string[] = [
  "hydrax",
  "fastx",
  "filmecho",
  "nova",
  "guru",
  "g1",
  "g2",
  "ee3",
  "ghost",
  "putafilme",
  "asiacloud",
  "kage",
  "multi",
  "stable",
];

export class TMDBProvider extends Provider {
  public streams: Stream[] = [];
  constructor() {
    super("tmdb");
  }
  client = new META.TMDB();

  async fetchEpisodesSources({
    tmdbId,
    episodeNumber,
    seasonNumber,
    type,
    server,
  }: FetchEpisodesSources): Promise<Stream[]> {
    const id = {
      tmdbId: tmdbId,
      season: seasonNumber,
      episode: episodeNumber,
    };
    const stream = await allGetStream(JSON.stringify(id), type);
    if (!server) {
      return stream;
    } else {
      return stream.filter((stream) =>
        stream.server.toLowerCase().includes(server.toLowerCase())
      );
    }
  }

  filterStreamsByName(name: string): Stream[] {
    const normalizedName = name.toLowerCase();

    // Only allow search if the term is one of the allowed servers.
    if (!allowedServers.includes(normalizedName)) {
      console.warn(`Search term "${name}" is not allowed.`);
      return [];
    }

    return this.streams.filter((stream) =>
      stream.server.toLowerCase().includes(normalizedName)
    );
  }

  getServerLinksMapping(): Record<string, string[]> {
    const mapping: Record<string, string[]> = {};

    this.streams.forEach((stream) => {
      // Normalize the server name (convert to lowercase)
      const serverKey = stream.server.toLowerCase();

      // Initialize the mapping for this server if it doesn't exist
      if (!mapping[serverKey]) {
        mapping[serverKey] = [];
      }

      // Add all video URLs from the stream's sources
      stream.sources.forEach((video) => {
        mapping[serverKey].push(video.url);
      });
    });

    return mapping;
  }

  /**
   * A getter for easy access to the server links mapping.
   */
  get serverLinksMap(): Record<string, string[]> {
    return this.getServerLinksMapping();
  }
}
