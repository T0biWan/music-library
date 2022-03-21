<template>
    <div>
        <div class="flex px-2 py-1 mx-auto border-2 border-green-400 rounded w-96">
            <input type="text" class="block w-full outline-none"
                v-model="search"
                @input="onChange"
            />
            <iconSearch css="h-6 w-6" />
        </div>
        
        <ul class="mx-auto mt-2 w-96" v-show="isOpen">
            <li class="px-2 border border-gray-500 rounded bg-gray-50" v-if="isLoading">Loading results...</li>
            <ul class="border-2 border-green-400 rounded" v-else>
                <li class="px-2 text-sm font-semibold bg-green-200">Artists</li>
                <li
                    v-for="(artist) in artists.slice(0, 3)" :key="artist.id"
                    @click="setResult(artist)"
                    class="px-2 hover:bg-green-100"
                >- {{ artist.name }}</li>

                <li class="px-2 mt-2 text-sm font-semibold bg-green-200">Albums</li>
                <li
                    v-for="(album) in albums.slice(0, 3)" :key="album.id"
                    @click="setResult(album)"
                    class="px-2 hover:bg-green-100"
                >- {{ album.name }}</li>

                <li class="px-2 mt-2 text-sm font-semibold bg-green-200">Songs</li>
                <li
                    v-for="(song) in songs.slice(0, 3)" :key="song.id"
                    @click="setResult(song)"
                    class="px-2 hover:bg-green-100"
                >- {{ song.name }}</li>
            </ul>
        </ul>
    </div>
</template>


<script>
import iconSearch from "../icons/iconSearch.vue"

export default {
    mounted () {
        document.addEventListener("click", this.handleClickOutside)
    },

    destroyed () {
        document.removeEventListener("click", this.handleClickOutside)
    },

    components: {
        iconSearch
    },

    data () {
        return {
            search: "",
            isOpen: false,
            results: [],
        }
    },

    computed: {
        isLoading () { return this.$store.getters["isLoading"] },
        artists () { return this.$store.getters["artists"] },
        albums () { return this.$store.getters["albums"] },
        songs () { return this.$store.getters["songs"] },
    },

    methods: {
        onChange () {
            if (this.search.length > 1) {
                this.$store.dispatch("setIsLoading", true)
                this.isOpen = true
                this.$store.dispatch("getSuggestions", this.search)
            }
            else this.isOpen = false
        },
        
        setResult (searchResult) {
            this.search = searchResult.name
            this.isOpen = false
            this.$store.dispatch("setUserChoice", searchResult)

            let otherResults = null
            if (searchResult.type === "artist") otherResults = this.artists
            else if (searchResult.type === "album") otherResults = this.albums
            else if (searchResult.type === "song") otherResults = this.songs
            otherResults = otherResults.filter(result => { return result.id !== searchResult.id })

            this.$store.dispatch("setUserChoice", searchResult)
            this.$store.dispatch("setOtherResultsOfType", otherResults)
        },

        handleClickOutside (event) {
            if (!this.$el.contains(event.target)) this.isOpen = false
        }
    },

    watch: {
        artists: function (value, oldValue) {
            if (value.length !== oldValue.length) {
                this.results = value
                this.$store.dispatch("setIsLoading", false)
            }
        },
        albums: function (value, oldValue) {
            if (value.length !== oldValue.length) {
                this.results = value
                this.$store.dispatch("setIsLoading", false)
            }
        },
        songs: function (value, oldValue) {
            if (value.length !== oldValue.length) {
                this.results = value
                this.$store.dispatch("setIsLoading", false)
            }
        }
    }
}
</script>
