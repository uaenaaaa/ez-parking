<script lang="ts">
    import type { PageData } from './$types';
    import { NavigationEstablishmentCoords } from '$lib/state/navigation_establishment_coords';
    import calculateDistance from '$lib/utils/function/calculate-distance';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import type { ParkingEstablishment } from '$lib/models/parking-establishment';
    import type { ParkingSlot } from '$lib/models/parking-slot';
    import type { Transaction } from '$lib/models/transaction';
    import type { Address } from '$lib/models/address';

    let { data }: { data: PageData } = $props();
    const transactionDetails = data.transaction as unknown as {
        establishment_info: ParkingEstablishment;
        slot_info: ParkingSlot & {
            vehicle_type_code: string;
            vehicle_type_name: string;
            vehicle_type_size: string;
        };
        qr_code: string;
        transaction_data: Transaction;
        address_info: Address;
        user_plate_number: string;
		contact_number: string;
    };
    let isModalOpen = $state(false);
    let establishmentLatitude = $state(0);
    let establishmentLongitude = $state(0);
    let userLatitude = $state(0);
    let userLongitude = $state(0);
    let isCancelModalOpen = $state(false);
    let mapUrl = $state(
        `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${transactionDetails.establishment_info.latitude},${transactionDetails.establishment_info.longitude}+(${encodeURIComponent(transactionDetails.establishment_info.name)})&t=&z=14&ie=UTF8&iwloc=B&output=embed`
    );

    $effect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLatitude = position.coords.latitude;
                userLongitude = position.coords.longitude;
            },
            (error) => {
                alert('Error getting user location');
            },
            {
                enableHighAccuracy: true
            }
        );
        return () => {
            NavigationEstablishmentCoords.set({
                latitude: 0,
                longitude: 0
            });
        };
    });
