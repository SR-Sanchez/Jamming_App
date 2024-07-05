import './App.css'
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import data from "../../test.json"

function App() {

  const searchResults = data.tracks;
  
  return (
    <>
      <header> <h1>Ja<span id="ms">mmm</span>ing</h1> </header>
      <SearchBar></SearchBar>
      <section id="main-container">
        <SearchResults searchResults={searchResults} display={false}/>
        <Playlist searchResults={searchResults}/>
      </section>
    </>
  )
}

export default App
