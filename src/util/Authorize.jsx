


const Authorize = {
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
}

export default Authorize