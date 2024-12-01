<svelte:head>
	<title>Sign Up</title>
</svelte:head>
<main>
	<div class="registration-form">
		<h2>Sign Up</h2>
		<form id="signupForm">
			<!-- Name -->
			<input type="text" id="name" name="name" placeholder="First Name" required />
			<input type="text" id="name" name="name" placeholder="Last Name" required />

			<!-- Email -->
			<input type="email" id="email" name="email" placeholder="Email Address" required />

			<!-- Phone Number -->
			<input
				type="tel"
				id="phoneNumber"
				name="phone"
				placeholder="Phone Number (11 digits)"
				required
				minlength="11"
			/>

			<!-- Password -->
			<input
				type="password"
				id="password"
				name="password"
				placeholder="Password (min 8 characters)"
				required
				minlength="11"
			/>

			<!-- Confirm Password -->
			<input
				type="password"
				id="confirmPassword"
				name="confirmPassword"
				placeholder="Confirm Password"
				required
			/>

			<!-- Remember Me Checkbox -->
			<div class="checkbox-container">
				<input type="checkbox" id="rememberMe" name="remember" />
				<label for="rememberMe">Remember Me on this device</label>
			</div>

			<!-- Error Message Display -->
			<div id="error-message" class="error-message"></div>

			<!-- Continue Button -->
			<button type="submit">Sign Up</button>
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

	.registration-form {
		background-color: white;
		padding: 30px;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		width: 100%;
	}

	.registration-form h2 {
		text-align: center;
		margin-bottom: 20px;
		font-size: 24px;
		color: #333;
	}

	.registration-form input {
		width: 100%;
		padding: 10px;
		margin: 10px 0;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.registration-form button {
		width: 100%;
		padding: 10px;
		border: none;
		background-color: #1a4862;
		color: white;
		font-size: 16px;
		border-radius: 5px;
		cursor: pointer;
	}

	.registration-form button:hover {
		background-color: #14576c;
	}

	.registration-form .checkbox-container {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.registration-form input[type='checkbox'] {
		margin-right: 10px;
	}

	.error-message {
		color: red;
		font-size: 14px;
		text-align: center;
		margin-bottom: 10px;
	}
</style>
