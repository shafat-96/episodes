export interface ITitle {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
  }

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
  
  export interface IAnimeInfo extends IAnimeResult {
    malId?: number | string;
    genres?: string[];
    description?: string;
    totalEpisodes?: number;
    hasSub?: boolean;
    hasDub?: boolean;
    synonyms?: string[];
    countryOfOrigin?: string;
    isAdult?: boolean;
    isLicensed?: boolean;
    season?: string;
    studios?: string[];
    color?: string;
    cover?: string;
    episodes?: EpisodeData[];
    recommendations?: IAnimeResult[];
    relations?: IAnimeResult[];
  }

export interface IAnimeResult {
    id: string;
    title: string | ITitle;
    url?: string;
    image?: string;
    imageHash?: string;
    cover?: string;
    coverHash?: string;
    rating?: number;
    releaseDate?: string;
    [x: string]: any; // other fields
  }
  
export interface AnimeMapping {
    id: string;
    title: string;
}

export interface AnimeTitle {
    english?: string;
    romaji?: string;
    userPreferred?: string;
}

export interface SearchResult {
    id: string;
    title: string;
    [key: string]: any;
}

export interface SearchResponse {
    results?: SearchResult[];
    [key: string]: any;
}

export interface Mappings {
    sub?: string;
    dub?: string;
    uncensored?: string;
    [key: string]: string | undefined;
}