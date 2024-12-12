<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<main class="min-h-screen bg-gray-50">
	<div class="h-screen">
		<nav class="top-0 z-10 w-full">
			<div class="mx-auto max-w-7xl px-4 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<img src="/logo.png" alt="EZ Parking Logo" class="h-16" />
					</div>
					<div class="flex items-center space-x-4">
						<a href="/about" class="text-sm font-medium">About Us</a>
						<a href="/auth/login" class="text-sm font-medium"
							>Login</a
						>
						<a
							href="/auth/owner/sign-up"
							class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-700 text-white"
						>
							For Parking Owners
						</a>
					</div>
				</div>
			</div>
		</nav>

		<div class="relative z-10 flex h-full items-center justify-center px-4 text-center">
			<div class="max-w-3xl" transition:fade>
				<h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
					Find Your Perfect Parking Spot
				</h1>
				<p class="mt-6 text-lg leading-8">
					View real-time availability and book parking spaces instantly. Save time and hassle with
					EZ Parking.
				</p>
				<div class="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/establishment/search"
						class="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Search Parking
					</a>
					<a href="/about" class="text-sm font-semibold leading-6 ">
						Learn more <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="bg-white py-24 sm:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Why Choose EZ Parking?
				</h2>
			</div>
			<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
				<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
					<div class="flex flex-col">
						<dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
							<svg
								class="h-5 w-5 text-indigo-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Real-time Availability
						</dt>
						<dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
							<p class="flex-auto">See available parking spots in real-time and book instantly.</p>
						</dd>
					</div>
					<div class="flex flex-col">
						<dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
							<svg
								class="h-5 w-5 text-indigo-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
								/>
							</svg>
							Secure Booking
						</dt>
						<dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
							<p class="flex-auto">
								Safe and secure booking process.
							</p>
						</dd>
					</div>
					<div class="flex flex-col">
						<dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
							<svg
								class="h-5 w-5 text-indigo-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							Easy Navigation
						</dt>
						<dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
							<p class="flex-auto">
								Get directions to your parking spot with integrated navigation.
							</p>
						</dd>
					</div>
				</dl>
			</div>
		</div>
	</div>
</main>
