import axios from 'axios'


const itunesUrl = 'https://itunes.apple.com/'

async function apiRequest (method, url, body = {}) {
    const payload = {
        url: url,
        headers: {
            "Content-Type": "application/json"
        },
        method: method,
        data: body
    }

    try {
        const response = await axios(payload)
        return response
    } catch (err) {
        console.log('error');
        console.log(err);
    }
}

export async function getArtists (searchTerm) {
    const searchParameters = new URLSearchParams()
    searchParameters.append('term', searchTerm)
    searchParameters.append('entity', 'musicArtist')

    const url = `${itunesUrl}search?${searchParameters.toString()}`
    const response = await apiRequest('get', url)
    const artists = artistsFromResponse(response)
    
    return artists
}

function artistsFromResponse (response) {
    const artists = response.data.results.map(result => constructArtist(result))
    return artists
}

function constructArtist (data) {
    return { "type": "artist", "id": data.artistId, "name": data.artistName, "genre": data.primaryGenreName, "url": data.artistLinkUrl }
}


export async function getAlbums (searchTerm) {
    const searchParameters = new URLSearchParams()
    searchParameters.append('term', searchTerm)
    searchParameters.append('entity', 'album')

    const url = `${itunesUrl}search?${searchParameters.toString()}`
    const response = await apiRequest('get', url)
    const albums = albumsFromResponse(response)
    
    return albums
}

function albumsFromResponse (response) {
    const albums = response.data.results.map(result => constructAlbum(result))
    return albums
}

function constructAlbum (data) {
    return { "type": "album", "artistId": data.artistId, "id": data.collectionId, "artistName": data.artistName, "name": data.collectionName, "artistUrl": data.artistViewUrl, "url": data.collectionViewUrl, "artworkUrl": data.artworkUrl100, "trackCount": data.trackCount, "releaseDate": data.releaseDate, "genre": data.primaryGenreName }
}


export async function getSongs (searchTerm) {
    const searchParameters = new URLSearchParams()
    searchParameters.append('term', searchTerm)
    searchParameters.append('entity', 'song')

    const url = `${itunesUrl}search?${searchParameters.toString()}`
    const response = await apiRequest('get', url)
    const songs = songsFromResponse(response)
    return songs
}

function songsFromResponse (response) {
    const songs = response.data.results.map(result => constructSong(result))
    return songs
}

function constructSong (data) {
    return { "type": "song", "artistId": data.artistId, "collectionId": data.collectionId, "id": data.trackId, "artistName": data.artistName, "albumName": data.collectionName, "name": data.trackName, "artistUrl": data.artistViewUrl, "albumUrl": data.collectionViewUrl, "url": data.trackViewUrl, "artworkUrl": data.artworkUrl100, "trackCount": data.trackCount, "trackNumber": data.trackNumber, "releaseDate": data.releaseDate, "genre": data.primaryGenreName, "trackTimeMillis": data.trackTimeMillis }
}
