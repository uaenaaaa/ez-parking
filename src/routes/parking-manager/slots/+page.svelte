<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ParkingSlot } from '$lib/models/parking-slot';
    import type { VehicleType } from '$lib/models/vehicle-types';
    import type { PageData } from './$types';
    let { data }: { data: PageData } = $props();
    const slotFeatures = ['standard', 'covered', 'vip', 'disabled', 'ev_charging'] as const;
    const slotStatus = ['open', 'occupied', 'reserved', 'closed'] as const;
    const slots = data.data.slots as unknown as ParkingSlot[] &
        {
            vehicle_type_code: string;
            vehicle_type_name: string;
            vehicle_type_size: string;
        }[];
    const vehicleTypes = data.data.vehicleTypes as unknown as VehicleType[];
</script>

<svelte:head>
    <title>Parking Manager | Slots</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-7xl">
        <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-lg font-semibold text-gray-900">Add New Parking Slot</h2>
            <form class="space-y-6" method="POST" use:enhance={() => {
                return ({ result }) => {
                    if (result.type == 'success') {
                        alert('Slot added successfully');
                    } else if (result.type == 'failure') {
                        alert('An error occurred while adding the slot: ' + result.data?.error);
                    }
                }
            }}>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="slot_code">
                            Slot Code <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="slot_code"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="is_premium">
                            Is Premium <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="checkbox"
                            name="is_premium"
                            class="mt-1 block rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="base_rate">
                            Base Rate <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="base_rate"
                            step="0.01"
                            min="0"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700"
                            for="slot_multiplier"
                        >
                            Slot Multiplier <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="slot_multiplier"
                            step="0.01"
                            min="0"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="floor_level">
                            Floor Level <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="floor_level"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700"
                            for="vehicle_type_id"
                        >
                            Vehicle Type <span class="text-red-500">*</span>
                        </label>
                        <select
                            name="vehicle_type_id"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                            <option value="">Select vehicle type...</option>
                            {#each vehicleTypes as type}
                                <option value={type.vehicle_type_id}>{type.name}</option>
                            {/each}
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="slot_features">
                            Features <span class="text-red-500">*</span>
                        </label>
                        <select
                            name="slot_features"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                            {#each slotFeatures as feature}
                                <option value={feature}>{feature.replaceAll("_", " ").toUpperCase()}</option>
                            {/each}
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="slot_status">
                            Status <span class="text-red-500">*</span>
                        </label>
                        <select
                            name="slot_status"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                            {#each slotStatus as status}
                                <option value={status}>{status.toUpperCase()}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="flex items-center">
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked
                        value="true"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label for="is_active" class="ml-2 text-sm text-gray-700">Active Slot</label>
                </div>

                <div class="flex justify-end space-x-4">
                    <button
                        type="submit"
                        class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        Add Slot
                    </button>
                </div>
            </form>
        </div>

        <div class="mb-6">
            <h2 class="mb-4 text-xl font-bold text-gray-900">Existing Parking Slots</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {#each slots as slot}
                    <div
                        class="rounded-lg border-l-4 bg-white p-4 shadow-sm transition-transform hover:scale-105
                        {slot.slot_status === 'open'
                            ? 'border-green-500'
                            : slot.slot_status === 'reserved'
                              ? 'border-yellow-500'
                              : 'border-red-500'}"
                    >
                        <div class="mb-4 flex items-start justify-between">
                            <h3 class="text-lg font-semibold">{slot.slot_code}</h3>
                            <span
                                class="rounded-full px-2 py-1 text-xs font-medium
                                {slot.slot_status === 'open'
                                    ? 'bg-green-100 text-green-800'
                                    : slot.slot_status === 'reserved'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'}"
                            >
                                {slot.slot_status}
                            </span>
                        </div>
                        <div class="space-y-2">
                            <p class="text-sm text-gray-600">Floor: {slot.floor_level}</p>
                            <p class="text-sm text-gray-600">Features: {slot.slot_features}</p>
                            <p class="text-sm text-gray-600">
                                Rate Multiplier: {slot.slot_multiplier}
                            </p>
                            {#if slot.is_premium}
                                <span
                                    class="inline-block rounded bg-purple-100 px-2 py-1 text-xs text-purple-800"
                                >
                                    Premium
                                </span>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
