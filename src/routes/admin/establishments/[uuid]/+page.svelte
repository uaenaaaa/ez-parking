<script lang="ts">
    import type { PageData } from './$types';
    import type { CompanyProfile } from '$lib/models/company-profile';
    import type { OperatingHour } from '$lib/models/operating-hour';
    import type { ParkingEstablishment } from '$lib/models/parking-establishment';
    import type { ParkingSlot } from '$lib/models/parking-slot';
    import type { PricingPlan } from '$lib/models/pricing-plan';
    import type { PaymentMethod } from '$lib/models/payment-method';
    import type { EstablishmentDocument } from '$lib/models/establishment-document';
    import type { User } from '$lib/models/user';
    import type { VehicleType } from '$lib/models/vehicle-types';
    import { fly } from 'svelte/transition';
    import { enhance } from '$app/forms';

    const slotFeatures = ['standard', 'covered', "vip", "disabled", "ev_charging"] as const;
    const slotStatus = ['open', 'occupied', 'reserved', 'closed'] as const;
    let show = $state(false);

    function closeModal() {
        show = false;
    }

    interface Establishment {
        company_profile: CompanyProfile;
        establishment_documents: EstablishmentDocument[];
        operating_hours: OperatingHour[];
        parking_establishment: ParkingEstablishment;
        payment_methods: PaymentMethod[];
        pricing_plans: PricingPlan[];
        slots: ParkingSlot[];
        user: User;
    }

    let { data }: { data: PageData } = $props();
    let establishment = data.response!.establishment.data as Establishment;
    let vehicleTypes = data.response!.vehicleTypes.data as VehicleType[];
</script>

