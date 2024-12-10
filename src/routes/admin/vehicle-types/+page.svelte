<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const vehicleTypesList = data.message.data as unknown as {
		code: string;
		created_at: string;
		description: string;
		is_active: boolean;
		name: string;
		size_category: string;
		updated_at: string;
		uuid: string;
		vehicle_type_id: number;
	}[];

	type SizeCategory = 'SMALL' | 'MEDIUM' | 'LARGE';

	const vehicleTypes = [
		{
			vehicle_type_id: 1,
			code: 'BIKE',
			name: 'Motorcycle',
			description: 'Standard motorcycles and scooters',
			size_category: 'SMALL',
			is_active: true,
			created_at: '2024-03-27T10:00:00',
			updated_at: '2024-03-27T10:00:00'
		}
	];

	let newVehicleType = {
		code: '',
		name: '',
		description: '',
		size_category: 'SMALL' as SizeCategory,
		is_active: true
	};
</script>

<svelte:head>
	<title>Admin | Vehicle Types</title>
</svelte:head>

<div class="min-h-screen w-full bg-gray-50 p-4">
	<div class="mx-auto max-w-7xl">
		<!-- Header -->
		<div class="mb-6">
			<h1 class="text-2xl font-bold text-gray-900">Vehicle Types</h1>
			<p class="mt-1 text-sm text-gray-600">Manage vehicle categories and their specifications</p>
		</div>

		<div class="mt-8 flex w-full flex-col justify-center">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block w-full py-2 align-middle">
					<div class="w-full overflow-hidden rounded-lg shadow-sm ring-1 ring-black ring-opacity-5">
						<table class="w-full divide-y divide-gray-300">
							<thead class="bg-gray-50">
								<tr>
									<th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
										>Code</th
									>
									<th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
										>Name</th
									>
									<th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
										>Description</th
									>
									<th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
										>Size</th
									>
									<th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
										>Status</th
									>
									<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
										<span class="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each vehicleTypesList as type}
									<tr>
										<td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"
											>{type.code}</td
										>
										<td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"
											>{type.name}</td
										>
										<td class="px-3 py-4 text-center text-sm text-gray-500">{type.description}</td>
										<td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">
											<span
												class="inline-flex rounded-full px-2 text-xs font-semibold leading-5
                        {type.size_category === 'SMALL'
													? 'bg-green-100 text-green-800'
													: type.size_category === 'MEDIUM'
														? 'bg-yellow-100 text-yellow-800'
														: 'bg-red-100 text-red-800'}"
											>
												{type.size_category}
											</span>
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
											<span
												class={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
													type.is_active
														? 'bg-green-100 text-green-800'
														: 'bg-gray-100 text-gray-800'
												}`}
											>
												{type.is_active ? 'Active' : 'Inactive'}
											</span>
										</td>
										<td
											class="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6"
										>
											<button class="text-indigo-600 hover:text-indigo-900">Edit</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-8">
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="text-lg font-medium text-gray-900">Add New Vehicle Type</h2>
				<form class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div>
						<label for="code" class="block text-sm font-medium text-gray-700">Code</label>
						<input
							type="text"
							name="code"
							id="code"
							required
							bind:value={newVehicleType.code}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>

					<div>
						<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							required
							bind:value={newVehicleType.name}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>

					<div class="sm:col-span-2">
						<label for="description" class="block text-sm font-medium text-gray-700"
							>Description</label
						>
						<textarea
							name="description"
							id="description"
							rows="3"
							required
							bind:value={newVehicleType.description}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						></textarea>
					</div>

					<div>
						<label for="size_category" class="block text-sm font-medium text-gray-700"
							>Size Category</label
						>
						<select
							name="size_category"
							id="size_category"
							required
							bind:value={newVehicleType.size_category}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							<option value="SMALL">Small</option>
							<option value="MEDIUM">Medium</option>
							<option value="LARGE">Large</option>
						</select>
					</div>

					<div class="flex items-center">
						<input
							type="checkbox"
							name="is_active"
							id="is_active"
							bind:checked={newVehicleType.is_active}
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<label for="is_active" class="ml-2 block text-sm text-gray-900">Active</label>
					</div>

					<div class="col-span-2">
						<button
							type="submit"
							class="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Add Vehicle Type
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
