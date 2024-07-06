import './App.css'
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import test from "../../test.json";
import data from "../../singleTrack.json"

function App() {

  const searchResults = test.tracks;

  
  const filteredArr = data.tracks;
  
  return (
    <>
      <header> <h1>Ja<span id="ms">mmm</span>ing</h1> </header>
      <SearchBar></SearchBar>
      <section id="main-container">
        <SearchResults searchResults={searchResults}/>
        <Playlist filteredArr={filteredArr}/>
      </section>
    </>
  )
}

export default App
