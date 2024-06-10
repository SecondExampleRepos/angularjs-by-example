// react/src/services/$$animateReflow.ts

import { useEffect } from 'react';

// Define the $$animateReflow service
const $$animateReflow = (callback: () => void) => {
  useEffect(() => {
    // Placeholder for any initialization logic
    // Example: Fetch initial data or set up subscriptions
    const reflow = () => {
      callback();
    };

    // Use requestAnimationFrame for the reflow logic
    const rafId = requestAnimationFrame(reflow);

    // Cleanup function
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [callback]);
};

export default $$animateReflow;