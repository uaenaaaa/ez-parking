<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import isEmailValid from '$lib/utils/function/email-validation.js';
	import { goto } from '$app/navigation';

	let emailInput: HTMLInputElement;
	let continueButton: HTMLButtonElement;
	let resendButton: HTMLButtonElement;
	let otpInputs: HTMLInputElement[] = [];
	let otpValues = $state(Array(6).fill(''));
	let timerText: HTMLDivElement;
	let errorMessage: HTMLDivElement;
	let errorLoginMessage: HTMLDivElement;
	let otpForm: HTMLFormElement;
	let showOtpForm = $state(false);
	let rememberMe = $state(false);
	let nextRoute = $state('');

	let email = $state('');

	let loggingIn = $state(false);
	let timer = $state(300);

	$effect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		nextRoute = urlParams.get('next') || '';
		console.log('nextRoute', nextRoute);
		document.cookie = `X-CSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		document.cookie = `Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		document.cookie = `csrf_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		document.cookie = `refresh_token_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		emailInput.focus();
	});

	function handleKeydown(index: number, event: KeyboardEvent) {
		if (event.key === 'Backspace' && !otpValues[index] && index > 0) {
			otpInputs[index - 1].focus();
		}
	}

	function startTimer() {
		timer = 300;
		const interval = setInterval(() => {
			if (timer > 0) {
				timer--;
				if (timerText) timerText.textContent = `Get new code in ${timer} seconds`;
			} else {
				clearInterval(interval);
				if (timerText) timerText.textContent = '';
				if (resendButton) resendButton.disabled = false;
			}
		}, 1000);
	}

	async function handleOtpInput(index: number, event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value.replace(/\D/g, '');

		otpValues[index] = value;
		input.value = value;

		if (value && index < otpInputs.length - 1) {
			otpInputs[index + 1].focus();
		}

		const allFilled = otpValues.every((v) => v !== '');
		if (allFilled) {
			otpForm.requestSubmit();
		}
	}
</script>

