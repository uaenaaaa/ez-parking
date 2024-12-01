<script lang="ts">
	import { page } from '$app/stores';
	import type { APISlotBaseResponse } from '$lib/models/slot/slot.js';
	import type { PageData } from '../$types.js';
	let { data }: { data: PageData } = $props();

	let slotInfo = data.get as unknown as {
		slot: {
			establishment_info: {
				address: string;
				closing_time: string;
				contact_number: string;
				created_at: string;
				establishment_id: number;
				hourly_rate: number;
				is_24_hours: boolean;
				latitude: number;
				longitude: number;
				name: string;
				opening_time: string;
				updated_at: string;
				uuid: string;
			};
			slot_info: {
				created_at: string;
				establishment_id: number;
				establishment_name: string;
				size_category: string;
				slot_code: string;
				slot_id: number;
				status: string;
				updated_at: string;
				vehicle_type_code: string;
				vehicle_type_description: string;
				vehicle_type_id: number;
				vehicle_type_name: string;
			};
		};
	};
	let loading = $state(false);
	let mapUrl = $state(
		`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${slotInfo.slot.establishment_info.latitude},${slotInfo.slot.establishment_info.longitude}+(${encodeURIComponent(slotInfo.slot.establishment_info.name)})&t=&z=14&ie=UTF8&iwloc=B&output=embed`
	);
</script>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto min-h-screen max-w-7xl">
		<div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
			<div class="mb-4 flex items-center justify-between">
				<h1 class="text-2xl font-bold text-gray-800">{slotInfo.slot.establishment_info.name}</h1>
				<span
					class="rounded-full px-3 py-1 text-sm font-medium
          {slotInfo.slot.slot_info.status === 'open'
						? 'bg-green-100 text-green-800'
						: slotInfo.slot.slot_info.status === 'reserved'
							? 'bg-yellow-100 text-yellow-800'
							: 'bg-red-100 text-red-800'}"
				>
					{slotInfo.slot.slot_info.status}
				</span>
			</div>
		</div>

		<div class="grid gap-6 lg:grid-cols-2">
			<div class="space-y-6">
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<div class="space-y-6">
						<div>
							<h2 class="text-sm font-medium text-gray-500">Slot Code</h2>
							<p class="text-lg font-semibold text-gray-900">{slotInfo.slot.slot_info.slot_code}</p>
						</div>
						<div>
							<h2 class="text-sm font-medium text-gray-500">Vehicle Type</h2>
							<p class="text-lg font-semibold text-gray-900">
								{slotInfo.slot.slot_info.vehicle_type_name}
							</p>
							<p class="text-sm text-gray-600">
								{slotInfo.slot.slot_info.vehicle_type_description}
							</p>
						</div>
						<div>
							<h2 class="text-sm font-medium text-gray-500">Size Category</h2>
							<p class="text-lg font-semibold text-gray-900">
								{slotInfo.slot.slot_info.size_category}
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-sm">
					<div class="space-y-4">
						<div>
							<h2 class="text-sm font-medium text-gray-500">Last Updated</h2>
							<p class="text-gray-600">
								{new Date(slotInfo.slot.slot_info.updated_at).toLocaleString()}
							</p>
						</div>
						<div>
							<h2 class="text-sm font-medium text-gray-500">Vehicle Code</h2>
							<p class="text-gray-600">{slotInfo.slot.slot_info.vehicle_type_code}</p>
						</div>
					</div>
				</div>

				{#if slotInfo.slot.slot_info.status === 'open'}
					<div class="rounded-lg bg-white p-6 shadow-sm">
						<a
							href="/auth/user/login?next={encodeURIComponent(
								`/user/book/${slotInfo.slot.establishment_info.uuid}/${slotInfo.slot.slot_info.slot_code}`
							)}"
							class="block w-full rounded-md bg-green-600 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
						>
							Book This Slot
						</a>
						<p class="mt-2 text-center text-sm text-gray-500">
							This slot is currently available for booking
						</p>
					</div>
				{/if}
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<div class="aspect-square h-full w-full overflow-hidden rounded-lg">
					<iframe
						frameborder="0"
						marginheight="0"
						marginwidth="0"
						title={slotInfo.slot.establishment_info.name}
						src={mapUrl}
						class="h-full w-full"
					></iframe>
				</div>
			</div>
		</div>

		<div class="mt-8 space-y-6">
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-lg font-semibold text-gray-800">Booking Requirements</h2>
				<div class="grid gap-4 md:grid-cols-2">
					<div class="rounded-lg bg-blue-50 p-4">
						<h3 class="mb-2 font-medium text-blue-800">Account Required</h3>
						<p class="text-sm text-blue-600">
							Sign in or create an account to book this parking slot. Valid email required for
							confirmation.
						</p>
					</div>
					<div class="rounded-lg bg-yellow-50 p-4">
						<h3 class="mb-2 font-medium text-yellow-800">Vehicle Requirements</h3>
						<p class="text-sm text-yellow-600">
							Vehicle must match the specified type and size category for this slot.
						</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-lg font-semibold text-gray-800">Important Information</h2>
				<div class="grid gap-6 md:grid-cols-3">
					<div>
						<h3 class="mb-2 text-sm font-medium text-gray-500">Arrival Time</h3>
						<p class="text-sm text-gray-600">
							Please arrive within 15 minutes of your booking time to secure your slot.
						</p>
					</div>
					<div>
						<h3 class="mb-2 text-sm font-medium text-gray-500">Payment</h3>
						<p class="text-sm text-gray-600">
							Payment is processed upon arrival at the parking facility.
						</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<div class="flex items-start space-x-3">
					<svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p class="text-sm text-gray-600">
						<span class="font-medium">Helpful Tip:</span> Save time by having your vehicle information
						ready during booking. Make sure to note your slot code for easy reference upon arrival.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
