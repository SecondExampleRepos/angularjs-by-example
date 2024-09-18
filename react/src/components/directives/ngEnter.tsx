﻿// Converted from src/directives/ngEnter.drct.js

import React, { useEffect, useRef } from 'react';

type NgEnterProps = {
    onEnter: () => void;
};

const NgEnter: React.FC<NgEnterProps> = ({ onEnter }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                onEnter();
                event.preventDefault();
            }
        };

        const currentElement = inputRef.current;
        if (currentElement) {
            currentElement.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            if (currentElement) {
                currentElement.removeEventListener('keydown', handleKeyPress);
            }
        };
    }, [onEnter]);

    return <input ref={inputRef} type="text" />;
};

export default NgEnter;
