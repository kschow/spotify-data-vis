import React, { useEffect, useState } from 'react';
import './Loading.scss';

const Loading = () => {
    const [displayMessage, setDisplayMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setDisplayMessage(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        displayMessage ?
            <div
                className="Loading"
                data-testid="Loading"
            /> :
            null
    );
};

export default Loading;
