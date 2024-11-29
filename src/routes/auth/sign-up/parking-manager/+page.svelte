<script>
	document.getElementById('accessInfo').addEventListener('change', function () {
		var customInput = document.getElementById('customAccessInfo');

		// If "Other" is selected, show the text box for custom input
		if (this.value === 'Other') {
			customInput.classList.remove('hidden');
		} else {
			customInput.classList.add('hidden');
		}
	});

	document.querySelectorAll('.enable-day').forEach((checkbox) => {
		checkbox.addEventListener('change', function () {
			const day = this.getAttribute('data-day');
			const dayHours = document.getElementById(`${day.toLowerCase()}-hours`);
			dayHours.classList.toggle('hidden', !this.checked);
		});
	});

	// JavaScript to toggle rate input based on the checkbox
	document.querySelectorAll('.enable-rate').forEach((checkbox) => {
		checkbox.addEventListener('change', function () {
			const rate = this.getAttribute('data-rate');
			const rateInput = document.getElementById(`${rate}-rate`);
			rateInput.classList.toggle('hidden', !this.checked);
		});
	});

	// Show text input if "Other" option is selected
	document.getElementById('otherPayment').addEventListener('change', function () {
		const otherTextInput = document.getElementById('otherPaymentText');
		otherTextInput.classList.toggle('hidden', !this.checked);
	});

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

	// JavaScript for Conditional Display
	document.getElementById('ownerType').addEventListener('change', function () {
		const ownerType = this.value;
		document
			.getElementById('individualFields')
			.classList.toggle('hidden', ownerType !== 'Individual');
		document.getElementById('companyFields').classList.toggle('hidden', ownerType !== 'Company');
		document.getElementById('businessCert').classList.toggle('hidden', ownerType !== 'Company');
	});

	const spaceLayoutSelect = document.getElementById('spaceLayout');
	const otherLayoutInput = document.getElementById('otherSpaceLayout');
	const otherLayoutLabel = document.getElementById('otherLayoutLabel');

	spaceLayoutSelect.addEventListener('change', function () {
		if (spaceLayoutSelect.value === 'other') {
			otherLayoutInput.classList.remove('hidden');
			otherLayoutLabel.classList.remove('hidden');
		} else {
			otherLayoutInput.classList.add('hidden');
			otherLayoutLabel.classList.add('hidden');
		}
	});
</script>

<svelte:head>
	<title>Owner Registration form</title>
