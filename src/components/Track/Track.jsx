/* eslint-disable react/prop-types */
import "./Track.css"
import { useState } from "react";

const Track = (props) => {

	const [songDisplay, setSongDisplay] = useState(props.display)

	const handleClick = () => {
		setSongDisplay(false)
	}

	if(songDisplay) { //if props passed as true or displayState is true
		return (
			<div>
				<article className="track">
					<div>
						<p className="trackName">{props.track}</p>
						<p className="artist">{props.artist}</p>
					</div>
					<button id="trackButton" onClick={handleClick}>+</button>
				</article>
			</div>
		);
	}
};

export default Track;