<template>
    <div class="min-h-screen flex flex-col items-center justify-center text-center">
        <TransitionGroup name="fade" mode="out-in">
            <template v-for="(string, index) in stringsByCategory">
                <div v-if="index === currentIndex" class="text-white text-6xl absolute whitespace-pre-line" :key="index">
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
            "✅ Glemmer mocking iq testene.\n\n(sender SMS til Turid hver gang test suiten blir kjørt)",
            "✅ Gjentar samme kodesnutt om og om igjen.",
            ""
        ],
    }
});

const keysHit = ref("")
const currentIndex = ref(0)
const timeoutId = ref(null)
const currentCategory = ref("positive")
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

const updateStringIndex = (generator = "incremental") => {
    if (generator === "random") {
        return currentIndex.value = randomStringIndex(strings.value[currentCategory.value], currentIndex.value)
    }

    if (generator === "incremental") {
        if (currentIndex.value === (stringsByCategory.value.length - 1)) {
            console.log("array reset")
            return currentIndex.value = 0
        }

        console.log("incrementing")
        return currentIndex.value = currentIndex.value + 1
    }
}

const switchCategory = (category) => {
    currentCategory.value = category

    window.clearTimeout(timeoutId.value)

    looper()
    updateStringIndex("random")
}

const looper = () => {
    updateStringIndex()

    timeoutId.value = window.setTimeout(looper, loopInterval)
}

onMounted(() => {
    looper()
    window.addEventListener('keydown', easterEgg)
})

onBeforeUnmount(() => {
    window.clearTimeout(timeoutId)
    window.removeEventListener('keydown', easterEgg)
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