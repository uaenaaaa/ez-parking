<script>
	// Enable Add Cashier button when fields are filled
	document.querySelectorAll('#cashier-form input, #cashier-form select').forEach((input) => {
		input.addEventListener('input', checkForm);
	});

	function checkForm() {
		const cashierName = document.getElementById('cashier-name').value;
		const cashierRole = document.getElementById('cashier-role').value;
		const cashierPassword = document.getElementById('cashier-password').value;

		// Enable the Add Cashier button only if all fields are filled
		const addCashierBtn = document.getElementById('add-cashier-btn');
		if (cashierName && cashierRole && cashierPassword) {
			addCashierBtn.disabled = false;
		} else {
			addCashierBtn.disabled = true;
		}
	}

	function addCashier() {
		const cashierName = document.getElementById('cashier-name').value;
		const cashierRole = document.getElementById('cashier-role').value;

		// Add cashier to the list
		const cashierList = document.getElementById('assigned-cashiers');
		const listItem = document.createElement('li');
		listItem.innerHTML = `${cashierName} - ${cashierRole} <button onclick="this.parentElement.remove()">Remove</button>`;
		cashierList.appendChild(listItem);

		// Clear form and disable Add Cashier button
		document.getElementById('cashier-form').reset();
		document.getElementById('add-cashier-btn').disabled = true;
	}
</script>

<svelte:head>
	<title>Manage Cashiers</title>
</svelte:head>
<main>
	<div class="container">
		<!-- Back Button -->
		<a href="/parking-manager/dashboard" class="back-btn">←</a>

		<h2>Manage Cashiers</h2>

		<!-- Form for adding cashier -->
		<form id="cashier-form">
			<div class="form-group">
				<label for="cashier-name">Cashier Name</label>
				<input type="text" id="cashier-name" placeholder="Enter cashier name" required />
			</div>
			<div class="form-group">
				<label for="cashier-role">Role</label>
				<select id="cashier-role" required>
					<option value="">Select role</option>
					<option value="Cashier">Cashier</option>
					<option value="Supervisor">Supervisor</option>
				</select>
			</div>
			<div class="form-group">
				<label for="cashier-password">Password</label>
				<input
					type="password"
					id="cashier-password"
					placeholder="Set password for cashier"
					required
				/>
			</div>
		</form>

		<!-- Add Cashier Button -->
		<button type="button" class="btn" id="add-cashier-btn" onclick={addCashier} disabled
			>Add Cashier</button
		>

		<!-- Cashier List -->
		<div class="cashier-list">
			<h3>Assigned Cashiers</h3>
			<ul id="assigned-cashiers">
				<!-- List of assigned cashiers will appear here -->
			</ul>
		</div>
	</div>
</main>

<style>
	main {
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

	.form-group input,
	.form-group select {
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

	.cashier-list ul {
		list-style: none;
		padding: 0;
	}

	.cashier-list li {
		padding: 8px;
		background-color: #f5f5f5;
		border-radius: 5px;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cashier-list button {
		background-color: #ff4d4d;
		color: white;
		border: none;
		padding: 5px 10px;
		border-radius: 5px;
		cursor: pointer;
	}

	.back-btn {
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
		color: #8f86a8;
		position: absolute;
		top: 20px;
		left: 20px;
	}

	.back-btn:hover {
		color: #6d5f90;
	}
</style>
