import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Pane from '../Pane';
import { SearchService } from '../../Spotify/Search/Service/SearchService';
import { TrackInfoService } from '../../Spotify/TrackInfo/TrackInfoService';
import { VisualizationControlsProvider } from '../VisualizationControls/VisualizationControlsContext';

jest.mock('../../Spotify/Search/Service/SearchService');
jest.mock('../../Spotify/TrackInfo/TrackInfoService');

afterEach(() => {
    jest.resetAllMocks();
});

it('Clicking a search result with tracks switches view to visualization ' +
    'with an option to switch the view back, ' +
    'clicking that option switches the view back with existing search results. ' +
    'There is also an option to go back to search in all states besides the search box.', async () => {
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

    const component =
        <VisualizationControlsProvider>
            <Pane/>
        </VisualizationControlsProvider>;
    const { getByPlaceholderText, getByText, queryByText, findByText, findByTestId } = render(component);

    const searchBox = getByPlaceholderText('Search by artist');
    const submitButton = getByText('Search');

    fireEvent.change(searchBox, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    expect(queryByText('Please specify your search.')).toBeNull();
    const result = await findByText('Test Artist 1');
    expect(result).toBeTruthy();

    expect(queryByText('Go back to search')).toBeTruthy();
    expect(queryByText('Show results')).toBeFalsy();
    expect(queryByText('Show visualization')).toBeFalsy();

    fireEvent.click(result);

    await expect(findByTestId('bar-chart'))
        .resolves
        .toBeTruthy();
    expect(queryByText('Test Artist 1')).toBeNull();

    expect(queryByText('Go back to search')).toBeTruthy();
    expect(queryByText('Show results')).toBeTruthy();
    expect(queryByText('Show visualization')).toBeFalsy();

    const returnToSearch = getByText('Go back to search');
    fireEvent.click(returnToSearch);

    expect(queryByText('Test Artist 1')).toBeFalsy();
    expect(queryByText('Go back to search')).toBeFalsy();
    expect(queryByText('Show results')).toBeTruthy();
    expect(queryByText('Show visualization')).toBeTruthy();
});
