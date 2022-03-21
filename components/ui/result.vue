<template>
    <div class="flex bg-gray-50">
        <img v-if="result.artworkUrl" :src="result.artworkUrl" alt="result img">
        <img v-else src="https://via.placeholder.com/100" alt="placeholder img">
        <div class="ml-3">
            <h1 class="mt-2 text-lg font-bold">{{ result.name }}</h1>
            <p class="-mt-1 text-sm text-gray-500">{{ result.genre }}</p>
            <a class="block mt-4 text-sm text-green-500 hover:underline" :href="result.url">View on iTunes</a>
        </div>
    </div>
</template>


<script>
export default {
    props: ['result']
}
</script>

