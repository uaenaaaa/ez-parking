<script lang="ts">
    import { enhance } from "$app/forms";
    let { banForm, flipBanModal } = $props();
</script>

<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
<div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <form class="p-6" use:enhance method="POST">
                <h3 class="text-lg font-semibold mb-4">Ban User</h3>

                <div class="space-y-4">
                    <div>
                        <label for="ban_reason" class="block text-sm font-medium text-gray-700">
                            Ban Reason <span class="text-red-500">*</span>
                        </label>
                        <textarea
                            id="ban_reason"
                            bind:value={banForm.ban_reason}
                            required
                            maxlength="255"
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        ></textarea>
                    </div>

                    <div class="flex items-center">
                        <input
                            type="checkbox"
                            id="is_permanent"
                            bind:checked={banForm.is_permanent}
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label for="is_permanent" class="ml-2 block text-sm text-gray-700">
                            Permanent Ban
                        </label>
                    </div>

                    {#if !banForm.is_permanent}
                        <div>
                            <label for="ban_start" class="block text-sm font-medium text-gray-700">
                                Ban Start Date <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                id="ban_start"
                                bind:value={banForm.ban_start}
                                required
                                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label for="ban_end" class="block text-sm font-medium text-gray-700">
                                Ban End Date <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                id="ban_end"
                                bind:value={banForm.ban_end}
                                required
                                min={banForm.ban_start}
                                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    {/if}
                </div>

                <div class="mt-6 flex justify-end gap-3">
                    <button
                        type="submit"
                        class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:text-sm"
                    >
                        Ban User
                    </button>
                    <button
                        type="button"
                        onclick={() => { flipBanModal() }}
                        class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 sm:text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
