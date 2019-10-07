import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TrackInfoProvider } from '../../TrackInfo/TrackInfoContext';
import { TrackInfoService } from '../../TrackInfo/TrackInfoService';
import VisualizationArea from '../VisualizationArea';

jest.mock('../../TrackInfo/TrackInfoService');

afterEach(() => {
    jest.resetAllMocks();
});

it('changing the visualization control value changes the axis labels and bottom axis values', () => {
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
        <TrackInfoProvider>
            <VisualizationArea />
        </TrackInfoProvider>;

    const { getAllByText, queryByText, getByDisplayValue } = render(component);

    const loudnessElements = getAllByText('loudness');
    expect(loudnessElements).toHaveLength(2);
    expect(queryByText('-12')).toBeTruthy();
    expect(queryByText('C#/Db')).toBeNull();

    const groupingDropdown = getByDisplayValue('loudness');
    fireEvent.change(groupingDropdown, { target: { value: 'key' } });

    const keyElements = getAllByText('key');
    expect(keyElements).toHaveLength(2);
    expect(queryByText('-12')).toBeNull();
    expect(queryByText('C#/Db')).toBeTruthy();
});