</svelte:head>
<main>
	<header>
		<nav class="navbar">
			<div class="logo">
				<a href="/"><img src="nearby_logo.png" alt="EZParking Logo" /></a>
			</div>
		</nav>
	</header>

	<h2>Hi Parking Owners! This is your Sign Up Form.</h2>
	<p>Please fill in your contact information to register your journey with us.</p>

	<form id="registrationForm">
		<!-- Owner Type Selection -->
		<label for="ownerType">Owner Type:</label>
		<select id="ownerType" name="ownerType" required>
			<option value="">Select...</option>
			<option value="Individual">Individual</option>
			<option value="Company">Company</option>
		</select>
		<br /><br />

		<!-- Individual Owner Fields -->
		<div id="individualFields" class="hidden">
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
		<div id="companyFields" class="hidden">
			<label for="businessName">Business Name:</label>
			<input type="text" id="businessName" name="businessName" required />
			<br /><br />

			<label for="companyRegNumber">Company Registration Number:</label>
			<input type="text" id="companyRegNumber" name="companyRegNumber" />
			<br /><br />
		</div>

		<!-- Contact Information -->
		<label for="contactNumber">Contact Number:</label>
		<input type="tel" id="contactNumber" name="contactNumber" required />
		<br /><br />

		<label for="email">Email:</label>
		<input type="email" id="email" name="email" required />
		<br /><br />

		<!-- TIN and Government ID Upload -->
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

		<!-- Parking Location Details -->
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
		<select id="spaceLayout" name="spaceLayout" required>
			<option value="parallel">Parallel</option>
			<option value="perpendicular">Perpendicular</option>
			<option value="angled">Angled</option>
			<option value="other">Other (please specify)</option>
		</select>

		<label for="otherSpaceLayout" id="otherLayoutLabel" class="hidden"
			>Please specify the layout:</label
		>
		<input
			type="text"
			id="otherSpaceLayout"
			name="otherSpaceLayout"
			class="hidden"
			placeholder="Describe the space layout if 'Other' is selected"
		/>

		<label for="spaceDimensions">Space Dimensions (in meters):</label>
		<input
			type="text"
			id="spaceDimensions"
			name="spaceDimensions"
			required
			placeholder="Enter width x length (e.g., 3m x 5m)"
		/>

		<h3>Operating Hours</h3>

		<div id="operatingDays">
			<div class="day-option">
				<label for="mondayEnable">Monday</label>
				<input type="checkbox" id="mondayEnable" class="enable-day" data-day="Monday" />
				<div id="monday-hours" class="day-hours hidden">
					<label for="mondayOpen">Opening Hour:</label>
					<input type="time" id="mondayOpen" name="mondayOpen" />
					<label for="mondayClose">Closing Hour:</label>
					<input type="time" id="mondayClose" name="mondayClose" />
				</div>
			</div>

			<div class="day-option">
				<label for="tuesdayEnable">Tuesday</label>
				<input type="checkbox" id="tuesdayEnable" class="enable-day" data-day="Tuesday" />
				<div id="tuesday-hours" class="day-hours hidden">
					<label for="tuesdayOpen">Opening Hour:</label>
					<input type="time" id="tuesdayOpen" name="tuesdayOpen" />
					<label for="tuesdayClose">Closing Hour:</label>
					<input type="time" id="tuesdayClose" name="tuesdayClose" />
				</div>
			</div>

			<div class="day-option">
				<label for="wednesdayEnable">Wednesday</label>
				<input type="checkbox" id="wednesdayEnable" class="enable-day" data-day="Wednesday" />
				<div id="wednesday-hours" class="day-hours hidden">
					<label for="wednesdayOpen">Opening Hour:</label>
					<input type="time" id="wednesdayOpen" name="wednesdayOpen" />
					<label for="wednesdayClose">Closing Hour:</label>
					<input type="time" id="wednesdayClose" name="wednesdayClose" />
				</div>
			</div>

			<div class="day-option">
				<label for="thursdayEnable">Thursday</label>
				<input type="checkbox" id="thursdayEnable" class="enable-day" data-day="Thursday" />
				<div id="thursday-hours" class="day-hours hidden">
					<label for="thursdayOpen">Opening Hour:</label>
					<input type="time" id="thursdayOpen" name="thursdayOpen" />
					<label for="thursdayClose">Closing Hour:</label>
					<input type="time" id="thursdayClose" name="thursdayClose" />
				</div>
			</div>

			<div class="day-option">
				<label for="fridayEnable">Friday</label>
				<input type="checkbox" id="fridayEnable" class="enable-day" data-day="Friday" />
				<div id="friday-hours" class="day-hours hidden">
					<label for="fridayOpen">Opening Hour:</label>
					<input type="time" id="fridayOpen" name="fridayOpen" />
					<label for="fridayClose">Closing Hour:</label>
					<input type="time" id="fridayClose" name="fridayClose" />
				</div>
			</div>

			<div class="day-option">
				<label for="saturdayEnable">Saturday</label>
				<input type="checkbox" id="saturdayEnable" class="enable-day" data-day="Saturday" />
				<div id="saturday-hours" class="day-hours hidden">
					<label for="saturdayOpen">Opening Hour:</label>
					<input type="time" id="saturdayOpen" name="saturdayOpen" />
					<label for="saturdayClose">Closing Hour:</label>
					<input type="time" id="saturdayClose" name="saturdayClose" />
				</div>
			</div>

			<div class="day-option">
				<label for="sundayEnable">Sunday</label>
				<input type="checkbox" id="sundayEnable" class="enable-day" data-day="Sunday" />
				<div id="sunday-hours" class="day-hours hidden">
					<label for="sundayOpen">Opening Hour:</label>
					<input type="time" id="sundayOpen" name="sundayOpen" />
					<label for="sundayClose">Closing Hour:</label>
					<input type="time" id="sundayClose" name="sundayClose" />
				</div>
			</div>
		</div>

		<label for="accessInfo">Access Information (optional):</label>
		<select id="accessInfo" name="accessInfo">
			<option value="">Select...</option>
			<option value="Gate Code">Gate Code</option>
			<option value="Security Check">Security Check</option>
			<option value="Key Pickup">Key Pickup</option>
			<option value="No Special Access">No Special Access</option>
			<option value="Other">Other (Please specify)</option>
		</select>

		<!-- Custom input field for 'Other' selection -->
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

		<!-- Facilities & Amenities Section -->
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

		<!-- Pricing Information Section -->
		<h3>Pricing Information</h3>

		<div id="pricing">
			<div class="rate-option">
				<label for="hourlyEnable">Hourly Rate</label>
				<input type="checkbox" id="hourlyEnable" class="enable-rate" data-rate="hourly" />
				<div id="hourly-rate" class="rate-input hidden">
					<label for="hourlyRate">Rate:</label>
					<div class="input-wrapper">
						<span class="peso-sign">₱</span>
						<input
							type="number"
							id="hourlyRate"
							name="hourlyRate"
							placeholder="Enter Rate"
							min="0"
						/>
					</div>
				</div>
			</div>

			<div class="rate-option">
				<label for="dailyEnable">Daily Rate</label>
				<input type="checkbox" id="dailyEnable" class="enable-rate" data-rate="daily" />
				<div id="daily-rate" class="rate-input hidden">
					<label for="dailyRate">Rate:</label>
					<div class="input-wrapper">
						<span class="peso-sign">₱</span>
						<input type="number" id="dailyRate" name="dailyRate" placeholder="Enter Rate" min="0" />
					</div>
				</div>
			</div>

			<div class="rate-option">
				<label for="monthlyEnable">Monthly Rate</label>
				<input type="checkbox" id="monthlyEnable" class="enable-rate" data-rate="monthly" />
				<div id="monthly-rate" class="rate-input hidden">
					<label for="monthlyRate">Rate:</label>
					<div class="input-wrapper">
						<span class="peso-sign">₱</span>
						<input
							type="number"
							id="monthlyRate"
							name="monthlyRate"
							placeholder="Enter Rate"
							min="0"
						/>
					</div>
				</div>
			</div>
		</div>

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

		<!-- Legal and Compliance Documents -->
		<h3>Legal & Compliance Requirements</h3>

		<!-- Proof of Ownership/Lease Agreement -->
		<label for="proofOfOwnership">Proof of Ownership/Lease Agreement:</label>
		<input
			type="file"
			id="proofOfOwnership"
			name="proofOfOwnership"
			accept="image/*,application/pdf"
			required
		/>
		<br /><br />

		<!-- Business Registration Certificate (for companies) -->
		<label for="businessCert">Business Registration Certificate (for companies):</label>
		<input
			type="file"
			id="businessCert"
			name="businessCert"
			accept="image/*,application/pdf"
			required
		/>
		<br /><br />

		<!-- BIR Certificate -->
		<label for="birCert">BIR Certificate:</label>
		<input type="file" id="birCert" name="birCert" accept="image/*,application/pdf" required />
		<br /><br />

		<!-- Liability Insurance Document -->
		<label for="liabilityInsurance">Liability Insurance Document:</label>
		<input
			type="file"
			id="liabilityInsurance"
			name="liabilityInsurance"
			accept="image/*,application/pdf"
		/>
		<br /><br />

		<!-- Compliance with Zoning Laws -->
		<div>
			<input type="checkbox" id="zoningCompliance" name="zoningCompliance" required />
			<label for="zoningCompliance"
				>I confirm that the parking facility complies with local zoning laws.</label
			>
		</div>
		<br />

		<!-- Register Button -->
		<button id="registerButton" type="submit">Register</button>

		<!-- Modal for Email Verification -->
		<div id="verifyModal" class="modal">
			<div class="modal-content">
				<p>Please verify your email. Click OK to proceed.</p>
				<button id="okButton">OK</button>
			</div>
		</div>
	</form>
</main>

<style>
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
