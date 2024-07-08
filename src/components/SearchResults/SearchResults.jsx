/* eslint-disable react/prop-types */
import "./SearchResults.css";
import TrackList from "../Tracklist/Tracklist";


const SearchResults = ({tracks, addTrack}) => {

	

	return (
		<div className="results-container">
				<h2>Results</h2>
				<TrackList tracks={tracks} addTrack={addTrack} displayButton={true}/>
		</div>
	);
};

export default SearchResults;