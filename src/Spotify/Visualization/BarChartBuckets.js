import { cloneDeep, isNil } from 'lodash';

const NOT_AVAILABLE = 'N/A';

const LOUDNESS_BUCKETS = [
    { count: 0, display: '-60' },
    { count: 0, display: '-35' },
    { count: 0, display: '-20' },
    { count: 0, display: '-15' },
    { count: 0, display: '-12' },
    { count: 0, display: '-9' },
    { count: 0, display: '-6' },
    { count: 0, display: '-3' },
    { count: 0, display: '0' }
];

const DURATION_BUCKETS = [
    { count: 0, display: '0' },
    { count: 0, display: '1' },
    { count: 0, display: '2' },
    { count: 0, display: '3' },
    { count: 0, display: '4' },
    { count: 0, display: '5' },
    { count: 0, display: '6' },
    { count: 0, display: '7+' }
];

const ZERO_ONE_BUCKETS = [
    { count: 0, display: '0.00' },
    { count: 0, display: '0.05' },
    { count: 0, display: '0.10' },
    { count: 0, display: '0.15' },
    { count: 0, display: '0.20' },
    { count: 0, display: '0.25' },
    { count: 0, display: '0.30' },
    { count: 0, display: '0.35' },
    { count: 0, display: '0.40' },
    { count: 0, display: '0.45' },
    { count: 0, display: '0.50' },
    { count: 0, display: '0.55' },
    { count: 0, display: '0.60' },
    { count: 0, display: '0.65' },
    { count: 0, display: '0.70' },
    { count: 0, display: '0.75' },
    { count: 0, display: '0.80' },
    { count: 0, display: '0.85' },
    { count: 0, display: '0.90' },
    { count: 0, display: '0.95' },
    { count: 0, display: '1.00' }
];

const POPULARITY_BUCKETS = [
    { count: 0, display: '5' },
    { count: 0, display: '10' },
    { count: 0, display: '15' },
    { count: 0, display: '20' },
    { count: 0, display: '25' },
    { count: 0, display: '30' },
    { count: 0, display: '35' },
    { count: 0, display: '40' },
    { count: 0, display: '45' },
    { count: 0, display: '50' },
    { count: 0, display: '55' },
    { count: 0, display: '60' },
    { count: 0, display: '65' },
    { count: 0, display: '70' },
    { count: 0, display: '75' },
    { count: 0, display: '80' },
    { count: 0, display: '85' },
    { count: 0, display: '90' },
    { count: 0, display: '95' },
    { count: 0, display: '100' }
];

const TEMPO_BUCKETS = [
    { count: 0, display: '0' },
    { count: 0, display: '10' },
    { count: 0, display: '20' },
    { count: 0, display: '30' },
    { count: 0, display: '40' },
    { count: 0, display: '50' },
    { count: 0, display: '60' },
    { count: 0, display: '70' },
    { count: 0, display: '80' },
    { count: 0, display: '90' },
    { count: 0, display: '100' },
    { count: 0, display: '110' },
    { count: 0, display: '120' },
    { count: 0, display: '130' },
    { count: 0, display: '140' },
    { count: 0, display: '150' },
    { count: 0, display: '160' },
    { count: 0, display: '170' },
    { count: 0, display: '180' },
    { count: 0, display: '190' },
    { count: 0, display: '200+' }
];

const KEY_BUCKETS = [
    { count: 0, display: 'C' },
    { count: 0, display: 'C#/Db' },
    { count: 0, display: 'D' },
    { count: 0, display: 'D#/Eb' },
    { count: 0, display: 'E' },
    { count: 0, display: 'F' },
    { count: 0, display: 'F#/Gb' },
    { count: 0, display: 'G' },
    { count: 0, display: 'G#/Ab' },
    { count: 0, display: 'A' },
    { count: 0, display: 'A#/Bb' },
    { count: 0, display: 'B' }
];

const TIME_BUCKETS = [
    { count: 0, display: '1' },
    { count: 0, display: '2' },
    { count: 0, display: '3' },
    { count: 0, display: '4' },
    { count: 0, display: '5' },
    { count: 0, display: '6' },
    { count: 0, display: '7' }
];

const MODE_BUCKETS = [{ count: 0, display: 'minor' }, { count: 0, display: 'major' }];

const simpleMapFunction = (data, key) => data[key];

// this function looks to map the space from 0 to 1 into 20 equally sized buckets
const zeroOneMapFunction = (data, key) => {
    return isNil(data[key]) ?
        NOT_AVAILABLE :
        Math.floor(data[key] * 20);
};

