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
			Available: {establishment.slot_statistics!.open_slots} /
			{establishment.slot_statistics!.total_slots} slots
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
				goto('/establishment/' + establishment.uuid + '/slot');
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
		width: 100%;
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
