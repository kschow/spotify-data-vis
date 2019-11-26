import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Window from '../Window';

jest.mock('../../Spotify/Search/Service/SearchService');
jest.mock('../../Spotify/TrackInfo/TrackInfoService');

afterEach(() => {
    jest.resetAllMocks();
});

it('shows one pane by default, allows up to four panes to be created, deleting panes deletes the correct pane', () => {
    const { getByText, queryByText, queryByTestId, getByTestId } = render(<Window />);

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

/*
 * todo
 * it('displays VisualizationControls only when there is available track info or there is more than one pane', () => {
 *     expect(true).toBeFalsy();
 * });
 */
