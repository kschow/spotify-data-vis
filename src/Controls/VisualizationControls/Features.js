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

const simpleBucketMapFunction = (data, key) => data[key];

// fix issue with time signature and 0 index mismatch
const timeSignatureBucketFunction = (data) => {
    if (isNil(data.timeSignature) || data.timeSignature < 1) {
        return NOT_AVAILABLE;
    }
    return data.timeSignature - 1;
};

// this function looks to map the space from 0 to 1 into 10 equally sized buckets
const zeroOneBucketMapFunction = (data, key) => {
    return isNil(data[key]) ?
        NOT_AVAILABLE :
        Math.floor(data[key] * 10);
};

// this function looks to map the space from 0 to 100 into 10 equally sized buckets
const zeroOneHundredBucketMapFunction = (data, key) => {
    return isNil(data[key]) ?
        NOT_AVAILABLE :
        Math.floor(data[key] / 10);
};

const loudnessBucketMapFunction = (data) => {
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

const tempoBucketMapFunction = (data) => {
    if (isNil(data.tempo)) {
        return NOT_AVAILABLE;
    }
    if (data.tempo > 200) {
        return 10;
    }
    return Math.floor(data.tempo / 20);
};

// buckets for duration go in one minute intervals up to 6, everything 7 minutes+ is in the same bucket
const durationBucketMapFunction = (data) => {
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

const doNothingFunction = (data) => data;
const fixedNumberDisplayFunction = (decimal, data) => data.toFixed(decimal);
const threeDecimalDisplayFunction = (data) => fixedNumberDisplayFunction(3, data);
const zeroDecimalDisplayFunction = (data) => fixedNumberDisplayFunction(0, data);
const keyDisplayFunction = (data) => {
    switch (data) {
    case 0:
        return 'C';
    case 1:
        return 'C#/Db';
    case 2:
        return 'D';
    case 3:
        return 'D#/Eb';
    case 4:
        return 'E';
    case 5:
        return 'F';
    case 6:
        return 'F#/Gb';
    case 7:
        return 'G';
    case 8:
        return 'G#/Ab';
    case 9:
        return 'A';
    case 10:
        return 'A#/Bb';
    case 11:
        return 'B';
    default:
        return 'N/A';
    }
};
const modeDisplayFunction = (data) => {
    switch (data) {
    case 0:
        return 'minor';
    case 1:
        return 'major';
    default:
        return 'N/A';
    }
};
const durationDisplayFunction = (data) => {
    return `${Math.floor(data)}:${(data % 1 * 60).toFixed(0).padStart(2, '0')}`;
};

export const AUDIO_FEATURES = {
    loudness: {
        displayName: 'Loudness',
        units: 'dB',
        bucketMapFunction: loudnessBucketMapFunction,
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: (data) => `${threeDecimalDisplayFunction(data)} dB`,
        buckets: LOUDNESS_BUCKETS,
        chartDomainPadding: 20
    },
    energy: {
        displayName: 'Energy',
        units: '',
        bucketMapFunction: (data) => zeroOneBucketMapFunction(data, 'energy'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: threeDecimalDisplayFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    key: {
        displayName: 'Key',
        units: '',
        bucketMapFunction: (data) => simpleBucketMapFunction(data, 'key'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: keyDisplayFunction,
        // eslint-disable-next-line array-element-newline
        scatterTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        scatterTickFormat: keyDisplayFunction,
        buckets: KEY_BUCKETS,
        chartDomainPadding: 20
    },
    mode: {
        displayName: 'Mode',
        units: '',
        bucketMapFunction: (data) => simpleBucketMapFunction(data, 'mode'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: modeDisplayFunction,
        scatterTickValues: [0, 1],
        scatterTickFormat: modeDisplayFunction,
        buckets: MODE_BUCKETS,
        chartDomainPadding: 200
    },
    acousticness: {
        displayName: 'Acousticness',
        units: '',
        bucketMapFunction: (data) => zeroOneBucketMapFunction(data, 'acousticness'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: threeDecimalDisplayFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    speechiness: {
        displayName: 'Speechiness',
        units: '',
        bucketMapFunction: (data) => zeroOneBucketMapFunction(data, 'speechiness'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: threeDecimalDisplayFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    instrumentalness: {
        displayName: 'Instrumentalness',
        units: '',
        bucketMapFunction: (data) => zeroOneBucketMapFunction(data, 'instrumentalness'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: threeDecimalDisplayFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    liveness: {
        displayName: 'Liveness',
        units: '',
        bucketMapFunction: (data) => zeroOneBucketMapFunction(data, 'liveness'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: threeDecimalDisplayFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    valence: {
        displayName: 'Valence',
        units: '',
        bucketMapFunction: (data) => zeroOneBucketMapFunction(data, 'valence'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: threeDecimalDisplayFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    tempo: {
        displayName: 'Tempo',
        units: 'bpm',
        bucketMapFunction: tempoBucketMapFunction,
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: (data) => `${zeroDecimalDisplayFunction(data)} bpm`,
        buckets: TEMPO_BUCKETS,
        chartDomainPadding: 20
    },
    danceability: {
        displayName: 'Danceability',
        units: '',
        bucketMapFunction: (data) => zeroOneBucketMapFunction(data, 'danceability'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: threeDecimalDisplayFunction,
        buckets: ZERO_ONE_BUCKETS,
        chartDomainPadding: 20
    },
    trackNumber: {
        displayName: 'Track Number',
        units: '',
        bucketMapFunction: (data) => simpleBucketMapFunction(data, 'trackNumber'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: threeDecimalDisplayFunction,
        buckets: [],
        chartDomainPadding: 20
    },
    durationMs: {
        displayName: 'Duration',
        units: 'minutes',
        bucketMapFunction: durationBucketMapFunction,
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: (data) => data / 60000,
        tooltipDisplayFunction: durationDisplayFunction,
        scatterTickFormat: zeroDecimalDisplayFunction,
        buckets: DURATION_BUCKETS,
        chartDomainPadding: 20
    },
    timeSignature: {
        displayName: 'Time Signature',
        units: '',
        bucketMapFunction: (data) => timeSignatureBucketFunction(data),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: zeroDecimalDisplayFunction,
        // eslint-disable-next-line array-element-newline
        scatterTickValues: [1, 2, 3, 4, 5, 6, 7],
        buckets: TIME_BUCKETS,
        chartDomainPadding: 20
    },
    popularity: {
        displayName: 'Popularity',
        units: '',
        bucketMapFunction: (data) => zeroOneHundredBucketMapFunction(data, 'popularity'),
        reduceFunction: simpleReduceFunction,
        scatterMapFunction: doNothingFunction,
        tooltipDisplayFunction: zeroDecimalDisplayFunction,
        buckets: POPULARITY_BUCKETS,
        chartDomainPadding: 20
    }
};

export const countFeature = (tracks, feature) => {
    return Object.values(tracks)
        .map(AUDIO_FEATURES[feature].bucketMapFunction)
        .reduce(
            AUDIO_FEATURES[feature].reduceFunction,
            cloneDeep(AUDIO_FEATURES[feature].buckets)
        );
};

export const scatterFeature = (value, feature) => {
    return AUDIO_FEATURES[feature].scatterMapFunction(value);
};

export const getFeatureLabelText = (bucket) => {
    const unitText = isEmpty(AUDIO_FEATURES[bucket].units) ?
        '' :
        `(${AUDIO_FEATURES[bucket].units})`;

    return `${AUDIO_FEATURES[bucket].displayName} ${unitText}`;
};

export const getScatterTooltipText = (datum, scatterFeatureX, scatterFeatureY) => {
    return `Name: ${datum.name}\n` +
        `${AUDIO_FEATURES[scatterFeatureX].displayName}: ` +
        `${AUDIO_FEATURES[scatterFeatureX].tooltipDisplayFunction(datum.x)}\n` +
        `${AUDIO_FEATURES[scatterFeatureY].displayName}: ` +
        `${AUDIO_FEATURES[scatterFeatureY].tooltipDisplayFunction(datum.y)}`;
};

export const getScatterTickValues = (feature) => {
    return AUDIO_FEATURES[feature].scatterTickValues;
};

export const getScatterTickFormat = (feature) => {
    return AUDIO_FEATURES[feature].scatterTickFormat;
};

export const getFeatureDomainPadding = (bucket) => {
    return AUDIO_FEATURES[bucket].chartDomainPadding;
};
