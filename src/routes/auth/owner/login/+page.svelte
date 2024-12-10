<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';

	let email = $state('');
	let otp = $state(['', '', '', '', '', '']);
	let showOtpForm = $state(false);
	let isSubmitting = $state(false);
	let errorMessage = $state('');

	function handleOtpInput(index: number, event: Event) {
		const input = event.target as HTMLInputElement;
		otp[index] = input.value;
		if (input.value && index < 5) {
			const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
			nextInput?.focus();
		}
	}

	function handleOtpPaste(event: ClipboardEvent) {
		const paste = event.clipboardData?.getData('text');
		if (paste && paste.length === 6) {
			otp = paste.split('');
		}
	}
</script>

<svelte:head>
	<title>Login | EZ Parking</title>
</svelte:head>

<main class="flex min-h-screen flex-col items-center bg-gray-50">
	<header class="w-full bg-white shadow">
		<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
			<div class="flex lg:flex-1">
				<a href="/" class="-m-1.5 p-1.5">
					<img src="/logo.png" alt="EZ Parking" class="h-10 w-auto" />
				</a>
			</div>
			<div class="flex lg:flex-1 lg:justify-end">
				<a href="/auth/owner/sign-up" class="text-sm font-semibold leading-6 text-gray-900">
					Create Owner Account Instead <span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</nav>
	</header>
	<div class="flex flex-1 items-center flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
		<div class="w-full max-w-md">
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Sign in to your account
			</h2>
		</div>

		<form
			class="mt-8 space-y-6 rounded-lg bg-white p-6 shadow-sm"
			method="POST"
			action="?/login"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ result }) => {
					isSubmitting = false;
					if (result.type === 'success') {
						showOtpForm = true;
					} else {
						errorMessage = result.data?.message || 'Login failed';
					}
				};
			}}
		>
			<input type="hidden" name="remember" value="true" />
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="email-address" class="block text-sm font-medium text-gray-700"
						>Email address</label
					>
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						bind:value={email}
					/>
				</div>
			</div>

			{#if errorMessage}
				<div class="mt-2 text-sm text-red-600">{errorMessage}</div>
			{/if}

			<div class="flex items-center justify-between gap-5">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
					<label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
				</div>

				<div class="text-sm">
					<a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
						Forgot your password?
					</a>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Signing in...' : 'Sign in'}
				</button>
			</div>
		</form>

		<!-- OTP Form -->
		{#if showOtpForm}
			<form
				class="mt-8 space-y-6"
				method="POST"
				action="?/verify-otp"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ result }) => {
						isSubmitting = false;
						if (result.type === 'success') {
							// Handle successful OTP verification
						} else {
							errorMessage = result.data?.message || 'OTP verification failed';
						}
					};
				}}
				transition:fade
			>
				<div class="text-center">
					<h3 class="text-lg font-medium text-gray-900">Enter OTP</h3>
					<p class="mt-2 text-sm text-gray-600">We have sent a 6-digit OTP to your email</p>
				</div>

				<div class="flex justify-center space-x-2">
					{#each otp as digit, index}
						<input
							id={`otp-${index}`}
							type="text"
							maxlength="1"
							class="h-12 w-12 rounded-md border border-gray-300 text-center text-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
							bind:value={otp[index]}
							oninput={(e) => handleOtpInput(index, e)}
							onpaste={handleOtpPaste}
						/>
					{/each}
				</div>

				{#if errorMessage}
					<div class="mt-2 text-sm text-red-600">{errorMessage}</div>
				{/if}

				<div>
					<button
						type="submit"
						class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Verifying...' : 'Verify OTP'}
					</button>
				</div>
			</form>
		{/if}
	</div>
</main>
