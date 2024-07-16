Great, thank you for providing the information! Here’s a draft of the README file for your Jammming_App:

```markdown
# Jammming_App

## Description
Jammming_App allows you to search for songs, add and remove songs to a new playlist (which you can name), and save the new playlist to your Spotify account.

## Key Features
- React + Vite app
- Connects to the Spotify API
- Log in to your Spotify account using OAuth
- Search for songs
- Add and remove songs to a new playlist
- Save the new playlist to your Spotify account
- Embedded Spotify player:
   - Play songs (requires Spotify Premium)
   - Choose between compact and normal sizes
   - Delete or save the playlist directly from the player to your Spotify library

## Installation and Setup
### Prerequisites
- Node.js installed on your machine

### Steps
1. Fork the repository on GitHub.
2. In the CLI, navigate to the folder where you forked the repository.
3. Run `npm install` to install all the dependencies.

## Running the App
1. Create a Spotify app:
   - Go to [Spotify Developer Documentation](https://developer.spotify.com/documentation/web-api)
   - Follow steps 1 and 2 to create a new app
   - Copy the Client ID provided in the dashboard
2. Navigate to the `Jammming_App` folder -> `src` -> `util` -> `Spotify.jsx`.
3. Open `Spotify.jsx` in a code editor and replace the value of `clientID` with your Client ID (on line 3).
4. In the CLI, run `npm run dev`.
5. Open the URL given in the command line.
6. Search for a song, log in to your Spotify account when redirected, and start creating your new playlist.

## Known Issues or Limitations
- You need a Spotify app to run the Jammming_App, even locally.
- If you want to deploy Jammming_App on a website, you need to give access to potential users. You can add up to 25 users in the Spotify dashboard.
- Note: If you do deploy the Jammming_App you need to add the URL to the Redirect URIs in the Spotify dashboard.

## Contributors
- Sergio Ruiz S.

## Reporting Bugs or Requesting Features
Please write an email to `sergioruizsanchezz@gmail.com` with the subject "Jammming_App bug" or "Jammming_App feature request".

## Additional Notes
None at the moment.

```

Feel free to modify or expand this template as needed!