<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	let { data }: { data: PageData } = $props();
	let searchTerm = $state('');
	let roleFilter = $state('all');
	let showUnbanModal = $state(false);
	let selectedUser = $state(null);

	const bannedUsers = [
		{
			user_id: 1,
			uuid: '550e8400-e29b-41d4-a716-446655440000',
			nickname: 'john_doe',
			first_name: 'John',
			middle_name: null,
			last_name: 'Doe',
			email: 'john@example.com',
			phone_number: '+1234567890',
			role: 'user',
			ban_reason: 'Multiple parking violations',
			banned_at: '2024-03-25T10:00:00',
			ban_duration: '30 days',
			ban_expires: '2024-04-25T10:00:00'
		}
	];
</script>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-7xl">
		<!-- Header -->
		<div class="mb-6 sm:flex sm:items-center sm:justify-between">
			<div>
				<h1 class="text-2xl font-bold text-gray-900">Banned Users</h1>
				<p class="mt-1 text-sm text-gray-600">View and manage banned user accounts</p>
			</div>

			<!-- Search and Filters -->
			<div class="mt-4 flex flex-col space-y-3 sm:mt-0 sm:flex-row sm:space-x-4 sm:space-y-0">
				<input
					type="search"
					placeholder="Search users..."
					bind:value={searchTerm}
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
				<select
					bind:value={roleFilter}
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				>
					<option value="all">All Roles</option>
					<option value="user">User</option>
					<option value="parking_manager">Parking Manager</option>
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
									<th
										scope="col"
										class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
									>
										User
									</th>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
										Role
									</th>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
										Ban Reason
									</th>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
										Banned On
									</th>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
										Ban Expires
									</th>
									<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
										<span class="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each bannedUsers as user}
									<tr>
										<td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
											<div class="flex items-center">
												<div class="h-10 w-10 flex-shrink-0">
													<span
														class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500"
													>
														<span class="font-medium leading-none text-white">
															{user.first_name[0]}{user.last_name[0]}
														</span>
													</span>
												</div>
												<div class="ml-4">
													<div class="font-medium text-gray-900">
														{user.first_name}
														{user.last_name}
													</div>
													<div class="text-gray-500">{user.email}</div>
												</div>
											</div>
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											<span
												class="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800"
											>
												{user.role}
											</span>
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{user.ban_reason}
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{new Date(user.banned_at).toLocaleDateString()}
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{new Date(user.ban_expires).toLocaleDateString()}
										</td>
										<td
											class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
										>
											<button
												class="text-indigo-600 hover:text-indigo-900"
												on:click={() => {
													selectedUser = user;
													showUnbanModal = true;
												}}
											>
												Review Ban
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Unban Modal -->
	{#if showUnbanModal && selectedUser}
		<div class="fixed inset-0 z-10 overflow-y-auto" transition:fade>
			<div
				class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
			>
				<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				<div
					class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
				>
					<div>
						<div class="mt-3 text-center sm:mt-5">
							<h3 class="text-lg font-medium leading-6 text-gray-900">
								Review Ban for {selectedUser.first_name}
								{selectedUser.last_name}
							</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									Are you sure you want to remove the ban for this user? This action cannot be
									undone.
								</p>
							</div>
						</div>
					</div>
					<div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
						<button
							type="button"
							class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
							on:click={() => {
								// Handle unban logic here
								showUnbanModal = false;
								selectedUser = null;
							}}
						>
							Unban User
						</button>
						<button
							type="button"
							class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
							on:click={() => {
								showUnbanModal = false;
								selectedUser = null;
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
