// react/src/services/$$animateReflow.ts

import { $$rAF } from 'path/to/$$rAF';
import { $document } from 'path/to/$document';

const $$animateReflow = (callback: () => void): void => {
  $$rAF(() => {
    callback();
  });
};

export default $$animateReflow;