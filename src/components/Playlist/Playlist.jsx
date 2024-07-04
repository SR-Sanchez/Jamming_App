import { useState } from "react";
import './Playlist.css'
import Track from "../Track/Track";

const Playlist = () => {

	const [playlistName, setPlaylistName] = useState("New Playlist");

	const handlePlaylistName = ({target}) => {
		setPlaylistName(target.value);
	};

	const handleSelect = ({target}) => { //This selects all text when click
		target.select()
	};

	return (
		<div className="playlist">
			<input value={playlistName} onClick={handleSelect} onChange={handlePlaylistName}></input>
			<Track/>
			<button id="saveButton">SAVE TO SPOTIFY</button>
		</div>
	);
};

export default Playlist;