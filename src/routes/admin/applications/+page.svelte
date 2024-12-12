<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	type EstablishmentStatus = 'pending' | 'approved' | 'rejected';
	type SpaceType = 'Indoor' | 'Outdoor' | 'Both';
	type SpaceLayout = 'parallel' | 'perpendicular' | 'angled' | 'custom';

	let statusFilter = $state<EstablishmentStatus | 'all'>('all');
	let searchQuery = $state('');
	let isLoading = $state(false);

	const establishments = [
		{
			establishment_id: 1,
			uuid: '550e8400-e29b-41d4-a716-446655440000',
			name: 'Downtown Parking Complex',
			space_type: 'Indoor' as SpaceType,
			space_layout: 'parallel' as SpaceLayout,
			status: 'pending' as EstablishmentStatus,
			is_24_hours: true,
			created_at: '2024-03-27T10:00:00',
			longitude: 121.058511,
			latitude: 14.734207,
			lighting: 'Full LED lighting with emergency backup',
			accessibility: 'Wheelchair accessible, elevator access',
			nearby_landmarks: 'Near SM Mall, City Hospital'
		}
	];
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

		<!-- Stats -->
		<div class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">Pending Applications</dt>
				<dd class="mt-1 text-3xl font-semibold tracking-tight text-yellow-600">
					{establishments.filter((e) => e.status === 'pending').length}
				</dd>
			</div>
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">Approved Establishments</dt>
				<dd class="mt-1 text-3xl font-semibold tracking-tight text-green-600">
					{establishments.filter((e) => e.status === 'approved').length}
				</dd>
			</div>
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">Rejected Applications</dt>
				<dd class="mt-1 text-3xl font-semibold tracking-tight text-red-600">
					{establishments.filter((e) => e.status === 'rejected').length}
				</dd>
			</div>
		</div>

		<!-- Establishments List -->
		<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each establishments as establishment}
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="p-6">
						<div class="flex items-center justify-between">
							<h3 class="text-lg font-medium text-gray-900">{establishment.name}</h3>
							<span
								class="inline-flex rounded-full px-2 text-xs font-semibold leading-5
                {establishment.status === 'approved'
									? 'bg-green-100 text-green-800'
									: establishment.status === 'pending'
										? 'bg-yellow-100 text-yellow-800'
										: 'bg-red-100 text-red-800'}"
							>
								{establishment.status}
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
								<span>Lat: {establishment.latitude}, Long: {establishment.longitude}</span>
							</div>

							<div class="grid grid-cols-2 gap-4">
								<div>
									<p class="text-sm font-medium text-gray-500">Space Type</p>
									<p class="mt-1 text-sm text-gray-900">{establishment.space_type}</p>
								</div>
								<div>
									<p class="text-sm font-medium text-gray-500">Layout</p>
									<p class="mt-1 text-sm text-gray-900">{establishment.space_layout}</p>
								</div>
								<div>
									<p class="text-sm font-medium text-gray-500">Operating Hours</p>
									<p class="mt-1 text-sm text-gray-900">
										{establishment.is_24_hours ? '24/7' : 'Custom Hours'}
									</p>
								</div>
								<div>
									<p class="text-sm font-medium text-gray-500">Created</p>
									<p class="mt-1 text-sm text-gray-900">
										{new Date(establishment.created_at).toLocaleDateString()}
									</p>
								</div>
							</div>

							<div class="mt-4">
								<p class="text-sm font-medium text-gray-500">Nearby</p>
								<p class="mt-1 text-sm text-gray-900">{establishment.nearby_landmarks}</p>
							</div>
						</div>

						<div class="mt-6 flex justify-end space-x-3">
							<button
								class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							>
								View Details
							</button>
							{#if establishment.status === 'pending'}
								<button
									class="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
								>
									Approve
								</button>
								<button
									class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
								>
									Reject
								</button>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
