<main>
	<div class="contact-card">
		<div class="profile-image">
			<img src="binigirls.jpg" alt="Profile" />
		</div>
		<div class="contact-details">
			<p><strong>Nearby Spot</strong></p>
			<p>(63+) 123-456-789</p>
			<p><a href="mailto:nearbyspot@gmail.com">nearbyspot@gmail.com</a></p>
			<div class="social-media">
				<p>
					<a href="https://facebook.com/nearbyspot" target="_blank">
						<img src="facebook.png" alt="Facebook" /> facebook.com/nearbyspot
					</a>
				</p>
				<p>
					<a href="https://instagram.com/nearbyspot" target="_blank">
						<img src="instagram.jpg" alt="Instagram" /> instagram.com/nearbyspot
					</a>
				</p>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		font-family: Arial, sans-serif;
		background-color: #f4f4f4;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		margin: 0;
	}

	.contact-card {
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		padding: 100px;
		width: 500px;
	}

	.profile-image {
		flex-shrink: 0;
		margin-right: 20px;
	}

	.profile-image img {
		width: 80px;
		height: 130px;
		border-radius: 50%;
	}

	.contact-details {
		flex-grow: 1;
	}

	.contact-details p {
		margin: 5px 0;
		font-size: 16px;
	}

	.contact-details a {
		color: #0077b6;
		text-decoration: none;
	}

	.contact-details a:hover {
		text-decoration: underline;
	}

	.social-media img {
		width: 20px;
		height: 20px;
		vertical-align: middle;
		margin-right: 5px;
	}

	.social-media p {
		margin: 8px 0;
	}
</style>
