<script lang="ts">
    import type { PageData } from './$types';
    import type { ParkingSlot } from '$lib/models/parking-slot';
    import type { Transaction } from '$lib/models/transaction';
    import type { User } from '$lib/models/user';

    let { data }: { data: PageData } = $props();
    const transactionData = data.data as unknown as {
        slot_info: ParkingSlot;
        transaction: Transaction;
        user_info: User;
    };
</script>

<svelte:head>
    <title>Transaction Overview</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-7xl">
        <div class="col-span-2 mb-6">
            <a href="/parking-manager/transactions" class="text-blue-500">&larr; Back to Transactions</a>
        </div>
        <h1 class="mb-8 text-2xl font-bold text-gray-900">Transaction Overview</h1>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-lg bg-white p-6 shadow-sm">
                <h2 class="mb-4 text-lg font-semibold text-gray-900">Transaction Details</h2>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm text-gray-500">Transaction ID</p>
                        <p class="text-gray-900">{transactionData.transaction.uuid}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Amount Due</p>
                        <p class="text-gray-900">₱{transactionData.transaction.amount_due}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Payment Status</p>
                        <p class="text-gray-900">{transactionData.transaction.payment_status}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Status</p>
                        <p class="text-gray-900">{transactionData.transaction.status}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Entry Time</p>
                        <p class="text-gray-900">{new Date(transactionData.transaction.entry_time).toLocaleString()}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Exit Time</p>
                        <p class="text-gray-900">{new Date(transactionData.transaction.exit_time).toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow-sm">
                <h2 class="mb-4 text-lg font-semibold text-gray-900">Slot Details</h2>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm text-gray-500">Slot Code</p>
                        <p class="text-gray-900">{transactionData.slot_info.slot_code}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Floor Level</p>
                        <p class="text-gray-900">{transactionData.slot_info.floor_level}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Features</p>
                        <p class="text-gray-900">{transactionData.slot_info.slot_features}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Rate Multiplier</p>
                        <p class="text-gray-900">{transactionData.slot_info.slot_multiplier}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Base Rate</p>
                        <p class="text-gray-900">₱{transactionData.slot_info.base_rate}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Premium Slot</p>
                        <p class="text-gray-900">{transactionData.slot_info.is_premium ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow-sm">
                <h2 class="mb-4 text-lg font-semibold text-gray-900">User Details</h2>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm text-gray-500">User ID</p>
                        <p class="text-gray-900">{transactionData.user_info.uuid}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Name</p>
                        <p class="text-gray-900">{transactionData.user_info.first_name} {transactionData.user_info.last_name}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Email</p>
                        <p class="text-gray-900">{transactionData.user_info.email}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Phone Number</p>
                        <p class="text-gray-900">{transactionData.user_info.phone_number}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Role</p>
                        <p class="text-gray-900 capitalize">{transactionData.user_info.role}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Verified</p>
                        <p class="text-gray-900">{transactionData.user_info.is_verified ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
