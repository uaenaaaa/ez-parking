<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let userData = {
		user_id: 1,
		uuid: '550e8400-e29b-41d4-a716-446655440000',
		nickname: 'admin123',
		first_name: 'Admin',
		middle_name: '',
		last_name: 'User',
		suffix: '',
		email: 'admin@example.com',
		phone_number: '+1234567890',
		role: 'admin',
		created_at: '2024-03-27T10:00:00',
		is_verified: true
	};

	let isUpdating = $state(false);
	let showSuccess = $state(false);
</script>

<svelte:head>
    <title>Admin | Account Settings</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-3xl">
		<div class="mb-6">
			<h1 class="text-2xl font-bold text-gray-900">Account Settings</h1>
			<p class="mt-1 text-sm text-gray-600">Manage your account information and preferences</p>
		</div>

		<form class="space-y-8">
			<div class="rounded-lg bg-gray-50 p-6">
				<h3 class="text-sm font-medium text-gray-500">System Information</h3>
				<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label for="user_id" class="block text-sm font-medium text-gray-700">User ID</label>
						<input
							type="text"
                            id="user_id"
							value={userData.user_id}
							disabled
							class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label for="uuid" class="block text-sm font-medium text-gray-700">UUID</label>
						<input
							type="text"
                            id="uuid"
							value={userData.uuid}
							disabled
							class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label for="role" class="block text-sm font-medium text-gray-700">Role</label>
						<input
							type="text"
                            id="role"
							value={userData.role}
							disabled
							class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label for="created_at" class="block text-sm font-medium text-gray-700">Member Since</label>
						<input
                            id="created_at"
							type="text"
							value={new Date(userData.created_at).toLocaleDateString()}
							disabled
							class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h3 class="text-lg font-medium text-gray-900">Personal Information</h3>
				<div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
					<div class="sm:col-span-2">
						<label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
						<input
                            id="first_name"
							type="text"
							bind:value={userData.first_name}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>

					<div class="sm:col-span-2">
						<label for="middle_name" class="block text-sm font-medium text-gray-700">Middle Name</label>
						<input
                        id="middle_name"
							type="text"
							bind:value={userData.middle_name}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>

					<div class="sm:col-span-2">
						<label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
						<input
                        id="last_name"
							type="text"
							bind:value={userData.last_name}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>

					<div class="sm:col-span-2">
						<label for="suffix" class="block text-sm font-medium text-gray-700">Suffix</label>
						<input
                            id="suffix"
							type="text"
							bind:value={userData.suffix}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>

					<div class="sm:col-span-4">
						<label for="nickname" class="block text-sm font-medium text-gray-700">Nickname</label>
						<input
                            id="nickname"
							type="text"
							bind:value={userData.nickname}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h3 class="text-lg font-medium text-gray-900">Contact Information</h3>
				<div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
					<div class="sm:col-span-3">
						<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
						<input
                            id="email"
							type="email"
							value={userData.email}
							disabled
							class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						<p class="mt-2 text-sm text-gray-500">Email cannot be changed for security reasons</p>
					</div>

					<div class="sm:col-span-3">
						<label for="phone_number" class="block text-sm font-medium text-gray-700">Phone Number</label>
						<input
                            id="phone_number"
							type="tel"
							bind:value={userData.phone_number}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>
			</div>

			<div class="flex justify-end">
				<button
					type="submit"
					class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					disabled={isUpdating}
				>
					{isUpdating ? 'Saving...' : 'Save Changes'}
				</button>
			</div>
		</form>

		{#if showSuccess}
			<div class="mt-4 rounded-md bg-green-50 p-4" transition:fade>
				<div class="flex">
					<div class="flex-shrink-0">
						<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-green-800">Successfully saved changes</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
