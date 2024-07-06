/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Track from "../Track/Track";




const TrackList = ({searchResults, filteredArr}) => {
	
	if(searchResults) {
		return (
			<>
				{searchResults.items.map((song) => {
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
	}
	if(filteredArr) {
		return (
			<>
				{filteredArr.items.map((song) => {
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
	}
};

export default TrackList;

