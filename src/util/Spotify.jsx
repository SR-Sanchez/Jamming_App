import Authorize from "./Authorize";

const clientID = "b08373c1cede4b46b8b561613a17a67d";
const redirectURI = import.meta.env.MODE === "development" ?'http://localhost:5173': 'https://main--sergiojamming.netlify.app/';  /*this function
reads if it's on run npm dev (developer mode) or in other mode. If it's in build it will return the netlify address.
 */

const Spotify = {

  updateLocalStorate(response) {
    window.localStorage.setItem('access_token', response.access_token); //"creates" and accesstoken var in localStorage with the info from response.
    const experiesIn = (Date.now()  / 1000) + Number(response.expires_in)
    window.localStorage.setItem('expires_in', experiesIn);
    window.localStorage.setItem('refresh_token', response.refresh_token);
  },

  //Refresing the accessToken if experied
  async getRefreshToken (url) {
       
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem('refresh_token'),
        client_id: clientID
      }),
    }

    const body = await fetch(url, payload);
    const response = await body.json();
    Spotify.updateLocalStorate(response);
  },


  //Requesting acessToken
  async getToken() {
    
    //Varibles needed for function to work
    const url = "https://accounts.spotify.com/api/token"; 
    let accessToken = localStorage.getItem('access_token');
    const experiesIn = localStorage.getItem("expires_in");
    const currentTime = Date.now() / 1000;
    const isTokenExperied = currentTime >= experiesIn;


    if(accessToken && experiesIn) { //in localStorage there are accessToken and experies_in variables
      if(!isTokenExperied) { //The token hasn't expired --> exit the function
        return accessToken;
      } else if(isTokenExperied) { //The token IS expired --> request a new token and update localStorage
        await Spotify.getRefreshToken(url); 
        return localStorage.getItem('access_token'); //Not sure if I can just call accessToken and it would be updated.
      }
    } else {  

      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientID,
          grant_type: 'authorization_code',
          code: window.location.href.match(/code=([^&]*)/)[1], /* Set the code (used for exchanging accessToken) 
          to the code parameter in the URL. The [1] is because this throws and array and the data is in the second position*/
          redirect_uri: redirectURI,
          code_verifier: localStorage.getItem('code_verifier'),
        }),
      }
    
      const body = await fetch(url, payload);
      const response =await body.json();
      Spotify.updateLocalStorate(response);
    
      return localStorage.getItem('access_token');
    }
  },
  
  //Searchin for tracks
  async search (term) {
    const isAuthorized = window.location.href.match(/code=([^&]*)/); //looks for params in link,
    if(!isAuthorized){
      await Authorize.authorization(clientID, redirectURI);
      return;
    } else { //If user is authenticated then get token and make the request

      const accessToken = await Spotify.getToken(); //Should return accessToken always
        
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${term}&type=track`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        } 
      )
      const data = await response.json(); //.json (method of the request response with fetch()) -> takes json file and produces js object
      return data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }))
    }   
  },

  async createPlaylist(playlistName, tracks) { //Should pass: 1. String 2. An array with strings (each one a song uri)
    if(tracks.length < 1) {
      return;
    }

    const accessToken = await Spotify.getToken();
    //Get current user --> userId
    const userResponse = await fetch(
      `https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      } 
    );
    const userData = await userResponse.json();
    const userId = userData.id; 
    window.localStorage.setItem("user_id", userId); //don't know if a should just give a variable the userId ()
    
    //Creating a Playlist
    const playlistPayload = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ //This converts the body into a JSON string (DON'T forget to use it, I was having troubles with this) 
        name: playlistName, 
        description: "New playlist description",
        public: false
      })
    };
    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, playlistPayload);
    const playlistData = await playlistResponse.json();
    const playlistId = playlistData.id;
    window.localStorage.setItem("playlist_id", playlistId); //This two lines are needed for the WebPlayer component to get playlistID
    window.dispatchEvent(new Event("storage")); // This creates a new event in localStorage, needed for App component to update playlistID prompt
  
    //Adding tracks to the playlist
  
    const playlistTracksPayload = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: tracks,
        position: 0
      })
    }
    
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, playlistTracksPayload);
    
  }

}



export default Spotify
