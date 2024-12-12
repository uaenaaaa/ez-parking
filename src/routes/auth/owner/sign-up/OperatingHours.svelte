<script lang="ts">
    import type { ScheduleValidationError } from '$lib/utils/validators/schedule-validator';
    let scheduleErrors: ScheduleValidationError[] = $state([]);
    function getScheduleErrorForDay(day: string) {
        return scheduleErrors.find((error) => error.day === day);
    }

    let parkingData = $state({
        parkingDetails: {
            is247: false,
            operatingHours: {
                monday: {
                    enabled: false,
                    open: '',
                    close: ''
                },
                tuesday: {
                    enabled: false,
                    open: '',
                    close: ''
                },
                wednesday: {
                    enabled: false,
                    open: '',
                    close: ''
                },
                thursday: {
                    enabled: false,
                    open: '',
                    close: ''
                },
                friday: {
                    enabled: false,
                    open: '',
                    close: ''
                },
                saturday: {
                    enabled: false,
                    open: '',
                    close: ''
                },
                sunday: {
                    enabled: false,
                    open: '',
                    close: ''
                }
            }
        }
    });
</script>

<div class="rounded-lg bg-white p-6 shadow-sm">
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Operating Hours</h3>
        <div class="flex items-center">
            <input
                type="checkbox"
                id="is247"
                bind:checked={parkingData.parkingDetails.is247}
                name="is247"
                value="true"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="is247" class="ml-2 text-sm text-gray-700">Open 24/7</label>
        </div>
    </div>
    {#if !parkingData.parkingDetails.is247}
        <div class="mt-6 space-y-4">
            {#if scheduleErrors.some((error) => !error.day)}
                <p class="mb-4 text-sm text-red-600">
                    {scheduleErrors.find((error) => !error.day)?.message}
                </p>
            {/if}
            {#each Object.entries(parkingData.parkingDetails.operatingHours) as [day, hours]}
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
                    <p class="mt-1 text-sm text-red-600">
                        {getScheduleErrorForDay(day)?.message}
                    </p>
                {/if}
            {/each}
        </div>
    {/if}
</div>
