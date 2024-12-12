<script lang="ts">
    let paymentData = $state({
        paymentMethods: {
            cash: false,
            mobile: false,
            other: false,
            otherText: ''
        }
    })
</script>

<div class="rounded-lg bg-white p-6 shadow-sm">
    <h3 class="mb-6 text-lg font-medium text-gray-900">Accepted Payment Methods</h3>
    <div class="space-y-6">
        <div class="flex items-center space-x-4">
            <input
                type="checkbox"
                id="cash"
                name="cash"
                value="true"
                bind:checked={paymentData.paymentMethods.cash}
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="cash" class="text-sm font-medium text-gray-700">Cash</label>
        </div>
        <div class="flex items-center space-x-4">
            <input
                name="mobile"
                type="checkbox"
                id="mobile"
                value="true"
                bind:checked={paymentData.paymentMethods.mobile}
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="mobile" class="text-sm font-medium text-gray-700"
                >Mobile Payment</label
            >
        </div>
        <div class="flex items-center space-x-4">
            <input
                type="checkbox"
                id="other"
                value="true"
                name="acceptOther"
                bind:checked={paymentData.paymentMethods.other}
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="otherPayment" class="text-sm font-medium text-gray-700"
                >Other</label
            >
            <input
                type="text"
                id="otherPayment"
                name="otherPayment"
                bind:value={paymentData.paymentMethods.otherText}
                disabled={!paymentData.paymentMethods.other}
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
            />
        </div>
    </div>
</div>
