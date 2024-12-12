<script lang="ts">
    let ownerInformation = {
        ownerType: 'individual',
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        email: '',
        contactNumber: '',
        tin: '',
        name: '',
    };

</script>

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
                                bind:value={ownerInformation.ownerType}
                                name="ownerType"
                                required
                            >
                                <option selected value="individual">Individual</option>
                                <option value="company">Company</option>
                            </select>
                        </div>

                        {#if ownerInformation.ownerType === 'company'}
                            <div class="col-span-2 grid-cols-1 space-y-6 md:grid-cols-2">
                                <div>
                                    <label
                                        for="companyName"
                                        class="block text-sm font-medium text-gray-700"
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
                                    <label
                                        for="companyRegNumber"
                                        class="block text-sm font-medium text-gray-700"
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
                        {:else}
                            <div class="col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label
                                        for="firstName"
                                        class="block text-sm font-medium text-gray-700"
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
                                    <label
                                        class="block text-sm font-medium text-gray-700"
                                        for="middleName">Middle Name (optional)</label
                                    >
                                    <input
                                        type="text"
                                        id="middleName"
                                        name="middleName"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="lastName"
                                        class="block text-sm font-medium text-gray-700"
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
                                    <label
                                        for="suffix"
                                        class="block text-sm font-medium text-gray-700"
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
                        {/if}

                        <div class="col-span-2 grid gap-6 md:grid-cols-2">
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700"
                                    >Email</label
                                >
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label
                                    for="contactNumber"
                                    class="block text-sm font-medium text-gray-700"
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
                        <div class="col-span-2">
                            <div class="w-full">
                                <label for="tin" class="block text-sm font-medium text-gray-700">
                                    TIN (Tax Identification Number)
                                </label>
                                <input
                                    type="text"
                                    id="tin"
                                    name="tin"
                                    value={ownerInformation.tin}
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <div class="col-span-2">
                            <div class="w-full">
                                <label for="name" class="block text-sm font-medium text-gray-700">
                                    Parking Establishment Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={ownerInformation.name}
                                    required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
