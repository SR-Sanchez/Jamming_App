/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import './Playlist.css'
import TrackList from "../Tracklist/Tracklist";

const Playlist = ({handlePlaylistName, playlistName, tracks, removeTrack, savePlaylist}) => {

	const handleSelect = ({target}) => { //This selects all text when click
		target.select()
	};

	return (
		<div className="playlist">
			<input value={playlistName} onClick={handleSelect} onChange={handlePlaylistName}></input>
				<TrackList tracks={tracks} removeTrack={removeTrack}/>
			<button id="saveButton" onClick={savePlaylist}>SAVE TO SPOTIFY</button>
		</div>
	);
};

export default Playlist;