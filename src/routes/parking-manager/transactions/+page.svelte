<script lang="ts">
    import type { Transaction } from '$lib/models/transaction';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let transactions = data.data as unknown as Transaction[][];
</script>

<svelte:head>
    <title>Transactions</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-7xl">
        <div class="col-span-2 mb-6">
            <a href="/parking-manager/dashboard" class="text-blue-500">&larr; Back to Dashboard</a>
        </div>
        <h1 class="mb-8 text-2xl font-bold text-gray-900">Transactions</h1>

        <div class="overflow-hidden rounded-lg bg-white shadow-sm">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Slot Code
                        </th>
                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Entry Time
                        </th>
                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Exit Time
                        </th>
                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount Due
                        </th>
                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Payment Status
                        </th>
                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#each transactions as transactionGroup}
                        {#each transactionGroup as transaction}
                            <tr>
                                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">{transaction.slot_code}</td>
                                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{new Date(transaction.entry_time).toLocaleString()}</td>
                                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{new Date(transaction.exit_time).toLocaleString()}</td>
                                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">₱{transaction.amount_due}</td>
                                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{transaction.payment_status}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.status}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <a href={`/parking-manager/transactions/${transaction.uuid}`} class="text-indigo-600 hover:text-indigo-900">View</a>
                                </td>
                            </tr>
                        {/each}
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
