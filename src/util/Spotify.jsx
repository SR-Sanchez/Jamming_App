const Spotify = {

//Code challenge generation
  generateRandomString(length){
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  },
  
  async sha256 (plain) {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  },

  base64encode (input) {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  },

  clientId: 'b08373c1cede4b46b8b561613a17a67d',
  redirectUri: 'http://localhost:5173' || "http://localhost:3000", //not sure about this
 
  //Authorization generation
  async authorization () {
    const codeVerifier  = Spotify.generateRandomString(64);
    const hashed = await Spotify.sha256(codeVerifier)
    const codeChallenge = Spotify.base64encode(hashed);
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
      response_type: 'code',
      client_id: Spotify.clientId,
      scope: 'user-read-private user-read-email',
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: Spotify.redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); //If I'm not mistaken, this two lines a. create a new URL and b. set the link to the link + response params (code)
  },


  async getToken() {
    if(localStorage.getItem('access_token')) {
      return;
    } else {
      const codeVerifier = localStorage.getItem('code_verifier') 
    
      // stored in the previous step
      const code = window.location.href.match(/code=([^&]*)/)[1] /* Set the code (used for exchanging accessToken) to the code parameter in the URL. The [1]
      is because this throws and array and the data is in the second position*/
    
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: Spotify.clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: Spotify.redirectUri,
          code_verifier: codeVerifier,
        }),
      }
    
      const body = await fetch("https://accounts.spotify.com/api/token", payload);
      const response =await body.json();
    
      window.localStorage.setItem('access_token', response.access_token); //"creates" and accesstoken var in localStorage with the info from response.
      window.localStorage.setItem('expires_in', response.expires_in);
      window.localStorage.setItem('refresh_token', response.refresh_token);
    }
  },
  
  
  async search (term) {
    const codeVerifier = localStorage.getItem('code_verifier') //proxy for checking if user is authenticated IF not, then authenticate and return.
    if(!codeVerifier){
      await Spotify.authorization();
      return;
    } else { //If user is authenticated then get token and make the request

      await Spotify.getToken(); //Await for funcion to get the accessToken

      //This following lines are just for testing and debugging:
      const expIn = localStorage.getItem('expires_in');
      const refresh = localStorage.getItem('refresh_token')
      console.log(`Token experies in ${expIn} and it's a ${typeof expIn} and refreshToken is ${refresh}`);
      

      
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${term}&type=track`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
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
  }
}



export default Spotify