<nav
	class="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-[#D9D9D9] px-5 shadow-lg"
>
	<div class="logo">
		<a href="userlp.html">
			<img src="logo.png" alt="EZ Parking Logo" class="h-20" />
		</a>
	</div>
	<div class="navbar-right flex flex-row gap-4">
		<button>
			<a href="/auth/owner/login">For Parking Owners</a>
		</button>

		<button>
			<a href="/auth/login"> Login/Sign Up</a>
		</button>
	</div>
</nav>

<div class="content-wrapper mt-20 flex flex-1 items-start justify-center p-5">
	<div class="content-box rounded-md bg-white p-10 shadow-md">
		<h1 class="text-5xl">About Us</h1>
		<p>
			Welcome to EZ Parking, your premier parking solution designed to make finding available
			parking spots easier and more efficient. Our platform is dedicated to helping drivers locate
			and view nearby parking slots in real time.
		</p>

		<h2>Our Mission</h2>
		<p>
			At EZ Parking, our mission is to simplify the parking experience. We provide real-time updates
			on available parking spaces, helping you save time and frustration.
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
			Our dedicated team of developers works tirelessly to ensure that EZ Parking runs smoothly and
			efficiently. Here’s a bit about our team:
		</p>

		<div class="flex flex-col items-center">
			<div class="project-manager mt-5">
				<div class="developer">
					<img src="/profile-image/jhen.jpg" alt="Panes Jhennymae" />
					<h3>Panes Jhennymae</h3>
					<p>Project Manager</p>
				</div>
			</div>

			<div class="grid max-w-xl grid-cols-2 gap-1">
				<div class="developer">
					<img src="/profile-image/ange.jpg" alt="Uy Angelica" />
					<h3>Uy Angelica</h3>
					<p>Frontend Developer</p>
				</div>
				<div class="developer">
					<img src="/profile-image/aubrey.jpg" alt="Quiñonez Aubrey Kate" />
					<h3>Quiñonez Aubrey Kate</h3>
					<p>Frontend Developer</p>
				</div>
				<div class="developer">
					<img src="/profile-image/rona.jpg" alt="Perez Ronalyn" />
					<h3>Perez Ronalyn</h3>
					<p>Backend Developer</p>
				</div>
				<div class="developer">
					<img src="/profile-image/eya.jpg" alt="Villegas Sheila Mae" />
					<h3>Villegas Sheila Mae</h3>
					<p>App Developer</p>
				</div>
			</div>
		</div>

		<h2 class="text-4xl">Contact Us</h2>
		<p>
			If you have any questions, feedback, or need assistance, please feel free to contact us at <a
				class="text-[#0056b3]"
				href="mailto:support@ezparking.com">support@ezparking.com</a
			>.
		</p>
	</div>
</div>

<footer class="flex items-center justify-between bg-[#D9D9D9] shadow-md">
	<div class="flex items-center">
		<a href="userlp.html">
			<img src="logo.png" alt="EZ Parking Logo" class="h-20" />
		</a>
		<div>
			<p>EZ Parking - View the best available parking spots in real-time!</p>
			<p>© 2024 EZ Parking. Your parking solution.</p>
		</div>
	</div>
	<div class="flex items-center">
		<button>
			<a href="/about">About Us</a>
		</button>
		<button>
			<a href="faq.html">FAQs</a>
		</button>
		<button>
			<a href="terms.html">Terms of Service</a>
		</button>
		<button>
			<a href="privacy.html">Privacy Policy</a>
		</button>
	</div>
</footer>

<style>
	.developer {
		background-color: #f9f9f9;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.developer:hover {
		transform: translateY(-5px);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
</style>