// this function looks to map the space from 0 to 100 into 20 equally sized buckets
const zeroOneHundredMapFunction = (data, key) => {
    return isNil(data[key]) ?
        NOT_AVAILABLE :
        Math.floor(data[key] / 5);
};

const loudnessMapFunction = (data) => {
    const { loudness } = data;
    if (loudness < -35) {
        return 0;
    }
    if (loudness < -20) {
        return 1;
    }
    if (loudness < -15) {
        return 2;
    }
    if (loudness < -12) {
        return 3;
    }
    if (loudness < -9) {
        return 4;
    }
    if (loudness < -6) {
        return 5;
    }
    if (loudness < -3) {
        return 6;
    }
    if (loudness < 0) {
        return 7;
    }
    if (loudness >= 0) {
        return 8;
    }
    return NOT_AVAILABLE;
};

const tempoMapFunction = (data) => {
    if (isNil(data.tempo)) {
        return NOT_AVAILABLE;
    }
    if (data.tempo > 200) {
        return 20;
    }
    return Math.floor(data.tempo / 10);
};

// buckets for duration go in one minute intervals up to 6, everything 7 minutes+ is in the same bucket
const durationMapFunction = (data) => {
    if (isNil(data.durationMs)) {
        return NOT_AVAILABLE;
    }
    const rawDurationBucket = Math.floor(data.durationMs / 60000);
    if (rawDurationBucket >= 7) {
        return 7;
    }
    return rawDurationBucket;
};

const simpleReduceFunction = (data, key) => {
    const nonEmptyKey = isNil(key) ?
        NOT_AVAILABLE :
        key.toString();
    data[nonEmptyKey] = data[nonEmptyKey] || { count: 0, display: nonEmptyKey };
    data[nonEmptyKey].count++;
    return data;
};

const AUDIO_FEATURES = {
    loudness: {
        displayName: 'loudness',
        units: 'dB',
        mapFunction: loudnessMapFunction,
        reduceFunction: simpleReduceFunction,
        buckets: LOUDNESS_BUCKETS
    },
    energy: {
        displayName: 'energy',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'energy'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS
    },
    key: {
        displayName: 'key',
        units: '',
        mapFunction: (data) => simpleMapFunction(data, 'key'),
        reduceFunction: simpleReduceFunction,
        buckets: KEY_BUCKETS
    },
    mode: {
        displayName: 'mode',
        units: '',
        mapFunction: (data) => simpleMapFunction(data, 'mode'),
        reduceFunction: simpleReduceFunction,
        buckets: MODE_BUCKETS
    },
    acousticness: {
        displayName: 'acousticness',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'acousticness'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS
    },
    speechiness: {
        displayName: 'speechiness',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'speechiness'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS
    },
    instrumentalness: {
        displayName: 'instrumentalness',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'instrumentalness'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS
    },
    liveness: {
        displayName: 'liveness',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'liveness'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS
    },
    valence: {
        displayName: 'valence',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'valence'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS
    },
    tempo: {
        displayName: 'tempo',
        units: 'bpm',
        mapFunction: tempoMapFunction,
        reduceFunction: simpleReduceFunction,
        buckets: TEMPO_BUCKETS
    },
    danceability: {
        displayName: 'danceability',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'danceability'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS
    },
    trackNumber: {
        displayName: 'track number',
        units: '',
        mapFunction: (data) => simpleMapFunction(data, 'trackNumber'),
        reduceFunction: simpleReduceFunction,
        buckets: []
    },
    durationMs: {
        displayName: 'duration (ms)',
        units: 'minutes',
        mapFunction: durationMapFunction,
        reduceFunction: simpleReduceFunction,
        buckets: DURATION_BUCKETS
    },
    timeSignature: {
        displayName: 'time signature',
        units: 'x/4',
        mapFunction: (data) => simpleMapFunction(data, 'timeSignature'),
        reduceFunction: simpleReduceFunction,
        buckets: TIME_BUCKETS
    },
    popularity: {
        displayName: 'popularity',
        units: '',
        mapFunction: (data) => zeroOneHundredMapFunction(data, 'popularity'),
        reduceFunction: simpleReduceFunction,
        buckets: POPULARITY_BUCKETS
    }
};

export const countFeatures = (tracks, feature) => {
    return Object.values(tracks)
        .map(AUDIO_FEATURES[feature].mapFunction)
        .reduce(
            AUDIO_FEATURES[feature].reduceFunction,
            cloneDeep(AUDIO_FEATURES[feature].buckets)
        );
};

export const audioFeatureList = Object.keys(AUDIO_FEATURES);
