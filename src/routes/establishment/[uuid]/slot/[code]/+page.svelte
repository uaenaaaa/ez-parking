<script lang="ts">
	import type { APISlotBaseResponse } from '$lib/models/slot/slot.js';
	import type { PageData } from '../$types.js';
	let { data }: { data: PageData } = $props();

	let slotInfo = data as unknown as APISlotBaseResponse;
	let loading = $state(false);
</script>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-3xl">
		<!-- Slot Header Card -->
		<div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
			<div class="mb-4 flex items-center justify-between">
				<h1 class="text-2xl font-bold text-gray-800">{slotInfo.get.slot.establishment_name}</h1>
				<span
					class="rounded-full px-3 py-1 text-sm font-medium
          {slotInfo.get.slot.status === 'open'
						? 'bg-green-100 text-green-800'
						: slotInfo.get.slot.status === 'reserved'
							? 'bg-yellow-100 text-yellow-800'
							: 'bg-red-100 text-red-800'}"
				>
					{slotInfo.get.slot.status}
				</span>
			</div>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-sm">
			<div class="grid gap-6 md:grid-cols-2">
				<!-- Left Column -->
				<div class="space-y-4">
					<div>
						<h2 class="text-sm font-medium text-gray-500">Slot Code</h2>
						<p class="text-lg font-semibold text-gray-900">{slotInfo.get.slot.slot_code}</p>
					</div>
					<div>
						<h2 class="text-sm font-medium text-gray-500">Vehicle Type</h2>
						<p class="text-lg font-semibold text-gray-900">{slotInfo.get.slot.vehicle_type_name}</p>
						<p class="text-sm text-gray-600">{slotInfo.get.slot.vehicle_type_description}</p>
					</div>
					<div>
						<h2 class="text-sm font-medium text-gray-500">Size Category</h2>
						<p class="text-lg font-semibold text-gray-900">{slotInfo.get.slot.size_category}</p>
					</div>
				</div>

				<div class="space-y-4">
					<div>
						<h2 class="text-sm font-medium text-gray-500">Last Updated</h2>
						<p class="text-gray-600">
							{new Date(slotInfo.get.slot.updated_at).toLocaleString()}
						</p>
					</div>
					<div>
						<h2 class="text-sm font-medium text-gray-500">Vehicle Code</h2>
						<p class="text-gray-600">{slotInfo.get.slot.vehicle_type_code}</p>
					</div>
				</div>
			</div>

			{#if slotInfo.get.slot.status === 'open'}
				<div class="mt-8 border-t pt-6">
					<button
						class="w-full rounded-md bg-green-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						Book This Slot
					</button>
					<p class="mt-2 text-center text-sm text-gray-500">
						This slot is currently available for booking
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
