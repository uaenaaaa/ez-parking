// src/routes/[lat]/[long]/+page.server.ts
import type { PageServerLoad } from './$types';
import { MAP_BOX_API_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {
    try {
        const response = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${params.long},${params.lat}?alternatives=false&geometries=geojson&overview=full&steps=true&access_token=${MAP_BOX_API_TOKEN}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch directions' + response.statusText);
        }

        const directionsData = await response.json();

        return {
            directions: directionsData,
            params: {
                lat: params.lat,
                long: params.long
            }
        };
    } catch {
        return {
            error: 'Failed to load directions',
            params: {
                lat: params.lat,
                long: params.long
            }
        };
    }
};
