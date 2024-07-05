/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Track from "../Track/Track";




const TrackList = (props) => {
	return (
		<>
			{props.searchResults.items.map((song) => {
				return(
					<Track
						track={song.name}
						artist={song.artists[0].name}
						display={song.display}
					/>
				)
			})}
		</>
	);
};

export default TrackList;

