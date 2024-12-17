<script lang="ts">
    import type { ParkingSlot } from '$lib/models/parking-slot';
    import type { PricingPlan } from '$lib/models/pricing-plan';

    interface Slot extends ParkingSlot {
        vehicle_type_code: string;
        vehicle_type_name: string;
        vehicle_type_size: string;
    }

    let {
        slotInfo,
        rates,
        establishmentUuid
    }: {
        slotInfo: Slot;
        rates: PricingPlan[];
        establishmentUuid: string;
    } = $props();

    function getRateDisplay(baseRate: number, rates: PricingPlan[]): { amount: string; type: string } {
        const activeRate = rates.find(r => r.is_enabled);
        if (!activeRate) return { amount: '0.00', type: 'hourly' };

        const calculatedRate = baseRate * Number(activeRate.rate);
        return {
            amount: calculatedRate.toFixed(2),
            type: activeRate.rate_type
        };
    }

    const { amount, type } = getRateDisplay(slotInfo.base_rate, rates);
</script>

<div class="rounded-lg border-l-4 bg-white p-4 shadow-sm transition-transform hover:scale-105
    {slotInfo.slot_status === 'open' ? 'border-green-500' :
     slotInfo.slot_status === 'reserved' ? 'border-yellow-500' :
     'border-red-500'}">
    <div class="mb-4 flex items-start justify-between">
        <h3 class="text-lg font-semibold">{slotInfo.slot_code}</h3>
        <span class="rounded-full px-2 py-1 text-xs font-medium
            {slotInfo.slot_status === 'open' ? 'bg-green-100 text-green-800' :
             slotInfo.slot_status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
             'bg-red-100 text-red-800'}">
            {slotInfo.slot_status}
        </span>
    </div>

    <div class="space-y-2">
        <p class="text-sm text-gray-600">Floor {slotInfo.floor_level}</p>
        <p class="text-sm text-gray-600">{slotInfo.vehicle_type_name}</p>
        <p class="text-sm text-gray-600">Size: {slotInfo.vehicle_type_size}</p>

        {#if slotInfo.slot_status === 'open'}
            <div class="flex items-center justify-between">
                <p class="font-medium text-green-600">
                    ₱{amount}/{type === 'hourly' ? 'hr' : type === 'daily' ? 'day' : 'mo'}
                </p>
                <span class="text-xs text-gray-500 capitalize">
                    {type} rate
                </span>
            </div>

            <a href="/establishment/{establishmentUuid}/{slotInfo.uuid}"
               class="mt-4 inline-flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Reserve Slot
            </a>
        {/if}

        {#if slotInfo.is_premium}
            <span class="inline-block rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">
                Premium
            </span>
        {/if}
    </div>
</div>
