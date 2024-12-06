<script lang="ts">
	// @ts-nocheck
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import type { ScheduleValidationError } from '$lib/utils/validators/schedule-validator';
	import type { PricingValidationError } from '$lib/utils/validators/pricing-validator';

	let pricingErrors: PricingValidationError[] = [];

	function getPricingErrorForType(type: string) {
		return pricingErrors.find((error) => error.type === type);
	}

	let scheduleErrors: ScheduleValidationError[] = [];

	function getScheduleErrorForDay(day: string) {
		return scheduleErrors.find((error) => error.day === day);
	}

	let formData = $state({
		agreed: false,
		ownerType: 'Individual',
		firstName: '',
		middleName: '',
		lastName: '',
		suffix: '',
		companyName: '',
		companyRegNumber: '',
		contactNumber: '',
		email: '',
		tin: '',
		address: {
			street: '',
			barangay: '',
			city: '',
			province: '',
			postalCode: '',
			landmarks: ''
		},
		parkingDetails: {
			spaceType: 'indoor',
			spaceLayout: 'parallel',
			is24Hours: false,
			customLayout: '',
			dimensions: '',
			operatingHours: {
				monday: { enabled: false, open: '', close: '' },
				tuesday: { enabled: false, open: '', close: '' },
				wednesday: { enabled: false, open: '', close: '' },
				thursday: { enabled: false, open: '', close: '' },
				friday: { enabled: false, open: '', close: '' },
				saturday: { enabled: false, open: '', close: '' },
				sunday: { enabled: false, open: '', close: '' }
			},
			customAccess: ''
		},
		facilities: {
			accessInformation: 'no_special_access',
			lighting: '',
			accessibility: '',
			nearby: ''
		},
		pricing: {
			hourly: { enabled: false, rate: 0 },
			daily: { enabled: false, rate: 0 },
			monthly: { enabled: false, rate: 0 }
		},
		paymentMethods: {
			cash: false,
			mobile: false,
			other: false,
			otherText: ''
		},
		location: {
			latitude: 14.5995,
			longitude: 120.9842
		},
		files: {
			govId: null,
			parkingPhotos: [],
			proofOfOwnership: null,
			businessCert: null,
			birCert: null,
			liabilityInsurance: null
		},
		zoningCompliance: false
	});

	let map;
	let marker;
	let isSubmitting = $state(false);
	let errors = $state({
		address: ''
	});

	$effect(() => {
		map = L.map('map').setView([formData.location.latitude, formData.location.longitude], 13);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap contributors'
		}).addTo(map);

		map.on('click', (e) => {
			const { lat, lng } = e.latlng;
			updateMarker(lat, lng);
		});

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				updateMarker(latitude, longitude);
			},
			() => {
				fetch('https://ipapi.co/json')
					.then((response) => response.json())
					.then((data) => {
						updateMarker(data.latitude, data.longitude);
					});
			}
		);

		return () => map?.remove();
	});

	function updateMarker(lat: number, lng: number) {
		formData.location.latitude = lat;
		formData.location.longitude = lng;

		if (marker) {
			marker.setLatLng([lat, lng]);
		} else {
			marker = L.marker([lat, lng], { draggable: true }).addTo(map);
			marker.on('dragend', () => {
				const pos = marker.getLatLng();
				updateMarker(pos.lat, pos.lng);
			});
		}

		map.setView([lat, lng], map.getZoom());
	}

	async function searchLocation() {
		if (!formData.address.street) {
			errors.address = 'Please enter a street address';
			return;
		}

		try {
			const query = `${formData.address.street}, ${formData.address.city}, Philippines`;
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
			);
			const data = await response.json();

			if (data.length > 0) {
				const { lat, lon } = data[0];
				updateMarker(Number(lat), Number(lon));
			} else {
				errors.address = 'Location not found';
			}
		} catch (error) {
			console.error('Search error:', error);
			errors.address = 'Error searching location';
		}
	}
</script>

