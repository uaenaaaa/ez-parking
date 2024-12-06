<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	let { data }: { data: PageData } = $props();

	// Mock data for demonstration
	const users = [
		{
			user_id: 1,
			uuid: '550e8400-e29b-41d4-a716-446655440000',
			nickname: 'johndoe',
			first_name: 'John',
			middle_name: null,
			last_name: 'Doe',
			suffix: null,
			email: 'john@example.com',
			phone_number: '+1234567890',
			role: 'user',
			plate_number: 'ABC-123',
			is_verified: true,
			created_at: '2024-03-27T10:00:00'
		}
	];

	let searchQuery = $state('');
	let roleFilter = $state('all');
	let verificationFilter = $state('all');
</script>

<svelte:head>
	<title>Admin | Users</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-7xl">
		<!-- Header -->
		<div class="mb-6 sm:flex sm:items-center sm:justify-between">
			<div>
				<h1 class="text-2xl font-bold text-gray-900">Users</h1>
				<p class="mt-1 text-sm text-gray-600">Manage user accounts and permissions</p>
			</div>
			<div class="mt-4 sm:mt-0">
				<button
					type="button"
					class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Export Users
				</button>
			</div>
		</div>

		<!-- Filters -->
		<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
			<div>
				<label for="search" class="sr-only">Search</label>
				<input
					type="search"
					id="search"
					bind:value={searchQuery}
					placeholder="Search users..."
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			<div>
				<select
					bind:value={roleFilter}
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				>
					<option value="all">All Roles</option>
					<option value="user">User</option>
					<option value="parking_manager">Parking Manager</option>
					<option value="admin">Admin</option>
				</select>
			</div>
			<div>
				<select
					bind:value={verificationFilter}
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				>
					<option value="all">All Status</option>
					<option value="verified">Verified</option>
					<option value="unverified">Unverified</option>
				</select>
			</div>
		</div>

		<!-- Users Table -->
		<div class="mt-8 flex flex-col">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table class="min-w-full divide-y divide-gray-300">
							<thead class="bg-gray-50">
								<tr>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Name</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Email</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Phone</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Role</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Status</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Plate Number</th
									>
									<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
										<span class="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each users as user}
									<tr>
										<td class="whitespace-nowrap px-3 py-4">
											<div class="flex items-center">
												<div class="h-10 w-10 flex-shrink-0">
													<span
														class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500"
													>
														<span class="text-sm font-medium leading-none text-white">
															{user.first_name[0]}{user.last_name[0]}
														</span>
													</span>
												</div>
												<div class="ml-4">
													<div class="font-medium text-gray-900">
														{user.first_name}
														{user.middle_name ? user.middle_name + ' ' : ''}{user.last_name}
														{user.suffix || ''}
													</div>
													<div class="text-gray-500">{user.nickname || 'No nickname'}</div>
												</div>
											</div>
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
											>{user.phone_number}</td
										>
										<td class="whitespace-nowrap px-3 py-4 text-sm">
											<span
												class="inline-flex rounded-full px-2 text-xs font-semibold leading-5
                        {user.role === 'admin'
													? 'bg-purple-100 text-purple-800'
													: user.role === 'parking_manager'
														? 'bg-blue-100 text-blue-800'
														: 'bg-green-100 text-green-800'}"
											>
												{user.role}
											</span>
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm">
											<span
												class={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
													user.is_verified
														? 'bg-green-100 text-green-800'
														: 'bg-yellow-100 text-yellow-800'
												}`}
											>
												{user.is_verified ? 'Verified' : 'Unverified'}
											</span>
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{user.plate_number || 'N/A'}
										</td>
										<td
											class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
										>
											<div class="flex justify-end space-x-2">
												<button class="text-indigo-600 hover:text-indigo-900">Edit</button>
												<button class="text-red-600 hover:text-red-900">Ban</button>
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
					>Previous</button
				>
				<button
					class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>Next</button
				>
			</div>
			<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p class="text-sm text-gray-700">
						Showing <span class="font-medium">1</span> to <span class="font-medium">10</span>
						of{' '}
						<span class="font-medium">97</span> results
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
