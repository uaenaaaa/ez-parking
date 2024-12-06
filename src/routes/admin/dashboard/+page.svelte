<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	const adminActions = [
		{
			title: 'User Management',
			description: 'View and manage user accounts',
			icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
			href: '/admin/users'
		},
		{
			title: 'Banned Users',
			description: 'Manage banned user accounts',
			icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
			href: '/admin/banned-users'
		},
		{
			title: 'Establishment Applications',
			description: 'Review and approve parking establishments',
			icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
			href: '/admin/applications'
		},
		{
			title: 'Manage Establishments',
			description: 'Oversee all parking establishments',
			icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
			href: '/admin/establishments'
		},
		{
			title: 'Vehicle Types',
			description: 'Manage vehicle categories and rates',
			icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h6a1 1 0 011 1v7m-1 1h1m-1 1a1 1 0 01-1 1h-2a1 1 0 01-1-1',
			href: '/admin/vehicle-types'
		},
		{
			title: 'Account Settings',
			description: 'Manage your account preferences',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
			href: '/admin/settings'
		}
	];
</script>

<svelte:head>
	<title>Admin Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-7xl">
		<div class="mb-6">
			<h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
			<p class="mt-1 text-sm text-gray-600">Manage your platform settings and users</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each adminActions as action}
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
