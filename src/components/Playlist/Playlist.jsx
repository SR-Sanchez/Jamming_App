import { useState } from "react";
import './Playlist.css'

const Playlist = () => {

	const [playlistName, setPlaylistName] = useState("New Playlist");

	const handlePlaylistName = ({target}) => {
		setPlaylistName(target.value);
	}

	return (
		<div className="Playlist">
			<input value={playlistName} onChange={handlePlaylistName}></input>
			<button>SAVE TO SPOTIFY</button>
		</div>
	);
};

export default Playlist;