/* eslint-disable react/prop-types */
import "./Track.css"

const Track = ({name, artist, addTrack, track, displayButton}) => {

	const display = () => {
		if(displayButton) {
			return "+"
		} else {
			return "-"
		}
	}

	// const addOrRemove = () => {

	// }

		return (
			<div>
				<article className="track">
					<div>
						<p className="trackName">{name}</p>
						<p className="artist">{artist}</p>
						<p></p>
					</div>
					<button id="trackButton" onClick={() => addTrack(track)}>{display()}</button>
				</article>
			</div>
		);
};

export default Track;