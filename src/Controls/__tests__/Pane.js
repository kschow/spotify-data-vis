import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Pane from '../Pane';
import { SearchService } from '../../Spotify/Search/Service/SearchService';
import { TrackInfoService } from '../../Spotify/TrackInfo/TrackInfoService';
import { withVisualizationControls } from '../VisualizationControls/VisualizationControlsContext';
import { testSearchResults, testTrackInfo } from '../TestData/TestData';

jest.mock('../../Spotify/Search/Service/SearchService');
jest.mock('../../Spotify/TrackInfo/TrackInfoService');

afterEach(() => {
    jest.resetAllMocks();
});

it('Clicking a search result with tracks switches view to visualization ' +
    'with an option to switch the view back, ' +
    'clicking that option switches the view back with existing search results. ' +
    'There is also an option to go back to search in all states besides the search box.', async () => {

    SearchService.searchArtist.mockResolvedValue(testSearchResults);
    TrackInfoService.getArtistTracks.mockResolvedValue(testTrackInfo);

    const TestComponent = withVisualizationControls(Pane);
    const { getByPlaceholderText, getByText, queryByText, findByText, findByTestId } =
        // eslint-disable-next-line no-empty-function
        render(<TestComponent setHasTrackInfo={() => {}} />);

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

    const goToResults = getByText('Show results');
    fireEvent.click(goToResults);
    expect(queryByText('Test Artist 1')).toBeTruthy();
    expect(queryByText('Go back to search')).toBeTruthy();
    expect(queryByText('Show results')).toBeFalsy();
    expect(queryByText('Show visualization')).toBeTruthy();
});
