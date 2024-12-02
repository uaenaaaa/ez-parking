<main>
	<nav class="navbar">
		<div class="logo">
			<a href="userlp.html">
				<img src="logo.png" alt="EZ Parking Logo" />
			</a>
		</div>
		<div class="navbar-right">
			<button>
				<a href="auth/owner/login">For Parking Owners</a>
			</button>
			<button><a href="/auth/sign-up">Login/Sign Up</a></button>
		</div>
	</nav>

	<div class="content-wrapper">
		<div class="content-box">
			<h1>About Us</h1>
			<p>
				Welcome to EZ Parking, your premier parking solution designed to make finding available
				parking spots easier and more efficient. Our platform is dedicated to helping drivers locate
				and view nearby parking slots in real time.
			</p>

			<h2>Our Mission</h2>
			<p>
				At EZ Parking, our mission is to simplify the parking experience. We provide real-time
				updates on available parking spaces, helping you save time and frustration.
			</p>

			<h2>What We Offer</h2>
			<p>Our service offers the following features:</p>
			<ul>
				<li>Real-time availability of parking spaces near you.</li>
				<li>User-friendly interface for easy navigation.</li>
				<li>Regular updates on new parking spots and promotions.</li>
				<li>Support for users to find the best parking options in their area.</li>
			</ul>

			<h2>Meet the Developers</h2>
			<p>
				Our dedicated team of developers works tirelessly to ensure that EZ Parking runs smoothly
				and efficiently. Here’s a bit about our team:
			</p>

			<!-- Updated layout -->
			<div class="developer-layout">
				<!-- Project Manager -->
				<div class="project-manager">
					<div class="developer">
						<img src="dev-image/jhen.jpg" alt="Panes Jhennymae" />
						<h3>Panes Jhennymae</h3>
						<p>Project Manager</p>
					</div>
				</div>

				<!-- Developers -->
				<div class="developer-grid">
					<div class="developer">
						<img src="dev-image/ange.jpg" alt="Uy Angelica" />
						<h3>Uy Angelica</h3>
						<p>Frontend Developer</p>
					</div>
					<div class="developer">
						<img src="dev-image/aubrey.jpg" alt="Quiñonez Aubrey Kate" />
						<h3>Quiñonez Aubrey Kate</h3>
						<p>Frontend Developer</p>
					</div>
					<div class="developer">
						<img src="dev-image/rona.jpg" alt="Perez Ronalyn" />
						<h3>Perez Ronalyn</h3>
						<p>Backend Developer</p>
					</div>
					<div class="developer">
						<img src="dev-image/eya.jpg" alt="Villegas Sheila Mae" />
						<h3>Villegas Sheila Mae</h3>
						<p>App Developer</p>
					</div>
				</div>
			</div>

			<h2>Contact Us</h2>
			<p>
				If you have any questions, feedback, or need assistance, please feel free to contact us at <a
					href="mailto:support@ezparking.com"
					style="color: #0056b3;">support@ezparking.com</a
				>.
			</p>
		</div>
	</div>

	<footer>
		<div class="footer-left">
			<a href="userlp.html">
				<img src="logo.png" alt="EZ Parking Logo" />
			</a>
			<div>
				<p>EZ Parking - View the best available parking spots in real-time!</p>
				<p>© 2024 EZ Parking. Your parking solution.</p>
			</div>
		</div>
		<div class="footer-right">
			<button>
				<a href="/about">About Us</a>
			</button>
			<button>
				<a href="/faqs">FAQs</a>
			</button>
			<button>
				<a href="/terms">Terms of Service</a>
			</button>
			<button>
				<a href="/privacy">Privacy Policy</a>
			</button>
		</div>
	</footer>
</main>

<style>
	main {
		background-color: #fafafa;
		color: #333;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
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

	.logo img {
		height: 80px;
	}

	.navbar button {
		background: transparent;
		border: none;
		color: #333;
		cursor: pointer;
		font-size: 16px;
		margin-left: 15px;
		transition: color 0.3s;
	}

	.navbar button:hover {
		color: #767184;
	}

	.content-wrapper {
		margin-top: 80px;
		padding: 20px;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.content-box {
		background-color: #fff;
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		color: black;
		max-width: 900px;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 20px;
		text-align: center;
		color: #333;
	}

	h2 {
		font-size: 2rem;
		margin-top: 20px;
		margin-bottom: 10px;
		color: #444;
	}

	p {
		margin-bottom: 15px;
		line-height: 1.6;
	}

	ul {
		list-style-type: disc;
		margin-left: 20px;
	}

	/* Layout for the developers */
	.developer-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Project Manager styling */
	.project-manager {
		text-align: center;
		margin-bottom: 20px;
	}

	/* Layout for developers below */
	.developer-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		max-width: 600px;
		margin-top: 20px;
	}

	.developer {
		background-color: #f9f9f9;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.developer:hover {
		transform: translateY(-5px);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.developer img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin-bottom: 15px;
	}

	.developer h3 {
		margin: 10px 0 5px;
		font-size: 1.3rem;
	}

	.developer p {
		font-size: 1rem;
		color: #666;
	}

	footer {
		background-color: #d9d9d9;
		padding: 20px 50px;
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer-left {
		display: flex;
		align-items: center;
	}

	.footer-left img {
		height: 80px;
		cursor: pointer;
		margin-right: 20px;
	}

	.footer-left p {
		color: black;
		margin: 0;
	}

	.footer-right {
		display: flex;
		align-items: center;
	}

	.footer-right button {
		background: none;
		border: none;
		color: black;
		font-size: 16px;
		cursor: pointer;
		margin-left: 20px;
		transition: color 0.3s;
	}

	.footer-right button:hover {
		color: #767184;
	}

	@media (max-width: 600px) {
		.developer-grid {
			grid-template-columns: 1fr; /* Stack elements on smaller screens */
		}

		.navbar,
		footer {
			flex-direction: column;
			align-items: flex-start;
		}

		.footer-left {
			margin-bottom: 10px;
		}
	}
</style>
