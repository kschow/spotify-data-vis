import rp from 'request-promise-native';

const buildOptions = (searchTerm, type) => {
    return {
        json: true,
        uri: `http://localhost:8080/search/${type}?search=${searchTerm}`
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

export default SearchService;
