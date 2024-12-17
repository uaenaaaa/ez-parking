<script lang="ts">
    import type { UserMinimal } from '$lib/models/user';
    import type { PageData } from './$types';
    import BanModalComponent from './BanModalComponent.svelte';

    let { data }: { data: PageData } = $props();
    let users = $state(data.response?.users.data) as unknown as UserMinimal[];
    let banForm = {
        ban_reason: '',
        ban_start: new Date().toISOString().slice(0, 16),
        ban_end: new Date().toISOString().slice(0, 16),
        is_permanent: false
    };

    let searchQuery = $state('');
    let roleFilter = $state('all');
    let verificationFilter = $state('all');
    let isBanModalOpen = $state(false);
	let flipBanModal = () => isBanModalOpen = !isBanModalOpen;
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

        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
                <label for="search" class="sr-only">Search</label>
                <input
                    type="search"
                    id="search"
                    onkeypress={() => {
                        users = data.response?.users.data.filter((user: UserMinimal) => {
                            return user.first_name
                                ? user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
                                : false;
                        }) as unknown as UserMinimal[];
                    }}
                    bind:value={searchQuery}
                    placeholder="Search users..."
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <select
                    bind:value={roleFilter}
                    onchange={() => {
                        users = data.response?.users.data.filter((user: UserMinimal) => {
                            if (roleFilter === 'all') return true;
                            return user.role === roleFilter;
                        }) as unknown as UserMinimal[];
                    }}
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
                    onchange={() => {
                        users = data.response?.users.data.filter((user: UserMinimal) => {
                            if (verificationFilter === 'all') return true;
                            return user.is_verified === (verificationFilter === 'verified');
                        }) as unknown as UserMinimal[];
                    }}
                    bind:value={verificationFilter}
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="all">All Status</option>
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                </select>
            </div>
        </div>
        {#if users.length === 0}
            <div class="rounded-lg bg-white p-6 shadow">
                <p class="text-center text-gray-500">No users found</p>
            </div>
        {:else}
            <div class="mt-8 flex flex-col">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div
                            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                        >
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >Name</th
                                        >
                                        <th
                                            scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >Email</th
                                        >
                                        <th
                                            scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >Phone</th
                                        >
                                        <th
                                            scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >Role</th
                                        >
                                        <th
                                            scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >Status</th
                                        >
                                        <th
                                            scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
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
                                                            <span
                                                                class="text-sm font-medium leading-none text-white"
                                                            >
                                                                {user.first_name
                                                                    ? user.first_name[0]
                                                                    : ' '}{user.last_name
                                                                    ? user.last_name[0]
                                                                    : ' '}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div class="ml-4">
                                                        <div class="font-medium text-gray-900">
                                                            {user.first_name}
                                                            {user.middle_name
                                                                ? user.middle_name + ' '
                                                                : ''}{user.last_name}
                                                            {user.suffix ?? ''}
                                                        </div>
                                                        <div class="text-gray-500">
                                                            {user.nickname || 'No nickname'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                                >{user.email}</td
                                            >
                                            <td
                                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
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
                                            <td
                                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                            >
                                                {user.plate_number || 'N/A'}
                                            </td>
                                            <td
                                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                                            >
                                                <div class="flex justify-end space-x-2">
                                                    {#if user.role === 'user'}
                                                        <button
                                                            onclick={() => {
                                                                isBanModalOpen = true;
                                                            }}
                                                            class="text-red-600 hover:text-red-900"
                                                            >Ban</button
                                                        >
                                                    {/if}
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
        {/if}
    </div>
</div>
{#if isBanModalOpen}
    <BanModalComponent {banForm} {flipBanModal} />
{/if}
