<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import type { User } from '$lib/models/user';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    const userData = data.data as unknown as User;
    const joinDate = new Date(userData.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let isUpdating = $state(false);
</script>

<svelte:head>
    <title>User | Profile</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-3xl">
        <div class="col-span-2 mb-6">
            <a href="/user/dashboard" class="text-blue-500"> &larr; Back to Dashboard</a>
        </div>
        <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div class="flex items-start justify-between">
                <div class="flex items-center space-x-4">
                    <div class="h-16 w-16 overflow-hidden rounded-full bg-indigo-100">
                        <div
                            class="flex h-full w-full items-center justify-center text-2xl font-bold text-indigo-600"
                        >
                            {userData.first_name?.[0]}{userData.last_name?.[0]}
                        </div>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">
                            {userData.first_name}
                            {userData.last_name}
                        </h1>
                        {#if userData.nickname}
                            <p class="text-gray-600">@{userData.nickname}</p>
                        {/if}
                    </div>
                </div>
                {#if userData.is_verified}
                    <span
                        class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                    >
                        Verified Account
                    </span>
                {/if}
            </div>
        </div>

        <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-lg font-semibold text-gray-900">Edit Profile</h2>
            <form
                class="space-y-6"
                method="post"
                use:enhance={() => {
                    isUpdating = true;
                    return ({ result }) => {
                        isUpdating = false;
                        if (result.type === 'success') {
                            alert('Profile updated successfully');
                            goto('/user/profile');
                        } else if (result.type === 'failure') {
                            if (result.data) {
                                alert(result.data.message as string);
                            }
                        }
                    };
                }}
            >
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label for="firstName" class="block text-sm font-medium text-gray-700"
                            >First Name</label
                        >
                        <input
                            type="text"
                            id="firstName"
                            autocomplete="given-name"
                            name="firstName"
                            value={userData.first_name}
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label for="lastName" class="block text-sm font-medium text-gray-700"
                            >Last Name</label
                        >
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            autocomplete="family-name"
                            value={userData.last_name}
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label for="middleName" class="block text-sm font-medium text-gray-700"
                            >Middle Name</label
                        >
                        <input
                            type="text"
                            name="middleName"
                            autocomplete="additional-name"
                            id="middleName"
                            value={userData.middle_name}
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label for="suffix" class="block text-sm font-medium text-gray-700"
                            >Suffix</label
                        >
                        <input
                            type="text"
                            name="suffix"
                            id="suffix"
                            autocomplete="honorific-suffix"
                            value={userData.suffix}
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label for="nickname" class="block text-sm font-medium text-gray-700"
                            >Nickname</label
                        >
                        <input
                            type="text"
                            name="nickname"
                            id="nickname"
                            value={userData.nickname}
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label for="phoneNumber" class="block text-sm font-medium text-gray-700"
                            >Phone Number</label
                        >
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={userData.phone_number}
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        disabled={isUpdating}
                        class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 {isUpdating
                            ? 'cursor-not-allowed opacity-50'
                            : ''}"
                    >
                        {#if isUpdating}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        dur="0.75s"
                                        repeatCount="indefinite"
                                        type="rotate"
                                        values="0 12 12;360 12 12"
                                    />
                                </path>
                            </svg>
                        {:else}
                            Save Changes
                        {/if}
                    </button>
                </div>
            </form>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
            <div class="rounded-lg bg-white p-6 shadow-sm">
                <h2 class="mb-4 text-lg font-semibold text-gray-900">Account Information</h2>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm text-gray-500">Email</p>
                        <p class="text-gray-900">{userData.email}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Role</p>
                        <p class="capitalize text-gray-900">{userData.role}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Member Since</p>
                        <p class="text-gray-900">{joinDate}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Plate Number</p>
                        <p class="text-gray-900">{userData.plate_number}</p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow-sm">
                <h2 class="mb-4 text-lg font-semibold text-gray-900">Account Details</h2>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm text-gray-500">Account ID</p>
                        <p class="text-gray-900">{userData.uuid}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Verification Status</p>
                        <p class="text-gray-900">
                            {userData.is_verified ? 'Verified' : 'Not Verified'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
