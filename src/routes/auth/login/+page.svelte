<script lang="ts">
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';
    import isEmailValid from '$lib/utils/function/email-validation.js';
    import { goto } from '$app/navigation';

    let emailInput: HTMLInputElement;
    let continueButton: HTMLButtonElement;
    let resendButton: HTMLButtonElement;
    let otpInputs: HTMLInputElement[] = [];
    let otpValues = $state(Array(6).fill(''));
    let timerText: HTMLDivElement;
    let errorMessage: HTMLDivElement;
    let errorLoginMessage: HTMLDivElement;
    let otpForm: HTMLFormElement;
    let showOtpForm = $state(false);
    let rememberMe = $state(false);
    let nextRoute = $state('');

    let email = $state('');

    let loggingIn = $state(false);
    let timer = $state(300);

    $effect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        nextRoute = urlParams.get('next') || '';
        emailInput.focus();
    });

    function handleKeydown(index: number, event: KeyboardEvent) {
        if (event.key === 'Backspace' && !otpValues[index] && index > 0) {
            otpInputs[index - 1].focus();
        }
    }

    function startTimer() {
        timer = 300;
        const interval = setInterval(() => {
            if (timer > 0) {
                timer--;
                if (timerText) timerText.textContent = `Get new code in ${timer} seconds`;
            } else {
                clearInterval(interval);
                if (timerText) timerText.textContent = '';
                if (resendButton) resendButton.disabled = false;
            }
        }, 1000);
    }

    async function handleOtpInput(index: number, event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value.replace(/\D/g, '');

        otpValues[index] = value;
        input.value = value;

        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }

        const allFilled = otpValues.every((v) => v !== '');
        if (allFilled) {
            otpForm.requestSubmit();
        }
    }
</script>

<svelte:head>
    <title>User Login | EZ Parking</title>
</svelte:head>

<main class="min-h-screen bg-gray-50">
    <nav
        class="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between bg-white px-6 shadow-sm"
    >
        <div class="flex items-center">
            <a href="/" class="flex items-center">
                <img src="./../../logo.png" alt="EZ Parking" class="h-16 w-auto" />
            </a>
        </div>
        <a
            href="/auth/user/sign-up"
            class="text-sm font-semibold text-gray-600 hover:text-indigo-600"
        >
            Create Account
            <span aria-hidden="true" class="ml-1">→</span>
        </a>
    </nav>

    <div class="flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        {#if !showOtpForm}
            <div class="w-full max-w-md space-y-8" transition:fade>
                <div>
                    <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        Please enter your registered email address
                    </p>
                </div>

                <form
                    method="POST"
                    action="?/login"
                    class="mt-8 space-y-6"
                    use:enhance={() => {
                        loggingIn = true;
                        localStorage.setItem('rememberMe', rememberMe.toString());
                        return async ({ result }) => {
                            loggingIn = false;
                            if (result.type === 'success') {
                                showOtpForm = true;
                                startTimer();
                            } else if (result.type === 'failure') {
                                if (result.data) {
                                    alert(result.data.message as string);
                                }
                            }
                        };
                    }}
                >
                    <div class="-space-y-px rounded-md shadow-sm">
                        <div>
                            <input
                                type="email"
                                name="email"
                                required
                                class="relative block w-full rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                placeholder="Email address"
                                onkeyup={() => isEmailValid(email)}
                                bind:this={emailInput}
                                bind:value={email}
                            />
                        </div>
                    </div>

                    <div class="flex items-center">
                        <input
                            id="rememberMe"
                            name="remember"
                            type="checkbox"
                            bind:checked={rememberMe}
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label for="rememberMe" class="ml-2 block text-sm text-gray-900">
                            Remember me for 60 days
                        </label>
                    </div>

                    <button
                        type="submit"
                        class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                        disabled={!isEmailValid(email) || loggingIn}
                    >
                        {#if loggingIn}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1.5"
                                        repeatCount="indefinite"
                                        type="rotate"
                                        values="0 12 12;360 12 12"
                                    />
                                </path>
                            </svg>
                        {:else}
                            Continue
                        {/if}
                    </button>
                </form>
            </div>
        {:else}
            <div class="w-full max-w-md space-y-8" transition:fade>
                <div>
                    <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Verify your email
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        Enter the 6-digit code sent to <span class="font-medium text-indigo-600"
                            >{email}</span
                        >
                    </p>
                </div>

                <form
                    method="post"
                    action="?/otp"
                    class="mt-8 space-y-6"
                    bind:this={otpForm}
                    use:enhance={() => {
                        return async ({ result }) => {
                            if (result.type === 'success') {
                                const role = result.data!.role;
                                if (role === 'admin') goto('/admin/dashboard');
                                else if (role === 'parking_manager')
                                    goto('/parking-manager/dashboard');
                                else if (role === 'user') goto(nextRoute || '/user/dashboard');
                            } else if (result.type == 'failure') {
                                if (result.data) {
                                    alert(result.data.message as string);
                                }
                            } else if (result.type === 'error') {
                                errorMessage.textContent = result.error;
                                alert('Invalid OTP. Please try again.');
                            }
                        };
                    }}
                >
                    <input type="hidden" name="email" bind:value={email} />
                    <input type="hidden" name="remember" bind:value={rememberMe} />

                    <div class="flex justify-center gap-2">
                        {#each Array(6) as _, i}
                            <input
                                type="text"
                                name="otp-{i}"
                                maxlength="1"
                                class="h-12 w-12 rounded-lg border-gray-300 text-center text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                oninput={(e) => handleOtpInput(i, e)}
                                onkeydown={(e) => handleKeydown(i, e)}
                                bind:this={otpInputs[i]}
                            />
                        {/each}
                    </div>

                    <div class="text-center text-sm text-gray-500" bind:this={timerText}>
                        Get new code in {timer} seconds
                    </div>

                    <button
                        type="button"
                        class="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-400"
                        bind:this={resendButton}
                        disabled={timer > 0}
                        onclick={startTimer}
                    >
                        Resend Code
                    </button>

                    <div bind:this={errorMessage} class="text-center text-sm text-red-600" />
                </form>
            </div>
        {/if}
    </div>
</main>
