<script lang="ts">
	import type { PageData } from './$types';
	import { NavigationEstablishmentCoords } from '$lib/state/navigation_establishment_coords';

	let { data }: { data: PageData } = $props();
	let isModalOpen = $state(false);

	let transactionData = data.transaction as {
		transaction_data: {
			amount_due: string;
			created_at: string;
			entry_time: string;
			exit_time: string;
			payment_status: string;
			plate_number: string;
			slot_details: {
				floor_level: number;
				is_premium: string;
				slot_code: string;
				slot_features: string;
				slot_multiplier: number;
				slot_status: string;
			};
			slot_id: number;
			status: 'Reserved' | 'Active' | 'Completed' | 'Cancelled';
			transaction_id: number;
			updated_at: string;
			uuid: string;
			vehicle_details: {
				base_rate_multiplier: number;
				size_category: string;
				type_name: string;
			};
			establishment_info: {
				address: string;
				latitude: number;
				longitude: number;
				name: string;
				contact_number: string;
			};
			vehicle_type_id: number;
		};
		qr_code?: string;
	};
	let mapUrl = $state(
		`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${transactionData.transaction_data.establishment_info.latitude},${transactionData.transaction_data.establishment_info.longitude}+(${encodeURIComponent(transactionData.transaction_data.establishment_info.name)})&t=&z=14&ie=UTF8&iwloc=B&output=embed`
	);

	if (transactionData.transaction_data.status === 'Reserved') {
		NavigationEstablishmentCoords.set({
			latitude: transactionData.transaction_data.establishment_info.latitude,
			longitude: transactionData.transaction_data.establishment_info.longitude
		});
	}

	$effect(() => {
		return () => {
			NavigationEstablishmentCoords.set({
				latitude: 0,
				longitude: 0
			});
		};
	});
