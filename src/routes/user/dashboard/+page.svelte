<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
    import { fade } from 'svelte/transition';

	let { data }: { data: PageData } = $props();
	let isSidebarOpen = $state(false);

	const navigation = [
		{
			name: 'Dashboard',
			href: '/user/dashboard',
			icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
		},
		{
			name: 'Book Parking',
			href: '/establishment/search',
			icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
		},
		{
			name: 'Transactions',
			href: '/user/transactions',
			icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
		},
		{
			name: 'Profile',
			href: '/user/profile',
			icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
		}
	];
</script>

<div class="min-h-screen bg-gray-50">
	<div class="fixed top-0 z-40 w-full bg-white shadow-sm lg:hidden">
		<div class="flex h-16 items-center justify-between px-4">
			<img src="/logo.png" alt="Logo" class="h-8 w-auto" />
			<button
				type="button"
				class="text-gray-500 hover:text-gray-600"
				onclick={() => (isSidebarOpen = !isSidebarOpen)}
			>
				<span class="sr-only">Open sidebar</span>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>
	</div>

	<div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
		<div class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
			<div class="flex flex-shrink-0 items-center px-4">
				<img src="/logo.png" alt="Logo" class="h-8 w-auto" />
			</div>
			<nav class="mt-8 flex-1 space-y-1 px-2">
				{#each navigation as item}
					<a
						href={item.href}
						class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 {$page
							.url.pathname === item.href
							? 'bg-gray-100 text-gray-900'
							: ''}"
					>
						<svg
							class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
						</svg>
						{item.name}
					</a>
				{/each}
			</nav>

			<div class="flex flex-shrink-0 border-t border-gray-200 p-4">
				<a href="/auth/logout" class="group block w-full flex-shrink-0">
					<div class="flex items-center">
						<div>
							<svg
								class="h-6 w-6 text-gray-400 group-hover:text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Logout</p>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>

	<!-- Mobile sidebar -->
	{#if isSidebarOpen}
		<div class="fixed inset-0 z-40 flex lg:hidden" transition:fade>
			<div
				class="fixed inset-0 bg-gray-600 bg-opacity-75"
				onclick={() => (isSidebarOpen = false)}
			></div>
			<div class="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
				<div class="flex items-center justify-between px-4">
					<img src="/logo.png" alt="Logo" class="h-8 w-auto" />
					<button
						type="button"
						class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						onclick={() => (isSidebarOpen = false)}
					>
						<span class="sr-only">Close sidebar</span>
						<svg
							class="h-6 w-6 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<nav class="mt-5 flex-1 space-y-1 px-2">
					{#each navigation as item}
						<a
							href={item.href}
							class="group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
						>
							<svg
								class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d={item.icon}
								/>
							</svg>
							{item.name}
						</a>
					{/each}

					<a
						href="/auth/logout"
						class="group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
					>
						<svg
							class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
						Logout
					</a>
				</nav>
			</div>
		</div>
	{/if}

	<div class="lg:pl-64">
		<main class="min-h-screen px-4 py-20 sm:px-6 lg:px-8">
			<h1>Hello User</h1>
		</main>
	</div>
</div>
