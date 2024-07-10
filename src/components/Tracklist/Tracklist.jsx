/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Track from "../Track/Track";




const TrackList = ({tracks, addTrack, displayButton, removeTrack}) => {
	
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
	if(tracks) {
		return (
			<>
				{tracks.map((track) => {
					return(
						<Track
							track={track}
							name={track.name}
							artist={track.artist}
							key={track.id}
							id={track.id}
							addTrack={addTrack}
							displayButton={displayButton}
							removeTrack={removeTrack}
						/>
					)
				})}
			</>
		);
	}
};

export default TrackList;