</script>
<svelte:head>
    <title>
        Transaction Details | {transactionDetails.establishment_info.name}
    </title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-screen-2xl">
        <div class="col-span-2 mb-6">
            <a href="/user/dashboard" class="text-blue-500"> &larr; Back to Dashboard</a>
        </div>
        <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-semibold text-gray-900">Transaction Details</h1>
                    <p class="mt-1 text-sm text-gray-500">
                        Transaction #{transactionDetails.transaction_data.transaction_id}
                    </p>
                </div>
                <div class="flex items-center space-x-2">
                    {#if transactionDetails.transaction_data.status != 'cancelled'}
                        <span
                            class="inline-flex rounded-full px-3 py-1 text-xs font-medium
            {transactionDetails.transaction_data.payment_status === 'PAID'
                                ? 'bg-green-100 text-green-800'
                                : transactionDetails.transaction_data.payment_status ===
                                    'PARTIALLY_PAID'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : transactionDetails.transaction_data.payment_status === 'OVERDUE'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'}"
                        >
                            {transactionDetails.transaction_data.payment_status}
                        </span>
                    {/if}

                    <span
                        class="inline-flex rounded-full px-3 py-1 text-xs font-medium
            {transactionDetails.transaction_data.status === 'active'
                            ? 'bg-blue-100 text-blue-800'
                            : transactionDetails.transaction_data.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : transactionDetails.transaction_data.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'}"
                    >
                        {transactionDetails.transaction_data.status}
                    </span>
                </div>
            </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
            <div class="md:col-span-2">
                <div class="rounded-lg bg-white p-6 shadow-sm">
                    <h2 class="text-lg font-medium text-gray-900">Vehicle Details</h2>
                    <dl class="mt-4 space-y-3">
                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Plate Number</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {transactionDetails.user_plate_number}
                            </dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Vehicle Type</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {transactionDetails.slot_info.vehicle_type_name}
                            </dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Size Category</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {transactionDetails.slot_info.vehicle_type_size}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div class="md:col-span-2">
                <div class="rounded-lg bg-white p-6 shadow-sm">
                    <h2 class="text-lg font-medium text-gray-900">Establishment Details</h2>
                    <dl class="mt-4 space-y-3">
                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Name</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {transactionDetails.establishment_info.name}
                            </dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Address</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {transactionDetails.address_info.street}
                                {transactionDetails.address_info.city}{' '}
                                {transactionDetails.address_info.province}
                                {transactionDetails.address_info.postal_code}
                            </dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Contact Number</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {transactionDetails.contact_number}
                            </dd>
                        </div>
                        {#if transactionDetails.transaction_data.status === 'reserved'}
                            <div class="flex justify-between">
                                <dt class="text-sm text-gray-500">Distance</dt>
                                <dd class="text-sm font-medium text-gray-900">
                                    Approximately
                                    {calculateDistance(
                                        establishmentLatitude,
                                        establishmentLongitude,
                                        userLatitude,
                                        userLongitude
                                    ).toFixed(1)}{' '}
                                    km away
                                </dd>
                            </div>
                        {/if}

                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Get Directions thru</dt>
                            <dd class="flex flex-row gap-5 text-sm font-medium text-gray-900">
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${transactionDetails.establishment_info.latitude},${transactionDetails.establishment_info.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-indigo-600 hover:underline"
                                >
                                    Google Maps
                                </a>

                                <a
                                    href={`https://www.waze.com/ul?ll=${transactionDetails.establishment_info.latitude},${transactionDetails.establishment_info.longitude}&navigate=yes`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-indigo-600 hover:underline"
                                >
                                    Waze
                                </a>

                                <a
                                    class="text-indigo-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`/establishment/${transactionDetails.establishment_info.latitude}/${
                                        transactionDetails.establishment_info.longitude
                                    }/`}
                                >
                                    Our Map
                                </a>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow-sm">
                <h2 class="text-lg font-medium text-gray-900">Timing Details</h2>
                <dl class="mt-4 space-y-3">
                    <div class="flex justify-between">
                        <dt class="text-sm text-gray-500">Entry Time</dt>
                        <dd class="text-sm font-medium text-gray-900">
                            {#if transactionDetails.transaction_data.entry_time != 'Not Available'}
                                {new Date(
                                    transactionDetails.transaction_data.entry_time
                                ).toLocaleString()}
                            {:else}
                                Not Available
                            {/if}
                        </dd>
                    </div>
                    {#if transactionDetails.transaction_data.exit_time}
                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Exit Time</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {#if transactionDetails.transaction_data.exit_time != 'Not Available'}
                                    {new Date(
                                        transactionDetails.transaction_data.exit_time
                                    ).toLocaleString()}
                                {:else}
                                    Not Available
                                {/if}
                            </dd>
                        </div>
                    {/if}
                    <div class="flex justify-between">
                        <dt class="text-sm text-gray-500">Amount Due</dt>
                        <dd class="text-sm font-medium text-gray-900">
                            ₱{transactionDetails.transaction_data.amount_due ?? '0.00'}
                        </dd>
                    </div>
                </dl>
            </div>

            <div class="space-y-6">
                <div class="rounded-lg bg-white p-6 shadow-sm">
                    <h2 class="text-lg font-medium text-gray-900">Slot Details</h2>
                    <dl class="mt-4 space-y-3">
                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Slot Code</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {transactionDetails.slot_info.slot_code}
                            </dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Floor Level</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                Level {transactionDetails.slot_info.floor_level}
                            </dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-sm text-gray-500">Features</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {transactionDetails.slot_info.slot_features}
                                {#if transactionDetails.slot_info.is_premium}
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
            {#if transactionDetails.qr_code && ['active', 'reserved'].includes(transactionDetails.transaction_data.status)}
                <div class="rounded-lg bg-white p-6 shadow-sm md:col-span-2">
                    <h2 class="text-lg font-medium text-gray-900">Scan QR Code</h2>
                    <div class="mt-4 flex flex-col items-center">
                        <img
                            src={`data:image/png;base64,${transactionDetails.qr_code}`}
                            alt="Transaction QR Code"
                            class="w-1/3"
                        />
                        <button
                            class="w-fit rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
                            onclick={() => (isModalOpen = true)}
                        >
                            View Larger
                        </button>
                        <p class="mt-2 text-sm text-gray-500">
                            Show this QR code to the parking attendant
                        </p>
                    </div>
                </div>
            {/if}

            <div class="rounded-lg bg-white p-6 shadow-sm md:col-span-2">
                <h2 class="text-lg font-medium text-gray-900">
                    {transactionDetails.establishment_info.name} Location
                </h2>
                <div class="aspect-square h-96 w-full overflow-hidden rounded-lg">
                    <iframe
                        frameborder="0"
                        marginheight="0"
                        marginwidth="0"
                        title={transactionDetails.establishment_info.name}
                        src={mapUrl}
                        class="h-96 w-full"
                    ></iframe>
                </div>
            </div>
        </div>
    </div>

    {#if isModalOpen}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg"
            onclick={() => (isModalOpen = false)}
            aria-roledescription="modal"
        >
            <div
                class="relative max-h-[90vh] max-w-[90vw]"
                onclick={(e) => {
                    e.stopPropagation();
                }}
            >
                <button
                    class="absolute -top-10 right-0 text-white hover:text-gray-300"
                    onclick={() => (isModalOpen = false)}
                >
                    Close
                </button>
                <img
                    src={`data:image/png;base64,${transactionDetails.qr_code}`}
                    alt="Transaction QR Code (Large)"
                    class="max-h-[80vh] max-w-[80vw] rounded-lg"
                />
            </div>
        </div>
    {/if}

    <div class="mt-6 flex justify-end md:col-span-2">
        <button
            type="button"
            disabled={transactionDetails.transaction_data.status === 'cancelled'}
            class="rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-offset-2 {transactionDetails.transaction_data.status === 'cancelled'
                ? 'cursor-not-allowed  bg-red-200' : 'cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2'}"
            onclick={transactionDetails.transaction_data.status === 'cancelled'
                ? undefined
                : () => (isCancelModalOpen = true)}
        >
            {transactionDetails.transaction_data.status === 'cancelled'
                ? 'Transaction Cancelled'
                : 'Cancel Transaction'}
        </button>
    </div>

    {#if isCancelModalOpen}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onclick={() => (isCancelModalOpen = false)}
        >
            <div
                class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
                onclick={(e) => e.stopPropagation()}
            >
                <div class="mb-4 flex items-center">
                    <div
                        class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100"
                    >
                        <svg
                            class="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900">Cancel Transaction</h3>
                </div>

                <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        Are you sure you want to cancel this transaction? This action cannot be
                        undone.
                    </p>
                </div>

                <div class="mt-6 flex justify-end space-x-4">
                    <button
                        type="button"
                        class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onclick={() => (isCancelModalOpen = false)}
                    >
                        No, keep it
                    </button>
                    <form
                        method="POST"
                        use:enhance={() => {
                            isCancelModalOpen = false;
                            goto('/user/transactions');
                        }}
                    >
                        <button
                            type="submit"
                            class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Yes, cancel transaction
                        </button>
                    </form>
                </div>
            </div>
        </div>
    {/if}
</div>
