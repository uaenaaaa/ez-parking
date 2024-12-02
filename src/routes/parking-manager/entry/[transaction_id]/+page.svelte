<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	let { data }: { data: PageData } = $props();
	let isLoading = $state(false);
	let error = $state('');
	const transactionData = data.transaction as unknown as {
		code: string;
		data: {
			transaction_data: {
				amount_due: any;
				created_at: string;
				entry_time: string;
				establishment_info: {
					address: string;
					contact_number: string;
					latitude: string;
					longitude: string;
					name: string;
				};
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
			transaction_uuid: string;
			user_info: {
				creation_date: string;
				email: string;
				first_name: string;
				is_verified: boolean;
				last_name: string;
				nickname: any;
				otp_expiry: any;
				otp_secret: any;
				phone_number: string;
				plate_number: string;
				role: string;
				user_id: number;
				uuid: string;
				verification_expiry: any;
				verification_token: any;
			};
		};
		message: string;
	};

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
				<h1 class="text-2xl font-bold text-gray-900">Entry Verification</h1>
				<div class="flex space-x-2">
					<span
						class="inline-flex rounded-full px-3 py-1 text-xs font-medium
            {transactionData.data.transaction_data.status === 'active'
							? 'bg-green-100 text-green-800'
							: 'bg-yellow-100 text-yellow-800'}"
					>
						{transactionData.data.transaction_data.status}
					</span>
				</div>
			</div>
		</div>

		<form class="space-y-6" method="POST">
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="text-lg font-semibold text-gray-900">Customer Information</h2>
				<dl class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<dt class="text-sm font-medium text-gray-500">Name</dt>
						<dd class="text-sm text-gray-900">
							{transactionData.data.user_info.first_name}
							{transactionData.data.user_info.last_name}
						</dd>
					</div>
					<div>
						<dt class="text-sm font-medium text-gray-500">Contact</dt>
						<dd class="text-sm text-gray-900">{transactionData.data.user_info.phone_number}</dd>
					</div>
				</dl>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="text-lg font-semibold text-gray-900">Parking Details</h2>
				<dl class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<dt class="text-sm font-medium text-gray-500">Vehicle Type</dt>
						<dd class="text-sm text-gray-900">
							{transactionData.data.transaction_data.vehicle_details.type_name}
						</dd>
					</div>
					<div>
						<dt class="text-sm font-medium text-gray-500">Plate Number</dt>
						<dd class="text-sm text-gray-900">
							{transactionData.data.transaction_data.plate_number}
						</dd>
					</div>
					<div>
						<dt class="text-sm font-medium text-gray-500">Slot</dt>
						<dd class="text-sm text-gray-900">
							{transactionData.data.transaction_data.slot_details.slot_code}
						</dd>
					</div>
					<div>
						<dt class="text-sm font-medium text-gray-500">Floor Level</dt>
						<dd class="text-sm text-gray-900">
							{transactionData.data.transaction_data.slot_details.floor_level}
						</dd>
					</div>
				</dl>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="text-lg font-semibold text-gray-900">Payment Collection</h2>
				<div class="mt-4 space-y-4">
					<div>
						<label for="amount_due" class="text-sm font-medium text-gray-700">Amount Due</label>
						<p id="amount_due" class="text-2xl font-bold text-gray-900">
							₱{transactionData.data.transaction_data.amount_due}
						</p>
					</div>

					<div>
						<label for="payment_status" class="block text-sm font-medium text-gray-700">Payment Status</label>
						<select
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							name="payment_status"
							id="payment_status"
						>
							<option value="UNPAID">Unpaid</option>
							<option value="PARTIALLY_PAID">Partially Paid</option>
							<option value="PAID">Fully Paid</option>
						</select>
					</div>

					<div>
						<label for="amount_paid" class="block text-sm font-medium text-gray-700">Amount Paid</label>
						<input
							type="number"
							id="amount_paid"
							name="paid_amount"
							step="0.01"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							placeholder="Enter amount"
						/>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex justify-end space-x-4">
				<button
					type="button"
					class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					onclick={() => {
						history.back();
					}}
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isLoading}
					class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:bg-gray-400"
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
		</form>
	</div>
</div>
