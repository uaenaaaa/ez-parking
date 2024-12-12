<script lang="ts">
    let pricingData = $state({
        hourly: {
            enabled: false,
            rate: 0
        },
        daily: {
            enabled: false,
            rate: 0
        },
        monthly: {
            enabled: false,
            rate: 0
        }
    });
</script>

<div class="rounded-lg bg-white p-6 shadow-sm">
    <h3 class="mb-6 text-lg font-medium text-gray-900">Pricing Structure</h3>

    <div class="space-y-6">
        {#each Object.entries(pricingData) as [type, config]}
            <div class="flex items-center space-x-4">
                <input
                    name={`${type}_enabled`}
                    type="checkbox"
                    id={`${type}Enabled`}
                    bind:checked={config.enabled}
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
                        name={`${type}_rate`}
                        disabled={!config.enabled}
                        class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 sm:text-sm"
                    />
                </div>
            </div>
        {/each}
    </div>
</div>
