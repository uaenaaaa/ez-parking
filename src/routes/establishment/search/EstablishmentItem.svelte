<script lang="ts">
    import type { Establishment } from '$lib/models/establishment/establishment.js';
    import { goto } from '$app/navigation';
    import calculateDistance from '$lib/utils/function/calculate-distance';

    const {
        establishment,
        userLong,
        userLat
    }: { establishment: Establishment; userLong: number; userLat: number } = $props();

    const distance = calculateDistance(
        userLat,
        userLong,
        establishment.latitude,
        establishment.longitude
    );
</script>

<div class="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
    <div class="p-6">
        <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{establishment.name}</h3>
            <p class="mt-1 text-sm text-gray-600">{establishment.address}</p>
        </div>

        <div class="mb-4 space-y-2">
            <div class="flex items-center text-sm text-gray-600">
                <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                {#if establishment.is_24_hours}
                    <span>Open 24 Hours</span>
                {:else}
                    <span>{establishment.opening_time} - {establishment.closing_time}</span>
                {/if}
            </div>

            <div class="flex items-center text-sm text-gray-600">
                <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                </svg>
                <span>{distance.toFixed(1)} km away</span>
            </div>

            <div class="flex items-center text-sm text-gray-600">
                <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>₱{establishment.hourly_rate}/hour</span>
            </div>
        </div>

        <div class="flex items-center justify-between border-t pt-4">
            <div class="text-sm">
                <span class="font-medium text-green-600">
                    {establishment.slot_statistics!.open_slots}
                </span>
                <span class="text-gray-600">
                    /{establishment.slot_statistics!.total_slots} slots available
                </span>
            </div>

            <div class="flex space-x-2">
                <button
                    class="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    onclick={() => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${establishment.latitude},${establishment.longitude}`;
                        window.open(url, '_blank');
                    }}
                >
                    Directions
                </button>
                <button
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    onclick={() => {
                        goto('/establishment/' + establishment.uuid + '/slot');
                    }}
                >
                    View Details
                </button>
            </div>
        </div>
    </div>
</div>