<main>
	<nav class="navbar">
		<div class="logo">
			<a href="/">
				<img src="./../../logo.png" alt="NearbySpot Logo" />
			</a>
		</div>

		<a href="/auth/user/sign-up">Sign Up </a>
	</nav>

	<div class="container">
		{#if !showOtpForm}
			<div class="login-form" transition:fade>
				<h2>Login</h2>
				<p>Enter your registered email address</p>
				<form
					method="POST"
					action="?/login"
					use:enhance={() => {
						loggingIn = true;
						localStorage.setItem('rememberMe', rememberMe.toString());
						return async ({ result }) => {
							if (result.type === 'success') {
								showOtpForm = true;
								startTimer();
							} else if (result.type === 'failure') {
								if (errorLoginMessage) {
									errorLoginMessage.textContent = result.data?.message || 'Login failed';
									errorLoginMessage.classList.add('error-message', 'mt-4', 'text-center');
								}
							}
							loggingIn = false;
						};
					}}
				>
					<div class="input-group">
						<input
							type="email"
							name="email"
							placeholder="example@domain.com"
							required
							onkeyup={() => isEmailValid(email)}
							bind:this={emailInput}
							bind:value={email}
						/>
					</div>

					<div class="checkbox-container">
						<input type="checkbox" id="rememberMe" name="remember" bind:checked={rememberMe} />
						<label for="rememberMe">Remember Me for 60 days</label>
					</div>

					<button type="submit" disabled={!isEmailValid(email) || loggingIn}> Continue </button>

					<div class="or-divider">
						<span>Or</span>
					</div>

					<div class="social-login">
						<button id="googleButton">
							<img
								src="https://img.icons8.com/color/16/000000/google-logo.png"
								class="social-icon"
								alt="Google"
							/>
							Continue with Google
						</button>

						<button id="facebookButton">
							<img
								src="https://img.icons8.com/color/16/000000/facebook.png"
								class="social-icon"
								alt="Facebook"
							/>
							Continue with Facebook
						</button>
					</div>

					<div class="social-login" style="margin-top: 15px;">
						<button id="appleButton">
							<img
								src="https://img.icons8.com/ios-filled/16/000000/mac-os.png"
								class="social-icon"
								alt="Apple"
							/>
							Continue with Apple
						</button>
					</div>
				</form>
				<div bind:this={errorLoginMessage}></div>
			</div>
		{:else}
			<div class="verification-form" transition:fade>
				<div class="verification-text">
					Enter the 6-digit code sent to <span class="example-number">{email}</span>
				</div>

				<form
					method="post"
					class="input-container"
					use:enhance={() => {
						return async ({ result }) => {
							console.log(result);
							if (result.type === 'success') {
								console.log('redirecting to', result);
								const role: 'parking_manager' | 'user' | 'admin' = result.data!.role;
								if (role === 'admin') {
									goto('/admin/dashboard');
								} else if (role === 'parking_manager') {
									goto('/parking-manager/dashboard');
								} else if (role === 'user') {
									console.log('user');
									goto(nextRoute || '/user/dashboard');
								}
							} else if (result.type === 'error') {
								errorMessage.textContent = result.error;
							}
						};
					}}
					action="?/otp"
					bind:this={otpForm}
				>
					<input type="hidden" name="email" bind:value={email} />
					<input type="hidden" name="remember" bind:value={rememberMe} />
					{#each Array(6) as _, i}
						<input
							type="text"
							name="otp-{i}"
							maxlength="1"
							class="code-input"
							oninput={(e) => handleOtpInput(i, e)}
							onkeydown={(e) => handleKeydown(i, e)}
							bind:this={otpInputs[i]}
						/>
					{/each}
				</form>

				<div class="timer" bind:this={timerText}>
					Get new code in {timer} seconds
				</div>

				<button
					class="resend-button"
					bind:this={resendButton}
					disabled={timer > 0}
					onclick={startTimer}
				>
					Resend Code
				</button>

				<div class="error-message" bind:this={errorMessage}></div>
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		background-color: #f4f4f4;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.navbar {
		position: fixed;
		top: 0;
		width: 100%;
		height: 80px;
		background: #d9d9d9;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		z-index: 100;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.navbar .logo {
		display: flex;
		align-items: center;
	}

	.navbar .logo img {
		height: 110px;
		width: auto;
	}

	.login-form {
		background-color: white;
		padding: 40px;
		border-radius: 15px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
		max-width: 500px;
		width: 100%;
		margin-top: 80px;
	}

	.login-form h2 {
		text-align: center;
		margin-bottom: 15px;
		font-size: 28px;
		color: #333;
	}

	.login-form p {
		text-align: center;
		font-size: 16px;
		color: #666;
		margin-bottom: 25px;
	}

	.login-form .input-group {
		display: flex;
		align-items: center;
		border: 1px solid #ccc;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 20px;
	}

	.login-form input[type='email'] {
		width: 100%;
		padding: 15px;
		border: none;
		border-radius: 0;
		outline: none;
		color: #000;
		font-size: 16px;
	}

	.login-form button {
		width: 100%;
		padding: 15px;
		border: none;
		background-color: #767184;
		color: white;
		font-size: 18px;
		border-radius: 8px;
		cursor: pointer;
		margin-top: 15px;
	}

	.login-form button:disabled {
		background-color: #d9d9d9;
		cursor: not-allowed;
	}

	.login-form button:hover:not(:disabled) {
		background-color: #5c5a6c;
	}

	.login-form .checkbox-container {
		display: flex;
		align-items: center;
		margin-bottom: 25px;
	}

	.login-form input[type='checkbox'] {
		margin-right: 15px;
	}

	.login-form input[type='checkbox']:hover {
		cursor: pointer;
	}

	.error-message {
		color: red;
		font-size: 16px;
		text-align: center;
		margin-bottom: 15px;
	}

	.social-login {
		text-align: center;
		margin-top: 15px;
	}

	.social-login button {
		width: 100%;
		padding: 15px;
		margin-top: 15px;
		background-color: #ffffff;
		border: 1px solid #000000;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000;
		font-size: 18px;
		text-align: center;
	}

	.social-login button:hover {
		background-color: #767184;
		color: #ffffff;
	}

	.or-divider {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 25px 0;
	}

	.or-divider::before,
	.or-divider::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid #ccc;
		margin: 0 15px;
	}

	.or-divider span {
		font-size: 16px;
		color: #666;
	}

	.container {
		text-align: center;
		margin-top: 100px;
		width: 100%;
		display: grid;
		place-items: center;
	}

	.verification-text {
		font-size: 18px;
		color: #333;
		margin-bottom: 20px;
	}

	.example-number {
		font-weight: bold;
		color: #767184;
	}

	.input-container {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-bottom: 20px;
	}

	.input-container input {
		width: 50px;
		height: 50px;
		text-align: center;
		font-size: 24px;
		border: 1px solid #ccc;
		border-radius: 8px;
		outline: none;
	}

	.input-container input:focus {
		border-color: #767184;
	}

	.resend-button {
		background: none;
		border: none;
		color: #767184;
		font-size: 16px;
		cursor: pointer;
		margin-bottom: 10px;
	}

	.resend-button:hover {
		text-decoration: underline;
	}

	.timer {
		font-size: 16px;
		color: #666;
	}

	.error-message {
		color: red;
		margin-top: 10px;
	}
</style>
