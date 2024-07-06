/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Track from "../Track/Track";




const TrackList = ({searchResults}) => {
	
	// return (
	// 	<>
	// 		{searchResults.items.map((song) => {
	// 			return(
	// 				<Track
	// 					track={song.name}
	// 					artist={song.artists[0].name}
	// 					display={song.display}
	// 				/>
	// 			)
	// 		})}
	// 	</>
	// );
	return (
		<>
			{searchResults.map((track) => {
				return(
					<Track
						track={track}
						name={track.name}
						artist={track.artist}
					/>
				)
			})}
		</>
	);
};

export default TrackList;

