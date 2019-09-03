import rp from 'request-promise-native';

const buildOptions = (spotifyId, type) => {
    // eslint-disable-next-line no-process-env,no-undef
    const rootSpotifyApiUrl = process.env.REACT_APP_SPOTIFY_API_ROOT_URL;

    let uri = null;
    if (type === 'artist') {
        uri = `${rootSpotifyApiUrl}/getArtistTracks/${spotifyId}`;
    } else if (type === 'playlist') {
        uri = `${rootSpotifyApiUrl}/getPlaylistTracks/${spotifyId}`;
    }

    return {
        json: true,
        uri
    };
};

const TracksService = {
    getArtistTracks: (spotifyId) => {
        console.log('hello?');
        return rp(buildOptions(spotifyId, 'artist'));
    },
    getPlaylistTracks: (spotifyId) => {
        return rp(buildOptions(spotifyId, 'playlist'));
    }
};

export default TracksService;
