<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

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
			status: string;
			transaction_id: number;
			updated_at: string;
			uuid: string;
			vehicle_details: {
				base_rate_multiplier: number;
				size_category: string;
				type_name: string;
			};
			vehicle_type_id: number;
		};
		qr_code?: string;
	};
</script>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-3xl">
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
            {transactionData.transaction_data.status === 'active'
							? 'bg-blue-100 text-blue-800'
							: transactionData.transaction_data.status === 'completed'
								? 'bg-green-100 text-green-800'
								: transactionData.transaction_data.status === 'cancelled'
									? 'bg-red-100 text-red-800'
									: 'bg-yellow-100 text-yellow-800'}"
					>
						{transactionData.transaction_data.status}
					</span>
				</div>
			</div>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<div class="space-y-6">
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h2 class="text-lg font-medium text-gray-900">Timing Details</h2>
					<dl class="mt-4 space-y-3">
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Entry Time</dt>
							<dd class="text-sm font-medium text-gray-900">
								{new Date(transactionData.transaction_data.entry_time).toLocaleString()}
							</dd>
						</div>
						{#if transactionData.transaction_data.exit_time}
							<div class="flex justify-between">
								<dt class="text-sm text-gray-500">Exit Time</dt>
								<dd class="text-sm font-medium text-gray-900">
									{new Date(transactionData.transaction_data.exit_time).toLocaleString()}
								</dd>
							</div>
						{/if}
						<div class="flex justify-between">
							<dt class="text-sm text-gray-500">Amount Due</dt>
							<dd class="text-sm font-medium text-gray-900">
								₱{transactionData.transaction_data.amount_due}
							</dd>
						</div>
					</dl>
				</div>

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
							class="h-96 w-96"
						/>
						<p class="mt-2 text-sm text-gray-500">Show this QR code to the parking attendant</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
