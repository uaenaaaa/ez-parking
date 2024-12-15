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
    let establishment = data.establishment as Establishment;
</script>

<svelte:head>
    <title>Admin | Establishment Details</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-7xl">
        <!-- Header -->
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
                            {establishment.company_profile.owner_type}
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
                            {establishment.parking_establishment.space_type}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Space Layout</p>
                        <p class="mt-1 text-sm text-gray-900">
                            {establishment.parking_establishment.space_layout}
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

            <!-- Operating Hours -->
            <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 class="text-lg font-bold text-gray-900">Operating Hours</h2>
                <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {#each establishment.operating_hours as hour}
                        <div>
                            <p class="text-sm font-medium text-gray-500">{hour.day_of_week}</p>
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
                <h2 class="text-lg font-bold text-gray-900">Parking Slots</h2>
                <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {#each establishment.slots as slot}
                        <div class="rounded-lg bg-gray-50 p-4 shadow-sm">
                            <p class="text-sm font-medium text-gray-500">Slot Code</p>
                            <p class="mt-1 text-sm text-gray-900">{slot.slot_code}</p>
                            <p class="text-sm font-medium text-gray-500">Status</p>
                            <p class="mt-1 text-sm text-gray-900">{slot.slot_status}</p>
                            <p class="text-sm font-medium text-gray-500">Features</p>
                            <p class="mt-1 text-sm text-gray-900">{slot.slot_features}</p>
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
                            <p class="mt-1 text-sm text-gray-900">{document.document_type.toUpperCase().replaceAll("_", " ")}</p>
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
        <div class="flex justify-end space-x-3">
            <button
                class="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
            >
                Approve
            </button>
            <button
                class="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
                Reject
            </button>
        </div>
    </div>
</div>
