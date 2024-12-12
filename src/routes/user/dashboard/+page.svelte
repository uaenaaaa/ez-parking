<script lang="ts">
    import type { PageData } from './$types';
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';

    let { data }: { data: PageData } = $props();

    const userActions = [
        {
            title: 'Dashboard',
            description: 'View your dashboard',
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
            href: '/user/dashboard'
        },
        {
            title: 'Book Parking',
            description: 'Find and book parking spaces',
            icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
            href: '/establishment/search'
        },
        {
            title: 'Transactions',
            description: 'View your transaction history',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
            href: '/user/transactions'
        },
        {
            title: 'Profile',
            description: 'Manage your profile settings',
            icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
            href: '/user/profile'
        },
        {
            title: 'Logout',
            description: 'Sign out of your account',
            icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1',
            href: '/auth/logout'
        }
    ];
</script>

<svelte:head>
    <title>User Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
    <div class="mx-auto max-w-7xl">
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">User Dashboard</h1>
            <p class="mt-1 text-sm text-gray-600">Manage your activities and settings</p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {#each userActions as action}
                <a
                    href={action.href}
                    class="group relative rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <div>
                        <span class="inline-flex rounded-lg bg-indigo-50 p-3">
                            <svg
                                class="h-6 w-6 text-indigo-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d={action.icon}
                                />
                            </svg>
                        </span>
                    </div>
                    <div class="mt-8">
                        <h3 class="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                            {action.title}
                        </h3>
                        <p class="mt-2 text-sm text-gray-500">
                            {action.description}
                        </p>
                    </div>
                    <span
                        class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-indigo-400"
                        aria-hidden="true"
                    >
                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                            />
                        </svg>
                    </span>
                </a>
            {/each}
        </div>
    </div>
</div>
