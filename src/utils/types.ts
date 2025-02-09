import { ISubtitle, IVideo } from "@consumet/extensions";

export interface EpisodeTitle {
  "x-jat"?: string;
  en?: string;
  ja?: string;
  [key: string]: string | undefined;
}

// Image export Interface
export interface SeriesImage {
  coverType: string;
  url: string;
}

// Mappings export Interface
export interface EpisodeMappings {
  animeplanet_id: string;
  kitsu_id: number;
  mal_id: number;
  type: string;
  anilist_id: number;
  anisearch_id: number;
  anidb_id: number;
  notifymoe_id: string;
  livechart_id: number;
  thetvdb_id: number;
  imdb_id: string;
  themoviedb_id: string;
}

// Episode export Interface
export interface Episode {
  title: EpisodeTitle;
  tvdbShowId?: number;
  tvdbId?: number;
  seasonNumber?: number;
  episodeNumber?: number;
  absoluteEpisodeNumber?: number;
  airDate?: string;
  airDateUtc?: string;
  runtime?: number;
  overview?: string;
  image?: string;
  episode: string;
  anidbEid?: number;
  length?: number;
  airdate?: string;
  rating?: string;
  summary?: string;
  finaleType?: string;
}

export interface EpisodeData {
  number: number;
  episodes: {
    [key: string]: Episode;
  };
  episodeCount: number;
  specialCount: number;
  images: SeriesImage[];
  mappings: EpisodeMappings;
}

export interface Mappings {
  sub?: string;
  dub?: string;
  uncensored?: string;
  [key: string]: string | undefined;
}

export interface Stream {
  server: string;
  sources: IVideo[];
  subtitles?: ISubtitle[];
}

export interface FetchEpisodesSources {
  tmdbId: number;
  episodeNumber: number;
  seasonNumber: number;
  type: string;
  server?: string;
}
