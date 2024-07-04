import "./Track.css"

const Track = () => {

	return (
		<div>
			<article className="track">
				<div>
					<p className="trackName">Canción sabrosa</p>
					<p className="artist">Grupo poderoso</p>
				</div>
				<button id="trackButton">+</button>
			</article>
			<article className="track">
				<div>
					<p className="trackName">Canción aún más sabrosa</p>
					<p className="artist">Grupo aún más poderoso</p>
				</div>
				<button id="trackButton">+</button>
			</article>
			<article className="track">
				<div>
					<p className="trackName">Otra canción sabrosa</p>
					<p className="artist">Otro grupo poderoso</p>
				</div>
				<button id="trackButton">+</button>
			</article>
			<article className="track">
				<div>
					<p className="trackName">Canción diferente</p>
					<p className="artist">Grupo diferente</p>
				</div>
				<button id="trackButton">+</button>
			</article>
		</div>
	);
};

export default Track;