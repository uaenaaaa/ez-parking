<script lang="ts">
	// Form data interface
	interface FormData {
		ownerName: string;
		email: string;
		phone: string;
		preferences: string;
		newPasscode: string;
		verificationCode: string;
	}

	// Reactive form state
	let formData: FormData = {
		ownerName: '',
		email: '',
		phone: '',
		preferences: '',
		newPasscode: '',
		verificationCode: ''
	};

	// UI state
	let isVerificationSectionVisible = false;
	let isPasscodeVisible = false;
	let isSaveButtonDisabled = true;

	// Reactive statement for form validation
	$: isSaveButtonDisabled = !formData.ownerName || !formData.email || !formData.phone;

	// Type-safe event handlers
	function saveAccountSettings(): void {
		alert('Account settings saved!');
		window.location.href = '/parking-manager/dashboard';
	}

	function requestVerificationCode(): void {
		alert('Verification code sent to your email.');
		isVerificationSectionVisible = true;
	}

	function updatePasscode(): void {
		if (formData.verificationCode === '123456' && formData.newPasscode) {
			alert('Passcode updated successfully!');
		} else {
			alert('Invalid verification code or passcode.');
		}
	}

	function togglePasscodeVisibility(): void {
		isPasscodeVisible = !isPasscodeVisible;
	}
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Account Settings</title>
</svelte:head>

<main>
	<div class="container">
		<a href="/parking-manager/dashboard" class="back-btn">←</a>

		<h2>Account Settings</h2>
		<form id="account-form">
			<div class="form-group">
				<label for="owner-name">Owner Name</label>
				<input
					type="text"
					id="owner-name"
					bind:value={formData.ownerName}
					placeholder="Enter your name"
					required
				/>
			</div>
			<div class="form-group">
				<label for="email">Email Address</label>
				<input
					type="email"
					id="email"
					bind:value={formData.email}
					placeholder="Enter your email"
					required
				/>
			</div>
			<div class="form-group">
				<label for="phone">Phone Number</label>
				<input
					type="tel"
					id="phone"
					bind:value={formData.phone}
					placeholder="Enter your phone number"
					required
				/>
			</div>
			<div class="form-group">
				<label for="preferences">Preferences</label>
				<textarea
					id="preferences"
					bind:value={formData.preferences}
					placeholder="Add any preferences or notes here"
				></textarea>
			</div>
		</form>

		<h3>Change Passcode</h3>
		<form id="passcode-form">
			<div class="form-group">
				<label for="new-passcode">New Passcode</label>
				<div style="position: relative;">
					<input
						type={isPasscodeVisible ? 'text' : 'password'}
						id="new-passcode"
						bind:value={formData.newPasscode}
						placeholder="Enter new passcode"
						required
					/>
					<img
						on:click={togglePasscodeVisibility}
						src={isPasscodeVisible ? 'eye.png' : 'hidden.png'}
						alt="Toggle Visibility"
						style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; width: 20px; height: 20px;"
					/>
				</div>
			</div>

			{#if isVerificationSectionVisible}
				<div class="form-group">
					<label for="verification-code">Verification Code</label>
					<input
						type="text"
						id="verification-code"
						bind:value={formData.verificationCode}
						placeholder="Enter verification code"
						required
					/>
				</div>
			{/if}
		</form>

		{#if !isVerificationSectionVisible}
			<button class="btn" on:click={requestVerificationCode}> Request Verification Code </button>
		{:else}
			<button class="btn" on:click={updatePasscode}> Update Passcode </button>
		{/if}

		<div class="save-btn-container">
			<button
				type="button"
				class="btn"
				on:click={saveAccountSettings}
				disabled={isSaveButtonDisabled}
			>
				Save Changes
			</button>
		</div>

		<div id="notification" class="notification">Successfully saved! Returning to Dashboard...</div>
	</div>
</main>

<style>
	/* General styling */
	main {
		font-family: Arial, sans-serif;
		background: linear-gradient(135deg, #f0f0f5, #7c748f);
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		margin: 0;
	}

	.container {
		background: #ffffff;
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		width: 90%;
		max-width: 500px;
		text-align: center;
		position: relative;
	}

	.container h2 {
		color: #8f86a8;
		margin-bottom: 20px;
	}

	.form-group {
		margin-bottom: 15px;
		text-align: left;
	}

	.form-group label {
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 5px;
	}

	.form-group input {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.btn {
		background-color: #8f86a8;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		transition: 0.3s;
		margin-top: 20px;
	}

	.btn:hover {
		background-color: #6d5f90;
	}

	.notification {
		display: none;
		margin-top: 20px;
		padding: 10px;
		color: #28a745;
		background-color: #d4edda;
		border: 1px solid #c3e6cb;
		border-radius: 5px;
	}

	.back-btn {
		position: absolute;
		top: 20px;
		left: 50px;
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
		color: #8f86a8;
	}

	.back-btn:hover {
		color: #6d5f90;
	}

	.save-btn-container {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}

	.save-btn-container button {
		margin-left: 10px;
	}

	.hidden {
		display: none;
	}
</style>
