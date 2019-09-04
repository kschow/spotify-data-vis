import rp from 'request-promise-native';

const buildOptions = (searchTerm, type) => {
    return {
        json: true,
        // eslint-disable-next-line no-process-env,no-undef
        uri: `${process.env.REACT_APP_SPOTIFY_API_ROOT_URL}/search/${type}?search=${searchTerm}`
    };
};

const SearchService = {
    searchArtist: (search) => {
        return rp(buildOptions(search, 'artist'));
    },
    searchPlaylist: (search) => {
        return rp(buildOptions(search, 'playlist'));
    }
};

export { SearchService };
