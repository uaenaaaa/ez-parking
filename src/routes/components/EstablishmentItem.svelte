<script lang="ts">
	import type { EstablishmentInterface } from '$lib/models/establishment/establishment_query_search.js';
	import { goto } from '$app/navigation';

	const {
		establishment,
		userLong,
		userLat
	}: { establishment: EstablishmentInterface; userLong: number; userLat: number } = $props();

	function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
		const R = 6371;
		const dLat = toRad(lat2 - lat1);
		const dLon = toRad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	}

	function toRad(deg: number): number {
		return deg * (Math.PI / 180);
	}

	const distance = calculateDistance(
		userLat,
		userLong,
		establishment.latitude,
		establishment.longitude
	);
</script>

<div class="result-item">
	<div class="result">
		<h3>{establishment.name}</h3>
		<p>{establishment.address}</p>
		<p>
			{#if establishment.is_24_hours}
				Open 24 Hours
			{:else}
				{establishment.opening_time} - {establishment.closing_time}
			{/if}
		</p>
		<p class="distance">{distance.toFixed(1)} km away</p>
		<p>Rate: ₱{establishment.hourly_rate}/hour</p>
	</div>
	<div class="slot-info">
		<p class="status">
			Available: {establishment.slot_statistics.open_slots} /
			{establishment.slot_statistics.total_slots} slots
		</p>
		<button
			class="directions-button"
			onclick={() => {
				const url = `https://www.google.com/maps/dir/?api=1&destination=${establishment.latitude},${establishment.longitude}`;
				window.open(url, '_blank');
			}}
		>
			Get Directions
		</button>
		<button
			class="directions-button"
			onclick={() => {
				goto('/establishment/' + establishment.uuid + '/slots');
			}}>View</button
		>
	</div>
</div>

<style>
	.result-item {
		background-color: white;
		padding: 15px;
		margin-bottom: 10px;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.result-item h3 {
		font-size: 18px;
		margin: 0;
		color: #333;
	}

	.result-item p {
		margin: 5px 0;
		font-size: 14px;
		color: #666;
	}

	.result-item .distance {
		font-size: 12px;
		color: #444;
	}

	.result-item .status {
		color: green;
		font-weight: bold;
		font-size: 12px;
	}

	.directions-button {
		background-color: #8f86a8;
		color: white;
		border: none;
		padding: 8px 12px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 14px;
	}

	.result-item .distance {
		font-size: 12px;
		color: #444;
	}

	.result-item .slot-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}
</style>
