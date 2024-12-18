<script lang="ts">
    import type { PageData } from './$types';
    import { enhance } from '$app/forms';
    import type { Address } from '$lib/models/address';
    import type { ParkingEstablishment } from '$lib/models/parking-establishment';
    import type { OperatingHour } from '$lib/models/operating-hour';
    import type { PaymentMethod } from '$lib/models/payment-method';
    import type { PricingPlan } from '$lib/models/pricing-plan';
    import type { SlotInfoInterface } from '$lib/models/slot/slot';
    import { goto } from '$app/navigation';

    interface Slot extends SlotInfoInterface {
        vehicle_type_code: string;
        vehicle_type_name: string;
        vehicle_type_size: string;
    }

    let { data }: { data: PageData } = $props();
    let transactionCheckoutData = data.transaction as unknown as {
        address: Address;
        establishment_info: ParkingEstablishment;
        operating_hours: OperatingHour[];
        payment_methods: PaymentMethod;
        pricing_plans: PricingPlan[];
        slot_info: Slot;
        has_ongoing_transaction: boolean;
    };
    let agreed = $state(false);
    let terms = $state(false);
    let isSubmitting = $state(false);

    let duration = $state(0);
    let totalPrice = $state(0);
    let pricingType = $state<'hourly' | 'daily' | 'monthly'>('hourly');

    const validPricingPlans = transactionCheckoutData.pricing_plans.filter(
        (plan) => plan.rate !== null
    );
    const updateTotalPrice = (
        newDuration: number,
        newPricingType: 'hourly' | 'daily' | 'monthly'
    ) => {
        const pricingPlan = validPricingPlans.find((plan) => plan.rate_type === pricingType);
        if (!pricingPlan) return 0;
        let rate = parseFloat(pricingPlan.rate);
        rate *= transactionCheckoutData.slot_info.slot_multiplier;
        if (transactionCheckoutData.slot_info.is_premium) {
            rate *= 1.2;
        }

        if (newPricingType === 'hourly') {
            totalPrice = duration * rate;
        } else if (newPricingType === 'daily') {
            totalPrice = Math.ceil(duration / 24) * rate;
        } else if (newPricingType === 'monthly') {
            totalPrice = Math.ceil(newDuration / (24 * 30)) * rate;
        } else {
            totalPrice = 0;
        }
    };
</script>

