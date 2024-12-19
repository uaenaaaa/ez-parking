<script lang="ts">
    const developers = [
        {
            name: 'Panes Jhennymae',
            role: 'Project Manager',
            image: 'dev-image/jhen.jpg'
        },
        {
            name: 'Uy Angelica',
            role: 'Frontend Developer',
            image: 'dev-image/ange.jpg'
        },
        {
            name: 'Quiñonez Aubrey Kate',
            role: 'Frontend Developer',
            image: 'dev-image/aubrey.jpg'
        },
        {
            name: 'Perez Ronalyn',
            role: 'Backend Developer',
            image: 'dev-image/rona.jpg'
        },
        {
            name: 'Villegas Sheila Mae',
            role: 'App Developer',
            image: 'dev-image/eya.jpg'
        }
    ];
</script>

<div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="fixed top-0 z-50 w-full bg-white shadow-sm">
        <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" class="flex items-center">
                <img src="logo.png" alt="EZ Parking Logo" class="h-16 w-auto" />
            </a>
            <div class="flex items-center space-x-4">
                <a
                    href="/auth/owner/sign-up"
                    class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                    For Parking Owners
                </a>
                <a
                    href="/auth/user/sign-up"
                    class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    For Users
                </a>
            </div>
        </div>
    </nav>

    <main class="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white p-8 shadow-sm">
            <h1 class="mb-8 text-center text-4xl font-bold text-gray-900">About Us</h1>

            <div class="prose prose-indigo mx-auto max-w-none">
                <p class="mb-8 text-lg text-gray-600">
                    Welcome to EZ Parking, your premier parking solution designed to make finding
                    available parking spots easier and more efficient. Our platform is dedicated to
                    helping drivers locate and view nearby parking slots in real time.
                </p>

                <h2 class="mb-4 text-2xl font-bold text-gray-900">Our Mission</h2>
                <p class="mb-8 text-gray-600">
                    At EZ Parking, our mission is to simplify the parking experience. We provide
                    real-time updates on available parking spaces, helping you save time and
                    frustration.
                </p>

                <h2 class="mb-4 text-2xl font-bold text-gray-900">What We Offer</h2>
                <ul class="mb-8 list-disc space-y-2 pl-5 text-gray-600">
                    <li>Real-time availability of parking spaces near you</li>
                    <li>User-friendly interface for easy navigation</li>
                    <li>Regular updates on new parking spots and promotions</li>
                    <li>Support for users to find the best parking options in their area</li>
                </ul>

                <h2 class="mb-6 text-2xl font-bold text-gray-900">Meet the Developers</h2>

                <div class="mb-12">
                    <div class="mb-8 flex justify-center">
                        <div
                            class="w-64 transform rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                        >
                            <img
                                src={developers[0].image}
                                alt={developers[0].name}
                                class="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                            />
                            <h3 class="text-center text-lg font-semibold text-gray-900">
                                {developers[0].name}
                            </h3>
                            <p class="text-center text-sm text-gray-600">{developers[0].role}</p>
                        </div>
                    </div>

                    <!-- Other Developers -->
                    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {#each developers.slice(1) as developer}
                            <div
                                class="transform rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                            >
                                <img
                                    src={developer.image}
                                    alt={developer.name}
                                    class="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
                                />
                                <h3 class="text-center text-lg font-semibold text-gray-900">
                                    {developer.name}
                                </h3>
                                <p class="text-center text-sm text-gray-600">{developer.role}</p>
                            </div>
                        {/each}
                    </div>
                </div>

                <h2 class="mb-4 text-2xl font-bold text-gray-900">Contact Us</h2>
                <p class="text-gray-600">
                    If you have any questions, feedback, or need assistance, please feel free to
                    contact us at
                    <a
                        href="mailto:support@ezparking.com"
                        class="text-indigo-600 hover:text-indigo-800">support@ezparking.com</a
                    >.
                </p>
            </div>
        </div>
    </main>

    <footer class="bg-white shadow-sm">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div
                class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0"
            >
                <div class="flex items-center space-x-4">
                    <img src="logo.png" alt="EZ Parking Logo" class="h-12 w-auto" />
                    <div>
                        <p class="text-sm text-gray-600">
                            EZ Parking - View the best available parking spots in real-time!
                        </p>
                        <p class="text-sm text-gray-500">
                            © 2024 EZ Parking. Your parking solution.
                        </p>
                    </div>
                </div>
                <div class="flex space-x-6">
                    <a href="/about" class="text-sm text-gray-600 hover:text-gray-900">About Us</a>
                    <a href="/faqs" class="text-sm text-gray-600 hover:text-gray-900">FAQs</a>
                    <a href="/terms" class="text-sm text-gray-600 hover:text-gray-900"
                        >Terms of Service</a
                    >
                    <a href="/privacy" class="text-sm text-gray-600 hover:text-gray-900"
                        >Privacy Policy</a
                    >
                </div>
            </div>
        </div>
    </footer>
</div>
