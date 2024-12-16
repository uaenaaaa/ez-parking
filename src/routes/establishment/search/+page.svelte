<script lang="ts">
    import { enhance } from '$app/forms';
    import { debounce } from 'lodash-es';
    import type { ActionData } from './$types.js';
    import EstablishmentItem from './EstablishmentItem.svelte';
    import type { Establishment } from '$lib/models/establishment/establishment.js';

    let { form }: { form: ActionData } = $props();
    let searchTerm = $state('');
    let loading = $state(false);
    let error = $state('');
    let establishments = $state<Establishment[]>([]);
    let longitude: number = $state(14.5995);
    let latitude: number = $state(120.9842);

    async function getIPBasedLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                latitude: data.latitude,
                longitude: data.longitude
            };
        } catch (error) {
            // If all else fails, return the coordinates of Manila
            return {
                latitude: 14.5995,
                longitude: 120.9842
            };
        }
    }

    const debouncedSearch = debounce(async () => {
        if (searchTerm.length <= 1) return;
        loading = true;
        try {
            const formElement = document.querySelector('form');
            if (formElement) formElement.requestSubmit();
        } finally {
            loading = false;
        }
    }, 500);

    function handleEnhance() {
        return async ({ result }: { result: any }) => {
            if (result.type === 'success') {
                establishments = result.data.data.establishments || [];
            }
        };
    }
    $effect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const data = position.coords;
                    latitude = data.latitude;
                    longitude = data.longitude;
                },
                async (error) => {
                    getIPBasedLocation().then((data) => {
                        latitude = data.latitude;
                        longitude = data.longitude;
                    });
                },
                {
                    enableHighAccuracy: true
                }
            );
        } else {
            getIPBasedLocation().then((data) => {
                latitude = data.latitude;
                longitude = data.longitude;
            });
        }
    });
</script>

<svelte:head>
	<title>Search Establishments</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav
        class="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between bg-white px-6 shadow-sm"
    >
        <div class="flex items-center">
            <a href="/" class="flex items-center">
                <img src="../../logo.png" alt="EZ Parking" class="h-16 w-auto" />
            </a>
        </div>

        <form method="POST" use:enhance={handleEnhance} class="mx-auto flex w-full max-w-2xl">
            <div class="relative w-full">
                <input
                    type="text"
                    name="establishment_name"
                    placeholder="Search for parking establishments..."
                    bind:value={searchTerm}
                    oninput={debouncedSearch}
                    class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-12 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <input type="hidden" name="longitude" bind:value={longitude} />
                <input type="hidden" name="latitude" bind:value={latitude} />
                <button
                    type="submit"
                    class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    Search
                </button>
            </div>
        </form>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto max-w-7xl px-4 pb-8 pt-24">
        <div class="space-y-4">
            {#if searchTerm}
                <h2 class="text-xl font-semibold text-gray-900">Results for "{searchTerm}"</h2>
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
                    <p class="mt-4 text-lg text-gray-600">Search for parking establishments</p>
                </div>
            {/if}

            {#if loading}
                <div class="flex justify-center py-8">
                    <div
                        class="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"
                    ></div>
                </div>
            {:else if establishments.length === 0 && searchTerm}
                <div class="rounded-lg bg-gray-50 py-8 text-center">
                    <p class="text-gray-600">No establishments found</p>
                </div>
            {:else}
                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {#each establishments as establishment (establishment.establishment_id)}
                        <EstablishmentItem
                            {establishment}
                            userLat={latitude}
                            userLong={longitude}
                        />
                    {/each}
                </div>
            {/if}
        </div>
    </main>
</div>
