/* eslint-disable no-undefined */
import React, { Component } from 'react';
import { TrackInfoService } from './TrackInfoService';

const withTrackInfo = (WrappedComponent) => {
    return class TrackInfoWrapper extends Component {
        constructor(props) {
            super(props);

            this.state = {
                tracks: {},
                errorMessage: '',
                isLoading: false
            };

            this.getTracks = this.getTracks.bind(this);
        }

        getTracksForX(tracksFunction, spotifyId) {
            return tracksFunction(spotifyId)
                .then((response) => this.setState({ tracks: response }))
                .catch(() => this.setState({ errorMessage: 'Getting track information failed.' }))
                .finally(() => this.setState({ isLoading: false }));
        }

        getTracks(spotifyId, searchType) {
            this.setState({
                tracks: {},
                errorMessage: '',
                isLoading: true
            });

            if (searchType === 'artist') {
                this.getTracksForX(TrackInfoService.getArtistTracks, spotifyId);
            } else if (searchType === 'playlist') {
                this.getTracksForX(TrackInfoService.getPlaylistTracks, spotifyId);
            }
        }

        render() {
            return (
                <WrappedComponent trackInfoContext={{
                    tracks: this.state.tracks,
                    errorMessage: this.state.errorMessage,
                    isLoading: this.state.isLoading,
                    getTracks: this.getTracks
                }} {...this.props} />
            );
        }
    };
};

export { withTrackInfo };
