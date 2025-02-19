import { IAnimeEpisode, ITitle, TvType } from "@consumet/extensions";
import {
  FetchSourcesAndServers,
  Mappings,
  Server,
  Source,
} from "../utils/types";

export abstract class Provider {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  async fetchEpisodes(id: string,type?: string,
    provider?: string): Promise<IAnimeEpisode[]> {
    throw new Error("Method not implemented");
  }

  async getMapping(title: ITitle): Promise<Mappings> {
    throw new Error("Method not implemented");
  }

  async fetchEpisodeSources(episodeId: string, ...args: any): Promise<Source[]> {
    throw new Error("Method not implemented");
  }

  async fetchEpisodeServers(episodeId: string, ...args: any): Promise<any[]> {
    throw new Error("Method not implemented");
  }
}
