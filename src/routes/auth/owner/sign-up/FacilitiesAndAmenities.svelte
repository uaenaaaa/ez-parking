<script lang="ts">
    let facilitiesAndAmenities = $state({
        facilities: {
            accessInformation: 'gate_code',
            customAccess: ''
        },
        parkingDetails: {
            spaceType: 'indoor',
            spaceLayout: 'parallel',
            customLayout: '',
            dimensions: ''
        }
    });
</script>

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
                bind:value={facilitiesAndAmenities.facilities.accessInformation}
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
                name="customAccessInformation"
                id="customAccessInformation"
                bind:value={facilitiesAndAmenities.facilities.customAccess}
                disabled={facilitiesAndAmenities.facilities.accessInformation !== 'Other'}
            />
        </div>

        <div class="flex flex-col gap-4">
            <label for="spaceType" class="block text-sm font-medium text-gray-700">
                Space Type
            </label>
            <select
                name="spaceType"
                id="spaceType"
                bind:value={facilitiesAndAmenities.parkingDetails.spaceType}
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
                bind:value={facilitiesAndAmenities.parkingDetails.spaceLayout}
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
                name="customLayout"
                id="customLayout"
                bind:value={facilitiesAndAmenities.parkingDetails.customLayout}
                disabled={facilitiesAndAmenities.parkingDetails.spaceLayout !== 'custom'}
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
                bind:value={facilitiesAndAmenities.parkingDetails.dimensions}
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
