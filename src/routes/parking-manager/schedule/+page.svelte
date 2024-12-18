<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	let { data }: { data: PageData } = $props();
	let currentSetup = data.data as unknown as {
		is_24_hours: boolean;
		opening_time: string;
		closing_time: string;
	};
	let is24Hours = $state(currentSetup.is_24_hours);
	let openingTime = $state(currentSetup.opening_time);
	let closingTime = $state(currentSetup.closing_time);
	let isUpdating = $state(false);
	let showSuccess = $state(false);
</script>

<svelte:head>
	<title>Parking Establishment Schedule</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-2xl">
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<h1 class="text-2xl font-bold text-gray-900">Operating Hours</h1>

			<div class="mb-6 rounded-md bg-gray-50 p-4">
				<h2 class="text-sm font-medium text-gray-700">Current Schedule</h2>
				<p class="mt-1 text-sm text-gray-600">
					{#if currentSetup.is_24_hours}
						Operating 24/7
					{:else}
						Opens at {new Date(`2000-01-01T${currentSetup.opening_time}`).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})} - Closes at {new Date(`2000-01-01T${currentSetup.closing_time}`).toLocaleTimeString(
							[],
							{ hour: '2-digit', minute: '2-digit' }
						)}
					{/if}
				</p>
			</div>

			<p class="mt-1 text-sm text-gray-600">Update your establishment's operating hours</p>

			<form
				method="POST"
				class="mt-6"
				use:enhance={() => {
					isUpdating = true;
					return async ({ result }) => {
						isUpdating = false;
						if (result.type === 'success') {
							showSuccess = true;
							setTimeout(() => (showSuccess = false), 3000);
						}
					};
				}}
			>
				<div class="mb-6">
					<div class="flex items-center">
						<input
							type="checkbox"
							id="is24Hours"
							name="is-24-hours"
							bind:checked={is24Hours}
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<label for="is24Hours" class="ml-2 text-sm text-gray-900"> Open 24/7 </label>
					</div>
				</div>

				{#if !is24Hours}
					<div class="grid gap-6 md:grid-cols-2">
						<!-- Opening Time -->
						<div>
							<label for="openingTime" class="block text-sm font-medium text-gray-700">
								Opening Time
							</label>
							<input
								type="time"
								id="openingTime"
								name="opening-time"
								required={!is24Hours}
								disabled={is24Hours}
								bind:value={openingTime}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
							/>
						</div>

						<!-- Closing Time -->
						<div>
							<label for="closingTime" class="block text-sm font-medium text-gray-700">
								Closing Time
							</label>
							<input
								type="time"
								id="closingTime"
								name="closing-time"
								required={!is24Hours}
								disabled={is24Hours}
								bind:value={closingTime}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
							/>
						</div>
					</div>
				{/if}

				<!-- Submit Button -->
				<div class="mt-6">
					<button
						type="submit"
						disabled={isUpdating}
						class="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
					>
						{isUpdating ? 'Updating...' : 'Update Hours'}
					</button>
				</div>
			</form>

			{#if showSuccess}
				<div class="mt-4 rounded-md bg-green-50 p-4" transition:fade>
					<div class="flex">
						<div class="flex-shrink-0">
							<svg
								class="h-5 w-5 text-green-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<p class="text-sm font-medium text-green-800">Operating hours updated successfully</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
