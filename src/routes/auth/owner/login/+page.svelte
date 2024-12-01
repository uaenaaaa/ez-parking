<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>Owner Login</title>

</svelte:head>
<main>
    <!-- <div class="video-background">
        <video autoplay muted loop>
            <source src="mapping1.mp4" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
    </div> -->

    <nav class="navbar">
        <div class="logo">
            <a href="nearby.html"><img src="./../../logo.png" alt="NearbySpot Logo"></a>

        </div>
    </nav>

    <div class="left-box">
        <h1>Nearby Spot</h1>
        <input type="tel" id="phone-input" class="phone-input" placeholder="Enter your Email" />
        <button id="next-button" class="submit-button" disabled>Next</button>
        <div class="or-container">
            <div class="divider"></div>
            <div class="or-text">Or</div>
            <div class="divider"></div>
        </div>
        <a class="signup-button" href="/auth/owner/sign-up">Sign Up</a>
    </div>

    <div class="content">
    </div>

    <script>
        const phoneInput = document.getElementById('phone-input');
        const nextButton = document.getElementById('next-button');

        phoneInput.addEventListener('input', () => {
            const phoneNumber = phoneInput.value.trim();

            if (phoneNumber) {
                nextButton.classList.add('active');
                nextButton.disabled = false;
            } else {
                nextButton.classList.remove('active');
                nextButton.disabled = true;
            }
        });

        nextButton.addEventListener('click', () => {
            const phoneNumber = phoneInput.value.trim();
            const contactInfo = encodeURIComponent(phoneNumber);
            window.location.href = `ownerverification.html?contact=${contactInfo}`;
        });
    </script>
</main>

<style>

        main {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            height: 100vh;
            margin: 0;
            padding: 0;
            position: relative;
            overflow: hidden; /* Prevent scrollbars caused by video */
            display: flex;
            justify-content: center; /* Center horizontally */
            align-items: center; /* Center vertically */
        }

        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            height: 80px;
            background: rgba(217, 217, 217, 0.8); /* Slight transparency */
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            z-index: 100;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .navbar .logo {
            display: flex;
            align-items: center;
            margin-right: auto;
        }

        .navbar .logo img {
            max-height: 110px;
            width: auto;
        }

        /* .video-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }

        .video-background video {
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            filter: brightness(0.5);
        } */

        .left-box {
            width: 30%;
            height: auto;
            border: 3px solid #767184;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            color: #000;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent background for readability */
            z-index: 1; /* Ensure box appears above the video */
        }

        .left-box h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .phone-input {
            width: 80%;
            padding: 10px;
            border: 1px solid #767184;
            border-radius: 5px;
            font-size: 16px;
            margin-bottom: 10px;
        }

        .submit-button {
            width: 80%;
            padding: 10px 0;
            background-color: #767184;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-bottom: 10px;
            opacity: 0.5;
        }

        .submit-button.active {
            opacity: 1;
            cursor: pointer;
        }

        .submit-button:hover {
            background-color: #555;
        }

        .or-container {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }

        .divider {
            flex-grow: 1;
            height: 1px;
            background-color: #767184;
        }

        .or-text {
            margin: 0 10px;
            font-size: 14px;
            color: #767184;
        }

        .signup-button {
            width: 80%;
            padding: 10px 0;
            background-color: #767184;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-bottom: 20px;
        }

        .signup-button:hover {
            background-color: #555;
        }
    </style>
