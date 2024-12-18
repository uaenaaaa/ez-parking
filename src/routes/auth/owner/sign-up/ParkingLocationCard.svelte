<script lang="ts">
    // @ts-nocheck
    let addressData = $state({
        address: {
            street: '',
            city: '',
            province: '',
            postalCode: ''
        },
        location: {
            latitude: 14.5995,
            longitude: 120.9842
        },
        landmarks: ''
    });
    let L;
    let map;
    let marker;
    $effect(() => {
        const checkLeaflet = () => {
            if (window.L) {
                L = window.L;
                initializeMap();
            } else {
                setTimeout(checkLeaflet, 100);
            }
        };
        checkLeaflet();

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

        function initializeMap() {
        map = L.map('map').setView(
            [addressData.location.latitude, addressData.location.longitude],
            13
        );

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        map.on('click', (e: { latlng: { lat: number; lng: number } }) => {
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
    }

    function updateMarker(lat: number, lng: number) {
        addressData.location.latitude = lat;
        addressData.location.longitude = lng;

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
        if (!addressData.address.street) {
            alert('Please enter a street address');
        }

        try {
            const query = `${addressData.address.street}, ${addressData.address.city}, Philippines`;
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
            );
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                updateMarker(Number(lat), Number(lon));
            } else {
                alert('Location not found');
            }
        } catch (error) {
            alert('Error searching location');
        }
    }
</script>

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
                bind:value={addressData.address.street}
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
                bind:value={addressData.address.city}
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
            <label for="longitude" class="block text-sm font-medium text-gray-700">Longitude</label>
            <input
                id="longitude"
                type="number"
                disabled
                bind:value={addressData.location.longitude}
                class="mt-1 block w-full cursor-not-allowed rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input type="hidden" name="longitude" value={addressData.location.longitude} />
        </div>

        <div>
            <label for="latitude" class="block text-sm font-medium text-gray-700">Latitude</label>
            <input
                id="latitude"
                disabled
                bind:value={addressData.location.latitude}
                type="number"
                class="mt-1 block w-full cursor-not-allowed rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input type="hidden" name="latitude" value={addressData.location.latitude} />
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
