<template>
    <div class="overflow-hidden bg-black">
        <div class="absolute top-0 right-0 text-white z-10 px-10 py-6 cursor-pointer" @click.prevent="emit('close')">X</div>
        <div class="fade relative"></div>
        <div class="star-wars text-yellow-500 text-6xl font-starwars leading-loose text-justify uppercase relative">
            <div class="crawl">
                <div class="whitespace-pre-line" v-html="string"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['close'])
const string = "<span class='text-cyan-400 text-2xl mb-24'>In a galaxy not so distant, where the web thrives...</span>\n" +
    "\n" +
    "<span class='text-9xl'>THE LARAVEL LEGACY</span>\n" +
    "\n" +
    "<span class='text-9xl'>Episode MMXXIII: The PHP Renaissance</span>\n" +
    "\n" +
    "Amidst the vast webiverse, PHP shines as a guiding light, fostering innovation and driving progress in the digital frontier. The PHP Jedi, led by the venerable Master Laravel, are poised to usher in a new era of web development.\n" +
    "\n" +
    "It is a time of unrivaled optimism as the PHP Empire, under the benevolent rule of Laravel, has brought forth a renaissance. The galaxy now witnesses the harmony of PHP's elegant syntax and Laravel's powerful features, saving developers from the dark abyss of complexity.\n" +
    "\n" +
    "In this era of cooperation, Princess CodeIgniteria and her loyal Symfony Rebels join forces with Laravel, alongside the Jedi knights Nic, Adrian, Tommy, Tom Erik, Camilla, and Dag, to forge a path to web enlightenment. Together, they construct applications with unparalleled ease, thanks to Laravel's artful routing, eloquent queries, and graceful templating.\n" +
    "\n" +
    "Young developers like Luke Dockerwalker learn to harness the Force of Laravel, creating web applications that are not only efficient but also beautifully expressive. With each artisanal command, they build a brighter future for the galaxy.\n" +
    "\n" +
    "But lurking in the shadows is the ancient evil of Deprecatedium, led by the Sith Lords, Thomas and Kristian. Intent on spreading chaos and unreadable code, they seek to undermine the progress made by Laravel and its allies.\n" +
    "\n" +
    "In a battle of clarity versus chaos, Laravel and the PHP Alliance, including the mighty Jedi, must unite to protect the galaxy from the looming threat of spaghetti code and complexity. Their destiny is to ensure that PHP's legacy shines brightly, forever saving the galaxy from the dark side of development.\n" +
    "\n" +
    "May your code always be elegant, and may the Laravel Force guide you on your journey through the web galaxy.";

</script>

<style scoped>
    .fade {
        top: -25px;
        z-index: 1;
        width: 100%;
        min-height: 50vh;
        position: absolute;
        background-image: linear-gradient(0deg, transparent, black 75%);
    }

    .star-wars {
        height: 100vh;
        display: flex;
        position: relative;
        perspective: 400px;
        text-align: justify;
        justify-content: center;
    }

    .crawl {
        position: relative;
        top: 9999px;
        transform-origin: 50% 100%;
        animation: crawl 90s linear;
    }

    @keyframes crawl {
        0% {
            top: 1400px;
            transform: rotateX(20deg)  translateZ(0);
        }
        100% {
            top: -6000px;
            transform: rotateX(25deg) translateZ(-2500px);
        }
    }
</style>