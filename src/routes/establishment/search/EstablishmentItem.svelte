<script lang="ts">
    import type { EstablishmentQuery } from '$lib/models/response-models/establishment-query';
    import calculateDistance from '$lib/utils/function/calculate-distance';

    const {
        establishment,
        userLong,
        userLat
    }: {
        establishment: EstablishmentQuery;
        userLong: number;
        userLat: number;
    } = $props();

    const distance = calculateDistance(
        userLat,
        userLong,
        establishment.latitude,
        establishment.longitude
    );
</script>

<div
    class="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
>
    <div class="p-6">
        <div class="mb-4 flex items-start justify-between">
            <div>
                <h3 class="text-lg font-semibold text-gray-900">
                    {establishment.name}
                </h3>
                <p class="mt-1 text-sm text-gray-600">
                    {establishment.nearby_landmarks}
                </p>
            </div>
            {#if establishment.verified}
                <span
                    class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                >
                    Verified
                </span>
            {/if}
        </div>

        <div class="mb-4 grid grid-cols-2 gap-4">
            <div class="space-y-2">
                <div class="flex items-center text-sm text-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 5h11m-2 2l2-2l-2-2M5 3L3 5l2 2m14 3v11m-2-2l2 2l2-2m0-7l-2-2l-2 2M3 12a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                        />
                    </svg>
                    {establishment.dimensions}
                </div>
                <div class="flex items-center text-sm text-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M8 3a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 9a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3zm10-9a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"
                        />
                    </svg>
                    <span class="capitalize"
                        >{establishment.space_type} - {establishment.space_layout}</span
                    >
                </div>
            </div>

            <div class="space-y-2">
                <div class="flex items-center text-sm text-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M19.836 10.486a.9.9 0 0 1-.21.47l-9.75 10.71a.94.94 0 0 1-.49.33q-.125.015-.25 0a1 1 0 0 1-.41-.09a.92.92 0 0 1-.45-.46a.9.9 0 0 1-.07-.58l.86-6.86h-3.63a1.7 1.7 0 0 1-.6-.15a1.29 1.29 0 0 1-.68-.99a1.3 1.3 0 0 1 .09-.62l3.78-9.45c.1-.239.266-.444.48-.59a1.3 1.3 0 0 1 .72-.21h7.24c.209.004.414.055.6.15c.188.105.349.253.47.43c.112.179.18.38.2.59a1.2 1.2 0 0 1-.1.61l-2.39 5.57h3.65a1 1 0 0 1 .51.16a1 1 0 0 1 .43 1z"
                        />
                    </svg>
                    <span>{establishment.lighting}</span>
                </div>
                <div class="flex items-center text-sm text-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <g fill="none">
                            <path
                                d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.4 20.4 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.87 1.87 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.6 20.6 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                            />
                        </g>
                    </svg>
                    <span>{distance.toFixed(1)} km away</span>
                </div>
            </div>
        </div>

        {#if establishment.facilities}
            <div class="mb-4">
                <div class="flex flex-wrap gap-2">
                    {#each establishment.facilities.split(',') as facility}
                        <span
                            class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                        >
                            {facility.trim()}
                        </span>
                    {/each}
                </div>
            </div>
        {/if}

        <div class="flex items-center justify-between border-t pt-4">
            <div class="text-sm">
                <span class="font-medium text-green-600">
                    {establishment.open_slots}
                </span>
                <span class="text-gray-600">
                    /{establishment.total_slots} slots available
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
                <a
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    href={'/establishment/' + establishment.uuid}
                >
                    View Details
                </a>
            </div>
        </div>
    </div>
</div>
