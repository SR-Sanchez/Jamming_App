import './App.css'
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import results from './components/MockupDB/Mockup';
import { useState, useCallback } from 'react';

function App() {

  const searchResults = results;

  const [playlistTracks, setplaylistTracks] = useState([])

  const addTrack = useCallback((track) => {
    if(playlistTracks.some((savedTrack) => savedTrack.id === track.id)){ //returns true if a track is already in the array
      return;
    }
    setplaylistTracks((prevTracks) => [...prevTracks, track])
    }, [playlistTracks] //React will compare each dependency with its previous value, in case there were changes made
  )

  const removeTrack = useCallback((track) => {
    setplaylistTracks((prevTracks) => //will take the previous state (prevTracks), do a loop and for current track compare id. Filter the selected track by id
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id))
  }, []) //for a reason I don't quite understand, there's no need for dependencies
  
  return (
    <>
      <header> <h1>Ja<span id="ms">mmm</span>ing</h1> </header>
      <SearchBar></SearchBar>
      <section id="main-container">
        <SearchResults tracks={searchResults} addTrack={addTrack}/>
        <Playlist tracks={playlistTracks} removeTrack={removeTrack}/>
      </section>
    </>
  )
}

export default App
