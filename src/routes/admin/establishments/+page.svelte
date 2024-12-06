<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let searchTerm = $state('');
	let spaceTypeFilter = $state('all');
	let currentPage = $state(1);
	const itemsPerPage = 10;

	// Mock data
	const establishments = [
		{
			establishment_id: 1,
			uuid: '550e8400-e29b-41d4-a716-446655440000',
			name: 'SM Fairview Parking',
			space_type: 'Indoor',
			space_layout: 'parallel',
			is_24_hours: true,
			status: 'approved',
			created_at: '2024-03-27T10:00:00',
			updated_at: '2024-03-27T10:00:00',
			longitude: 121.058511,
			latitude: 14.734207,
			lighting: 'Full LED lighting',
			accessibility: 'Wheelchair accessible',
			nearby_landmarks: 'Near SM Mall'
		}
	];
</script>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-7xl">
		<div class="sm:flex sm:items-center sm:justify-between">
			<div>
				<h1 class="text-2xl font-bold text-gray-900">Approved Establishments</h1>
				<p class="mt-1 text-sm text-gray-600">A list of all approved parking establishments</p>
			</div>

			<div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
				<div class="flex space-x-4">
					<input
						type="search"
						placeholder="Search establishments..."
						bind:value={searchTerm}
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
					<select
						bind:value={spaceTypeFilter}
						class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					>
						<option value="all">All Types</option>
						<option value="Indoor">Indoor</option>
						<option value="Outdoor">Outdoor</option>
						<option value="Both">Both</option>
					</select>
				</div>
			</div>
		</div>

		<div class="mt-8 flex flex-col">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table class="min-w-full divide-y divide-gray-300">
							<thead class="bg-gray-50">
								<tr>
									<th
										scope="col"
										class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Space Type</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Layout</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Hours</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Location</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Last Updated</th
									>
									<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
										<span class="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each establishments as establishment}
									<tr>
										<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
											<div class="font-medium text-gray-900">{establishment.name}</div>
											<div class="text-gray-500">{establishment.nearby_landmarks}</div>
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{establishment.space_type}
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{establishment.space_layout}
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{establishment.is_24_hours ? '24/7' : 'Custom Hours'}
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											<a
												href={`https://www.google.com/maps?q=${establishment.latitude},${establishment.longitude}`}
												target="_blank"
												rel="noopener noreferrer"
												class="text-indigo-600 hover:text-indigo-900"
											>
												View Map
											</a>
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{new Date(establishment.updated_at).toLocaleDateString()}
										</td>
										<td
											class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
										>
											<div class="flex justify-end space-x-3">
												<a
													href={`/admin/establishments/${establishment.uuid}`}
													class="text-indigo-600 hover:text-indigo-900"
												>
													View
												</a>
												<button class="text-red-600 hover:text-red-900"> Suspend </button>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- Pagination -->
		<div
			class="mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
		>
			<div class="flex flex-1 justify-between sm:hidden">
				<button
					class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Previous
				</button>
				<button
					class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Next
				</button>
			</div>
			<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p class="text-sm text-gray-700">
						Showing <span class="font-medium">1</span> to <span class="font-medium">10</span>
						of{' '}
						<span class="font-medium">{establishments.length}</span> results
					</p>
				</div>
				<div>
					<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
						<button
							class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							Previous
						</button>
						<button
							class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							Next
						</button>
					</nav>
				</div>
			</div>
		</div>
	</div>
</div>
