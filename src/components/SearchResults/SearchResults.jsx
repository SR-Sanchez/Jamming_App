import "./SearchResults.css";
import TrackList from "../Tracklist/Tracklist";
import data from "../../../../test.json"

const SearchResults = () => {

	const searchResults = data.tracks;

	return (
		<div className="results-container">
				<h2>Results</h2>
				<TrackList searchResults={searchResults}/>
		</div>
	);
};

export default SearchResults;