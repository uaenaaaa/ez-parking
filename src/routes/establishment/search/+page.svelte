<script lang="ts">
    import { enhance } from '$app/forms';
    import EstablishmentItem from './EstablishmentItem.svelte';
    import type { EstablishmentQuery } from '$lib/models/response-models/establishment-query';

    let searchTerm = $state('');
    let loading = $state(false);
    let establishments = $state<EstablishmentQuery[]>([]);
    let user_longitude: number = $state(14.5995);
    let user_latitude: number = $state(120.9842);
    let isLoading = $state(false);

    async function getIPBasedLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                latitude: data.latitude,
                longitude: data.longitude
            };
        } catch (error) {
            return {
                latitude: 14.5995,
                longitude: 120.9842
            };
        }
    }

    $effect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const data = position.coords;
                    user_latitude = data.latitude;
                    user_longitude = data.longitude;
                },
                async (error) => {
                    getIPBasedLocation().then((data) => {
                        user_latitude = data.latitude;
                        user_longitude = data.longitude;
                    });
                },
                {
                    enableHighAccuracy: true
                }
            );
        } else {
            getIPBasedLocation().then((data) => {
                user_latitude = data.latitude;
                user_longitude = data.longitude;
            });
        }
    });
</script>

<svelte:head>
    <title>Search Establishments</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <nav
        class="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between bg-white px-6 shadow-sm"
    >
        <div class="flex items-center">
            <a href="/" class="flex items-center">
                <img
                    src="../../logo.png"
                    alt="EZ Parking"
                    class="h-16 w-auto"
                />
            </a>
        </div>

        <form
            method="POST"
            class="mx-auto flex w-full max-w-2xl"
            use:enhance={() => {
                isLoading = true;
                return (result) => {
                    searchTerm = result.formData.get('establishment_name') as string;
                    isLoading = false;
                    console.log(result.result.data);
                    if (result.result) {
                        establishments = result.result?.data.data;
                    }
                };
            }}
        >
            <div class="flex w-full items-center space-x-4">
                <input
                    type="text"
                    name="establishment_name"
                    placeholder="Search for parking establishments..."
                    class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-12 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <input
                    type="hidden"
                    name="user_longitude"
                    bind:value={user_longitude}
                />
                <input
                    type="hidden"
                    name="user_latitude"
                    bind:value={user_latitude}
                />
                <button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    {#if isLoading}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <g stroke="currentColor">
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9.5"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-width="3"
                                >
                                    <animate
                                        attributeName="stroke-dasharray"
                                        calcMode="spline"
                                        dur="1.5s"
                                        keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                        keyTimes="0;0.475;0.95;1"
                                        repeatCount="indefinite"
                                        values="0 150;42 150;42 150;42 150"
                                    />
                                    <animate
                                        attributeName="stroke-dashoffset"
                                        calcMode="spline"
                                        dur="1.5s"
                                        keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                        keyTimes="0;0.475;0.95;1"
                                        repeatCount="indefinite"
                                        values="0;-16;-59;-59"
                                    />
                                </circle>
                                <animateTransform
                                    attributeName="transform"
                                    dur="2s"
                                    repeatCount="indefinite"
                                    type="rotate"
                                    values="0 12 12;360 12 12"
                                />
                            </g>
                        </svg>
                    {:else}
                        Search
                    {/if}
                </button>
            </div>
        </form>
    </nav>

    <main class="container mx-auto max-w-7xl px-4 pb-8 pt-24">
        <div class="space-y-4">
            {#if searchTerm}
                <h2 class="text-xl font-semibold text-gray-900">
                    Results for "{searchTerm}"
                </h2>
            {:else}
                <div class="flex flex-col items-center justify-center py-12">
                    <svg
                        class="h-16 w-16 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <p class="mt-4 text-lg text-gray-600">
                        Search for parking establishments
                    </p>
                </div>
            {/if}

            {#if loading}
                <div class="flex justify-center py-8">
                    <div
                        class="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"
                    ></div>
                </div>
            {:else if establishments.length === 0 && searchTerm}
                <div class="py-8 rounded-lg bg-gray-50 flex flex-col justify-center items-center gap-4 text-center">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                        >
                            <g
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                            >
                                <path
                                    stroke-dasharray="64"
                                    stroke-dashoffset="64"
                                    d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="stroke-dashoffset"
                                        dur="0.6s"
                                        values="64;0"
                                    />
                                </path>
                                <path
                                    stroke-dasharray="8"
                                    stroke-dashoffset="8"
                                    d="M12 12h-5.5"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="stroke-dashoffset"
                                        begin="1.3s"
                                        dur="0.2s"
                                        values="8;0"
                                    />
                                    <animateTransform
                                        fill="freeze"
                                        attributeName="transform"
                                        begin="1.3s"
                                        dur="0.2s"
                                        type="rotate"
                                        values="0 12 12;15 12 12"
                                    />
                                </path>
                            </g>
                            <g fill="currentColor">
                                <path
                                    fill-opacity="0"
                                    d="M12 21C9.41 21 7.15 20.79 5.94 19L12 21L18.06 19C16.85 20.79 14.59 21 12 21Z"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="d"
                                        begin="0.6s"
                                        dur="0.4s"
                                        values="M12 21C9.41 21 7.15 20.79 5.94 19L12 21L18.06 19C16.85 20.79 14.59 21 12 21Z;M12 16C9.41 16 7.15 17.21 5.94 19L12 21L18.06 19C16.85 17.21 14.59 16 12 16Z"
                                    />
                                    <set
                                        fill="freeze"
                                        attributeName="fill-opacity"
                                        begin="0.6s"
                                        to="1"
                                    />
                                </path>
                                <circle
                                    cx="7"
                                    cy="12"
                                    r="0"
                                    transform="rotate(15 12 12)"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="r"
                                        begin="0.9s"
                                        dur="0.2s"
                                        values="0;1"
                                    />
                                </circle>
                                <circle
                                    cx="7"
                                    cy="12"
                                    r="0"
                                    transform="rotate(65 12 12)"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="r"
                                        begin="0.95s"
                                        dur="0.2s"
                                        values="0;1"
                                    />
                                </circle>
                                <circle
                                    cx="7"
                                    cy="12"
                                    r="0"
                                    transform="rotate(115 12 12)"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="r"
                                        begin="1s"
                                        dur="0.2s"
                                        values="0;1"
                                    />
                                </circle>
                                <circle
                                    cx="7"
                                    cy="12"
                                    r="0"
                                    transform="rotate(165 12 12)"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="r"
                                        begin="1.05s"
                                        dur="0.2s"
                                        values="0;1"
                                    />
                                </circle>
                                <circle cx="12" cy="12" r="0">
                                    <animate
                                        fill="freeze"
                                        attributeName="r"
                                        begin="1.3s"
                                        dur="0.2s"
                                        values="0;2"
                                    />
                                </circle>
                            </g>
                        </svg>
                    <p class="text-gray-600">No establishments found</p>
                </div>
            {:else}
                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {#each establishments as establishment (establishment.establishment_id)}
                            <EstablishmentItem
                                {establishment}
                                userLat={user_latitude}
                                userLong={user_longitude}
                            />
                        {/each}
                </div>
            {/if}
        </div>
    </main>
</div>
