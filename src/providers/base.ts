import { ITitle } from "@consumet/extensions";
import {
  EpisodeData,
  FetchEpisodesSources,
  Mappings,
  Stream,
} from "../utils/types";

export abstract class Provider {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  async fetchEpisodes(id: string): Promise<EpisodeData[]> {
    throw new Error("Method not implemented");
  }

  async getMapping(title: ITitle): Promise<Mappings> {
    throw new Error("Method not implemented");
  }

  async fetchEpisodesSources({
    tmdbId,
    episodeNumber,
    seasonNumber,
    type,
    server,
  }: FetchEpisodesSources): Promise<Stream[]> {
    throw new Error("Method not implemented");
  }
}
