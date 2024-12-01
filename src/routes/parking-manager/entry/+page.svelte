<script lang="ts">
	import { Html5QrcodeScanner, Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
	import { goto } from '$app/navigation';
	import validateQrCode from '$lib/utils/function/validate-qr-code';

	let scannerDiv: HTMLDivElement;
	let scanner: Html5QrcodeScanner;
	let isScanning = $state(false);
	let scanSuccess = $state(false);
	let scanError = $state('');
	let fileQRCode: Html5Qrcode;

	$effect(() => {
		navigator.mediaDevices.getUserMedia({ video: true }).catch(() => {
			scanError = 'Failed to access camera but you can still upload a QR code image';
		});
		scanner = new Html5QrcodeScanner(
			'qr-reader',
			{
				fps: 10,
				qrbox: { width: 250, height: 250 },
				aspectRatio: 1.0,
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                showZoomSliderIfSupported: true,
                rememberLastUsedCamera: true,

				experimentalFeatures: {
					useBarCodeDetectorIfSupported: true
				}
			},
			false
		);

		scanner.render(onScanSuccess, onScanFailure);
		fileQRCode = new Html5Qrcode('qr-file-reader');

		return () => {
			scanner?.clear();
		};
	});

	function onScanSuccess(decodedText: string) {
		scanSuccess = true;
		isScanning = false;
		scanner.clear();
		console.log(`Code matched = ${decodedText.length}`);
		if (validateQrCode(decodedText)) {
			scanError = 'Invalid QR code';
			return;
		}
		setTimeout(() => {
			goto(`/parking-manager/entry/${decodedText}`);
		}, 1500);
	}

	function onScanFailure(error: string) {
		scanError = error;
	}

	async function handleFileUpload(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			onScanFailure('Invalid file type. Please upload an image file');
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			onScanFailure('File size exceeds 5MB limit');
			return;
		}
		if (file) {
			try {
				const result = await fileQRCode.scanFile(file, true);
                if (validateQrCode(result)) {
                    onScanFailure('Invalid QR code');
                    return;
                }
				onScanSuccess(result);
			} catch (error) {
				onScanFailure('Failed to read QR code from image');
			}
		}
	}
</script>

<svelte:head>
    <title>Scan Entry QR Code</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4">
	<div class="mx-auto max-w-3xl">
		<div class="mb-8 text-center">
			<h1 class="text-2xl font-bold text-gray-900">Scan Entry QR Code</h1>
			<p class="mt-2 text-sm text-gray-600">
				Scan the QR code presented by the user or upload a QR code image
			</p>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-sm">
			<div
				id="qr-reader"
				class="mx-auto max-w-md overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
			></div>

			<div class="mt-6">
				<label class="block text-center">
					<span class="text-sm text-gray-600">Or upload a QR code image</span>
					<input
                        id="qr-file-reader"
						type="file"
						accept="image/*"
						class="mt-2 block w-full cursor-pointer rounded-lg border border-gray-300 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-700"
						onchange={handleFileUpload}
					/>
				</label>
			</div>

			{#if scanSuccess}
				<div class="mt-4 rounded-md bg-green-50 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<p class="text-sm font-medium text-green-800">
								QR code scanned successfully! Redirecting...
							</p>
						</div>
					</div>
				</div>
			{/if}

			{#if scanError && !scanError.startsWith('QR code parse error, error = NotFoundException')}
				<div class="mt-4 rounded-md bg-red-50 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<p class="text-sm font-medium text-red-800">{scanError}</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
