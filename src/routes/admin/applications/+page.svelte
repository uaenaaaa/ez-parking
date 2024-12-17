<script lang="ts">
    import type { PageData } from './$types';

    interface Applicant {
        company_profile: {
            company_name: string;
            company_reg_number: string;
            created_at: string;
            owner_type: string;
            profile_id: number;
            tin: string;
            updated_at: string;
            user_id: any;
        };
        establishment: {
            access_info: string;
            accessibility: string;
            created_at: string;
            custom_access: string;
            custom_layout: string;
            dimensions: string;
            establishment_id: number;
            facilities: string;
            is24_7: boolean;
            latitude: number;
            lighting: string;
            longitude: number;
            name: string;
            nearby_landmarks: string;
            profile_id: number;
            space_layout: string;
            space_type: string;
            updated_at: string;
            uuid: string;
            verified: boolean;
        };
    }

    let { data }: { data: PageData } = $props();
    let applicants = data.applicants as Applicant[];

    type EstablishmentStatus = 'pending' | 'approved' | 'rejected';
    type SpaceType = 'Indoor' | 'Outdoor' | 'Both';
    type SpaceLayout = 'parallel' | 'perpendicular' | 'angled' | 'custom';

    let statusFilter = $state<EstablishmentStatus | 'all'>('all');
    let searchQuery = $state('');
    let isLoading = $state(false);
</script>

<svelte:head>
    <title>Admin | Establishments</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-7xl">
        <!-- Header -->
        <div class="mb-6 sm:flex sm:items-center sm:justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Parking Establishments</h1>
                <p class="mt-1 text-sm text-gray-600">
                    Manage and review parking establishment applications
                </p>
            </div>
            <div class="mt-4 flex space-x-3 sm:mt-0">
                <div class="relative">
                    <select
                        bind:value={statusFilter}
                        class="block w-full rounded-md border-gray-300 py-2 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <input
                    type="search"
                    placeholder="Search establishments..."
                    bind:value={searchQuery}
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
        </div>

        <!-- Establishments List -->
        <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {#each applicants as applicant}
                <div class="overflow-hidden rounded-lg bg-white shadow">
                    <div class="p-6">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-medium text-gray-900">
                                {applicant.establishment.name}
                            </h3>
                            <span
                                class="inline-flex rounded-full px-2 text-xs font-semibold leading-5
                  {applicant.establishment.verified
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'}"
                            >
                                {applicant.establishment.verified ? 'Approved' : 'Pending'}
                            </span>
                        </div>

                        <div class="mt-4">
                            <div class="mb-2 flex items-center text-sm text-gray-500">
                                <svg
                                    class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    />
                                </svg>
                                <span
                                    >Lat: {applicant.establishment.latitude}, Long: {applicant
                                        .establishment.longitude}</span
                                >
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Space Type</p>
                                    <p class="mt-1 text-sm text-gray-900">
                                        {applicant.establishment.space_type.toUpperCase()}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Layout</p>
                                    <p class="mt-1 text-sm text-gray-900">
                                        {applicant.establishment.space_layout.toUpperCase()}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Operating Hours</p>
                                    <p class="mt-1 text-sm text-gray-900">
                                        {applicant.establishment.is24_7 ? '24/7' : 'Custom Hours'}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Created</p>
                                    <p class="mt-1 text-sm text-gray-900">
                                        {new Date(
                                            applicant.establishment.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div class="mt-4">
                                <p class="text-sm font-medium text-gray-500">Nearby</p>
                                <p class="mt-1 text-sm text-gray-900">
                                    {applicant.establishment.nearby_landmarks}
                                </p>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-end space-x-3">
                            <a href={`/admin/applications/${applicant.establishment.uuid}`}
                                class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                View Details
                            </a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
