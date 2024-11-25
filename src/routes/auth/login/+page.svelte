<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	let emailInput: HTMLInputElement;
	let continueButton: HTMLButtonElement;
	let email = $state('');
	let isValidEmail = $state(false);

	let loggingIn = $state(false);

	onMount(() => {
		emailInput.focus();
	});

	function handleSocialLogin(provider: string) {
		window.location.href = `/auth/${provider}?email=${encodeURIComponent(email)}`;
	}

	function checkEmailValidity(email: string) {
		if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
			isValidEmail = true;
		} else {
			isValidEmail = false;
		}
	}
</script>

<main>
	<nav class="navbar">
		<div class="logo">
			<a href="nearby.html">
				<img src="./../logo.png" alt="NearbySpot Logo" />
			</a>
		</div>
	</nav>

	<div class="registration-form">
		<h2>Secured Login</h2>
		<p>Enter your registered email address</p>
		<form
			id="registrationForm"
			method="POST"
			action="?/login"
			use:enhance={() => {
				loggingIn = true;

				return async ({ update }) => {
					await update();
					loggingIn = false;
				};
			}}
		>
			<div class="input-group">
				<input
					type="email"
					id="email"
					name="email"
					placeholder="example@domain.com"
					required
					onkeydown={() => checkEmailValidity(email)}
					bind:this={emailInput}
					bind:value={email}
				/>
			</div>

			<div class="checkbox-container">
				<input type="checkbox" id="rememberMe" name="remember" />
				<label for="rememberMe">Remember Me on this device for 60 days.</label>
			</div>

			<div id="error-message" class="error-message"></div>

			<button
				type="submit"
				id="continueButton"
				disabled={!isValidEmail || loggingIn}
				bind:this={continueButton}
			>
				Continue
			</button>

			<div class="or-divider">
				<span>Or</span>
			</div>

			<div class="social-login">
				<button type="button" onclick={() => handleSocialLogin('google')}>
					<img
						src="https://img.icons8.com/color/16/000000/google-logo.png"
						class="social-icon"
						alt="Google"
					/>
					Continue with Google
				</button>

				<button type="button" onclick={() => handleSocialLogin('facebook')}>
					<img
						src="https://img.icons8.com/color/16/000000/facebook.png"
						class="social-icon"
						alt="Facebook"
					/>
					Continue with Facebook
				</button>
			</div>

			<div class="social-login" style="margin-top: 15px;">
				<button type="button" onclick={() => handleSocialLogin('apple')}>
					<img
						src="https://img.icons8.com/ios-filled/16/000000/mac-os.png"
						class="social-icon"
						alt="Apple"
					/>
					Continue with Apple
				</button>
			</div>
		</form>
	</div>
</main>

<style>
	main {
		font-family: Arial, sans-serif;
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

	.registration-form {
		background-color: white;
		padding: 40px;
		border-radius: 15px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
		max-width: 500px;
		width: 100%;
		margin-top: 80px;
	}

	.registration-form h2 {
		text-align: center;
		margin-bottom: 15px;
		font-size: 28px;
		color: #333;
	}

	.registration-form p {
		text-align: center;
		font-size: 16px;
		color: #666;
		margin-bottom: 25px;
	}

	.registration-form .input-group {
		display: flex;
		align-items: center;
		border: 1px solid #ccc;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 20px;
	}

	.registration-form input[type='email'] {
		width: 100%;
		padding: 15px;
		border: none;
		border-radius: 0;
		outline: none;
		color: #000;
		font-size: 16px;
	}

	.registration-form button {
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

	.registration-form button:disabled {
		background-color: #d9d9d9;
		cursor: not-allowed;
	}

	.registration-form button:hover:not(:disabled) {
		background-color: #5c5a6c;
	}

	.registration-form .checkbox-container {
		display: flex;
		align-items: center;
		margin-bottom: 25px;
	}

	.registration-form input[type='checkbox'] {
		margin-right: 15px;
	}

	.registration-form input[type='checkbox']:hover {
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
</style>