<svelte:head>
    <title>Admin | Establishment Details</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-7xl">
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">
                {establishment.parking_establishment.name}
            </h1>
            <p class="mt-1 text-sm text-gray-600">Review and manage this parking establishment</p>
        </div>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 class="text-lg font-bold text-gray-900">Applicant Information</h2>
                <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Applicant Name</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.user.first_name}
                            {establishment.user.last_name}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Email Address</p>
                        <p class="mt-1 text-sm text-gray-900">{establishment.user.email}</p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Phone Number</p>
                        <p class="mt-1 text-sm text-gray-900">{establishment.user.phone_number}</p>
                    </div>
                </div>
            </div>
            <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 class="text-lg font-medium text-gray-900">Company Profile</h2>
                <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Company Name</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.company_profile.company_name}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Registration Number</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.company_profile.company_reg_number}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">TIN</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.company_profile.tin}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Owner Type</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.company_profile.owner_type.toUpperCase()}
                        </p>
                    </div>
                </div>
            </div>

            <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 class="text-lg font-bold text-gray-900">Establishment Details</h2>
                <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Space Type</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.parking_establishment.space_type.toUpperCase()}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Space Layout</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.parking_establishment.space_layout.toUpperCase()}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Dimensions</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.parking_establishment.dimensions}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Operating Hours</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.parking_establishment.is24_7 ? '24/7' : 'Custom Hours'}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Lighting</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.parking_establishment.lighting}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Accessibility</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.parking_establishment.accessibility}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Nearby Landmarks</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.parking_establishment.nearby_landmarks}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Access Info</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.parking_establishment.access_info}
                        </p>
                    </div>
                </div>
            </div>

            <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 class="text-lg font-bold text-gray-900">Operating Hours</h2>
                <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {#each establishment.operating_hours as hour}
                        <div>
                            <p class="text-sm font-medium text-gray-500">{hour.day_of_week.toUpperCase()}</p>
                            <p class="mt-1 text-sm text-gray-900">
                                {hour.is_enabled
                                    ? `${hour.opening_time} - ${hour.closing_time}`
                                    : 'Closed'}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-bold text-gray-900">Parking Slots</h2>
                    <button
                        type="button"
                        onclick={() => (show = true)}
                        class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Add New Slot
                    </button>
                </div>
                <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {#each establishment.slots as slot}
                        <div class="rounded-lg bg-gray-50 p-4 shadow-sm">
                            <p class="text-sm font-medium text-gray-500">Slot Code</p>
                            <p class="mt-1 text-sm text-gray-900">{slot.slot_code}</p>
                            <p class="text-sm font-medium text-gray-500">Status</p>
                            <p class="mt-1 text-sm text-gray-900">{slot.slot_status.toUpperCase()}</p>
                            <p class="text-sm font-medium text-gray-500">Features</p>
                            <p class="mt-1 text-sm text-gray-900">{slot.slot_features.toUpperCase()}</p>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 class="text-lg font-bold text-gray-900">Pricing Plans</h2>
                <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {#each establishment.pricing_plans as plan}
                        <div class="rounded-lg bg-gray-50 p-4 shadow-sm">
                            <p class="text-sm font-medium text-gray-500">Rate Type</p>
                            <p class="mt-1 text-sm text-gray-900">{plan.rate_type.toUpperCase()}</p>
                            <p class="text-sm font-medium text-gray-500">Rate</p>
                            <p class="mt-1 text-sm text-gray-900">{plan.rate}</p>
                            <p class="text-sm font-medium text-gray-500">Status</p>
                            <p class="mt-1 text-sm text-gray-900">
                                {plan.is_enabled ? 'Enabled' : 'Disabled'}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 class="text-lg font-bold text-gray-900">Payment Methods</h2>
                <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {#each establishment.payment_methods as method}
                        <div class="rounded-lg bg-gray-50 p-4 shadow-sm">
                            <p class="text-sm font-medium text-gray-500">Cash</p>
                            <p class="mt-1 text-sm text-gray-900">
                                {method.accepts_cash ? 'Yes' : 'No'}
                            </p>
                            <p class="text-sm font-medium text-gray-500">Mobile</p>
                            <p class="mt-1 text-sm text-gray-900">
                                {method.accepts_mobile ? 'Yes' : 'No'}
                            </p>
                            <p class="text-sm font-medium text-gray-500">Other</p>
                            <p class="mt-1 text-sm text-gray-900">
                                {method.accepts_other ? method.other_methods : 'No'}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Establishment Documents -->
            <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 class="text-lg font-bold text-gray-900">Establishment Documents</h2>
                <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {#each establishment.establishment_documents as document}
                        <div class="rounded-lg bg-gray-50 p-4 shadow-sm">
                            <p class="text-sm font-medium text-gray-500">Document Type</p>
                            <p class="mt-1 text-sm text-gray-900">
                                {document.document_type.toUpperCase().replaceAll('_', ' ')}
                            </p>
                            <p class="text-sm font-medium text-gray-500">Filename</p>
                            <p class="mt-1 text-sm text-gray-900">{document.filename}</p>
                            <p class="text-sm font-medium text-gray-500">Status</p>
                            <p class="mt-1 text-sm text-gray-900">{document.status}</p>
                            <p class="text-sm font-medium text-gray-500">Uploaded At</p>
                            <p class="mt-1 text-sm text-gray-900">
                                {new Date(document.uploaded_at).toLocaleDateString()}
                            </p>
                            <!-- View Button -->
                            <a
                                href={`/admin/applications/document/${document.uuid}`}
                                target="_blank"
                                class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                View Document
                            </a>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

{#if show}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur"
        transition:fly
    >
        <div class="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <button
                aria-label="Close Modal"
                class="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                onclick={closeModal}
            >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <h2 class="mb-6 text-2xl font-bold">Add New Parking Slot</h2>

            <form class="space-y-6" method="POST" use:enhance={() => {
                return ({ result }) => {
                    if (result.type == 'success') {
                        alert('Slot added successfully');
                    } else if (result.type == 'failure') {
                        alert('An error occurred while adding the slot: ' + result.data?.error);
                    }
                }
            }}>
                <input
                    type="hidden"
                    name="establishment_id"
                    value={establishment.parking_establishment.establishment_id}
                />
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
                        type="button"
                        class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onclick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        Add Slot
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
