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
    let mapUrl = $state(
        `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${establishmentData.establishment.latitude},${establishmentData.establishment.longitude}+(${encodeURIComponent(establishmentData.establishment.name)})&t=&z=14&ie=UTF8&iwloc=B&output=embed`
    );
</script>

<svelte:head>
    <title>{establishmentData.establishment.name} | View</title>
</svelte:head>

<div class="flex min-h-screen w-full items-center justify-center bg-gray-50">
    <div class="grid max-w-screen-2xl w-11/12 grid-cols-1 gap-6 pt-10 lg:grid-cols-2">
        <div class="col-span-2 mb-6">
            <a href="/establishment/search" class="text-blue-500"> &larr; Back to Search</a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full col-span-2">
        <div class="rounded-lg bg-white p-6 shadow-sm">
            <div class="flex items-start justify-between">
                <div class="space-y-4">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">
                            {establishmentData.establishment.name}
                        </h1>
                        <p class="mt-2 text-gray-600">
                            {establishmentData.establishment.nearby_landmarks}
                        </p>
                    </div>

                    <div class="flex flex-col space-y-3">
                        <div class="flex items-center text-gray-600 gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M8 3a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 9a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3zm10-9a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"
                                />
                            </svg>
                            <span class="capitalize"
                                >{establishmentData.establishment.space_type} Layout - {establishmentData
                                    .establishment.space_layout} Parking</span
                            >
                        </div>

                        <div class="flex items-center text-gray-600 gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M19.836 10.486a.9.9 0 0 1-.21.47l-9.75 10.71a.94.94 0 0 1-.49.33q-.125.015-.25 0a1 1 0 0 1-.41-.09a.92.92 0 0 1-.45-.46a.9.9 0 0 1-.07-.58l.86-6.86h-3.63a1.7 1.7 0 0 1-.6-.15a1.29 1.29 0 0 1-.68-.99a1.3 1.3 0 0 1 .09-.62l3.78-9.45c.1-.239.266-.444.48-.59a1.3 1.3 0 0 1 .72-.21h7.24c.209.004.414.055.6.15c.188.105.349.253.47.43c.112.179.18.38.2.59a1.2 1.2 0 0 1-.1.61l-2.39 5.57h3.65a1 1 0 0 1 .51.16a1 1 0 0 1 .43 1z"
                                />
                            </svg>
                            <span>{establishmentData.establishment.lighting}</span>
                        </div>
                    </div>
                </div>

                {#if establishmentData.establishment.verified}
                    <span
                        class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                    >
                        Verified
                    </span>
                {/if}
            </div>
        </div>

        <div class="rounded-lg bg-white p-6 shadow-sm">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">Payment Methods and Facilities</h3>
            <div class="flex flex-wrap gap-2">
                {#if establishmentData.payment_methods[0].accepts_cash}
                    <span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                        >Cash</span
                    >
                {/if}
                {#if establishmentData.payment_methods[0].accepts_mobile}
                    <span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                        >Mobile Payment</span
                    >
                {/if}
                {#if establishmentData.payment_methods[0].accepts_other}
                    <span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                        >{establishmentData.payment_methods[0].other_methods}</span
                    >
                {/if}
                {#if establishmentData.establishment.facilities}
                        {#each establishmentData.establishment.facilities.split(',') as facility}
                            <span class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                                {facility.trim()}
                            </span>
                        {/each}
                {/if}
            </div>
        </div>
        </div>

        <div class="col-span-2 h-96 rounded-lg bg-white p-6 shadow-sm">
            <div class="mb-6 flex flex-row items-center justify-between">
                <h3 class="mb-3 text-lg font-semibold text-gray-900">Location</h3>
                <div class="flex flex-row items-center justify-center space-x-4">
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${establishmentData.establishment.latitude},${establishmentData.establishment.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-indigo-600 hover:underline"
                    >
                        Google Maps
                    </a>

                    <a
                        href={`https://www.waze.com/ul?ll=${establishmentData.establishment.latitude},${establishmentData.establishment.longitude}&navigate=yes`}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-indigo-600 hover:underline"
                    >
                        Waze
                    </a>
                </div>
            </div>
            <div class="h-[calc(100%-3rem)] w-full overflow-hidden rounded-lg">
                <iframe
                    frameborder="0"
                    marginheight="0"
                    marginwidth="0"
                    title={establishmentData.establishment.name}
                    src={mapUrl}
                    class="h-full w-full"
                ></iframe>
            </div>
        </div>

        <div class="col-span-2 mb-6 bg-white p-6 shadow-sm">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">Operating Hours</h3>
            {#if establishmentData.establishment.is24_7}
                <p class="text-gray-600">Open 24/7</p>
            {:else}
                <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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

        <div class="col-span-2 my-6">
            <h2 class="mb-4 text-xl font-bold text-gray-900">Available Parking Slots</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {#each establishmentData.slots as slot}
                    <SlotCard
                        slotInfo={slot}
                        rates={establishmentData.pricing_plans}
                        establishmentUuid={establishmentData.establishment.uuid}
                        slotUuid={slot.uuid}
                    />
                {/each}
            </div>
        </div>
    </div>
</div>
