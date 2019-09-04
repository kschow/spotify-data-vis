import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Pane from '../Pane';
import { SearchService } from '../Search/Service/SearchService';
import { TrackInfoService } from '../TrackInfo/TrackInfoService';

jest.mock('../Search/Service/SearchService');
jest.mock('../TrackInfo/TrackInfoService');

afterEach(() => {
    jest.resetAllMocks();
});

it('Clicking a search result with tracks switches view to visualization ' +
    'with an option to switch the view back, ' +
    'clicking that option switches the view back with existing search results', async () => {
    const searchResults = [
        {
            'spotifyId': 'id 1',
            'genres': [],
            'name': 'Test Artist 1',
            'popularity': 62,
            'imageUrls': []
        }
    ];
    SearchService.searchArtist.mockResolvedValue(searchResults);
    const trackInfo =
        {
            'test track id': {
                name: '',
                spotifyId: 'test track id',
                artistIds: [],
                albumId: '',
                popularity: 0,
                trackNumber: 1,
                danceability: 0.5,
                energy: 0.5,
                key: 1,
                loudness: 0.5,
                mode: 1,
                speechiness: 0.5,
                acousticness: 0.5,
                instrumentalness: 0.5,
                liveness: 0.5,
                valence: 0.5,
                tempo: 130,
                durationMs: 60000,
                timeSignature: 4
            }
        };
    TrackInfoService.getArtistTracks.mockResolvedValue(trackInfo);

    const { getByPlaceholderText, getByText, queryByText, findByText } = render(<Pane />);

    const searchBox = getByPlaceholderText('Search by artist');
    const submitButton = getByText('Search');

    fireEvent.change(searchBox, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    expect(queryByText('Please specify your search.')).toBeNull();
    const result = await findByText('Test Artist 1');
    expect(result).toBeTruthy();

    fireEvent.click(result);

    await expect(findByText('test track id')).resolves.toBeTruthy();
    expect(queryByText('Test Artist 1')).toBeNull();

    expect(queryByText('Go back to search')).toBeTruthy();
    const returnToSearch = getByText('Go back to search');

    fireEvent.click(returnToSearch);

    expect(queryByText('Test Artist 1')).toBeTruthy();
});
