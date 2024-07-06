/* eslint-disable react/prop-types */
import "./Track.css"

const Track = ({name, artist, addTrack, track}) => {
		return (
			<div>
				<article className="track">
					<div>
						<p className="trackName">{name}</p>
						<p className="artist">{artist}</p>
						<p></p>
					</div>
					<button id="trackButton" onClick={() => addTrack(track)}>+</button>
				</article>
			</div>
		);
};

export default Track;