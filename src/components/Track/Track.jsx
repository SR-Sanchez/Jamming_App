/* eslint-disable react/prop-types */
import "./Track.css"
import { useState } from "react";

const Track = (props) => {

	

	if(props.display) {
		return (
			<div>
				<article className="track">
					<div>
						<p className="trackName">{props.track}</p>
						<p className="artist">{props.artist}</p>
					</div>
					<button id="trackButton">+</button>
				</article>
			</div>
		);
	}
};

export default Track;