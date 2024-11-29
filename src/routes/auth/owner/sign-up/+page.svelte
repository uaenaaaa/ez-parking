<script lang="ts">
	let ownerTypeSelect: HTMLSelectElement;
	let individualFields: HTMLDivElement;
	let companyFields: HTMLDivElement;
	let businessCert: HTMLInputElement;
	let spaceLayoutSelect: HTMLSelectElement;
	let otherLayoutInput: HTMLInputElement;
	let otherLayoutLabel: HTMLLabelElement;
	let accessInfo: HTMLSelectElement;
	let customAccessInfo: HTMLInputElement;
	let operatingDays: NodeListOf<HTMLInputElement>;

	let rateOptions: NodeListOf<HTMLInputElement>;

	$: {
		if (rateOptions) {
			rateOptions.forEach((checkbox) => {
				checkbox.addEventListener('change', function () {
					const rate = this.getAttribute('data-rate');
					const rateInput = document.getElementById(`${rate}-rate`);
					if (rateInput) {
						rateInput.classList.toggle('hidden', !this.checked);
					}
				});
			});
		}
	}

	$: {
		if (operatingDays) {
			operatingDays.forEach((checkbox) => {
				checkbox.addEventListener('change', function () {
					const day = this.getAttribute('data-day') ?? '';
					const dayHours = document.getElementById(`${day.toLowerCase()}-hours`);
					if (dayHours) {
						dayHours.classList.toggle('hidden', !this.checked);
					}
				});
			});
		}
	}

	$: {
		if (accessInfo && customAccessInfo) {
			if (accessInfo.value === 'Other') {
				customAccessInfo.classList.remove('hidden');
			} else {
				customAccessInfo.classList.add('hidden');
			}
		}
	}

	$: {
		if (ownerTypeSelect) {
			ownerTypeSelect.addEventListener('change', function () {
				const ownerType = (this as HTMLSelectElement).value;
				individualFields.classList.toggle('hidden', ownerType !== 'Individual');
				companyFields.classList.toggle('hidden', ownerType !== 'Company');
				businessCert.classList.toggle('hidden', ownerType !== 'Company');
			});
		}

		if (spaceLayoutSelect) {
			spaceLayoutSelect.addEventListener('change', function () {
				if ((this as HTMLSelectElement).value === 'other') {
					otherLayoutInput.classList.remove('hidden');
					otherLayoutLabel.classList.remove('hidden');
				} else {
					otherLayoutInput.classList.add('hidden');
					otherLayoutLabel.classList.add('hidden');
				}
			});
		}
	}
</script>

