<script>
	let useCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async function (position) {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;

					try {
						const response = await fetch(
							`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
						);
						const data = await response.json();
						const address = data.display_name;

						// Set the address in the search bar
						document.getElementById('searchBar').value = address;
					} catch (error) {
						alert('Unable to retrieve address. Please try again.');
					}
				},
				function (error) {
					alert('Unable to retrieve your location. Please try again.');
				}
			);
		} else {
			alert('Geolocation is not supported by your browser.');
		}
	};
</script>

<main>
	<div class="video-background">
		<video autoplay muted loop>
			<source src="parking1.mp4" type="video/mp4" />
		</video>
	</div>

	<div class="cloud-design"></div>
	<!-- Cloud design -->

	<nav class="navbar">
		<div class="logo">
			<a href="nearby.html"><img src="nearby_logo.png" alt="NearbySpot Logo" /></a>
		</div>
		<div class="navbar-right">
			<button class="text-button"
				><a href="ownerlp.html" style="color:rgb(3, 3, 3);">For Parking Owners</a></button
			>
			<button><a href="reg.html">Login/Sign Up</a></button>
		</div>
	</nav>

	<div class="content-wrapper">
		<div class="content-box">
			<div class="content">
				<h1>PARKING YOUR CHOICE</h1>
				<form action="/search" method="get">
					<input
						type="search"
						id="searchBar"
						name="searchQuery"
						placeholder="Search location..."
						required
					/>
					<button type="button" class="use-location-button" on:click={useCurrentLocation}
						>Use Current Location</button
					>
					<button
						type="button"
						class="btn"
						on:click={() => {
							window.location.href = 'visitsearch.html';
						}}>Search</button
					>
				</form>

				<!-- nearby.html search form -->

				<p id="loginWarning" style="color: red; display: none;">
					Please log in to use the search feature.
				</p>
			</div>
		</div>
	</div>

	<!-- New Sections -->
	<div class="section">
		<div class="how-it-works">
			<h2>How It Works</h2>
			<div>
				<h3>Find Parking</h3>
				<p>Enter your location and search for available parking spots near you.</p>
			</div>
			<div>
				<h3>Park Hassle-Free</h3>
				<p>
					Reserve with a click. Once you’ve found the perfect spot, you can reserve it directly
					through NearbySpot. No more driving around looking for parking!
				</p>
			</div>
			<div>
				<h3>Reserve Your Spot</h3>
				<p>
					Get directions right to your spot. After reserving, get step-by-step directions to the
					parking location. Whether you drive or walk, NearbySpot will guide you there.
				</p>
			</div>
			<div>
				<h3>Directions to Parking</h3>
				<p>Park securely and enjoy your time, knowing your vehicle is safe with us.</p>
			</div>
			<div>
				<h3>Enjoy Stress-Free Parking</h3>
				<p>
					Park with confidence. Arrive at your parking spot knowing it’s reserved just for you. No
					more wasting time searching for parking!
				</p>
			</div>
		</div>
		<img src="parking4.webp" alt="Parking" />
	</div>

	<div class="section">
		<img src="parking2.jpg" alt="Parking" />
		<div class="why-choose-us">
			<h2>Why Choose Us</h2>
			<div>
				<h3>Convenient</h3>
				<p>Easy to use, with a simple and intuitive interface for fast parking.</p>
			</div>
			<div>
				<h3>Secure</h3>
				<p>Your safety is our priority with monitored parking spots and secure access.</p>
			</div>
			<div>
				<h3>Reliable</h3>
				<p>Trusted by thousands of users daily for finding.</p>
			</div>
		</div>
	</div>

	<footer>
		<div class="footer-left">
			<a href="userlp.html">
				<img src="nearby_logo.png" alt="NearbySpot Logo" />
			</a>
			<div>
				<p>EZ Parking - Find the best parking spot in real-time!</p>
				<p>© 2024 EZ Parking. Your parking solution.</p>
			</div>
		</div>

		<div class="footer-right">
			<button><a href="about.html">About</a></button>
			<button><a href="terms.html">Terms of Service</a></button>
			<button><a href="privacy.html">Privacy</a></button>

			<div class="social-icons">
				<a href="https://facebook.com"><img src="fbicon.png" alt="Facebook" /></a>
				<a href="https://x.com"><img src="xicon.png" alt="Twitter" /></a>
				<a href="https://instagram.com"><img src="igicon.png" alt="Instagram" /></a>
				<a href="https://google.com"><img src="gmailicon.png" alt="gmail" /></a>
			</div>
		</div>
	</footer>
</main>

<style type="text/css">
	main {
		background-color: #767184;
		font-family: Arial, sans-serif;
		position: relative;
		min-height: 100vh; /* Allows page to be scrollable */
	}

	.video-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50%; /* Set height to cover only the top half */
		overflow: hidden;
		z-index: -1; /* Make sure it stays behind other content */
	}

	.video-background video {
		min-width: 100%; /* Ensures video covers the background */
		min-height: 100%;
		width: auto;
		height: auto;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		filter: brightness(0.5); /* Reduce brightness to 50% */
	}

	.cloud-design {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 50%;
		background-image: url('cloud.png'); /* Add your cloud image here */
		background-repeat: no-repeat;
		background-size: cover;
		z-index: -1; /* Make sure it stays behind other content */
	}

	.navbar {
		position: fixed;
		top: 0;
		width: 100%;
		height: 80px;
		background: rgba(217, 217, 217, 0.9); /* Slight transparency */
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		z-index: 100;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.logo img {
		height: 110px;
	}

	.navbar-right {
		display: flex;
		align-items: center;
	}

	.text-button {
		background: none;
		border: none;
		color: #0e0d0d;
		font-size: 16px;
		cursor: pointer;
		text-decoration: none;
		margin-right: 20px;
		font-weight: normal;
		transition: color 0.3s ease;
	}

	.text-button:hover {
		color: #767184;
	}

	button {
		background-color: #d9d9d9;
		border-radius: 15px;
		padding: 10px 15px;
		width: auto;
		white-space: nowrap;
		cursor: pointer;
		margin-left: 20px;
		border: none;
		transition: background-color 0.3s ease;
	}

	button.btn {
		background-color: #8f86a8;
	}

	button a {
		color: #000000;
		font-weight: bold;
		font-size: 15px;
		text-decoration: none;
	}

	button:hover {
		background-color: #767184;
		color: white;
	}

	/* Style for "Use Current Location" text button */
	.use-location-button {
		background-color: transparent;
		border: none;
		color: black;
		font-size: 14px;
		cursor: pointer;
		margin-top: 10px;
		text-decoration: underline;
		transition: color 0.3s ease;
	}

	.use-location-button:hover {
		color: white;
		text-decoration: underline;
	}

	.content-wrapper {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: calc(100vh - 120px); /* Dynamically calculate height minus footer and header */
		padding-left: 50px;
		margin-top: 80px; /* Leave space for the navbar */
		overflow-y: auto; /* Enable scroll when content overflows */
		z-index: 1; /* Ensure content is above the cloud design */
	}

	.content-box {
		background-color: rgba(217, 217, 217, 0.9); /* Slight transparency for content box */
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		color: black;
		max-width: 400px;
		width: 100%;
	}

	.content h1 {
		font-size: 50px;
		font-weight: 600;
		line-height: 60px;
		margin-bottom: 25px;
		text-align: left;
	}

	.content form {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: none;
		margin-top: 30px;
		width: 100%;
	}

	.content form input {
		border: 0;
		outline: 0;
		width: 100%;
		font-size: 16px;
		padding-left: 5px;
		padding: 10px;
		margin-bottom: 15px;
		border-radius: 5px;
		background: white;
	}

	.content form .btn {
		font-size: 15px;
		padding: 10px 30px;
		background-color: #8f86a8;
		color: white;
		border: none;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.3s ease;
		text-align: center;
		width: 100%;
		margin: 0 auto;
	}

	.content form .btn:hover {
		background-color: #767184;
	}

	.content form input[disabled] {
		background-color: #e0e0e0;
		cursor: not-allowed;
	}

	/* New Sections Styling */
	.section {
		padding: 50px 100px;
		background-color: #767184;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
	}

	.section img {
		max-width: 45%;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.how-it-works,
	.why-choose-us {
		max-width: 50%;
	}

	.how-it-works h2,
	.why-choose-us h2 {
		font-size: 30px;
		text-align: center;
		margin-bottom: 30px;
	}

	.how-it-works div,
	.why-choose-us div {
		background-color: #8f86a8;
		padding: 30px;
		color: white;
		border-radius: 10px;
		flex: 1;
		margin-bottom: 20px;
		transition: background-color 0.3s ease;
	}

	.how-it-works div:hover,
	.why-choose-us div:hover {
		background-color: #767184;
	}

	footer {
		background-color: rgba(217, 217, 217, 0.9); /* Slight transparency */
		padding: 20px 50px;
		position: relative;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap; /* Allow items to wrap for small screens */
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
	}

	.footer-left {
		display: flex;
		align-items: center;
		margin-bottom: 10px; /* Space between footer sections */
	}

	.footer-left img {
		height: 80px;
		cursor: pointer;
		margin-right: 20px;
	}

	.footer-left div {
		font-size: 14px;
		color: black;
	}

	.footer-right {
		display: flex;
		align-items: center;
		flex-wrap: wrap; /* Ensure buttons wrap properly on small screens */
		gap: 10px; /* Add some space between the buttons */
	}

	.footer-right button {
		background: none;
		border: none;
		color: black;
		font-size: 16px;
		cursor: pointer;
		font-weight: normal;
		transition: transform 0.3s ease; /* Zoom effect */
	}

	.footer-right button:hover {
		transform: scale(1.1); /* Zoom on hover */
	}

	.social-icons {
		display: flex;
		gap: 10px;
	}

	.social-icons img {
		width: 30px;
		height: 30px;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.social-icons img:hover {
		transform: scale(1.1); /* Enlarge icons slightly on hover */
	}

	.footer-newsletter,
	.footer-contact {
		text-align: center;
		margin-bottom: 10px;
	}

	.footer-newsletter input {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		width: 70%;
	}

	.footer-newsletter button {
		padding: 10px 20px;
		background-color: #8f86a8;
		color: white;
		border-radius: 5px;
		border: none;
		cursor: pointer;
	}

	.footer-contact a {
		color: black;
		text-decoration: none;
	}

	/* Footer and other existing styles remain the same */
</style>
