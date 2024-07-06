/* eslint-disable react/prop-types */
import "./Track.css"

const Track = ({name, artist, display}) => {
		return (
			<div>
				<article className="track">
					<div>
						<p className="trackName">{name}</p>
						<p className="artist">{artist}</p>
						<p>{display}</p>
					</div>
					<button id="trackButton" >+</button>
				</article>
			</div>
		);
};

export default Track;