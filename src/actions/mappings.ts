import { AnimeInfoAnilist } from '../lib/Anilistfunctions'
import { getProvider } from "../providers/index"
import { IAnimeInfo, Mappings, AnimeTitle } from '../utils/types'

interface MappingResponse {
    gogoanime: Mappings | null;
    zoro: Mappings | null;
    id: string;
    malId?: number | string;
    title?: string;
}

export async function getMappings(id: string, provider: string): Promise<MappingResponse | null> {
    try {
        const data = await getInfo(id);
        if (!data) {
            return null;
        }

        const gogores = await mapGogo(data.title as AnimeTitle, provider);
        const zorores = await mapZoro(data.title as AnimeTitle, provider);

        return {
            gogoanime: gogores,
            zoro: zorores,
            id: id,
            malId: data?.idMal,
            title: typeof data?.title === 'object' ? data.title.romaji : data?.title
        };
    } catch (error) {
        console.error("Error getting mappings:", error);
        return null;
    }
}

async function getInfo(id: string): Promise<IAnimeInfo | null> {
    try {
        const data = await AnimeInfoAnilist(id);
        return data ?? null;
    } catch (error) {
        console.error("Error getting anime info:", error);
        return null;
    }
}

async function mapGogo(title: AnimeTitle, provider: string): Promise<Mappings | null> {
    return await getProvider(provider).getMapping(title);
}

async function mapZoro(title: AnimeTitle, provider: string): Promise<Mappings | null> {
    return await getProvider(provider).getMapping(title);
}