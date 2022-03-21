<template>
    <div class="mt-10">
        <searchbar />
        <div v-if="userChoice">
            <result class="mx-auto mt-3 w-96" :result="userChoice" />
            <result class="mx-auto mt-3 w-96" v-for="(result) in otherResultsOfType" :key="result.id" :result="result" />
        </div>
    </div>
</template>


<script>
import searchbar from '@/components/ui/searchbar'
import result from '@/components/ui/result'

export default {
    components: {
        searchbar,
        result
    },

    computed: {
        artists () { return this.$store.getters['artists'] },
        albums () { return this.$store.getters['albums'] },
        songs () { return this.$store.getters['songs'] },
        userChoice () { return this.$store.getters['userChoice'] },
        otherResultsOfType () { return this.$store.getters['otherResultsOfType'] },
    }
}
</script>