<svelte:head>
	<title>Owner Sign Up | EZ Parking</title>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
		integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
		crossorigin=""
	/>
	<script
		src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
		integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
		crossorigin=""
		defer
	></script>
</svelte:head>

<main class="min-h-screen bg-gray-50">
	<header class="bg-white shadow">
		<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
			<div class="flex lg:flex-1">
				<a href="/" class="-m-1.5 p-1.5">
					<img src="/logo.png" alt="EZ Parking" class="h-10 w-auto" />
				</a>
			</div>
			<div class="flex lg:flex-1 lg:justify-end">
				<a href="/auth/owner/login" class="text-sm font-semibold leading-6 text-gray-900">
					Login Instead <span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</nav>
	</header>

	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<h1 class="text-center text-3xl font-bold tracking-tight text-gray-900">
				Parking Owner Registration
			</h1>
			<p class="mt-2 text-center text-sm text-gray-600">
				Please fill in your details to register your parking facility
			</p>

			<form
				enctype="multipart/form-data"
				method="POST"
				class="mt-12 space-y-12"
				use:enhance={() => {
					isSubmitting = true;
					errors = {};
					scheduleErrors = [];
					pricingErrors = [];

					return async ({ result }) => {
						isSubmitting = false;
						console.log(result);
						if (result.type === 'success') {
							// Handle success
						} else if (result.type === 'failure') {
							if (result.data?.errors?.schedule) {
								scheduleErrors = result.data.errors.schedule;
							}
							if (result.data?.errors?.pricing) {
								pricingErrors = result.data.errors.pricing;
							}
						}
					};
				}}
			>
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-6 text-lg font-medium text-gray-900">Owner Information</h3>
					<div class="grid gap-6 md:grid-cols-2">
						<div class="col-span-2">
							<label class="block text-sm font-medium text-gray-700" for="ownerType"
								>Owner Type</label
							>
							<select
								id="ownerType"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								bind:value={formData.ownerType}
								name="ownerType"
								required
							>
								<option value="individual">Individual</option>
								<option value="company">Company</option>
							</select>
						</div>

						<div class="col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
							<div>
								<label for="firstName" class="block text-sm font-medium text-gray-700"
									>First Name</label
								>
								<input
									id="firstName"
									type="text"
									name="firstName"
									required
									class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700" for="middleName"
									>Middle Name (optional)</label
								>
								<input
									type="text"
									id="middleName"
									name="middleName"
									class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
							<div>
								<label for="lastName" class="block text-sm font-medium text-gray-700"
									>Last Name</label
								>
								<input
									type="text"
									id="lastName"
									name="lastName"
									required
									class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
							<div>
								<label for="suffix" class="block text-sm font-medium text-gray-700"
									>Suffix (optional)</label
								>
								<input
									id="suffix"
									type="text"
									name="suffix"
									class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
						</div>
						{#if formData.ownerType === 'company'}
							<div class="col-span-2 grid-cols-1 space-y-6 md:grid-cols-2">
								<div>
									<label for="companyName" class="block text-sm font-medium text-gray-700"
										>Company Name</label
									>
									<input
										type="text"
										id="companyName"
										name="companyName"
										required
										class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
									/>
								</div>
								<div>
									<label for="companyRegNumber" class="block text-sm font-medium text-gray-700"
										>Company Registration Number</label
									>
									<input
										id="companyRegNumber"
										type="text"
										name="companyRegNumber"
										required
										class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
									/>
								</div>
							</div>
						{/if}

						<div class="col-span-2 grid gap-6 md:grid-cols-2">
							<div>
								<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
								<input
									type="email"
									name="email"
									id="email"
									required
									class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
							<div>
								<label for="contactNumber" class="block text-sm font-medium text-gray-700"
									>Phone Number</label
								>
								<input
									type="tel"
									id="contactNumber"
									name="contactNumber"
									required
									class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-6 text-lg font-medium text-gray-900">Parking Location</h3>

					<div class="grid gap-6 md:grid-cols-2">
						<div class="md:col-span-2">
							<label for="streetAddress" class="block text-sm font-medium text-gray-700"
								>Street Address</label
							>
							<input
								type="text"
								id="streetAddress"
								name="streetAddress"
								required
								bind:value={formData.address.street}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label for="barangay" class="block text-sm font-medium text-gray-700">Barangay</label>
							<input
								id="barangay"
								type="text"
								name="barangay"
								required
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label for="city" class="block text-sm font-medium text-gray-700"
								>City/Municipality</label
							>
							<input
								type="text"
								name="city"
								id="city"
								required
								bind:value={formData.address.city}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label for="province" class="block text-sm font-medium text-gray-700">Province</label>
							<input
								id="province"
								type="text"
								name="province"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label for="postalCode" class="block text-sm font-medium text-gray-700"
								>Postal Code</label
							>
							<input
								id="postalCode"
								type="text"
								name="postalCode"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label for="longitude" class="block text-sm font-medium text-gray-700"
								>Longitude</label
							>
							<input
								id="longitude"
								type="number"
								disabled
								name="longitude"
								bind:value={formData.location.longitude}
								class="mt-1 block w-full cursor-not-allowed rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>

						<div>
							<label for="latitude" class="block text-sm font-medium text-gray-700">Latitude</label>
							<input
								id="latitude"
								disabled
								bind:value={formData.location.latitude}
								type="number"
								name="latitude"
								class="mt-1 block w-full cursor-not-allowed rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>

						<div class="col-span-2">
							<label for="landmarks" class="block text-sm font-medium text-gray-700">
								Landmarks
							</label>
							<textarea
								name="landmarks"
								id="landmarks"
								rows="3"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								placeholder="e.g., near a mall, beside a church"
							></textarea>
						</div>
					</div>

					<div class="mt-6">
						<div id="map" class="h-96 w-full rounded-lg"></div>
						<div class="mt-4 flex items-center justify-between">
							<button
								type="button"
								class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
								onclick={searchLocation}
							>
								Search Location
							</button>
						</div>
					</div>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-6 text-lg font-medium text-gray-900">Facilities & Amenities</h3>

					<div class="space-y-6">
						<div class="flex flex-col gap-4">
							<label for="accessInformation" class="block text-sm font-medium text-gray-700">
								Access Information (Optional)
							</label>
							<select
								name="accessInformation"
								id="accessInformation"
								bind:value={formData.facilities.accessInformation}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							>
								<option value="gate_code">Gate Code</option>
								<option value="security_check">Security Check</option>
								<option value="key_pickup">Key Pickup</option>
								<option value="no_special_access">No Special Access</option>
								<option value="other">Other</option>
							</select>
							<input
								placeholder="Other? (Specify it here)"
								class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
								type="text"
								name="customAccess"
								id="customAccess"
								bind:value={formData.facilities.customAccess}
								disabled={formData.facilities.accessInformation !== 'Other'}
							/>
						</div>

						<div class="flex flex-col gap-4">
							<label for="spaceType" class="block text-sm font-medium text-gray-700">
								Space Type
							</label>
							<select
								name="spaceType"
								id="spaceType"
								bind:value={formData.parkingDetails.spaceType}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							>
								<option value="indoor">Indoor</option>
								<option value="outdoor">Outdoor</option>
								<option value="covered">Covered</option>
								<option value="uncovered">Uncovered</option>
							</select>
						</div>

						<div class="flex flex-col gap-4">
							<label for="spaceLayout" class="block text-sm font-medium text-gray-700">
								Space Layout
							</label>
							<select
								name="spaceLayout"
								id="spaceLayout"
								bind:value={formData.parkingDetails.spaceLayout}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							>
								<option value="parallel">Parallel</option>
								<option value="perpendicular">Perpendicular</option>
								<option value="angled">Angled</option>
								<option value="other">Other</option>
							</select>
							<input
								placeholder="Custom Layout"
								class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
								type="text"
								name="otherLayout"
								id="otherLayout"
								bind:value={formData.parkingDetails.customLayout}
								disabled={formData.parkingDetails.spaceLayout !== 'custom'}
							/>
						</div>

						<div class="flex flex-col gap-4">
							<label for="spaceDimensions" class="block text-sm font-medium text-gray-700">
								Space Dimensions
							</label>
							<input
								placeholder="Dimensions (e.g., 2.5m x 5m)"
								class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
								type="text"
								name="spaceDimensions"
								id="spaceDimensions"
								bind:value={formData.parkingDetails.dimensions}
							/>
						</div>

						<div>
							<label for="lightingAndSecurity" class="block text-sm font-medium text-gray-700">
								Lighting & Security Features
							</label>
							<textarea
								name="lightingAndSecurity"
								rows="3"
								id="lightingAndSecurity"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								placeholder="Describe security features (CCTV, guards, lighting, etc.)"
							></textarea>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700" for="accessibility">
								Accessibility Features
							</label>
							<textarea
								id="accessibility"
								name="accessibility"
								rows="3"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								placeholder="Describe accessibility features (ramps, elevators, etc.)"
							></textarea>
						</div>
						<div>
							<label for="nearbyFacilities" class="block text-sm font-medium text-gray-700">
								Nearby Facilities
							</label>
							<textarea
								name="nearbyFacilities"
								id="nearbyFacilities"
								rows="3"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								placeholder="e.g., EV charging stations, Restrooms, Elevators"
							></textarea>
						</div>
					</div>
				</div>
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-medium text-gray-900">Operating Hours</h3>
						<div class="flex items-center">
							<input
								type="checkbox"
								id="is24Hours"
								bind:checked={formData.parkingDetails.is24Hours}
								name="is24Hours"
								class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label for="is24Hours" class="ml-2 text-sm text-gray-700">Open 24/7</label>
						</div>
					</div>
					{#if !formData.parkingDetails.is24Hours}
						<div class="mt-6 space-y-4">
							<!-- Add this section for general schedule errors -->
							{#if scheduleErrors.some((error) => !error.day)}
								<p class="mb-4 text-sm text-red-600">
									{scheduleErrors.find((error) => !error.day)?.message}
								</p>
							{/if}
							{#each Object.entries(formData.parkingDetails.operatingHours) as [day, hours]}
								<div class="flex items-center space-x-4">
									<div class="w-32">
										<input
											type="checkbox"
											id={`${day}Enabled`}
											name={`${day}.enabled`}
											bind:checked={hours.enabled}
											value="true"
											class="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
    {getScheduleErrorForDay(day) ? 'border-red-300' : ''}"
										/>
										<label for={`${day}Enabled`} class="text-sm font-medium text-gray-700">
											{day.charAt(0).toUpperCase() + day.slice(1)}
										</label>
									</div>
									<div class="grid flex-1 grid-cols-2 gap-4">
										<input
											type="time"
											name={`${day}.open`}
											bind:value={hours.open}
											disabled={!hours.enabled}
											class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100
    {getScheduleErrorForDay(day) ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}"
										/>
										<input
											type="time"
											name={`${day}.close`}
											bind:value={hours.close}
											disabled={!hours.enabled}
											class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100
    {getScheduleErrorForDay(day) ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}"
										/>
									</div>
								</div>
								{#if getScheduleErrorForDay(day)}
									<p class="mt-1 text-sm text-red-600">{getScheduleErrorForDay(day)?.message}</p>
								{/if}
							{/each}
						</div>
					{/if}
				</div>

				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-6 text-lg font-medium text-gray-900">Pricing Structure</h3>

					<div class="space-y-6">
						{#each Object.entries(formData.pricing) as [type, config]}
							<div class="flex items-center space-x-4">
								<input
									name={`${type}.enabled`}
									type="checkbox"
									id={`${type}Enabled`}
									bind:checked={config.enabled}
									value="true"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								/>
								<label for={`${type}Enabled`} class="w-24 text-sm font-medium text-gray-700">
									{type.charAt(0).toUpperCase() + type.slice(1)} Rate
								</label>
								<div class="relative rounded-md shadow-sm">
									<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<span class="text-gray-500 sm:text-sm">₱</span>
									</div>
									<input
										type="number"
										min="0"
										step="0.01"
										bind:value={config.rate}
										name={`${type}.rate`}
										disabled={!config.enabled}
										class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 sm:text-sm"
									/>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-6 text-lg font-medium text-gray-900">Accepted Payment Methods</h3>

					<div class="space-y-6">
						<div class="flex items-center space-x-4">
							<input
								type="checkbox"
								id="cash"
								name="cash"
								bind:checked={formData.paymentMethods.cash}
								class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label for="cash" class="text-sm font-medium text-gray-700">Cash</label>
						</div>
						<div class="flex items-center space-x-4">
							<input
								name="mobile"
								type="checkbox"
								id="mobile"
								bind:checked={formData.paymentMethods.mobile}
								class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label for="mobile" class="text-sm font-medium text-gray-700">Mobile Payment</label>
						</div>
						<div class="flex items-center space-x-4">
							<input
								type="checkbox"
								id="other"
								bind:checked={formData.paymentMethods.other}
								class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label for="otherPayment" class="text-sm font-medium text-gray-700">Other</label>
							<input
								type="text"
								id="otherPayment"
								name="otherPayment"
								bind:value={formData.paymentMethods.otherText}
								disabled={!formData.paymentMethods.other}
								class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
							/>
						</div>
					</div>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-sm">
					<div class="rounded-lg bg-white p-6 shadow-sm">
						<h3 class="mb-6 text-lg font-medium text-gray-900">Required Documents</h3>

						<div class="space-y-6">
							{#each Object.entries(formData.files) as [type, file]}
								<div>
									<label for="filesUpload" class="block text-sm font-medium text-gray-700">
										{type
											.split(/(?=[A-Z])/)
											.join(' ')
											.toUpperCase()}
										{type !== 'parkingPhotos' ? '(PDF or Image)' : '(Images)'}
									</label>
									<div
										class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5"
									>
										<div class="space-y-1 text-center">
											<svg
												class="mx-auto h-12 w-12 text-gray-400"
												stroke="currentColor"
												fill="none"
												viewBox="0 0 48 48"
											>
												<path
													d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-4h8m-4-4v8m-12 4h.02"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
											<div class="flex text-sm text-gray-600">
												<label
													for={type}
													class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
												>
													<span>Upload a file</span>
													<input
														required
														id={type}
														name={type}
														type="file"
														class="sr-only"
														accept={type === 'parkingPhotos' ? 'image/*' : '.pdf,image/*'}
														multiple={type === 'parkingPhotos'}
													/>
												</label>
												<p class="pl-1">or drag and drop</p>
											</div>
											<p class="text-xs text-gray-500">
												{type === 'parkingPhotos'
													? 'PNG, JPG, GIF up to 10MB each'
													: 'PDF or images up to 10MB'}
											</p>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<div class="space-y-6">
						<div class="rounded-md bg-blue-50 p-4">
							<div class="flex">
								<div class="flex-shrink-0">
									<svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<div class="ml-3">
									<h3 class="text-sm font-medium text-blue-800">Account Verification Process</h3>
									<div class="mt-2 text-sm text-blue-700">
										<ul class="list-disc space-y-1 pl-5">
											<li>Your registration will be reviewed by our admin team</li>
											<li>Verification typically takes 1-2 business days</li>
											<li>Your establishment will be visible to customers after approval</li>
											<li>You'll receive an email notification once approved</li>
											<li>Make sure all documents are clear and valid to speed up the process</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<input
									id="terms"
									name="terms"
									type="checkbox"
									required
									bind:checked={formData.agreed}
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								/>
								<label for="terms" class="ml-2 block text-sm text-gray-900">
									I agree to the terms and conditions
								</label>
							</div>

							<button
								type="submit"
								disabled={isSubmitting || !formData.agreed}
								class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
							>
								{isSubmitting ? 'Submitting...' : 'Submit Registration'}
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</main>
