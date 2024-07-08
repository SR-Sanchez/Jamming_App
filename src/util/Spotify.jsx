// const searchTerm = "limoncito";

const Spotify = {

  async search (term) {

    const searchTerm = term;
    
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
        headers: {
          Authorization: "Bearer BQBE_NEQOtHJnhhhxkzkxJO_LMq7X4EKDlV7bqdcMLqdihJaVcHuPlUs9L420qj1nWngbEdzr00seyPDGrUmuSQEQrLjE2uQRLTWG-bD9Vjh9WHf-6o"
        }
      } 
    )
    const data = await response.json(); //.json (method of the response to a request with fetch()) -> takes json file and produces js object
    return data.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }))
  }

}



export default Spotify