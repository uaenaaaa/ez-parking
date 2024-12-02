<script lang="ts">
	const peakParkingHoursData = {
		labels: [
			'12 AM',
			'1 AM',
			'2 AM',
			'3 AM',
			'4 AM',
			'5 AM',
			'6 AM',
			'7 AM',
			'8 AM',
			'9 AM',
			'10 AM',
			'11 AM',
			'12 PM',
			'1 PM',
			'2 PM',
			'3 PM',
			'4 PM',
			'5 PM',
			'6 PM',
			'7 PM',
			'8 PM',
			'9 PM',
			'10 PM',
			'11 PM'
		],
		datasets: [
			{
				label: 'Peak Parking Hours',
				data: [
					5, 7, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100, 90, 80, 70, 50, 30,
					20
				],
				backgroundColor: 'rgba(75, 192, 192, 0.5)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1
			}
		]
	};

	const mostCommonVehicleTypesData = {
		labels: ['2 Wheel', '3 Wheel', '4 Wheel'],
		datasets: [
			{
				label: 'Most Common Vehicle Types',
				data: [30, 15, 40],
				backgroundColor: [
					'rgba(255, 99, 132, 0.5)',
					'rgba(54, 162, 235, 0.5)',
					'rgba(255, 206, 86, 0.5)'
				],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
				borderWidth: 1
			}
		]
	};

	const busiestDaysData = {
		labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		datasets: [
			{
				label: 'Busiest Days',
				data: [50, 60, 70, 80, 90, 100, 120],
				backgroundColor: 'rgba(153, 102, 255, 0.5)',
				borderColor: 'rgba(153, 102, 255, 1)',
				borderWidth: 1
			}
		]
	};

	const totalVehiclesParked = 100;
	const availableSlots = 20;
	const registeredUsers = 50;
	const totalCapacity = totalVehiclesParked + availableSlots;

	const parkingStatisticsData = {
		labels: ['Total Vehicles Parked', 'Available Slots', 'Registered Users', 'Total Capacity'],
		datasets: [
			{
				label: 'Parking Statistics',
				data: [totalVehiclesParked, availableSlots, registeredUsers, totalCapacity],
				backgroundColor: [
					'rgba(75, 192, 192, 0.5)',
					'rgba(255, 206, 86, 0.5)',
					'rgba(255, 99, 132, 0.5)',
					'rgba(153, 102, 255, 0.5)'
				],
				borderColor: [
					'rgba(75, 192, 192, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(153, 102, 255, 1)'
				],
				borderWidth: 1
			}
		]
	};

	const configPeakParkingHours = {
		type: 'line',
		data: peakParkingHoursData,
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	const configMostCommonVehicleTypes = {
		type: 'bar',
		data: mostCommonVehicleTypesData,
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	const configBusiestDays = {
		type: 'bar',
		data: busiestDaysData,
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	const configParkingStatistics = {
		type: 'doughnut',
		data: parkingStatisticsData,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				},
				title: {
					display: true,
					text: 'Parking Statistics'
				},
				tooltip: {
					callbacks: {
						label: function (tooltipItem) {
							const label = tooltipItem.label || '';
							const value = tooltipItem.raw || 0;
							return `${label}: ${value}`;
						}
					}
				}
			}
		}
	};

	const peakParkingHoursChart = new Chart(
		document.getElementById('peakParkingHoursChart'),
		configPeakParkingHours
	);

	const mostCommonVehicleTypesChart = new Chart(
		document.getElementById('mostCommonVehicleTypesChart'),
		configMostCommonVehicleTypes
	);

	const busiestDaysChart = new Chart(
		document.getElementById('busiestDaysChart'),
		configBusiestDays
	);

	const parkingStatisticsChart = new Chart(
		document.getElementById('parkingStatisticsChart'),
		configParkingStatistics
	);

	let modalChartInstance;

	let  openModal = (chartId: string) => {
		const modal = document.getElementById('modal');
		const modalChart = document.getElementById('modalChart');
		const ctx = modalChart.getContext('2d');
		ctx.clearRect(0, 0, modalChart.width, modalChart.height);

		if (modalChartInstance) {
			modalChartInstance.destroy();
		}

		let chartConfig;
		switch (chartId) {
			case 'peakParkingHoursChart':
				chartConfig = configPeakParkingHours;
				break;
			case 'mostCommonVehicleTypesChart':
				chartConfig = configMostCommonVehicleTypes;
				break;
			case 'busiestDaysChart':
				chartConfig = configBusiestDays;
				break;
			case 'parkingStatisticsChart':
				chartConfig = configParkingStatistics;
				break;
			default:
				break;
		}

		modalChartInstance = new Chart(ctx, chartConfig);
		modal.style.display = 'block';
	}

	function closeModal() {
		const modal = document.getElementById('modal');
		modal.style.display = 'none';

		if (modalChartInstance) {
			modalChartInstance.destroy();
			modalChartInstance = null;
		}
	}

	window.onclick = function (event) {
		const modal = document.getElementById('modal');
		if (event.target === modal) {
			closeModal();
		}
	};
</script>

<svelte:head>
	<title>Parking Report System</title>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</svelte:head>
<main>
	<h1>Parking Report System</h1>

	<div class="report-container">
		<div class="chart-container" onclick={openModal('peakParkingHoursChart')}>
			<canvas id="peakParkingHoursChart"></canvas>
		</div>

		<div class="chart-container" onclick={openModal('mostCommonVehicleTypesChart')}>
			<canvas id="mostCommonVehicleTypesChart"></canvas>
		</div>
	</div>

	<div class="report-container">
		<div class="chart-container" onclick={openModal('busiestDaysChart')}>
			<canvas id="busiestDaysChart"></canvas>
		</div>

		<div class="chart-container" onclick={openModal('parkingStatisticsChart')}>
			<canvas id="parkingStatisticsChart"></canvas>
		</div>
	</div>

	<div id="modal" class="modal">
		<div class="modal-content">
			<span class="close" onclick={closeModal}>&times;</span>
			<canvas id="modalChart"></canvas>
		</div>
	</div>

	<a href="/parking-manager/dashboard" class="button">Back to Home</a>
</main>

<style>
	body {
		background-color: #f4f4f4;
		padding: 20px;
	}

	h1 {
		margin-bottom: 20px;
	}

	.report-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 20px;
	}

	.chart-container {
		width: 48%;
		max-width: 600px;
		cursor: pointer;
	}

	canvas {
		max-height: 300px;
	}

	.modal {
		display: none;
		position: fixed;
		z-index: 1000;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.modal-content {
		background-color: #fefefe;
		margin: 15% auto;
		padding: 20px;
		border: 1px solid #888;
		width: 80%;
	}

	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}

	.button {
		padding: 10px 20px;
		background-color: #767184;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s;
		display: block;
		margin: 20px auto;
		width: fit-content;
	}

	.button:hover {
		background-color: #737373;
	}
</style>
