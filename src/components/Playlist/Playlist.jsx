/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState } from "react";
import './Playlist.css'
import TrackList from "../Tracklist/Tracklist";

const Playlist = ({tracks, removeTrack}) => {

	const [playlistName, setPlaylistName] = useState("New Playlist"); //Need to move this to App

	const handlePlaylistName = ({target}) => {
		setPlaylistName(target.value);
	};

	const handleSelect = ({target}) => { //This selects all text when click
		target.select()
	};

	return (
		<div className="playlist">
			<input value={playlistName} onClick={handleSelect} onChange={handlePlaylistName}></input>
				<TrackList tracks={tracks} removeTrack={removeTrack}/>
			<button id="saveButton">SAVE TO SPOTIFY</button>
		</div>
	);
};

export default Playlist;