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
					enableHighAccuracy: true,
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

<main>
	<div class="navbar">
		<div class="logo">
			<img src="../../logo.png" alt="NearbySpot Logo" />
		</div>
		<form method="POST" use:enhance={handleEnhance} class="search-bar">
			<input
				type="text"
				name="establishment_name"
				placeholder="Search for parking..."
				bind:value={searchTerm}
				oninput={debouncedSearch}
			/>
			<input type="hidden" name="longitude" bind:value={longitude} />
			<input type="hidden" name="latitude" bind:value={latitude} />
			<button type="submit">Search</button>
		</form>
	</div>

	<div class="container max-w-full">
		<div class="search-results">
			{#if searchTerm}
				<h2>Parking establishment results for "{searchTerm}"</h2>
			{:else}
				<svg
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					width="100"
					height="100"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<path
							d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
							stroke="#323232"
							stroke-width="2"
						></path>
						<path
							d="M14 14L16 16"
							stroke="#323232"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path
							d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z"
							stroke="#323232"
							stroke-width="2"
						></path>
					</g></svg
				>
				<p>Search for parking establishments</p>
			{/if}

			{#if loading}
				<p>Searching...</p>
			{:else if establishments.length === 0}
				<p>No establishments found</p>
			{:else}
				{#each establishments as establishment (establishment.establishment_id)}
					<EstablishmentItem {establishment} userLat={latitude} userLong={longitude} />
				{/each}
			{/if}
		</div>

		<div class="map-container">
			<iframe
				title="Map"
				class="map"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.407731415259!2d121.04902791517263!3d14.552600989827994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90e30d1c44f%3A0xa217dcff8561d073!2sOne%20Parkade!5e0!3m2!1sen!2sph!4v1614076328908!5m2!1sen!2sph"
				allowfullscreen
				loading="lazy"
			></iframe>
		</div>
	</div>
</main>

<style>
	main {
		margin: 0;
		font-family: Arial, sans-serif;
		color: #000;
		background-color: #767184;
		width: 100%;
	}

	.navbar {
		position: fixed;
		top: 0;
		width: 100%;
		height: 80px;
		background: rgba(217, 217, 217, 0.9);
		display: flex;
		align-items: center;
		padding: 0 20px;
		z-index: 100;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.navbar .logo {
		display: flex;
		align-items: center;
		margin-right: 20px;
	}

	.navbar .logo img {
		height: 110px;
	}

	.search-results {
		width: 35%;
		background-color: #d9d9d9;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15px;
		box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
	}

	.search-results h2 {
		font-size: 22px;
		margin-bottom: 15px;
		color: #333;
	}

	/* Search Bar */
	.navbar .search-bar {
		flex-grow: 1;
		max-width: 700px;
		position: relative;
	}

	.navbar .search-bar input[type='text'] {
		width: 100%;
		padding: 12px 18px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.container {
		display: flex;
		height: calc(100vh - 100px);
		margin-top: 80px;
		width: 100%;
	}

	.map-container {
		flex-grow: 1;
		position: relative;
	}

	.map {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