<svelte:head>
    <title
        >{transactionCheckoutData.slot_info.slot_code} | {transactionCheckoutData.establishment_info
            .name}</title
    >
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-7xl">
        <div class="col-span-2 mb-6">
            <a href="/user/dashboard" class="text-blue-500"> &larr; Back to Dashboard</a>
        </div>
        <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <h1 class="text-2xl font-bold text-gray-800">Confirm Your Booking</h1>
            <p class="mt-2 text-gray-600">Please review your booking details below</p>
        </div>

        <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div class="grid gap-6 md:grid-cols-2">
                <div>
                    <h2 class="text-lg font-semibold text-gray-800">Establishment Details</h2>
                    <p class="mt-2 text-gray-600">
                        {transactionCheckoutData.establishment_info.name}
                    </p>
                    <p class="text-gray-600">
                        {transactionCheckoutData.address.street}
                        {transactionCheckoutData.address.city}, {transactionCheckoutData.address
                            .province}
                        {transactionCheckoutData.address.postal_code}
                    </p>
                    <p class="mt-2 text-sm text-gray-500">
                        Base Rate: ₱{validPricingPlans.find((plan) => plan.rate_type === 'hourly')
                            ?.rate}/hour
                    </p>
                </div>
                <div>
                    <h2 class="text-lg font-semibold text-gray-800">Slot Information</h2>
                    <p class="mt-2 text-gray-600">
                        Slot Code: {transactionCheckoutData.slot_info.slot_code}
                    </p>
                    <p class="text-gray-600">
                        Floor Level: {transactionCheckoutData.slot_info.floor_level}
                    </p>
                    <p class="text-gray-600">
                        Vehicle Type: {transactionCheckoutData.slot_info.vehicle_type_name}
                    </p>
                </div>
            </div>
        </div>

        <form
            method="POST"
            class="rounded-lg bg-white p-6 shadow-sm"
            use:enhance={() => {
                isSubmitting = true;
                return ({ result }) => {
                    isSubmitting = false;
                    if (result.type === 'success') {
						alert('Booking confirmed!');
                        goto('/user/transactions');
                    } else {
                        alert(
                            'An error occurred while processing your request. Please try again later.'
                        );
                    }
                };
            }}
        >
            <div class="space-y-6">
                <input type="hidden" name="amountDue" value={totalPrice} />
                <div>
                    <label for="duration" class="block text-sm font-medium text-gray-700">
                        Parking Duration {pricingType === 'hourly'
                            ? '(in hours)'
                            : pricingType === 'daily'
                              ? '(in days)'
                              : '(in months)'}
                    </label>
                    <input
                        type="number"
                        min="1"
                        name="duration"
                        oninput={() => updateTotalPrice(duration, pricingType)}
                        id="duration"
                        max="720"
                        bind:value={duration}
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label for="pricingType" class="block text-sm font-medium text-gray-700">
                        Pricing Type
                    </label>
                    <select
                        id="pricingType"
                        bind:value={pricingType}
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        onchange={() => updateTotalPrice(duration, pricingType)}
                        name="pricingType"
                    >
                        {#each validPricingPlans as plan}
                            <option value={plan.rate_type}
                                >{plan.rate_type.charAt(0).toUpperCase() +
                                    plan.rate_type.slice(1)}</option
                            >
                        {/each}
                    </select>
                </div>

                <div class="rounded-lg bg-gray-50 p-4">
                    <div class="flex justify-between">
                        <p class="mt-2 text-sm text-gray-500">
                            Base Rate: ₱{(
                                parseFloat(
                                    validPricingPlans.find((plan) => plan.rate_type === 'hourly')
                                        ?.rate ?? '0'
                                ) *
                                transactionCheckoutData.slot_info.slot_multiplier *
                                (transactionCheckoutData.slot_info.is_premium ? 1.2 : 1)
                            ).toFixed(2)}/hour
                            {#if transactionCheckoutData.slot_info.is_premium}
                                <span class="text-yellow-600">(Premium Slot)</span>
                            {/if}
                        </p>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Duration:</span>
                        <span
                            >{duration ?? 0}
                            {#if pricingType === 'hourly'}hours{:else if pricingType === 'daily'}days{:else if pricingType === 'monthly'}months{/if}</span
                        >
                    </div>
                    <div class="mt-2 border-t pt-2">
                        <div class="flex justify-between font-semibold">
                            <span>Total Amount:</span>
                            <span>₱{totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-start">
                    <input
                        id="agreed"
                        type="checkbox"
                        value="true"
                        name="agreed"
                        bind:checked={agreed}
                        class="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label for="agreed" class="ml-2 text-sm text-gray-600">
                        I agree to the parking terms and conditions, including the cancellation
                        policy.
                    </label>
                </div>
                <div class="flex items-start">
                    <input
                        id="terms"
                        name="terms"
                        value="true"
                        type="checkbox"
                        bind:checked={terms}
                        class="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label for="terms" class="ml-2 text-sm text-gray-600">
                        I agree that the price indicated here is final regardless if I used the
                        parking slot for a shorter duration. I also agree that the establishment has
                        the right to charge me for any damages incurred during my stay if the
                        establishment can prove that I am responsible for the damages.
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={!agreed ||
                        !terms ||
                        duration <= 0 ||
                        transactionCheckoutData.has_ongoing_transaction}
                    class="flex w-full flex-row items-center justify-center rounded-md bg-indigo-600 p-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 gap-4 {!agreed ||
                    !terms ||
                    duration <= 0
                        ? 'cursor-not-allowed'
                        : ''}"
                >
                    {#if transactionCheckoutData.has_ongoing_transaction}
                        You have an ongoing transaction.
                    {:else}
                        {#if isSubmitting}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <g stroke="currentColor">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9.5"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-width="3"
                                    >
                                        <animate
                                            attributeName="stroke-dasharray"
                                            calcMode="spline"
                                            dur="1.5s"
                                            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                            keyTimes="0;0.475;0.95;1"
                                            repeatCount="indefinite"
                                            values="0 150;42 150;42 150;42 150"
                                        />
                                        <animate
                                            attributeName="stroke-dashoffset"
                                            calcMode="spline"
                                            dur="1.5s"
                                            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                            keyTimes="0;0.475;0.95;1"
                                            repeatCount="indefinite"
                                            values="0;-16;-59;-59"
                                        />
                                    </circle>
                                    <animateTransform
                                        attributeName="transform"
                                        dur="2s"
                                        repeatCount="indefinite"
                                        type="rotate"
                                        values="0 12 12;360 12 12"
                                    />
                                </g>
                            </svg>
                        {/if}
                        Confirm Booking
                    {/if}
                </button>
            </div>
        </form>
    </div>
</div>
