import './App.css'
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import data from "../../test.json"

function App() {

  const searchResults = data.tracks;

  searchResults.items.map((song) => {
    song.display=1
  });

  const filteredArr = []

  searchResults.items.map((item) => {
    if(item.display === 1) {
      filteredArr.push(item)
    }
  })
  
  return (
    <>
      <header> <h1>Ja<span id="ms">mmm</span>ing</h1> </header>
      <SearchBar></SearchBar>
      <section id="main-container">
        <SearchResults searchResults={searchResults} display={false}/>
        <Playlist filteredArr={filteredArr}/>
      </section>
    </>
  )
}

export default App
