<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue"

const emit = defineEmits(['easterEggHit', 'matches', 'currentInput'])
const props = defineProps({
    stringToMatch: {
        type: String,
        default: () => "starwars"
    }
})

const keysHit = ref("")
const stringMatch = props.stringToMatch.split('')
const allowedKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å', '@']

onMounted(() => {
    window.addEventListener("keydown", easterEgg)
})

onBeforeUnmount(() => {
    window.removeEventListener("keydown", easterEgg)
})

const easterEgg = (event) => {
    if (! allowedKeys.includes(event.key.toLowerCase())) {
        return
    }

    emit('currentInput', event.key)

    keysHit.value = keysHit.value + event.key

    const keys = `${keysHit.value}`.split('')
    const atCurrentIndex = keys.length - 1

    if (stringMatch[atCurrentIndex] !== keys[atCurrentIndex]) {
        keysHit.value = ""

        return
    }

    emit('matches', keysHit.value)

    if (keys.join('') === stringMatch.join('')) {
        emit('easterEggHit', keys.join(''))

        keysHit.value = ""
    }
}
</script>
