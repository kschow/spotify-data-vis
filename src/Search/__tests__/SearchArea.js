import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import SearchArea from '../SearchArea';
import SearchService from '../SearchService';

jest.mock('../SearchService');

it('searching without specifying search terms leads to an error message', () => {
    const { getByPlaceholderText, getByText } = render(<SearchArea />);

    const searchBox = getByPlaceholderText('Search by artist');
    expect(searchBox.text).toBeUndefined();
    fireEvent.click(getByText('Search'));

    expect(getByText('Please specify your search.')).toBeTruthy();
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

    const { getByPlaceholderText, getByText, queryByText, findByText } = render(<SearchArea />);

    const searchBox = getByPlaceholderText('Search by artist');
    expect(searchBox.text).toBeUndefined();
    fireEvent.change(searchBox, { target: { value: 'lucy' } });
    fireEvent.click(getByText('Search'));

    expect(queryByText('Please specify your search.')).toBeNull();
    await expect(findByText('Lucy Dacus')).resolves.toBeTruthy();
    await expect(findByText('Lucy Hale')).resolves.toBeTruthy();
});
