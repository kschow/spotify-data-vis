import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TrackInfoProvider } from '../../TrackInfo/TrackInfoContext';
import { TrackInfoService } from '../../TrackInfo/TrackInfoService';
import VisualizationArea from '../VisualizationArea';
import { VisualizationControlsProvider } from '../../../Controls/VisualizationControls/VisualizationControlsContext';

jest.mock('../../TrackInfo/TrackInfoService');

const mockTrackInfo =
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

afterEach(() => {
    jest.resetAllMocks();
});

it('changing the visualization control value changes the axis labels and bottom axis values', () => {
    TrackInfoService.getArtistTracks.mockResolvedValue(mockTrackInfo);

    const component =
        <TrackInfoProvider>
            <VisualizationControlsProvider>
                <VisualizationArea />
            </VisualizationControlsProvider>
        </TrackInfoProvider>;

    const { getAllByText, queryByText, getByDisplayValue } = render(component);

    const loudnessElements = getAllByText(/loudness/iu);
    expect(loudnessElements).toHaveLength(2);
    expect(queryByText('-12')).toBeTruthy();
    expect(queryByText('C#/Db')).toBeNull();

    const groupingDropdown = getByDisplayValue(/loudness/iu);
    fireEvent.change(groupingDropdown, { target: { value: 'key' } });

    const keyElements = getAllByText(/key/iu);
    expect(keyElements).toHaveLength(2);
    expect(queryByText('-12')).toBeNull();
    expect(queryByText('C#/Db')).toBeTruthy();
});

it('changing the chart type changes the available dropdowns and shows a different chart with different axes', () => {
    TrackInfoService.getArtistTracks.mockResolvedValue(mockTrackInfo);

    const component =
        <TrackInfoProvider>
            <VisualizationControlsProvider>
                <VisualizationArea />
            </VisualizationControlsProvider>
        </TrackInfoProvider>;

    const { queryAllByText, queryByText, getByDisplayValue, queryByTestId } = render(component);

    expect(queryByText('Feature:')).toBeTruthy();
    expect(queryByText('Feature for X Axis:')).toBeNull();
    expect(queryByText('Feature for Y Axis:')).toBeNull();
    expect(queryByTestId('bar-chart')).toBeTruthy();
    expect(queryByTestId('scatter-plot')).toBeNull();

    const chartTypeDropdown = getByDisplayValue('Bar Chart');
    fireEvent.change(chartTypeDropdown, { target: { value: 'scatter-plot' } });

    expect(queryByText('Feature:')).toBeNull();
    expect(queryByText('Feature for X Axis:')).toBeTruthy();
    expect(queryByText('Feature for Y Axis:')).toBeTruthy();
    expect(queryByTestId('bar-chart')).toBeNull();
    expect(queryByTestId('scatter-plot')).toBeTruthy();

    fireEvent.change(getByDisplayValue('Loudness'), { target: { value: 'key' } });
    fireEvent.change(getByDisplayValue('Energy'), { target: { value: 'key' } });
    expect(queryAllByText(/key/iu)).toHaveLength(4);
});
