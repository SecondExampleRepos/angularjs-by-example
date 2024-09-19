// Converted from src/directives/ngEnter.drct.js

import React, { useEffect } from 'react';

type NgEnterProps = {
    onEnter: () => void;
};

const NgEnter: React.FC<NgEnterProps> = ({ onEnter, children }) => {
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            onEnter();
            event.preventDefault();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return <>{children}</>;
};

export default NgEnter;
