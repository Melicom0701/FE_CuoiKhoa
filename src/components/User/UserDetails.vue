<template>
    <div class="flex ml-60">
        <button class="px-3 border-solid border-2 " @click="changeNumber(1)"> + </button>
        <div class="px-3"> {{ counterStore.doubleCount }} </div>
        <button class="px-3 border-solid border-2" @click="changeNumber(0)"> - </button>
    </div>
</template>

<script>
import { useCounterStore } from '@/store'
export default {
    setup() {
        const counterStore = useCounterStore()
        const changeNumber = (isPlus) => {
            if (isPlus) {
                counterStore.increment()
            } else {
                counterStore.decrement()
            }
        }
        return {
            counterStore,
            changeNumber
        }
    }
}
    
</script>