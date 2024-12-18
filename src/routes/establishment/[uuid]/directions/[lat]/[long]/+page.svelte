<script lang="ts">
	import type { PageData } from './$types';
	import mapboxgl from 'mapbox-gl';

	let { data }: { data: PageData } = $props();

	let map: mapboxgl.Map;
	let mapContainer: HTMLDivElement;

	export interface MapboxDirectionsResponse {
		routes: {
			weight_name: string;
			weight: number;
			duration: number;
			distance: number;
			legs: {
				via_waypoints: any[];
				annotation: {
					congestion: string[];
					distance: number[];
					duration: number[];
				};
				admins: {
					iso_3166_1_alpha3: string;
					iso_3166_1: string;
				}[];
				weight: number;
				duration: number;
				steps: {
					intersections: {
						entry: boolean[];
						bearings: number[];
						duration?: number;
						mapbox_streets_v8?: {
							class: string;
						};
						is_urban?: boolean;
						admin_index: number;
						out?: number;
						weight?: number;
						geometry_index: number;
						location: number[];
						in?: number;
						turn_weight?: number;
						turn_duration?: number;
						traffic_signal?: boolean;
					}[];
					maneuver: {
						type: string;
						instruction: string;
						bearing_after: number;
						bearing_before: number;
						location: number[];
						modifier?: string;
					};
					name: string;
					duration: number;
					distance: number;
					driving_side: string;
					weight: number;
					mode: string;
					geometry: {
						coordinates: number[][];
						type: string;
					};
					ref?: string;
				}[];
				distance: number;
				summary: string;
			}[];
			geometry: {
				coordinates: number[][];
				type: string;
			};
		}[];
		waypoints: {
			distance: number;
			name: string;
			location: number[];
		}[];
		code: string;
		uuid: string;
	}

	$effect(() => {
		if (data.error) {
			return;
		}

		const directionsData = data.directions as MapboxDirectionsResponse;
		const coordinates = directionsData.routes[0].geometry.coordinates;
		const [startLng, startLat] = directionsData.waypoints[0].location;
		const [endLng, endLat] = directionsData.waypoints[1].location;

		map = new mapboxgl.Map({
			container: mapContainer,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [startLng, startLat],
			zoom: 13
		});

		map.on('load', () => {
			map.addSource('route', {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'LineString',
						coordinates: coordinates
					}
				}
			});

			map.addLayer({
				id: 'route',
				type: 'line',
				source: 'route',
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					'line-color': '#3b82f6',
					'line-width': 5,
					'line-opacity': 0.75
				}
			});

			new mapboxgl.Marker().setLngLat([startLng, startLat]).addTo(map);

			new mapboxgl.Marker({ color: '#ef4444' }).setLngLat([endLng, endLat]).addTo(map);

			const bounds = new mapboxgl.LngLatBounds();
			coordinates.forEach((coord) => bounds.extend(coord));
			map.fitBounds(bounds, { padding: 50 });
		});

		return () => map.remove();
	});
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div class="relative w-full">
	<div bind:this={mapContainer} class="h-[400px] w-full rounded-lg shadow-sm"></div>

	{#if data.directions}
		<div class="mt-4 space-y-2">
			{#each data.directions.routes[0].legs[0].steps as step}
				<div class="rounded-md bg-white p-3 shadow-sm">
					<p class="text-sm text-gray-600">{step.maneuver.instruction}</p>
					<p class="text-xs text-gray-400">
						{(step.distance / 1000).toFixed(1)} km · {Math.round(step.duration / 60)} min
					</p>
				</div>
			{/each}
		</div>
	{/if}
</div>
