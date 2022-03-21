import * as itunes from '~/backend/itunes/api'


export const state = () => ({
    isLoading: false,
    artists: [],
    albums: [],
    songs: [],
    userChoice: null,
    otherResultsOfType: []
})

export const mutations = {
    setIsLoading (state, isLoading) { state.isLoading = isLoading },

    emptyArtists (state) { state.artists = [] },
    emptyAlbums (state) { state.albums = [] },
    emptySongs (state) { state.songs = [] },

    setArtists (state, artists) { state.artists = artists },
    setAlbums (state, albums) { state.albums = albums },
    setSongs (state, songs) { state.songs = songs },

    setUserChoice (state, userChoice) { state.userChoice = userChoice },
    setOtherResultsOfType (state, otherResultsOfType) { state.otherResultsOfType = otherResultsOfType },
}

export const actions = {
    async getSuggestions (vuexContext, searchTerm) {
        vuexContext.commit('setIsLoading', true)
        vuexContext.commit('emptyArtists')
        vuexContext.commit('emptySongs')
        vuexContext.commit('emptyAlbums')

        const artists = await itunes.getArtists(searchTerm)
        const albums = await itunes.getAlbums(searchTerm)
        const songs = await itunes.getSongs(searchTerm)

        vuexContext.commit('setIsLoading', false)
        vuexContext.commit('setArtists', artists)
        vuexContext.commit('setAlbums', albums)
        vuexContext.commit('setSongs', songs)
    },

    setIsLoading (vuexContext, isLoading) { vuexContext.commit('setIsLoading', isLoading) },
    setUserChoice (vuexContext, userChoice) { vuexContext.commit('setUserChoice', userChoice) },
    setOtherResultsOfType (vuexContext, otherResultsOfType) { vuexContext.commit('setOtherResultsOfType', otherResultsOfType) },
}

export const getters = {
    isLoading (state) { return state.isLoading },
    artists (state) { return state.artists },
    albums (state) { return state.albums },
    songs (state) { return state.songs },
    userChoice (state) { return state.userChoice },
    otherResultsOfType (state) { return state.otherResultsOfType },
}