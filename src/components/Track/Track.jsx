/* eslint-disable react/prop-types */
import "./Track.css"

const Track = ({track, name, artist, addTrack, displayButton, removeTrack}) => {

	const display = () => {
		if(displayButton) {
			return <button id="trackButton" onClick={() => addTrack(track)}>+</button>
		} else {
			return <button id="trackButton" onClick={() => removeTrack(track)}>-</button>
		}
	}

	return (
		<div>
			<article className="track">
				<div>
					<p className="trackName">{name}</p>
					<p className="artist">{artist}</p>
					<p></p>
				</div>
				{display()}
			</article>
		</div>
	);
};

export default Track;