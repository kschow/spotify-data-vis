import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { SearchService } from '../../Spotify/Search/Service/SearchService';
import { TrackInfoService } from '../../Spotify/TrackInfo/TrackInfoService';
import { withVisualizationControls } from '../VisualizationControls/VisualizationControlsContext';
import Window from '../Window';
import { testSearchResults, testTrackInfo } from '../TestData/TestData';

jest.mock('../../Spotify/Search/Service/SearchService');
jest.mock('../../Spotify/TrackInfo/TrackInfoService');

afterEach(() => {
    jest.resetAllMocks();
});

it('shows one pane by default, allows up to four panes to be created, deleting panes deletes the correct pane', () => {
    const VisualizationWrappedWindw = withVisualizationControls(Window);
    const { getByText, queryByText, queryByTestId, getByTestId } = render(<VisualizationWrappedWindw />);

    expect(queryByTestId('0')).toBeTruthy();
    const addPaneButton = getByText('Add Comparison');

    fireEvent.click(addPaneButton);
    expect(queryByTestId('1')).toBeTruthy();

    fireEvent.click(addPaneButton);
    expect(queryByTestId('2')).toBeTruthy();

    fireEvent.click(addPaneButton);
    expect(queryByTestId('3')).toBeTruthy();

    expect(queryByText('Add Comparison')).toBeFalsy();

    fireEvent.click(getByTestId('delete-2'));
    expect(queryByTestId('2')).toBeFalsy();

    expect(queryByText('Add Comparison')).toBeTruthy();
});

it('displays VisualizationControls when there is available track info', async () => {
    const VisualizationWrappedWindw = withVisualizationControls(Window);
    const {
        getByText,
        findByText,
        queryByText,
        queryByTestId,
        findByTestId,
        getByPlaceholderText
    } = render(<VisualizationWrappedWindw />);

    SearchService.searchArtist.mockResolvedValue(testSearchResults);
    TrackInfoService.getArtistTracks.mockResolvedValue(testTrackInfo);

    expect(queryByTestId('VisualizationControls')).toBeFalsy();

    const searchBox = getByPlaceholderText('Search by artist');
    const submitButton = getByText('Search');

    fireEvent.change(searchBox, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    expect(queryByText('Please specify your search.')).toBeNull();
    const result = await findByText('Test Artist 1');
    expect(result).toBeTruthy();

    fireEvent.click(result);
    await expect(findByTestId('VisualizationControls')).resolves.toBeTruthy();
});

it('displays VisualizationControls when there is more than one pane', () => {
    const VisualizationWrappedWindw = withVisualizationControls(Window);
    const { getByText, queryByTestId } = render(<VisualizationWrappedWindw />);

    expect(queryByTestId('VisualizationControls')).toBeFalsy();

    fireEvent.click(getByText('Add Comparison'));
    expect(queryByTestId('VisualizationControls')).toBeTruthy();
});
