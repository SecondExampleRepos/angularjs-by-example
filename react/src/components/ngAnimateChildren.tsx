// react/src/components/ngAnimateChildren.tsx

import React, { useEffect, useRef } from 'react';

interface NgAnimateChildrenProps {
  animateChildren: boolean | string;
  children: React.ReactNode;
}

const NgAnimateChildren: React.FC<NgAnimateChildrenProps> = ({ animateChildren, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (typeof animateChildren === 'string' && animateChildren.length === 0) {
        containerRef.current.dataset.ngAnimateChildren = 'true';
      } else {
        containerRef.current.dataset.ngAnimateChildren = String(!!animateChildren);
      }
    }
  }, [animateChildren]);

  return <div ref={containerRef}>{children}</div>;
};

export default NgAnimateChildren;