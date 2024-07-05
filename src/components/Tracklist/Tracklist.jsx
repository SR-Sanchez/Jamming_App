/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Track from "../Track/Track";
import "./Tracklist.css"




const TrackList = (props) => {
	return (
		<div className="TrackList">
			{props.searchResults.items.map((song) => {
				return(
					<Track
						track={song.name}
						artist={song.artists[0].name}
						display={true}
					/>
				)
			})}
		</div>
	);
};

export default TrackList;

