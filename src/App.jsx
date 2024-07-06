import './App.css'
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import results from './components/MockupDB/Mockup';

function App() {

  const searchResults = results;

  
  const filteredArr = results;
  
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
