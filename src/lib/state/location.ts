import { writable } from 'svelte/store';

export const locationBasedOnGeo = writable({ longitude: 0, latitude: 0 });
export const locationBasedOnIp = writable({ longitude: 0, latitude: 0 });
