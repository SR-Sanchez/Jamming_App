import data from "../../../../test.json"


let results = []

const func = () => {
  const tracks = data.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    uri: track.uri
  }))
  results = tracks
}

func(results)

export default results

