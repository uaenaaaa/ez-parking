<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	let errorMessage: HTMLDivElement;
</script>

<svelte:head>
	<title>User Sign Up | EZ Parking</title>
</svelte:head>

<main>
	<div class="registration-form">
		<h2>Sign Up</h2>
		<form
			id="signupForm"
			method="post"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'failure') {
						errorMessage.innerText = result.data?.message as string;
					} else {
						errorMessage.innerText = '';
						goto('/auth/success');
					}
				};
			}}
		>
			<input type="text" id="name" name="first-name" placeholder="First Name" required />
			<input type="text" id="name" name="last-name" placeholder="Last Name" required />
			<input type="email" id="email" name="email" placeholder="Email Address" required />
			<input
				type="tel"
				id="phoneNumber"
				name="phone"
				placeholder="Phone Number (11 digits)"
				required
				minlength="11"
			/>
			<input type="text" id="nickname" name="nickname" placeholder="Nickname" />
			<input
				type="text"
				name="plate-number"
				id="plate-number"
				placeholder="Plate number"
				required
			/>
			<div id="error-message" class="error-message" bind:this={errorMessage}></div>
			<button type="submit">Sign Up</button>
			<a href="/auth/user/login">Login to my account instead</a>
		</form>
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

	.error-message {
		color: red;
		font-size: 14px;
		text-align: center;
		margin-bottom: 10px;
	}
</style>
