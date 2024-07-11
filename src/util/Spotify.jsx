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

    authUrl.search = new URLSearchParams(params).toString(); /* 1. URLSearchParams() works with the query string (argument) 
    it can take an object 2. the .toString() make it a string query 3. uthUrl.search = ...: This sets the search (query string) 
    part of the authUrl object to the string representation of the query parameters */
    window.location.href = authUrl.toString(); /* redirects to the new URL (the authUrl object turn into a the query string) */
  },

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
        client_id: Spotify.clientId
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
      // stored in the previous authorization
     
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: Spotify.clientId,
          grant_type: 'authorization_code',
          code: window.location.href.match(/code=([^&]*)/)[1], /* Set the code (used for exchanging accessToken) 
          to the code parameter in the URL. The [1] is because this throws and array and the data is in the second position*/
          redirect_uri: Spotify.redirectUri,
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
    const codeVerifier = localStorage.getItem('code_verifier') //proxy for checking if user is authenticated IF not, then authenticate and return.
    if(!codeVerifier){
      await Spotify.authorization();
      return;
    } else { //If user is authenticated then get token and make the request

      const accessToken = await Spotify.getToken(); //Should return accessToken always

    //These following lines are just for testing and debugging:
      const expIn = localStorage.getItem('expires_in');
      const refresh = localStorage.getItem('refresh_token');
      const token = localStorage.getItem('access_token')
      console.log(`Token experies in ${expIn} and it's a ${typeof expIn} and refreshToken is ${refresh}. Token is${token}`);
      

      
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
  }


}



export default Spotify

/*
1. Have to make this DRY,
2. Need to find a way to make a new function (or another method) that returns and accessToken. 
  - If there is none then request one --> creates localStorage access_token -> returns token
  - If there is one
    -Its valid -> return localStorage access_token  -> return token
    -It's expired -> refresh token -> update localStorage access_token -> returns token
*/