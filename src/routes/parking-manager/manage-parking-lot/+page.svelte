<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let info = data as unknown as {
		establishmentInfo: {
			code: string;
			data: {
				establishment: {
					address: string;
					closing_time: string;
					contact_number: string;
					created_at: Date;
					establishment_id: number;
					hourly_rate: number;
					is_24_hours: boolean;
					latitude: number;
					longitude: number;
					name: string;
					opening_time: string;
					updated_at: Date;
					uuid: string;
				};
				slots: {
					created_at: Date;
					establishment_id: number;
					floor_level: number;
					is_active: boolean;
					is_premium: boolean;
					slot_code: string;
					slot_features: 'standard' | 'covered' | 'vip' | 'disabled' | 'ev_charging';
					slot_id: number;
					slot_multiplier: string;
					slot_status: 'occupied' | 'open' | 'reserved';
					updated_at: Date;
					vehicle_type_id: number;
				}[];
			};
			message: string;
		};
	};
</script>

<svelte:head>
	<title>Parking Establishment</title>
</svelte:head>
<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto mb-6 max-w-7xl">
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-3xl font-bold text-gray-800">Parking Manager Dashboard</h1>
			<div class="flex space-x-4">
				<a
					href="/parking-manager/reports"
					class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
				>
					View Reports
				</a>
				<a
					href="/parking-manager/settings"
					class="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
				>
					Settings
				</a>
			</div>
		</div>

		<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg bg-white p-4 shadow-sm">
				<h3 class="text-sm font-medium text-gray-500">Available Slots</h3>
				<p class="mt-2 text-3xl font-bold text-green-600">
					{info.establishmentInfo.data.slots.filter((s) => s.slot_status === 'open').length}
				</p>
			</div>
			<div class="rounded-lg bg-white p-4 shadow-sm">
				<h3 class="text-sm font-medium text-gray-500">Occupied Slots</h3>
				<p class="mt-2 text-3xl font-bold text-red-600">
					{info.establishmentInfo.data.slots.filter((s) => s.slot_status === 'occupied').length}
				</p>
			</div>
			<div class="rounded-lg bg-white p-4 shadow-sm">
				<h3 class="text-sm font-medium text-gray-500">Reserved Slots</h3>
				<p class="mt-2 text-3xl font-bold text-yellow-600">
					{info.establishmentInfo.data.slots.filter((s) => s.slot_status === 'reserved').length}
				</p>
			</div>
			<div class="rounded-lg bg-white p-4 shadow-sm">
				<h3 class="text-sm font-medium text-gray-500">Premium Slots</h3>
				<p class="mt-2 text-3xl font-bold text-purple-600">
					{info.establishmentInfo.data.slots.filter((s) => s.is_premium).length}
				</p>
			</div>
		</div>

		<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
			<a
				href="/parking-manager/cashiers"
				class="rounded-lg bg-white p-4 shadow-sm hover:bg-gray-50"
			>
				<h3 class="font-medium text-gray-900">Manage Cashiers</h3>
				<p class="text-sm text-gray-500">Add or remove cashier accounts</p>
			</a>
			<a href="/parking-manager/rates" class="rounded-lg bg-white p-4 shadow-sm hover:bg-gray-50">
				<h3 class="font-medium text-gray-900">Manage Rates</h3>
				<p class="text-sm text-gray-500">Update parking rates and multipliers</p>
			</a>
			<a
				href="/parking-manager/transactions"
				class="rounded-lg bg-white p-4 shadow-sm hover:bg-gray-50"
			>
				<h3 class="font-medium text-gray-900">View Transactions</h3>
				<p class="text-sm text-gray-500">Check parking history and payments</p>
			</a>
		</div>
	</div>

	<div class="mx-auto mb-6 max-w-7xl rounded-lg bg-white p-6 shadow-sm">
		<div class="mx-auto mb-6 max-w-7xl rounded-lg bg-white p-6 shadow-sm">
			<h1 class="text-2xl font-bold text-gray-800">
				{info.establishmentInfo.data.establishment.name}
			</h1>
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
					<span>{info.establishmentInfo.data.establishment.address}</span>
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
					<span>
						{info.establishmentInfo.data.establishment.is_24_hours
							? '24/7'
							: `${info.establishmentInfo.data.establishment.opening_time} - ${info.establishmentInfo.data.establishment.closing_time}`}
					</span>
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
					<span>{info.establishmentInfo.data.establishment.contact_number}</span>
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
					<span>₱{info.establishmentInfo.data.establishment.hourly_rate}/hour</span>
				</div>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-xl font-bold text-gray-800">Parking Slots Management</h2>
			<a href="/parking-manager/new/slot"
				class="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
			>
				Add New Slot
			</a>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each info.establishmentInfo.data.slots as slot}
				<div
					class="rounded-lg border-l-4 bg-white p-4 shadow-sm {slot.slot_status === 'open'
						? 'border-green-500'
						: slot.slot_status === 'reserved'
							? 'border-yellow-500'
							: 'border-red-500'}"
				>
					<div class="mb-4 flex items-start justify-between">
						<h3 class="text-lg font-semibold">{slot.slot_code}</h3>
						<div class="flex space-x-2">
							<button
								class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200"
							>
								Edit
							</button>
							<span
								class="rounded-full px-2 py-1 text-xs font-medium {slot.slot_status === 'open'
									? 'bg-green-100 text-green-800'
									: slot.slot_status === 'reserved'
										? 'bg-yellow-100 text-yellow-800'
										: 'bg-red-100 text-red-800'}"
							>
								{slot.slot_status}
							</span>
						</div>
					</div>

					<div class="space-y-2">
						<p class="text-sm text-gray-600">Floor {slot.floor_level}</p>
						<p class="text-sm text-gray-600">Features: {slot.slot_features}</p>
						<div class="mt-4 flex space-x-2">
							<button
								class="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700"
							>
								Change Status
							</button>
							<button
								class="flex-1 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
							>
								Disable Slot
							</button>
						</div>
						{#if slot.is_premium}
							<span class="inline-block rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">
								Premium
							</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
