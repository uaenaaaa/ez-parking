<script lang="ts">
	import type { ApiResponse } from '$lib/models/establishment/establishment.js';
	import type { PageData } from '../$types.js';
	let { data }: { data: PageData } = $props();

	let info = data as ApiResponse;
	let loading = $state(false);
</script>

<svelte:head>
	<title>Slots</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto mb-6 max-w-7xl rounded-lg bg-white p-6 shadow-sm">
		<h1 class="text-2xl font-bold text-gray-800">{info.get.establishment.name}</h1>
		<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div class="flex items-center space-x-2 text-gray-600">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				<span>{info.get.establishment.address}</span>
			</div>
			<div class="flex items-center space-x-2 text-gray-600">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span
					>{info.get.establishment.is_24_hours
						? '24/7'
						: `${info.get.establishment.opening_time} - ${info.get.establishment.closing_time}`}</span
				>
			</div>
			<div class="flex items-center space-x-2 text-gray-600">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
					/>
				</svg>
				<span>{info.get.establishment.contact_number}</span>
			</div>
			<div class="flex items-center space-x-2 text-gray-600">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>₱{info.get.establishment.hourly_rate}/hour</span>
			</div>
		</div>
	</div>

	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each info.get.establishment.slots as slot}
			<div
				class="rounded-lg border-l-4 bg-white p-4 shadow-sm transition-transform hover:scale-105
        {slot.slot_status === 'open'
					? 'border-green-500'
					: slot.slot_status === 'reserved'
						? 'border-yellow-500'
						: 'border-red-500'}"
			>
				<div class="mb-4 flex items-start justify-between">
					<h3 class="text-lg font-semibold">{slot.slot_code}</h3>
					<span
						class="rounded-full px-2 py-1 text-xs font-medium
            {slot.slot_status === 'open'
							? 'bg-green-100 text-green-800'
							: slot.slot_status === 'reserved'
								? 'bg-yellow-100 text-yellow-800'
								: 'bg-red-100 text-red-800'}"
					>
						{slot.slot_status}
					</span>
				</div>
				<div class="space-y-2">
					<p class="text-sm text-gray-600">Floor {slot.floor_level}</p>
					<p class="text-sm text-gray-600">{slot.vehicle_type.type_name}</p>
					<p class="text-sm text-gray-600">Size: {slot.vehicle_type.size_category}</p>
					{#if slot.slot_status === 'open'}
						<p class="font-medium text-green-600">
							₱{(slot.vehicle_type.base_rate * info.get.establishment.hourly_rate).toFixed(2)}/hr
						</p>
						<a
							href="/establishment/{info.get.establishment.uuid}/slot/{slot.slot_code}"
							class="mt-4 inline-flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
						>
							Reserve Slot
						</a>
					{/if}
					{#if slot.is_premium}
						<span class="inline-block rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">Premium</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
