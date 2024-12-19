<script lang="ts">
    const actionCards = [
        {
            title: 'Quick Actions',
            items: [
                {
                    name: 'Scan Entry QR',
                    href: '/parking-manager/entry',
                    icon: 'qr-code-in',
                    description: 'Scan QR code for vehicle entry'
                },
                {
                    name: 'Scan Exit QR',
                    href: '/parking-manager/exit',
                    icon: 'qr-code-out',
                    description: 'Scan QR code for vehicle exit'
                }
            ]
        },
        {
            title: 'Manage Parking',
            items: [
                {
                    name: 'Add Slot',
                    href: '/parking-manager/new/slot',
                    icon: 'plus',
                    description: 'Add new parking slots'
                },
                {
                    name: 'Manage Slots',
                    href: '/parking-manager/manage-parking-lot',
                    icon: 'parking',
                    description: 'Update parking details and settings'
                },
                {
                    name: 'Set Schedule',
                    href: '/parking-manager/schedule',
                    icon: 'clock',
                    description: 'Manage operating hours'
                }
            ]
        },
        {
            title: 'Staff Management',
            items: [
                {
                    name: 'Manage Cashiers',
                    href: '/parking-manager/manage-cashiers',
                    icon: 'users',
                    description: 'Add or remove cashier accounts'
                }
            ]
        },
        {
            title: 'Reports & Analytics',
            items: [
                {
                    name: 'Transactions',
                    href: '/parking-manager/transactions',
                    icon: 'receipt',
                    description: 'View transaction history'
                },
                {
                    name: 'Reports',
                    href: '/parking-manager/reports',
                    icon: 'chart',
                    description: 'View analytics and reports'
                },
                {
                    name: 'Account',
                    href: '/parking-manager/account-settings',
                    icon: 'settings',
                    description: 'Manage account settings'
                }
            ]
        }
    ];
</script>

<svelte:head>
    <title>Parking Manager Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="fixed top-0 z-50 w-full bg-white shadow-sm">
        <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
            <div class="flex items-center">
                <img src="/logo.png" alt="EZ Parking" class="h-16 w-auto" />
            </div>
            <div class="flex items-center space-x-4">
                <a href="/auth/logout" class="text-sm text-gray-600 hover:text-gray-900" data-sveltekit-preload-data="tap"
				>Logout</a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 pb-8 pt-24">
        <h1 class="mb-8 text-2xl font-bold text-gray-900">Parking Manager Dashboard</h1>

        {#each actionCards as section}
            <div class="mb-8">
                <h2 class="mb-4 text-lg font-semibold text-gray-700">{section.title}</h2>
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {#each section.items as item}
                        <a
                            href={item.href}
                            class="group rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                        >
                            <div class="flex items-start space-x-4">
                                <div class="rounded-lg bg-indigo-100 p-3 text-indigo-600">
                                    <svg
                                        class="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3
                                        class="font-medium text-gray-900 group-hover:text-indigo-600"
                                    >
                                        {item.name}
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-500">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        {/each}
    </main>
</div>
