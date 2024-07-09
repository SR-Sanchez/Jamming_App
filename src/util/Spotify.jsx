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
 
  async authorization () {
    const codeVerifier  = Spotify.generateRandomString(64);
    const hashed = await Spotify.sha256(codeVerifier)
    const codeChallenge = Spotify.base64encode(hashed);
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    // generated in the previous step
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
    window.location.href = authUrl.toString();

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    window.localStorage.setItem('code', code)
  },


  async getToken() {
    const accessCode = localStorage.getItem('code')
    if(!accessCode){
      await Spotify.authorization()
    }
    // stored in the previous step
    const codeVerifier = localStorage.getItem('code_verifier');
  
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: Spotify.clientId,
        grant_type: 'authorization_code',
        code: accessCode,
        redirect_uri: Spotify.redirectUri,
        code_verifier: codeVerifier,
      }),
    }
  
    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response =await body.json();
  
    window.localStorage.setItem('access_token', response.access_token);
  },
  
  

  async search (term) {
    console.log({
      accessToken: localStorage.getItem('access_token'),
      maybeAccessToken: window.localStorage.getItem('access_token'),
      codeVer: window.localStorage.getItem('code_verifier'),
      maybeCodeVer: localStorage.getItem('code_verifier'),
      code: window.localStorage.getItem('code'),
      maybeCode: localStorage.getItem('code')
    })
    const accessToken = localStorage.getItem('access_token')
    if(!accessToken){
      Spotify.getToken()
    }
    // let token = "BQB2oGMT1onoTdNvHqt8TqPX9UK0zlLNjC_8tgGFQqVPuzL9cSRQ4jQ05VmKMNkBpEvd9Nb_4rw_Cr93MhGbzbeaWdnAlIDFaBdE96WgQiIO506YVrU"
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${term}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      } 
    )
    const data = await response.json(); //.json (method of the response to a request with fetch()) -> takes json file and produces js object
    return data.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }))
  }
}



export default Spotify