import { AnimeTitle, EpisodeData, IAnimeInfo, Mappings, SearchResult } from "../utils/types";

export abstract class Provider {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    async search(query: string): Promise<SearchResult[]> {
        throw new Error('Method not implemented');
    }

    async fetchEpisodes(id: string): Promise<EpisodeData[]> {
        throw new Error('Method not implemented');
    }

    async getMapping(title: AnimeTitle): Promise<Mappings> {
        throw new Error('Method not implemented');
    }

}