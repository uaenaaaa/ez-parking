<script lang="ts">
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';
    import PaymentMethodCard from './PaymentMethodCard.svelte';
    import FacilitiesAndAmenities from './FacilitiesAndAmenities.svelte';
    import ParkingLocationCard from './ParkingLocationCard.svelte';
    import PricingStructureCard from './PricingStructureCard.svelte';
    import OperatingHours from './OperatingHours.svelte';
    import OwnerInformationCard from './OwnerInformationCard.svelte';
    import NoticeSection from './NoticeSection.svelte';
    import { goto } from '$app/navigation';

    interface FileState {
        file: File | null;
        preview?: string;
        name: string;
        type: string;
    }

    // let pricingErrors: PricingValidationError[] = [];
    let fileStates: Record<string, FileState> = $state({});
    // let scheduleErrors: ScheduleValidationError[] = $state([]);
    let zoningCompliance = $state(false);
    let isSubmitting = $state(false);
    let agreed = $state(false);
    interface Documents {
        govId: File | null;
        parkingPhotos: File[] | null;
        proofOfOwnership: File | null;
        businessCert: File | null;
        birCert: File | null;
        liabilityInsurance: File | null;
    }

    // Update state declaration with type
    let documents = $state<Documents>({
        govId: null,
        parkingPhotos: [],
        proofOfOwnership: null,
        businessCert: null,
        birCert: null,
        liabilityInsurance: null
    });

    function handleFileSelect(event: Event, type: string) {
        const input = event.target as HTMLInputElement;
        const files = input.files;

        if (!files?.length) return;

        if (type === 'parkingPhotos') {
            const filesArray = Array.from(files);
            fileStates[type] = {
                file: filesArray[0],
                preview: URL.createObjectURL(filesArray[0]),
                name: `${filesArray.length} files selected`,
                type: 'image/*'
            };
            documents[type] = filesArray;
        } else {
            const file = files[0];
            fileStates[type] = {
                file,
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
                name: file.name,
                type: file.type
            };
            documents[type] = file;
        }

        fileStates = { ...fileStates };
        documents = { ...documents };
    }

    function removeFile(type: string) {
        if (fileStates[type]?.preview) {
            URL.revokeObjectURL(fileStates[type].preview);
        }
        delete fileStates[type];
        fileStates = { ...fileStates };

        const input = document.getElementById(type) as HTMLInputElement;
        if (input) input.value = '';
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
                use:enhance={({ formData }) => {
                    isSubmitting = true;

                    Object.entries(documents).forEach(([type, file]) => {
                        if (type === 'parkingPhotos' && Array.isArray(file)) {
                            file.forEach((f: File) => {
                                formData.append(`${type}`, f);
                            });
                        } else if (file instanceof File) {
                            formData.append(type, file);
                        }
                    });

                    return async ({ result }) => {
                        isSubmitting = false;
                        if (result.type === 'failure') {
                            alert(result.data?.message);
                        }
                        else if (result.type === 'error') {
                            alert('An error occurred. Please try again later.');
                        } else if (result.type === "success") {
                            alert('Registration successful!');
                            goto('/auth/success');
                        }
                        else {
                            alert('An error occurred. Please try again later.');
                        }
                    };
                }}
            >
                <OwnerInformationCard />

                <ParkingLocationCard />

                <FacilitiesAndAmenities />

                <OperatingHours />

                <PricingStructureCard />

                <PaymentMethodCard />

                <div class="rounded-lg bg-white p-6 shadow-sm">
                    <div class="rounded-lg bg-white p-6 shadow-sm">
                        <h3 class="mb-6 text-lg font-medium text-gray-900">Required Documents</h3>

                        <div class="space-y-6">
                            {#each Object.entries(documents) as [type, file]}
                                <div>
                                    <label
                                        for="filesUpload"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        {type
                                            .split(/(?=[A-Z])/)
                                            .join(' ')
                                            .toUpperCase()}
                                        {type !== 'parkingPhotos' ? '(PDF or Image)' : '(Images)'}
                                    </label>

                                    {#if fileStates[type]}
                                        <div class="mt-1 rounded-md border border-gray-300 p-4">
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center space-x-4">
                                                    {#if fileStates[type].preview}
                                                        <img
                                                            src={fileStates[type].preview}
                                                            alt="Preview"
                                                            class="h-16 w-16 rounded object-cover"
                                                        />
                                                    {:else}
                                                        <svg
                                                            class="h-16 w-16 text-gray-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8l4-4 4 4h-3v4h-2z"
                                                            />
                                                        </svg>
                                                    {/if}
                                                    <div>
                                                        <p class="font-medium text-gray-900">
                                                            {fileStates[type].name}
                                                        </p>
                                                        <p class="text-sm text-gray-500">
                                                            {type === 'parkingPhotos'
                                                                ? 'Multiple files'
                                                                : fileStates[type].type}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    class="text-red-600 hover:text-red-800"
                                                    onclick={() => removeFile(type)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    {:else}
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
                                                            accept={type === 'parkingPhotos'
                                                                ? 'image/*'
                                                                : '.pdf,image/*'}
                                                            multiple={type === 'parkingPhotos'}
                                                            onchange={(e) =>
                                                                handleFileSelect(e, type)}
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
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div class="space-y-6">
                        <NoticeSection />

                        <div class="flex items-center justify-between">
                            <div class="flex flex-col items-start gap-4">
                                <div class="flex flex-row items-center">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        required
                                        bind:checked={agreed}
                                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label for="terms" class="ml-2 block text-sm text-gray-900">
                                        I agree to the terms and conditions
                                    </label>
                                </div>
                                <div class="flex flex-row items-center">
                                    <input
                                        type="checkbox"
                                        id="zoningCompliance"
                                        name="zoningCompliance"
                                        value="true"
                                        required
                                        bind:checked={zoningCompliance}
                                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        for="zoningCompliance"
                                        class="ml-2 block text-sm text-gray-900"
                                    >
                                        I certify that my parking facility complies with local
                                        zoning laws
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !agreed || !zoningCompliance}
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