<main>
	<header>
		<nav class="navbar">
			<div class="logo">
				<a href="/"><img src="logo.png" alt="EZParking Logo" /></a>
			</div>
		</nav>
	</header>

	<h2>Hi Parking Owners! This is your Sign Up Form.</h2>
	<p>Please fill in your contact information to register your journey with us.</p>

	<form id="registrationForm">
		<!-- Owner Type Selection -->
		<label for="ownerType">Owner Type:</label>
		<select id="ownerType" name="ownerType" required bind:this={ownerTypeSelect}>
			<option value="">Select...</option>
			<option value="Individual">Individual</option>
			<option value="Company">Company</option>
		</select>
		<br /><br />

		<!-- Individual Owner Fields -->
		<div id="individualFields" class="hidden" bind:this={individualFields}>
			<label for="firstName">First Name:</label>
			<input type="text" id="firstName" name="firstName" required />
			<br /><br />

			<label for="middleName">Middle Name (optional):</label>
			<input type="text" id="middleName" name="middleName" />
			<br /><br />

			<label for="lastName">Last Name:</label>
			<input type="text" id="lastName" name="lastName" required />
			<br /><br />

			<label for="suffix">Suffix (optional):</label>
			<input type="text" id="suffix" name="suffix" />
			<br /><br />
		</div>

		<!-- Company Owner Fields -->
		<div id="companyFields" class="hidden" bind:this={companyFields}>
			<label for="businessName">Business Name:</label>
			<input type="text" id="businessName" name="businessName" required />
			<br /><br />

			<label for="companyRegNumber">Company Registration Number:</label>
			<input type="text" id="companyRegNumber" name="companyRegNumber" />
			<br /><br />
		</div>

		<label for="contactNumber">Contact Number:</label>
		<input type="tel" id="contactNumber" name="contactNumber" required />
		<br /><br />

		<label for="email">Email:</label>
		<input type="email" id="email" name="email" required />
		<br /><br />

		<label for="tin">Tax Identification Number (TIN):</label>
		<input type="text" id="tin" name="tin" required />
		<br /><br />

		<label for="govIdUpload">Upload Government ID (for verification):</label>
		<input
			type="file"
			id="govIdUpload"
			name="govIdUpload"
			accept="image/*,application/pdf"
			required
		/>
		<br /><br />

		<h3>Parking Location Details</h3>

		<label for="streetAddress">Street Address:</label>
		<input type="text" id="streetAddress" name="streetAddress" required />
		<br /><br />

		<label for="barangay">Barangay:</label>
		<input type="text" id="barangay" name="barangay" required />
		<br /><br />

		<label for="city">City/Municipality:</label>
		<input type="text" id="city" name="city" required />
		<br /><br />

		<label for="province">Province (if applicable):</label>
		<input type="text" id="province" name="province" />
		<br /><br />

		<label for="postalCode">Postal Code:</label>
		<input type="text" id="postalCode" name="postalCode" />
		<br /><br />

		<label for="landmarks">Landmarks or Directions (optional):</label>
		<input type="text" id="landmarks" name="landmarks" />
		<br /><br />

		<label for="spaceType">Parking Space Type:</label>
		<select id="spaceType" name="spaceType" required>
			<option value="Indoor">Indoor</option>
			<option value="Outdoor">Outdoor</option>
			<option value="Covered">Covered</option>
			<option value="Uncovered">Uncovered</option>
		</select>
		<br /><br />

		<label for="totalSpaces">Total Number of Available Spaces:</label>
		<input type="number" id="totalSpaces" name="totalSpaces" required />
		<br /><br />

		<label for="spaceLayout">Space Layout:</label>
		<select id="spaceLayout" name="spaceLayout" required bind:this={spaceLayoutSelect}>
			<option value="parallel">Parallel</option>
			<option value="perpendicular">Perpendicular</option>
			<option value="angled">Angled</option>
			<option value="other">Other (please specify)</option>
		</select>

		<label for="otherSpaceLayout" id="otherLayoutLabel" class="hidden" bind:this={otherLayoutLabel}>
			Please specify the layout:
		</label>
		<input
			type="text"
			id="otherSpaceLayout"
			name="otherSpaceLayout"
			class="hidden"
			placeholder="Describe the space layout if 'Other' is selected"
			bind:this={otherLayoutInput}
		/>

		<label for="spaceDimensions">Space Dimensions (in meters):</label>
		<input
			type="text"
			id="spaceDimensions"
			name="spaceDimensions"
			required
			placeholder="Enter width x length (e.g., 3m x 5m)"
		/>
		<script lang="ts">
		</script>

		<h3>Operating Hours</h3>

		<div id="operatingDays">
			{#each ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as day}
				<div class="day-option">
					<label for="{day.toLowerCase()}Enable">{day}</label>
					<input
						type="checkbox"
						id="{day.toLowerCase()}Enable"
						class="enable-day"
						data-day={day}
						on:change={() => (operatingDays = document.querySelectorAll('.enable-day'))}
					/>
					<div id="{day.toLowerCase()}-hours" class="day-hours hidden">
						<label for="{day.toLowerCase()}Open">Opening Hour:</label>
						<input type="time" id="{day.toLowerCase()}Open" name="{day.toLowerCase()}Open" />
						<label for="{day.toLowerCase()}Close">Closing Hour:</label>
						<input type="time" id="{day.toLowerCase()}Close" name="{day.toLowerCase()}Close" />
					</div>
				</div>
			{/each}
		</div>

		<label for="accessInfo">Access Information (optional):</label>
		<select id="accessInfo" name="accessInfo" bind:this={accessInfo}>
			<option value="">Select...</option>
			<option value="Gate Code">Gate Code</option>
			<option value="Security Check">Security Check</option>
			<option value="Key Pickup">Key Pickup</option>
			<option value="No Special Access">No Special Access</option>
			<option value="Other">Other (Please specify)</option>
		</select>

		<input
			type="text"
			id="customAccessInfo"
			name="customAccessInfo"
			class="hidden"
			placeholder="Enter custom access details"
		/>

		<label for="parkingPhotos">Upload Photos of the Parking Location:</label>
		<input type="file" id="parkingPhotos" name="parkingPhotos" accept="image/*" multiple required />
		<br /><br />

		<h3>Facilities & Amenities</h3>

		<label for="lightingAndSecurity">Lighting and Security Features:</label>
		<input
			type="text"
			id="lightingAndSecurity"
			name="lightingAndSecurity"
			placeholder="e.g., CCTV, On-site security"
			required
		/>
		<br /><br />

		<label for="accessibilityOptions">Accessibility Options:</label>
		<input
			type="text"
			id="accessibilityOptions"
			name="accessibilityOptions"
			placeholder="e.g., Disabled parking spots, Wheelchair access"
			required
		/>
		<br /><br />

		<label for="nearbyFacilities">Nearby Facilities:</label>
		<input
			type="text"
			id="nearbyFacilities"
			name="nearbyFacilities"
			placeholder="e.g., EV charging stations, Restrooms, Elevators"
			required
		/>
		<br /><br />

		<script lang="ts">
		</script>

		<h3>Pricing Information</h3>

		<div id="pricing">
			{#each ['hourly', 'daily', 'monthly'] as rate}
				<div class="rate-option">
					<label for="{rate}Enable">{rate.charAt(0).toUpperCase() + rate.slice(1)} Rate</label>
					<input
						type="checkbox"
						id="{rate}Enable"
						class="enable-rate"
						data-rate={rate}
						bind:group={rateOptions}
					/>
					<div id="{rate}-rate" class="rate-input hidden">
						<label for="{rate}Rate">Rate:</label>
						<div class="input-wrapper">
							<span class="peso-sign">₱</span>
							<input
								type="number"
								id="{rate}Rate"
								name="{rate}Rate"
								placeholder="Enter Rate"
								min="0"
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<style>
			.hidden {
				display: none;
			}
			/* Add your other styles here */
		</style>

		<h3>Accepted Payment Methods</h3>

		<div class="payment-methods">
			<div class="payment-option">
				<input type="checkbox" id="cashPayment" name="paymentMethod" value="cash" />
				<label for="cashPayment">Cash</label>
			</div>

			<div class="payment-option">
				<input type="checkbox" id="mobilePayment" name="paymentMethod" value="mobilePayment" />
				<label for="mobilePayment">Mobile Payment</label>
			</div>

			<div class="payment-option">
				<input type="checkbox" id="otherPayment" name="paymentMethod" value="other" />
				<label for="otherPayment">Other</label>
				<input
					type="text"
					id="otherPaymentText"
					name="otherPaymentText"
					placeholder="Specify other method"
					class="hidden"
				/>
			</div>
		</div>

		<script>
			// Show text input if "Other" option is selected
			document.getElementById('otherPayment').addEventListener('change', function () {
				const otherTextInput = document.getElementById('otherPaymentText');
				otherTextInput.classList.toggle('hidden', !this.checked);
			});
		</script>

		<h3>Legal & Compliance Requirements</h3>

		<label for="proofOfOwnership">Proof of Ownership/Lease Agreement:</label>
		<input
			type="file"
			id="proofOfOwnership"
			name="proofOfOwnership"
			accept="image/*,application/pdf"
			required
		/>
		<br /><br />

		<label for="businessCert">Business Registration Certificate (for companies):</label>
		<input
			type="file"
			id="businessCert"
			name="businessCert"
			accept="image/*,application/pdf"
			required
		/>
		<br /><br />

		<label for="birCert">BIR Certificate:</label>
		<input type="file" id="birCert" name="birCert" accept="image/*,application/pdf" required />
		<br /><br />

		<label for="liabilityInsurance">Liability Insurance Document:</label>
		<input
			type="file"
			id="liabilityInsurance"
			name="liabilityInsurance"
			accept="image/*,application/pdf"
		/>
		<br /><br />

		<div>
			<input type="checkbox" id="zoningCompliance" name="zoningCompliance" required />
			<label for="zoningCompliance"
				>I confirm that the parking facility complies with local zoning laws.</label
			>
		</div>
		<br />

		<button id="registerButton" type="submit">Register</button>

		<div id="verifyModal" class="modal">
			<div class="modal-content">
				<p>Please verify your email. Click OK to proceed.</p>
				<button id="okButton">OK</button>
			</div>
		</div>

		<script>
			// Get the modal and button elements
			var modal = document.getElementById('verifyModal');
			var registerButton = document.getElementById('registerButton');
			var okButton = document.getElementById('okButton');

			// When the user clicks the Register button, show the modal
			registerButton.onclick = function () {
				modal.style.display = 'block';
			};

			// When the user clicks "OK", redirect to vemail.html
			okButton.onclick = function () {
				window.location.href = 'vemail.html'; // Redirect to vemail.html
			};

			// Close the modal if the user clicks anywhere outside of it
			window.onclick = function (event) {
				if (event.target == modal) {
					modal.style.display = 'none';
				}
			};
		</script>
	</form>
</main>

<style>
	/* NearbySpot Color Palette */
	:root {
		--primary-color: #767184;
		--secondary-color: #d9d9d9;
		--accent-color: #d9d9d9;
		--background-color: #d9d9d9;
		--text-color: #000;
		--error-color: #e74c3c;
	}

	main {
		background-color: #767184;
		font-family: Arial, sans-serif;
		color: var(--text-color);
		padding: 20px;
	}

	header {
		background-color: #767184;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 30px;
		width: 100%;
		margin-top: 90px;
	}

	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 85px;
		background-color: #d9d9d9;
		display: flex;
		align-items: center;
		padding-left: 20px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	}

	.navbar .logo img {
		height: 110px;
		width: auto;
	}

	.container {
		background-color: white;
		border-radius: 10px;
		padding: 30px;
		width: 100%;
		max-width: 900px;
		box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	h1 {
		font-size: 22px;
		color: #333;
		text-align: center;
		margin-bottom: 15px;
	}

	h2 {
		color: #000;
		text-align: center;
	}
	p {
		font-size: 14px;
		color: #000;
		text-align: center;
		margin-bottom: 25px;
	}

	form {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	}

	label {
		display: block;
		font-weight: bold;
		margin: 15px 0 5px;
		color: var(--primary-color);
	}

	input[type='text'],
	input[type='email'],
	input[type='tel'],
	input[type='file'],
	select,
	textarea {
		width: 100%;
		padding: 10px;
		margin-bottom: 15px;
		border: 1px solid var(--secondary-color);
		border-radius: 4px;
		box-sizing: border-box;
		font-size: 14px;
	}

	input[type='text']:focus,
	input[type='email']:focus,
	input[type='tel']:focus,
	input[type='file']:focus,
	select:focus,
	textarea:focus {
		border-color: var(--accent-color);
		outline: none;
		box-shadow: 0px 0px 5px var(--accent-color);
	}

	.hidden {
		display: none;
	}

	button[type='submit'] {
		width: 100%;
		padding: 12px;
		background-color: var(--primary-color);
		color: #fff;
		font-weight: bold;
		font-size: 16px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button[type='submit']:hover {
		background-color: var(--secondary-color);
	}

	.error-message {
		color: var(--error-color);
		font-size: 0.9em;
		margin-top: -10px;
		margin-bottom: 10px;
	}

	.hidden {
		display: none;
	}

	.payment-methods {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.payment-option {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.hidden {
		display: none;
	}

	.rate-option {
		margin-bottom: 15px;
	}

	.rate-input {
		margin-left: 20px;
		display: inline-flex;
		align-items: center;
	}

	.rate-input label {
		margin-right: 10px;
	}

	.input-wrapper {
		display: inline-flex;
		align-items: center;
	}

	.input-wrapper .peso-sign {
		font-size: 18px;
		color: #888;
		margin-right: 5px;
	}

	.rate-input input {
		width: 120px;
		padding-left: 20px; /* Padding to make space for the peso sign */
		font-size: 16px;
	}

	.rate-input input::placeholder {
		color: transparent; /* Make the placeholder text invisible */
	}

	.hidden {
		display: none;
	}

	.day-option {
		margin-bottom: 10px;
	}

	.day-hours {
		margin-left: 20px;
		display: inline-flex;
		align-items: center;
	}

	.day-hours label {
		margin-right: 10px;
	}

	.day-hours input {
		margin-right: 20px;
	}

	.hidden {
		display: none;
	}

	.modal {
		display: none; /* Hidden by default */
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5); /* Black background with transparency */
		padding-top: 60px;
	}

	/* Modal content */
	.modal-content {
		background-color: #fff;
		margin: 5% auto;
		padding: 20px;
		border: 1px solid #888;
		width: 50%;
		text-align: center;
	}

	/* Close button */
	.close {
		color: #aaa;
		font-size: 28px;
		font-weight: bold;
		cursor: pointer;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}

	button {
		padding: 10px 20px;
		background-color: #767184;
		color: white;
		border: none;
		cursor: pointer;
	}

	button:hover {
		background-color: #767170;
	}
</style>
