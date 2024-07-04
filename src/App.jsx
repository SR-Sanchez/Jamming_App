import './App.css'
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

function App() {
  
  return (
    <>
      <header> <h1>Ja<span id="ms">mmm</span>ing</h1> </header>
      <SearchBar></SearchBar>
      <section id="main-container">
        <SearchResults/>
        <Playlist/>
      </section>
    </>
  )
}

export default App
