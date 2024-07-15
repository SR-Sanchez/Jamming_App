// import Playlist from "../Playlist/Playlist";

const WebPlayer = () => {
	let playlistID = localStorage.getItem("playlist_id")
	const link = `https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator&theme=0`

	return (
		<section className='web-player'>
        <iframe 
        title="NewPlay"
        style={{ borderRadius: 12}}
        src={link}
        width="100%"
        height={352}
        frameBorder={0}
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        />
      </section>
	)
};

export default WebPlayer;