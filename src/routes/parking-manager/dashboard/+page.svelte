<script>
    import { page } from '$app/stores';

    let sidebarOpen = $state(false);

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }
</script>

<svelte:head>
    <title>Owner Dashboard</title>
</svelte:head>

<main>
    <div class="navbar">
        <div class="logo">
            <img src="./../logo.png" alt="NearbySpot Logo" />
        </div>
    </div>

    <button class="menu-btn" onclick={toggleSidebar}>☰</button>

    <div class="sidebar" class:open={sidebarOpen}>
        <h2>Owner Dashboard</h2>
        <ul>
            <li><a href="Manage-Parking.html">Manage Parking</a></li>
            <li><a href="set-sched.html">Set Schedule</a></li>
            <li><a href="Manage-Cashiers.html">Manage Cashiers</a></li>
            <li><a href="reports.html">View Reports</a></li>
            <li><a href="acc-settings.html">Account Settings</a></li>
            <li><a href="/">Log Out</a></li>
        </ul>
    </div>
	<div class="main-content" id="main-content" class:compressed={sidebarOpen}>
		<h1>Welcome, Parking Owner</h1>

		<div class="dashboard-panels">
			<div class="panel">
				<h3>
					Scan Entry QR Code
				</h3>
				<p>
					Scan the QR code to allow entry to the parking lot.
				</p>
				<a href="/parking-manager/entry/" class="btn">
					Scan QR Code
				</a>
			</div>

			<div class="panel">
				<h3>
					Scan Exit QR Code
				</h3>
				<p>
					Scan the QR code to allow exit from the parking lot.
				</p>
				<a href="/parking-manager/exit/" class="btn">
					Scan QR Code
				</a>
			</div>

			<div class="panel">
				<h3>Manage Parking Lot</h3>
				<p>Update parking details, capacity, pricing, and more.</p>
				<a href="/parking-manager/manage-parking-lot" class="btn">Manage Parking Lot</a>
			</div>

			<div class="panel">
				<h3>Set Schedule</h3>
				<p>Adjust open/close hours and update availability.</p>
				<a href="/parking-manager/schedule" class="btn">Set Schedule</a>
			</div>

			<div class="panel">
				<h3>Manage Cashiers</h3>
				<p>Assign or remove cashiers for your parking lot.</p>
				<a href="/parking-manager/manage-cashiers" class="btn">Manage Cashiers</a>
			</div>

			<div class="panel">
				<h3>Add Slot</h3>
				<p>
					Add a new parking slot to your parking lot.
				</p>
				<a href="/parking-manager/new/slot" class="btn">
					Add Slot
				</a>
			</div>

			<div class="panel">
				<h3>View Transactions</h3>
				<p>
					View all transactions made in your parking lot.
				</p>
				<a href="/parking-manager/transactions" class="btn">
					View Transactions
				</a>
			</div>

			<div class="panel">
				<h3>View Reports</h3>
				<p>Check occupancy rates, revenue, and more analytics.</p>
				<a href="/parking-manager/reports" class="btn">View Reports</a>
			</div>

			<div class="panel">
				<h3>Account Settings</h3>
				<p>Update your account information and preferences.</p>
				<a href="/parking-manager/account-settings" class="btn">Account Settings</a>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		margin: 0;
		color: #333;
		background: linear-gradient(135deg, #f0f0f5, #7c748f);
		display: flex;
		flex-direction: column;
	}

	.navbar {
		position: fixed;
		top: 0;
		width: 100%;
		height: 80px;
		background: rgba(217, 217, 217, 0.9);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	.navbar .logo {
		display: flex;
		align-items: center;
	}

	.navbar .logo img {
		height: 110px;
	}

	.sidebar {
		width: 250px;
		background-color: #333;
		color: white;
		position: fixed;
		top: 80px;
		bottom: 0;
		padding: 20px 10px;
		transform: translateX(-100%);
		transition: transform 0.3s ease;
		z-index: 1000;
	}

	.sidebar.open {
		transform: translateX(0);
	}

	.sidebar h2 {
		text-align: center;
		font-size: 24px;
		color: #8f86a8;
		padding-bottom: 20px;
		border-bottom: 1px solid #444;
		padding-top: 20px;
		padding-left: 20px;
	}

	.sidebar ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.sidebar ul li {
		margin: 20px 0;
	}

	.sidebar ul li a {
		color: #ccc;
		text-decoration: none;
		font-size: 18px;
		padding: 10px;
		display: block;
		border-radius: 8px;
		transition: 0.3s;
	}

	.sidebar ul li a:hover {
		background-color: #555;
		color: #fff;
	}

	/* Hamburger Menu Button */
	.menu-btn {
		background-color: #8f86a8;
		border: none;
		color: white;
		font-size: 24px;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
		position: fixed;
		top: 90px; /* Positioned below the navbar */
		left: 20px;
		z-index: 1001;
	}

	/* Main content area */
	.main-content {
		margin-left: 60px; /* Shifted slightly to the right */
		padding: 50px 20px 20px; /* Reduced padding for compact view */
		width: 85%; /* Reduced width */
		transition: margin-left 0.3s ease;
		max-width: 1200px; /* Add max-width for larger screens */
		margin-top: 30px; /* Ensure content stays below the navbar */
	}

	.main-content.compressed {
		margin-left: 250px; /* Shifted to the right when sidebar is open */
	}

	/* Dashboard panels */
	.dashboard-panels {
		display: grid;
		grid-template-columns: repeat(2, 1fr); /* 2 panels per row for compact view */
		gap: 15px; /* Reduced gap between panels */
		grid-template-rows: auto;
	}

	.panel {
		background-color: white;
		padding: 15px;
		border-radius: 8px;
		box-shadow: 0 4px 8px #7c748f;
	}

	.panel h3 {
		margin-top: 0;
		font-size: 18px;
		color: #8f86a8;
	}

	.panel p {
		margin: 10px 0;
		color: #666;
	}

	.btn {
		background-color: #8f86a8;
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 5px;
		cursor: pointer;
		transition: 0.3s;
		font-size: 12px; /* Smaller font size for buttons */
	}

	.btn:hover {
		background-color: #6d5f90;
	}
</style>
