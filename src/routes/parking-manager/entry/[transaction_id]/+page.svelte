<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	let { data }: { data: PageData } = $props();
	let isLoading = $state(false);
	let error = $state('');

	async function handleEntryApproval() {
		isLoading = true;
		console.log('Approving entry for:', data.transaction.id);
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	}
</script>

<svelte:head>
    <title>Entry Verification</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-3xl">
		<div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-2xl font-bold text-gray-900">Entry Verification</h1>
					<p class="mt-1 text-sm text-gray-500">Transaction ID: {data.transaction.id}</p>
				</div>
				<div class="flex items-center space-x-2">
					<span
						class="inline-flex rounded-full px-3 py-1 text-xs font-medium
            {data.transaction.status === 'reserved'
							? 'bg-yellow-100 text-yellow-800'
							: 'bg-green-100 text-green-800'}"
					>
						{data.transaction.status}
					</span>
					<span
						class="inline-flex rounded-full px-3 py-1 text-xs font-medium
            {data.transaction.payment_status === 'PAID'
							? 'bg-green-100 text-green-800'
							: 'bg-red-100 text-red-800'}"
					>
						{data.transaction.payment_status}
					</span>
				</div>
			</div>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="text-lg font-medium text-gray-900">Vehicle Information</h2>
				<dl class="mt-4 space-y-3">
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Plate Number</dt>
						<dd class="text-sm font-medium text-gray-900">
							{data.transaction.vehicle.plate_number}
						</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Vehicle Type</dt>
						<dd class="text-sm font-medium text-gray-900">{data.transaction.vehicle.type}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Size Category</dt>
						<dd class="text-sm font-medium text-gray-900">{data.transaction.vehicle.size}</dd>
					</div>
				</dl>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="text-lg font-medium text-gray-900">Parking Slot</h2>
				<dl class="mt-4 space-y-3">
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Slot Code</dt>
						<dd class="text-sm font-medium text-gray-900">{data.transaction.slot.code}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Floor Level</dt>
						<dd class="text-sm font-medium text-gray-900">{data.transaction.slot.floor_level}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Features</dt>
						<dd class="text-sm font-medium text-gray-900">{data.transaction.slot.features}</dd>
					</div>
				</dl>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="text-lg font-medium text-gray-900">Customer Details</h2>
				<dl class="mt-4 space-y-3">
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Name</dt>
						<dd class="text-sm font-medium text-gray-900">{data.transaction.customer.name}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Email</dt>
						<dd class="text-sm font-medium text-gray-900">{data.transaction.customer.email}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Phone</dt>
						<dd class="text-sm font-medium text-gray-900">{data.transaction.customer.phone}</dd>
					</div>
				</dl>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="text-lg font-medium text-gray-900">Payment Information</h2>
				<dl class="mt-4 space-y-3">
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Amount</dt>
						<dd class="text-sm font-medium text-gray-900">₱{data.transaction.payment.amount}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Method</dt>
						<dd class="text-sm font-medium text-gray-900">{data.transaction.payment.method}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-sm text-gray-500">Reference</dt>
						<dd class="text-sm font-medium text-gray-900">{data.transaction.payment.reference}</dd>
					</div>
				</dl>
			</div>
		</div>

		<div class="mt-6 flex justify-end space-x-4">
			<button
				type="button"
				class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				onclick={() => window.history.back()}
			>
				Cancel
			</button>
			<button
				type="button"
				class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex flex-row gap-1 {isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}"
				onclick={handleEntryApproval}
				disabled={isLoading}
			>
				<svg
					class="-ml-1 mr-3 h-5 w-5 animate-spin text-white {isLoading ? 'block' : 'hidden'}"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				{isLoading ? 'Processing...' : 'Approve Entry'}
			</button>
		</div>

		{#if error}
			<div class="mt-4 rounded-md bg-red-50 p-4">
				<div class="flex">
					<div class="flex-shrink-0">
						<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-red-800">{error}</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
