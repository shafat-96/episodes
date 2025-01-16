import { Provider } from './base';
import { GogoAnimeProvider } from './gogoanime';
import { ZoroProvider } from './zoro';

const providers: Record<string, Provider> = {
    gogoanime: new GogoAnimeProvider(),
    zoro: new ZoroProvider()
};

export function getProvider(name: string): Provider {
    return providers[name];
}

export function getAllProviders(): Provider[] {
    return Object.values(providers);
}
