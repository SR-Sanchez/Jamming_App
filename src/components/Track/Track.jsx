/* eslint-disable react/prop-types */
import "./Track.css"

const Track = ({track, artist, display}) => {
		return (
			<div>
				<article className="track">
					<div>
						<p className="trackName">{track}</p>
						<p className="artist">{artist}</p>
						<p>{display}</p>
					</div>
					<button id="trackButton" >+</button>
				</article>
			</div>
		);
};

export default Track;