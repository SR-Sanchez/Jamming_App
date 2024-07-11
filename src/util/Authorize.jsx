const Authorize = {
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

  //Authorization generation
  async authorization (clientId, redirectUri) {
    const codeVerifier  = Authorize.generateRandomString(64);
    const hashed = await Authorize.sha256(codeVerifier)
    const codeChallenge = Authorize.base64encode(hashed);
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
      response_type: 'code',
      client_id: clientId,
      scope: 'user-read-private user-read-email playlist-modify-public playlist-modify-private',
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString(); /* 1. URLSearchParams() works with the query string (argument) 
    it can take an object 2. the .toString() make it a string query 3. uthUrl.search = ...: This sets the search (query string) 
    part of the authUrl object to the string representation of the query parameters */
    window.location.href = authUrl.toString(); /* redirects to the new URL (the authUrl object turn into a the query string) */
  },
}

export default Authorize