// Converted from src/directives/ngEnter.drct.js

import React, { useEffect, useRef } from 'react';

interface NgEnterProps {
    onEnter: () => void;
}

const NgEnter: React.FC<NgEnterProps> = ({ onEnter }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                onEnter();
                event.preventDefault();
            }
        };

        const element = elementRef.current;
        if (element) {
            element.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            if (element) {
                element.removeEventListener('keydown', handleKeyPress);
            }
        };
    }, [onEnter]);

    return <div ref={elementRef} tabIndex={0} />;
};

export default NgEnter;
