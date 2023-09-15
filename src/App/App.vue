<template>
    <div class="min-h-screen flex flex-col items-center justify-center text-center">
        <TextTicker v-if="! starWarsActive" :texts="strings" default-category="goretrek" :default-index="0" :loop-interval="tickerLoopInterval" />

        <EasterEgg string-to-match="starwars" @easter-egg-hit="starWarsActive = true" />

        <StarWars v-if="starWarsActive" @close="starWarsActive = false" />
    </div>
</template>

<script setup>
import {ref} from 'vue'
import StarWars from './StarWars.vue'
import EasterEgg from './EasterEgg/EasterEgg.vue'
import TextTicker from './TextTicker/TextTicker.vue'

const starWarsActive = ref(false)
const tickerLoopInterval = ref(5000)

const strings = {
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

</script>