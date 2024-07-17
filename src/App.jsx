import './App.css'
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Spotify from './util/Spotify';
import WebPlayer from './components/WebPlayer/WebPlayer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useCallback, useEffect } from 'react';

function App() {

  const [errorParams, setErrorParmas] = useState("")
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); //Maybe it's unnecessary to use useState
  const [playlistTracks, setplaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("New playlist");
  const [playlistID, setPlaylistID] = useState("");
  const [playerSize, setPlayerSize] = useState({display: true, size: 152});

  useEffect(() => { //Takes url and search for a parameter called "error". If found throw notification
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const error = urlParams.get('error');
    setErrorParmas(error)
    if(errorParams){
      toast.error(errorParams);
    }
  }, [errorParams])

	const handleTermSearch = event => {
		setSearchTerm(event.target.value)
	};

  const handleSubmit = () => { 
    if(searchTerm) {
      Spotify.search(searchTerm).then(setSearchResults); /*.then(setSearchResults) is a method that takes a callback 
    function (setSearchResults in this case) that gets called when the promise resolves. The resolved value of the 
    promise is passed as an argument to the callback function (setSearchResults) */
    setSearchTerm("")
    }
  };

  

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
  
  const handlePlaylistName = ({target}) => {
		setPlaylistName(target.value);
	};
  
  const savePlaylist = () => {
    const uriArray = playlistTracks.map((track) => track.uri);
    Spotify.createPlaylist(playlistName, uriArray);
    setPlaylistName("New playlist");
    setplaylistTracks([]);
  };

  window.onstorage = () => {  //Listens for changes in localStorage, so it can update link in WebPlayer component
    setPlaylistID(localStorage.getItem("playlist_id"))
  }

  const handleSize = () => {
    playerSize.display ? setPlayerSize({display: false, size: 352}) : setPlayerSize({display: true, size: 152})
  }

  return (
    <>
      <header> <h1>Ja<span id="ms">mmm</span>ing</h1> </header>
      <SearchBar searchTerm={searchTerm} handleTermSearch={handleTermSearch} handleSubmit={handleSubmit}></SearchBar>
      <WebPlayer playlistID={playlistID} handleSize={handleSize} playerSize={playerSize}/>
      <section id="main-container">
        <SearchResults tracks={searchResults} addTrack={addTrack}/>
        <Playlist tracks={playlistTracks} removeTrack={removeTrack} handlePlaylistName={handlePlaylistName} playlistName={playlistName} savePlaylist={savePlaylist}/>
      </section>
    </>
  )
}

export default App
