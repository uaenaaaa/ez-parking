<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	interface Response {
		vehicleTypes: {
			code: string;
			message: string;
			vehicle_types: {
				base_rate_multiplier: string;
				code: string;
				created_at: string;
				description: string;
				is_active: boolean;
				name: string;
				size_category: 'LARGE' | 'MEDIUM' | 'SMALL';
				updated_at: string;
				vehicle_id: number;
			}[];
		};
	}
	const vehicleTypes: Response = data;

	const types = vehicleTypes.vehicleTypes.vehicle_types;
	console.log(vehicleTypes);

	const slotFeatures = ['standard', 'covered', 'vip', 'disabled', 'ev_charging'] as const;
	const slotStatus = ['open', 'reserved', 'occupied'] as const;
</script>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-2xl">
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<h2 class="mb-6 text-2xl font-bold text-gray-800">Add New Parking Slot</h2>

			<form class="space-y-6">
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<label class="block text-sm font-medium text-gray-700" for="slot_code">
							Slot Code <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="slot_code"
							name="slot_code"
							required
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
							placeholder="SLOT-001"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700" for="floor_level">
							Floor Level <span class="text-red-500">*</span>
						</label>
						<input
							type="number"
							id="floor_level"
							name="floor_level"
							required
							min="1"
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						/>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<label class="block text-sm font-medium text-gray-700" for="vehicle_type_id">
							Vehicle Type <span class="text-red-500">*</span>
						</label>
						<select
							name="vehicle_type_id"
							id="vehicle_type_id"
							required
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						>
							<option value="">Select vehicle type...</option>
							{#each types as type}
								<option value={type.vehicle_id}>{type.name}</option>
							{/each}
						</select>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700" for="slot_status">
							Status
						</label>
						<select
							name="slot_status"
							id="slot_status"
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						>
							{#each slotStatus as status}
								<option value={status}>{status}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<label class="block text-sm font-medium text-gray-700" for="slot_features">
							Features
						</label>
						<select
							name="slot_features"
							id="slot_features"
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						>
							{#each slotFeatures as feature}
								<option value={feature}>{feature}</option>
							{/each}
						</select>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700" for="slot_multiplier">
							Rate Multiplier
						</label>
						<input
							type="number"
							name="slot_multiplier"
							id="slot_multiplier"
							step="0.01"
							min="1.00"
							max="9.99"
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
							placeholder="1.00"
						/>
					</div>
				</div>

				<div class="space-y-4">
					<div class="flex items-center">
						<input
							type="checkbox"
							name="is_premium"
							id="is_premium"
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<label for="is_premium" class="ml-2 text-sm text-gray-700">Premium Slot</label>
					</div>

					<div class="flex items-center">
						<input
							type="checkbox"
							name="is_active"
							id="is_active"
							checked
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<label for="is_active" class="ml-2 text-sm text-gray-700">Active</label>
					</div>
				</div>

				<div class="flex justify-end space-x-4">
					<button
						type="button"
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Add Slot
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
