import { cloneDeep, isEmpty, isNil } from 'lodash';

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
    { count: 0, display: '0.10' },
    { count: 0, display: '0.20' },
    { count: 0, display: '0.30' },
    { count: 0, display: '0.40' },
    { count: 0, display: '0.50' },
    { count: 0, display: '0.60' },
    { count: 0, display: '0.70' },
    { count: 0, display: '0.80' },
    { count: 0, display: '0.90' },
    { count: 0, display: '1.00' }
];

const POPULARITY_BUCKETS = [
    { count: 0, display: '10' },
    { count: 0, display: '20' },
    { count: 0, display: '30' },
    { count: 0, display: '40' },
    { count: 0, display: '50' },
    { count: 0, display: '60' },
    { count: 0, display: '70' },
    { count: 0, display: '80' },
    { count: 0, display: '90' },
    { count: 0, display: '100' }
];

const TEMPO_BUCKETS = [
    { count: 0, display: '0' },
    { count: 0, display: '20' },
    { count: 0, display: '40' },
    { count: 0, display: '60' },
    { count: 0, display: '80' },
    { count: 0, display: '100' },
    { count: 0, display: '120' },
    { count: 0, display: '140' },
    { count: 0, display: '160' },
    { count: 0, display: '180' },
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

// fix issue with time signature and 0 index mismatch
const timeSignatureFunction = (data) => {
    if (isNil(data.timeSignature) || data.timeSignature < 1) {
        return NOT_AVAILABLE;
    }
    return data.timeSignature - 1;
};

// this function looks to map the space from 0 to 1 into 10 equally sized buckets
const zeroOneMapFunction = (data, key) => {
    return isNil(data[key]) ?
        NOT_AVAILABLE :
        Math.floor(data[key] * 10);
};

// this function looks to map the space from 0 to 100 into 10 equally sized buckets
const zeroOneHundredMapFunction = (data, key) => {
    return isNil(data[key]) ?
        NOT_AVAILABLE :
        Math.floor(data[key] / 10);
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
        return 10;
    }
    return Math.floor(data.tempo / 20);
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

export const AUDIO_FEATURES = {
    loudness: {
        displayName: 'Loudness',
        units: 'dB',
        mapFunction: loudnessMapFunction,
        reduceFunction: simpleReduceFunction,
        buckets: LOUDNESS_BUCKETS,
        chartDomainPadding: 20
    },
    energy: {
        displayName: 'Energy',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'energy'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    key: {
        displayName: 'Key',
        units: '',
        mapFunction: (data) => simpleMapFunction(data, 'key'),
        reduceFunction: simpleReduceFunction,
        buckets: KEY_BUCKETS,
        chartDomainPadding: 20
    },
    mode: {
        displayName: 'Mode',
        units: '',
        mapFunction: (data) => simpleMapFunction(data, 'mode'),
        reduceFunction: simpleReduceFunction,
        buckets: MODE_BUCKETS,
        chartDomainPadding: 100
    },
    acousticness: {
        displayName: 'Acousticness',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'acousticness'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    speechiness: {
        displayName: 'Speechiness',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'speechiness'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    instrumentalness: {
        displayName: 'Instrumentalness',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'instrumentalness'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    liveness: {
        displayName: 'Liveness',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'liveness'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    valence: {
        displayName: 'Valence',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'valence'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    tempo: {
        displayName: 'Tempo',
        units: 'bpm',
        mapFunction: tempoMapFunction,
        reduceFunction: simpleReduceFunction,
        buckets: TEMPO_BUCKETS,
        chartDomainPadding: 20
    },
    danceability: {
        displayName: 'Danceability',
        units: '',
        mapFunction: (data) => zeroOneMapFunction(data, 'danceability'),
        reduceFunction: simpleReduceFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    trackNumber: {
        displayName: 'Track Number',
        units: '',
        mapFunction: (data) => simpleMapFunction(data, 'trackNumber'),
        reduceFunction: simpleReduceFunction,
        buckets: [],
        chartDomainPadding: 20
    },
    durationMs: {
        displayName: 'Duration',
        units: 'minutes',
        mapFunction: durationMapFunction,
        reduceFunction: simpleReduceFunction,
        buckets: DURATION_BUCKETS,
        chartDomainPadding: 20
    },
    timeSignature: {
        displayName: 'Time Signature',
        units: 'x/4',
        mapFunction: (data) => timeSignatureFunction(data),
        reduceFunction: simpleReduceFunction,
        buckets: TIME_BUCKETS,
        chartDomainPadding: 20
    },
    popularity: {
        displayName: 'Popularity',
        units: '',
        mapFunction: (data) => zeroOneHundredMapFunction(data, 'popularity'),
        reduceFunction: simpleReduceFunction,
        buckets: POPULARITY_BUCKETS,
        chartDomainPadding: 20
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

export const getFeatureLabelText = (bucket) => {
    if (isNil(AUDIO_FEATURES[bucket])) {
        return null;
    }

    const unitText = isEmpty(AUDIO_FEATURES[bucket].units) ?
        '' :
        `(${AUDIO_FEATURES[bucket].units})`;

    return `${AUDIO_FEATURES[bucket].displayName} ${unitText}`;
};

export const getFeatureDomainPadding = (bucket) => {
    if (isNil(AUDIO_FEATURES[bucket])) {
        return null;
    }

    return AUDIO_FEATURES[bucket].chartDomainPadding;
};
