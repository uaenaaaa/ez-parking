<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    let errorMessage: HTMLDivElement;
</script>

<svelte:head>
    <title>User Sign Up | EZ Parking</title>
</svelte:head>

<main class="min-h-screen bg-gray-50">
    <nav class="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between bg-white px-6 shadow-sm">
        <div class="flex items-center">
            <a href="/" class="flex items-center">
                <img src="./../../logo.png" alt="EZ Parking" class="h-16 w-auto" />
            </a>
        </div>
        <a href="/auth/login" class="text-sm font-semibold text-gray-600 hover:text-indigo-600">
            Sign In
            <span aria-hidden="true" class="ml-1">→</span>
        </a>
    </nav>

    <div class="flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8" transition:fade>
            <div>
                <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
                    Create your account
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Please fill in your information
                </p>
            </div>

            <form
                id="signupForm"
                method="post"
                class="mt-8 space-y-4"
                use:enhance={() => {
                    return async ({ result }) => {
                        console.log(result);
                        if (result.type === 'failure') {
                            errorMessage.innerText = result.data?.message as string;
                        } else {
                            errorMessage.innerText = '';
                            goto('/auth/success');
                        }
                    };
                }}
            >
                <div class="space-y-4 rounded-md">
                    <input
                        type="text"
                        id="name"
                        name="first-name"
                        placeholder="First Name"
                        required
                        class="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                    <input
                        type="text"
                        id="first-name"
                        name="last-name"
                        placeholder="Last Name"
                        required
                        class="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                    <input
                        type="text"
                        id="middle-name"
                        name="middle-name"
                        placeholder="Middle Name"
                        class="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        class="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phone"
                        placeholder="Phone Number (11 digits)"
                        required
                        minlength="11"
                        class="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        placeholder="Nickname"
                        class="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                    <input
                        type="text"
                        name="plate-number"
                        id="plate-number"
                        placeholder="Plate number"
                        required
                        class="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                </div>

                <div bind:this={errorMessage} class="text-center text-sm text-red-600"></div>

                <button
                    type="submit"
                    class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign Up
                </button>

                <div class="text-center">
                    <a href="/auth/login" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Login to my account instead
                    </a>
                </div>
            </form>
        </div>
    </div>
</main>
