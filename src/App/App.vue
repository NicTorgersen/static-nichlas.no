<template>
    <div class="min-h-screen flex flex-col items-center justify-center text-center">
        <TransitionGroup name="fade" mode="out-in">
            <template v-for="(string, index) in stringsByCategory">
                <div v-if="index === currentIndex" class="flex flex-col text-white text-lg sm:text-6xl absolute whitespace-pre-line" :key="index">
                    <span class="flex text-stone-500 text-xs sm:text-sm items-center justify-end fill-stone-500 mb-7">
                        <button class="p-2" @click.prevent="updateStringIndex({incrementBy: -1})">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416zM128 256c0-6.7 2.8-13 7.7-17.6l112-104c7-6.5 17.2-8.2 25.9-4.4s14.4 12.5 14.4 22l0 208c0 9.5-5.7 18.2-14.4 22s-18.9 2.1-25.9-4.4l-112-104c-4.9-4.5-7.7-10.9-7.7-17.6z"/></svg>
                        </button>
                        ({{ index + 1 }} / {{ stringsByCategory.length }})
                        <button class="p-2" @click.prevent="updateStringIndex()">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM320 256c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4s-14.4-12.5-14.4-22l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z"/></svg>
                        </button>
                    </span>

                    {{ string }}
                </div>
            </template>
        </TransitionGroup>

        <div class="absolute bottom-0 left-0 text-white">
            <button v-for="category in Object.keys(strings)" class="px-8 py-3" @click.prevent="switchCategory(category)">
                {{ category }}
            </button>
        </div>
    </div>
</template>

<script setup>
import {ref, computed, onBeforeUnmount, onMounted} from 'vue'

const loopInterval = 5000;

const randomStringIndex = (array, excluded) => {
    const randomIndex = Math.floor(Math.random() * array.length)

    if (randomIndex === excluded) {
        return randomStringIndex(array, excluded)
    }

    return randomIndex
}

const strings = computed(() => {
    return {
        positive: [
            "❤️ Hallo, håper du har det bra.",
            "☀️ I dag er en god dag.",
            "🤠 Ikke bekymre deg over det, bare gjør det.",
            "🤖 Du er ikke alene.",
            "😤 Et hvert problem er egentlig en mulighet.",
            "🤓 En tålmodig utvikler er en god utvikler.",
        ],
        goretrek: [
            "✅ Passord lagret i plain text.",
            "✅ Passord sendt på e-post.",
            "✅ 0% test coverage.",
            "✅ Testene er ikke kjørt.",
            "✅ Svarer ikke på support.",
            "✅ Følger ikke conventional commits\n\n(chore / feature / bugfix / hotfix)",
            "✅ Skrur ikke av auto fetching i IDE-en.",
            "✅ Kunden møter 500-feil rett etter lansering.",
            "✅ Glemmer mocking i testene.\n\n(sender SMS til Turid hver gang test suiten blir kjørt)",
            "✅ Gjentar samme kodesnutt om og om igjen.",
        ],
    }
});

const keysHit = ref("")
const currentIndex = ref(0)
const timeoutId = ref(null)
const currentCategory = ref("goretrek")
const stringMatch = "starwars".split('')
const stringsByCategory = computed(() => strings.value[currentCategory.value])

const easterEgg = (event) => {
    if (event.key.length !== 1) return

    keysHit.value = keysHit.value + event.key

    const keys = `${keysHit.value}`.split('')
    const atCurrentIndex = keys.length - 1;

    if (stringMatch[atCurrentIndex] !== keys[atCurrentIndex]) {
        keysHit.value = ""
    }

    if (keys.join('') === stringMatch.join('')) {
        alert("EASTER EGG!");

        keysHit.value = ""
    }
}

const updateStringIndex = ({generator = "incremental", incrementBy = 1} = {}) => {
    if (generator === "random") {
        return currentIndex.value = randomStringIndex(strings.value[currentCategory.value], currentIndex.value)
    }

    if (generator === "incremental") {
        const indexAfterIncrement = currentIndex.value + incrementBy

        // wrap around to start of string array
        if (indexAfterIncrement === (stringsByCategory.value.length)) {
            return currentIndex.value = 0
        }

        // wrap around to end of string array
        if (indexAfterIncrement < 0) {
            return currentIndex.value = stringsByCategory.value.length - 1
        }

        return currentIndex.value = currentIndex.value + incrementBy
    }
}

const nextString = (event) => {
    console.log(event)

    const next = 39
    const previous = 37

    switch (event.keyCode) {
        case next:
            updateStringIndex()
            break;
        case previous:
            updateStringIndex({incrementBy: -1})
            break;
    }

    window.clearTimeout(timeoutId.value)

    looper({ init: true })
}

const switchCategory = (category) => {
    currentCategory.value = category

    window.clearTimeout(timeoutId.value)

    looper({ init: true })
    updateStringIndex({generator: "random"})
}

const looper = ({init = false} = {}) => {
    if (! init) {
        updateStringIndex()
    }

    timeoutId.value = window.setTimeout(looper, loopInterval)
}

onMounted(() => {
    looper({ init: true })
    window.addEventListener('keydown', easterEgg)
    window.addEventListener('keydown', nextString)
})

onBeforeUnmount(() => {
    window.clearTimeout(timeoutId)
    window.removeEventListener('keydown', easterEgg)
    window.removeEventListener('keydown', nextString)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-from {
    transform: rotateX(90deg);
}

.fade-leave-to {
    transform: translateY(-90px) scale(0.8);
}
</style>