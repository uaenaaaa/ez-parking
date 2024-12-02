<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let transactions = data as {
		code: string;
		transactions: {
			transactions: {
				slot_details: {
					floor_level: number;
					is_premium: string;
					slot_code: string;
					slot_features: string;
					slot_multiplier: number;
					slot_status: string;
				};

				uuid: string;
				payment_status: 'PENDING' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE';
				status: 'reserved' | 'active' | 'completed' | 'cancelled';
				vehicle_details: {
					base_rate_multiplier: number;
					size_category: string;
					type_name: string;
				};
			}[];
		};
	};
	let searchTerm = $state('');
	let sortBy = $state('slot_code');
	let sortDirection = $state<'asc' | 'desc'>('asc');

	let filteredTransactions = $derived(
		transactions.transactions.transactions.filter(
			(t) =>
				t.slot_details.slot_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
				t.vehicle_details.type_name.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);
</script>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-7xl">
		<div class="mb-6 sm:flex sm:items-center sm:justify-between">
			<div>
				<h1 class="text-2xl font-semibold text-gray-900">My Transactions</h1>
				<p class="mt-2 text-sm text-gray-600">View and manage your parking transactions</p>
			</div>

			<div class="mt-3 sm:ml-4 sm:mt-0">
				<input
					type="text"
					bind:value={searchTerm}
					placeholder="Search by slot code or vehicle type..."
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
		</div>

		<div class="space-y-4">
			{#each filteredTransactions as transaction}
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="p-6">
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
									<svg
										class="h-6 w-6 text-gray-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
										/>
									</svg>
								</div>
								<a
									href="/user/transactions/{transaction.uuid}"
									class="group flex flex-col transition-opacity hover:opacity-75"
								>
									<p class="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
										Transaction ID
									</p>
									<p class="text-xs text-gray-500">{transaction.uuid}</p>
									<span class="text-xs text-indigo-600 opacity-0 group-hover:opacity-100"
										>Vies details →</span
									>
								</a>
							</div>
							<div class="flex items-center space-x-2">
								{#if transaction.status != 'cancelled'}
								<span
									class="inline-flex rounded-full px-3 py-1 text-xs font-medium
    {transaction.payment_status === 'PAID'
										? 'bg-green-100 text-green-800'
										: transaction.payment_status === 'PARTIALLY_PAID'
											? 'bg-yellow-100 text-yellow-800'
											: transaction.payment_status === 'OVERDUE'
												? 'bg-red-100 text-red-800'
												: 'bg-gray-100 text-gray-800'}"
								>
									{transaction.payment_status}
								</span>
								{/if}

								<span
									class="inline-flex rounded-full px-3 py-1 text-xs font-medium
    {transaction.status === 'active'
										? 'bg-blue-100 text-blue-800'
										: transaction.status === 'completed'
											? 'bg-green-100 text-green-800'
											: transaction.status === 'cancelled'
												? 'bg-red-100 text-red-800'
												: 'bg-yellow-100 text-yellow-800'}"
								>
									{transaction.status}
								</span>
							</div>
						</div>

						<div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							<div>
								<h3 class="text-sm font-medium text-gray-500">Slot Information</h3>
								<dl class="mt-2 space-y-1">
									<div class="flex justify-between">
										<dt class="text-sm text-gray-600">Code:</dt>
										<dd class="text-sm font-medium">{transaction.slot_details.slot_code}</dd>
									</div>
									<div class="flex justify-between">
										<dt class="text-sm text-gray-600">Floor:</dt>
										<dd class="text-sm font-medium">
											Level {transaction.slot_details.floor_level}
										</dd>
									</div>
									<div class="flex justify-between">
										<dt class="text-sm text-gray-600">Features:</dt>
										<dd class="text-sm font-medium">
											{transaction.slot_details.slot_features}
											{#if transaction.slot_details.is_premium === 'Yes'}
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

							<div>
								<h3 class="text-sm font-medium text-gray-500">Vehicle Information</h3>
								<dl class="mt-2 space-y-1">
									<div class="flex justify-between">
										<dt class="text-sm text-gray-600">Type:</dt>
										<dd class="text-sm font-medium">{transaction.vehicle_details.type_name}</dd>
									</div>
									<div class="flex justify-between">
										<dt class="text-sm text-gray-600">Size:</dt>
										<dd class="text-sm font-medium">{transaction.vehicle_details.size_category}</dd>
									</div>
									<div class="flex justify-between">
										<dt class="text-sm text-gray-600">Rate Multiplier:</dt>
										<dd class="text-sm font-medium">
											{transaction.vehicle_details.base_rate_multiplier}x
										</dd>
									</div>
								</dl>
							</div>

							<div>
								<h3 class="text-sm font-medium text-gray-500">Rate Information</h3>
								<dl class="mt-2 space-y-1">
									<div class="flex justify-between">
										<dt class="text-sm text-gray-600">Slot Multiplier:</dt>
										<dd class="text-sm font-medium">{transaction.slot_details.slot_multiplier}x</dd>
									</div>
									<div class="flex justify-between">
										<dt class="text-sm text-gray-600">Total Multiplier:</dt>
										<dd class="text-sm font-medium">
											{(
												transaction.slot_details.slot_multiplier *
												transaction.vehicle_details.base_rate_multiplier
											).toFixed(2)}x
										</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
