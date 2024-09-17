// Converted from src/directives/ngEnter.drct.js

import React, { useCallback } from 'react';

interface NgEnterProps {
    onEnter: () => void;
}

const NgEnter: React.FC<NgEnterProps> = ({ onEnter, children }) => {
    const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onEnter();
            event.preventDefault();
        }
    }, [onEnter]);

    return (
        <div onKeyPress={handleKeyPress}>
            {children}
        </div>
    );
};

export default NgEnter;
