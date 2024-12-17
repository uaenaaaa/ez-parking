<script lang="ts">
    import type { PageData } from '../$types';
    import type { ParkingEstablishment } from '$lib/models/parking-establishment';
    import type { OperatingHour } from '$lib/models/operating-hour';
    import type { PaymentMethod } from '$lib/models/payment-method';
    import type { PricingPlan } from '$lib/models/pricing-plan';
    import type { ParkingSlot } from '$lib/models/parking-slot';
    import SlotCard from './SlotCard.svelte';

    interface Slot extends ParkingSlot {
        vehicle_type_code: string;
        vehicle_type_name: string;
        vehicle_type_size: string;
    }

    let { data }: { data: PageData } = $props();
    const establishmentData = data.data.establishment as unknown as {
        establishment: ParkingEstablishment;
        operating_hours: OperatingHour[];
        payment_methods: PaymentMethod[];
        pricing_plans: PricingPlan[];
        slots: Slot[];
    };
</script>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-7xl">
        <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div class="mb-4 flex items-start justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">
                        {establishmentData.establishment.name}
                    </h1>
                    <p class="mt-2 text-gray-600">
                        {establishmentData.establishment.nearby_landmarks}
                    </p>
                </div>
                {#if establishmentData.establishment.verified}
                    <span
                        class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                        >Verified</span
                    >
                {/if}
            </div>

            <div
                class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                <div class="space-y-2">
                    <div class="flex items-center text-gray-600">
                        <svg
                            class="mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
                            />
                        </svg>
                        <span class="capitalize"
                            >{establishmentData.establishment.space_type} Parking</span
                        >
                    </div>
                    <div class="flex items-center text-gray-600">
                        <svg
                            class="mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
                            />
                        </svg>
                        <span class="capitalize"
                            >{establishmentData.establishment.space_layout} Layout</span
                        >
                    </div>
                    <div class="flex items-center text-gray-600">
                        <svg
                            class="mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        <span>{establishmentData.establishment.lighting}</span>
                    </div>
                </div>

                <div class="col-span-2">
                    <h3 class="mb-3 text-lg font-semibold text-gray-900">
                        Operating Hours
                    </h3>
                    {#if establishmentData.establishment.is24_7}
                        <p class="text-gray-600">Open 24/7</p>
                    {:else}
                        <div
                            class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                        >
                            {#each establishmentData.operating_hours as hour}
                                <div class="rounded-lg bg-gray-50 p-3">
                                    <p class="font-medium text-gray-700">
                                        {hour.day_of_week}
                                    </p>
                                    <p class="text-sm text-gray-600">
                                        {hour.is_enabled
                                            ? `${hour.opening_time} - ${hour.closing_time}`
                                            : 'Closed'}
                                    </p>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>

            <div class="mt-6">
                <h3 class="mb-3 text-lg font-semibold text-gray-900">
                    Payment Methods
                </h3>
                <div class="flex flex-wrap gap-2">
                    {#if establishmentData.payment_methods[0].accepts_cash}
                        <span
                            class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                            >Cash</span
                        >
                    {/if}
                    {#if establishmentData.payment_methods[0].accepts_mobile}
                        <span
                            class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                            >Mobile Payment</span
                        >
                    {/if}
                    {#if establishmentData.payment_methods[0].accepts_other}
                        <span
                            class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                            >{establishmentData.payment_methods[0]
                                .other_methods}</span
                        >
                    {/if}
                </div>
            </div>

            {#if establishmentData.establishment.facilities}
                <div class="mt-6">
                    <h3 class="mb-3 text-lg font-semibold text-gray-900">
                        Facilities
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        {#each establishmentData.establishment.facilities.split(',') as facility}
                            <span
                                class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                            >
                                {facility.trim()}
                            </span>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>

        <div class="mb-6">
            <h2 class="mb-4 text-xl font-bold text-gray-900">
                Available Parking Slots
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {#each establishmentData.slots as slot}
                    <SlotCard
                        slotInfo={slot}
                        rates={establishmentData.pricing_plans}
                        establishmentUuid={establishmentData.establishment.uuid}
                    />
                {/each}
            </div>
        </div>
    </div>
</div>
