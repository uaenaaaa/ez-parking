<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
	let bookingInfo = data as unknown as {
		code: string;
		transaction: {
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
				slot_info: {
					created_at: string;
					establishment_id: number;
					floor_level: number;
					is_active: boolean;
					is_premium: boolean;
					slot_code: string;
					slot_features: string;
					slot_id: number;
					slot_multiplier: string;
					slot_status: string;
					updated_at: string;
					vehicle_type_id: number;
				};
				vehicle_type_info: {
					base_rate_multiplier: number;
					code: string;
					created_at: string;
					description: string;
					is_active: boolean;
					name: string;
					size_category: string;
					updated_at: string;
					vehicle_id: number;
				};
			};
		};
	};
	console.log(bookingInfo);

	let duration = $state(1);
	let agreed = $state(false);

	let totalPrice = $derived(
		duration *
			bookingInfo.transaction.establishment_info.hourly_rate *
			bookingInfo.transaction.slot_info.vehicle_type_info.base_rate_multiplier
	);

</script>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-3xl">
		<div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
			<h1 class="text-2xl font-bold text-gray-800">Confirm Your Booking</h1>
			<p class="mt-2 text-gray-600">Please review your booking details below</p>
		</div>

		<div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
			<div class="grid gap-6 md:grid-cols-2">
				<div>
					<h2 class="text-lg font-semibold text-gray-800">Establishment Details</h2>
					<p class="mt-2 text-gray-600">{bookingInfo.transaction.establishment_info.name}</p>
					<p class="text-gray-600">{bookingInfo.transaction.establishment_info.address}</p>
					<p class="mt-2 text-sm text-gray-500">
						Base Rate: ₱{bookingInfo.transaction.establishment_info.hourly_rate}/hour
					</p>
				</div>
				<div>
					<h2 class="text-lg font-semibold text-gray-800">Slot Information</h2>
					<p class="mt-2 text-gray-600">
						Slot Code: {bookingInfo.transaction.slot_info.slot_info.slot_code}
					</p>
					<p class="text-gray-600">
						Floor Level: {bookingInfo.transaction.slot_info.slot_info.floor_level}
					</p>
					<p class="text-gray-600">
						Vehicle Type: {bookingInfo.transaction.slot_info.vehicle_type_info.name}
					</p>
				</div>
			</div>
		</div>

		<form method="POST" class="rounded-lg bg-white p-6 shadow-sm" use:enhance>
			<div class="space-y-6">
				<div>
					<label for="duration" class="block text-sm font-medium text-gray-700">
						Parking Duration (hours)
					</label>
					<input
						type="number"
						min="1"
						id="duration"
						max="24"
						bind:value={duration}
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					/>
				</div>

				<div class="rounded-lg bg-gray-50 p-4">
					<div class="flex justify-between">
						<span class="text-gray-600">Base Rate:</span>
						<span>₱{bookingInfo.transaction.establishment_info.hourly_rate}/hour</span>
					</div>
					<div class="flex justify-between">
						<span class="text-gray-600">Vehicle Type Multiplier:</span>
						<span>x{bookingInfo.transaction.slot_info.vehicle_type_info.base_rate_multiplier}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-gray-600">Duration:</span>
						<span>{duration} hours</span>
					</div>
					<div class="mt-2 border-t pt-2">
						<div class="flex justify-between font-semibold">
							<span>Total Amount:</span>
							<span>₱{totalPrice.toFixed(2)}</span>
						</div>
					</div>
				</div>

				<div class="flex items-start">
					<input
						id="agreed"
						type="checkbox"
						bind:checked={agreed}
						class="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
					<label for="agreed" class="ml-2 text-sm text-gray-600">
						I agree to the parking terms and conditions, including the cancellation policy.
					</label>
				</div>

				<button
					type="submit"
					disabled={!agreed}
					class="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
				>
					Confirm Booking
				</button>
			</div>
		</form>
	</div>
</div>
