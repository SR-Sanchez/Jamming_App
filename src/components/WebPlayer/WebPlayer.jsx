/* eslint-disable react/prop-types */
import "./WebPlayer.css"

const WebPlayer = ({playlistID}) => {

	const link = `https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator&theme=0`

	return playlistID ? (
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
	) : (
  
    <section className='web-player'>
      <h2>Your Playlist will display here</h2>
    </section>
  )
};

export default WebPlayer;