</script>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-screen-2xl">
		<div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-2xl font-semibold text-gray-900">Transaction Details</h1>
					<p class="mt-1 text-sm text-gray-500">
						Transaction #{transactionData.transaction_data.transaction_id}
					</p>
				</div>
				<div class="flex items-center space-x-2">
					<span
						class="inline-flex rounded-full px-3 py-1 text-xs font-medium
            {transactionData.transaction_data.payment_status === 'PAID'
							? 'bg-green-100 text-green-800'
							: transactionData.transaction_data.payment_status === 'PARTIALLY_PAID'
								? 'bg-yellow-100 text-yellow-800'
								: transactionData.transaction_data.payment_status === 'OVERDUE'
									? 'bg-red-100 text-red-800'
									: 'bg-gray-100 text-gray-800'}"
					>
						{transactionData.transaction_data.payment_status}
					</span>

					<span
						class="inline-flex rounded-full px-3 py-1 text-xs font-medium
            {transactionData.transaction_data.status === 'Active'
							? 'bg-blue-100 text-blue-800'
							: transactionData.transaction_data.status === 'Completed'
								? 'bg-green-100 text-green-800'
								: transactionData.transaction_data.status === 'Cancelled'
									? 'bg-red-100 text-red-800'
									: 'bg-yellow-100 text-yellow-800'}"
					>
						{transactionData.transaction_data.status}
					</span>
				</div>
			</div>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<div class="md:col-span-2">
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h2 class="text-lg font-medium text-gray-900">Vehicle Details</h2>
					<dl class="mt-4 space-y-3">
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Plate Number</dt>
							<dd class="text-sm font-medium text-gray-900">
								{transactionData.transaction_data.plate_number}
							</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Vehicle Type</dt>
							<dd class="text-sm font-medium text-gray-900">
								{transactionData.transaction_data.vehicle_details.type_name}
							</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Size Category</dt>
							<dd class="text-sm font-medium text-gray-900">
								{transactionData.transaction_data.vehicle_details.size_category}
							</dd>
						</div>
					</dl>
				</div>
			</div>

			<div class="md:col-span-2">
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h2 class="text-lg font-medium text-gray-900">Establishment Details</h2>
					<dl class="mt-4 space-y-3">
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Name</dt>
							<dd class="text-sm font-medium text-gray-900">
								{transactionData.transaction_data.establishment_info.name}
							</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Address</dt>
							<dd class="text-sm font-medium text-gray-900">
								{transactionData.transaction_data.establishment_info.address}
							</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Contact Number</dt>
							<dd class="text-sm font-medium text-gray-900">
								{transactionData.transaction_data.establishment_info.contact_number}
							</dd>
						</div>
					</dl>
				</div>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="text-lg font-medium text-gray-900">Timing Details</h2>
				<dl class="mt-4 space-y-3">
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Entry Time</dt>
						<dd class="text-sm font-medium text-gray-900">
							{#if transactionData.transaction_data.entry_time != 'Not Available'}
								{new Date(transactionData.transaction_data.entry_time).toLocaleString()}
							{:else}
								Not Available
							{/if}
						</dd>
					</div>
					{#if transactionData.transaction_data.exit_time}
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Exit Time</dt>
							<dd class="text-sm font-medium text-gray-900">
								{#if transactionData.transaction_data.exit_time != 'Not Available'}
									{new Date(transactionData.transaction_data.exit_time).toLocaleString()}
								{:else}
									Not Available
								{/if}
							</dd>
						</div>
					{/if}
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Amount Due</dt>
						<dd class="text-sm font-medium text-gray-900">
							₱{transactionData.transaction_data.amount_due ?? '0.00'}
						</dd>
					</div>
				</dl>
			</div>

			<div class="space-y-6">
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h2 class="text-lg font-medium text-gray-900">Slot Details</h2>
					<dl class="mt-4 space-y-3">
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Slot Code</dt>
							<dd class="text-sm font-medium text-gray-900">
								{transactionData.transaction_data.slot_details.slot_code}
							</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Floor Level</dt>
							<dd class="text-sm font-medium text-gray-900">
								Level {transactionData.transaction_data.slot_details.floor_level}
							</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Features</dt>
							<dd class="text-sm font-medium text-gray-900">
								{transactionData.transaction_data.slot_details.slot_features}
								{#if transactionData.transaction_data.slot_details.is_premium === 'Yes'}
									<span
										class="ml-1 inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800"
									>
										Premium
									</span>
								{/if}
							</dd>
						</div>
					</dl>
				</div>
			</div>
			{#if transactionData.qr_code && ['active', 'reserved'].includes(transactionData.transaction_data.status)}
				<div class="rounded-lg bg-white p-6 shadow-sm md:col-span-2">
					<h2 class="text-lg font-medium text-gray-900">Scan QR Code</h2>
					<div class="mt-4 flex flex-col items-center">
						<img
							src={`data:image/png;base64,${transactionData.qr_code}`}
							alt="Transaction QR Code"
							class="w-1/3"
						/>
						<button
							class="w-fit rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
							onclick={() => (isModalOpen = true)}
						>
							View Larger
						</button>
						<p class="mt-2 text-sm text-gray-500">Show this QR code to the parking attendant</p>
					</div>
				</div>
			{/if}

			<div class="rounded-lg bg-white p-6 shadow-sm md:col-span-2">
				<h2 class="text-lg font-medium text-gray-900">
					{transactionData.transaction_data.establishment_info.name} Location
				</h2>
				<div class="aspect-square h-96 w-full overflow-hidden rounded-lg">
					<iframe
						frameborder="0"
						marginheight="0"
						marginwidth="0"
						title={transactionData.transaction_data.establishment_info.name}
						src={mapUrl}
						class="h-96 w-full"
					></iframe>
				</div>
			</div>
		</div>
	</div>

	{#if isModalOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg"
			onclick={() => (isModalOpen = false)}
			aria-roledescription="modal"
		>
			<div
				class="relative max-h-[90vh] max-w-[90vw]"
				onclick={(e) => {
					e.stopPropagation();
				}}
			>
				<button
					class="absolute -top-10 right-0 text-white hover:text-gray-300"
					onclick={() => (isModalOpen = false)}
				>
					Close
				</button>
				<img
					src={`data:image/png;base64,${transactionData.qr_code}`}
					alt="Transaction QR Code (Large)"
					class="max-h-[80vh] max-w-[80vw] rounded-lg"
				/>
			</div>
		</div>
	{/if}
</div>
