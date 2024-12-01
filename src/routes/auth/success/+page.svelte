<script lang="ts">
	import { fade } from 'svelte/transition';
	import { email } from '$lib/state/account-email-registration-data';
	let userEmail = '';

	email.subscribe((value) => {
		userEmail = value;
	});

	function getEmailProvider(userEmail: string) {
		const domain = userEmail.split('@')[1];
		const providers: { [key: string]: string } = {
			'gmail.com': 'https://gmail.com',
			'yahoo.com': 'https://mail.yahoo.com',
			'outlook.com': 'https://outlook.live.com',
			'hotmail.com': 'https://outlook.live.com'
		};
		return providers[domain] || null;
	}
</script>

<main class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md" in:fade>
		<div class="rounded-lg bg-white px-6 py-8 shadow-sm">
			<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
				<svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>

			<h2 class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
				Account Created Successfully!
			</h2>

			<p class="mt-2 text-center text-sm text-gray-600">
				We've sent a verification link to your email address. Please verify your account to
				continue.
			</p>

			<div class="mt-8 rounded-md bg-gray-50 p-4">
				<div class="flex">
					<div class="flex-shrink-0">
						<svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3">
						<h3 class="text-sm font-medium text-blue-800">Verification Required</h3>
						<div class="mt-2 text-sm text-blue-700">
							<p>
								Please check your email at <span class="font-medium">{userEmail}</span> and click the verification
								link.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 space-y-4">
				{#if getEmailProvider(userEmail)}
					<a
						href={getEmailProvider(userEmail)}
						target="_blank"
						rel="noopener noreferrer"
						class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Open Email Provider
					</a>
				{/if}

				<a
					href="/"
					class="flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
				>
					Back to Home
				</a>
			</div>
		</div>
	</div>
</main>
