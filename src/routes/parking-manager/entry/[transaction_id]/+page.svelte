<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ParkingSlot } from '$lib/models/parking-slot';
    import type { Transaction } from '$lib/models/transaction';
    import type { User } from '$lib/models/user';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let isLoading = $state(false);
	const transactionDetails = data.transaction.data as unknown as {
		parking_slot_info: ParkingSlot;
		transaction_data: Transaction;
		user_info: User
	};
	let paymentStatus = $state(transactionDetails.transaction_data.payment_status);
</script>

<svelte:head>
	<title>Entry Verification</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-7xl">
        <div class="col-span-2 mb-6">
            <a href="/parking-manager/entry" class="text-blue-500">&larr; Back to Entry</a>
        </div>
        <h1 class="mb-8 text-2xl font-bold text-gray-900">Entry Transaction Overview</h1>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-lg bg-white p-6 shadow-sm">
                <h2 class="mb-4 text-lg font-semibold text-gray-900">Transaction Details</h2>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm text-gray-500">Transaction ID</p>
                        <p class="text-gray-900">{transactionDetails.transaction_data.transaction_id}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Amount Due</p>
                        <p class="text-gray-900">₱{transactionDetails.transaction_data.amount_due}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Payment Status</p>
                        <p class="text-gray-900">{transactionDetails.transaction_data.payment_status}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Status</p>
                        <p class="text-gray-900">{transactionDetails.transaction_data.status}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Entry Time</p>
                        <p class="text-gray-900">{new Date(transactionDetails.transaction_data.entry_time).toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow-sm">
                <h2 class="mb-4 text-lg font-semibold text-gray-900">Slot Details</h2>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm text-gray-500">Slot Code</p>
                        <p class="text-gray-900">{transactionDetails.parking_slot_info.slot_code}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Floor Level</p>
                        <p class="text-gray-900">{transactionDetails.parking_slot_info.floor_level}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Features</p>
                        <p class="text-gray-900">{transactionDetails.parking_slot_info.slot_features}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Rate Multiplier</p>
                        <p class="text-gray-900">{transactionDetails.parking_slot_info.slot_multiplier}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Base Rate</p>
                        <p class="text-gray-900">₱{transactionDetails.parking_slot_info.base_rate}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Premium Slot</p>
                        <p class="text-gray-900">{transactionDetails.parking_slot_info.is_premium ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow-sm">
                <h2 class="mb-4 text-lg font-semibold text-gray-900">User Details</h2>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm text-gray-500">User ID</p>
                        <p class="text-gray-900">{transactionDetails.user_info.user_id}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Name</p>
                        <p class="text-gray-900">{transactionDetails.user_info.first_name} {transactionDetails.user_info.last_name}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Email</p>
                        <p class="text-gray-900">{transactionDetails.user_info.email}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Phone Number</p>
                        <p class="text-gray-900">{transactionDetails.user_info.phone_number}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Role</p>
                        <p class="text-gray-900 capitalize">{transactionDetails.user_info.role}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Verified</p>
                        <p class="text-gray-900">{transactionDetails.user_info.is_verified ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 rounded-lg bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-lg font-semibold text-gray-900">Update Payment Status</h2>
            <form class="space-y-6" method="POST" use:enhance={() => {
				isLoading = true;
				return ({ result }) => {
					isLoading = false;
					if (result.type === 'success') {
						alert('Payment status updated successfully');
					} else {
						alert('Failed to update payment status');
					}
				}
			}}>
			<input type="hidden" name="transaction_id" value={transactionDetails.transaction_data.transaction_id} />
                <div>
                    <label for="payment_status" class="block text-sm font-medium text-gray-700">Payment Status</label>
                    <select
                        bind:value={paymentStatus}
						name="payment_status"
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        Update Status and Allow Entry
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
