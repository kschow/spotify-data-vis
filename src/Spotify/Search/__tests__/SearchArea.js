import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TrackInfoProvider } from '../../TrackInfo/TrackInfoContext';
import SearchArea from '../SearchArea';
import { SearchProvider } from '../Service/SearchContext';
import { SearchService } from '../Service/SearchService';

jest.mock('../Service/SearchService');

afterEach(() => {
    jest.resetAllMocks();
});

it('searching without specifying search terms leads to an error message', () => {
    const component =
        <SearchProvider>
            <TrackInfoProvider>
                <SearchArea />
            </TrackInfoProvider>
        </SearchProvider>;
    const { getByPlaceholderText, getByText } = render(component);

    const searchBox = getByPlaceholderText('Search by artist');
    expect(searchBox.text).toBeUndefined();

    const searchTypeDropdown = getByText('Artist');
    expect(searchTypeDropdown).toBeTruthy();

    fireEvent.click(getByText('Search'));

    expect(getByText('Please specify your search.')).toBeTruthy();
});

it('switching to playlist search changes the placeholder text', () => {
    const component =
        <SearchProvider>
            <TrackInfoProvider>
                <SearchArea />
            </TrackInfoProvider>
        </SearchProvider>;
    const { getByPlaceholderText, queryByPlaceholderText, getByDisplayValue } = render(component);

    const searchBox = getByPlaceholderText('Search by artist');
    expect(searchBox.text).toBeUndefined();

    fireEvent.change(getByDisplayValue('Artist'), { target: { value: 'playlist' } });

    expect(queryByPlaceholderText('Search by playlist')).toBeTruthy();
});

it('searching for an artist that returns results shows results', async () => {
    const results = [
        {
            'spotifyId': '07D1Bjaof0NFlU32KXiqUP',
            'genres': [],
            'name': 'Lucy Dacus',
            'popularity': 62,
            'imageUrls': []
        }, {
            'spotifyId': '4gWAItIMhYCdD82T8tvv3T',
            'genres': [],
            'name': 'Lucy Hale',
            'popularity': 49,
            'imageUrls': []
        }
    ];
    SearchService.searchArtist.mockResolvedValue(results);

    const component =
        <SearchProvider>
            <TrackInfoProvider>
                <SearchArea />
            </TrackInfoProvider>
        </SearchProvider>;
    const { getByPlaceholderText, getByText, queryByText, findByText } = render(component);

    const searchBox = getByPlaceholderText('Search by artist');
    const submitButton = getByText('Search');

    fireEvent.change(searchBox, { target: { value: 'lucy' } });
    fireEvent.click(submitButton);

    expect(queryByText('Please specify your search.')).toBeNull();
    await expect(findByText('Lucy Dacus')).resolves.toBeTruthy();
    await expect(findByText('Lucy Hale')).resolves.toBeTruthy();
});

it('searching for a playlist that returns results shows results', async () => {
    const results = [
        {
            'spotifyId': '07D1Bjaof0NFlU32KXiqUP',
            'genres': [],
            'name': 'Official ACL 2019 Playlist',
            'imageUrls': []
        }, {
            'spotifyId': '4gWAItIMhYCdD82T8tvv3T',
            'genres': [],
            'name': 'ACL 2019',
            'imageUrls': []
        }
    ];
    SearchService.searchPlaylist.mockResolvedValue(results);

    const component =
        <SearchProvider>
            <TrackInfoProvider>
                <SearchArea />
            </TrackInfoProvider>
        </SearchProvider>;
    const {
        getByPlaceholderText,
        getByText,
        queryByText,
        findByText,
        getByDisplayValue
    } = render(component);

    const searchBox = getByPlaceholderText('Search by artist');
    const dropdown = getByDisplayValue('Artist');
    const submitButton = getByText('Search');

    fireEvent.change(dropdown, { target: { value: 'playlist' } });
    fireEvent.change(searchBox, { target: { value: 'ACL 2019' } });
    fireEvent.click(submitButton);

    expect(queryByText('Please specify your search.')).toBeNull();
    await expect(findByText('Official ACL 2019 Playlist')).resolves.toBeTruthy();
    await expect(findByText('ACL 2019')).resolves.toBeTruthy();
});

it('shows loading while waiting for results', async () => {
    // eslint-disable-next-line no-empty-function
    SearchService.searchArtist.mockReturnValue(new Promise(() => {}));

    const component =
        <SearchProvider>
            <TrackInfoProvider>
                <SearchArea />
            </TrackInfoProvider>
        </SearchProvider>;
    const {
        getByPlaceholderText,
        getByText,
        queryByText,
        findByTestId
    } = render(component);

    const searchBox = getByPlaceholderText('Search by artist');
    const submitButton = getByText('Search');

    fireEvent.change(searchBox, { target: { value: 'unending search' } });
    fireEvent.click(submitButton);

    expect(queryByText('Please specify your search.')).toBeNull();
    await expect(findByTestId('Loading')).resolves.toBeTruthy();
});
