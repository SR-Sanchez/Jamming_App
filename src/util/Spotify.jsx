// const searchTerm = "limoncito";

async function spotify () {
	const response = await fetch(
		"https://api.spotify.com/v1/search?q=limoncito&type=track&limit=3&offset=1", {
			headers: {
				Authorization: "Bearer BQBBSb2eUCe_WoKVCRsSjMkaV7Ra_Kyde4-S_FYmcjpxzFQESvbd9Nj1pA-WEG4db2rJAOSZ1BbPMcmfJl76t96GeEOo59BZEpX3wzyt41JyUrBVgrs"
			}
		} 
	)
	const data = await response.json(); //this I still don't quite understand.
	return data.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    uri: track.uri
	}))
}



export default spotify