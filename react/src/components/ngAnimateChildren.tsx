// react/src/components/ngAnimateChildren.tsx

import React, { useEffect, useState } from 'react';

interface NgAnimateChildrenProps {
  animateChildren: boolean | string;
  children: React.ReactNode;
}

const NgAnimateChildren: React.FC<NgAnimateChildrenProps> = ({ animateChildren, children }) => {
  const [shouldAnimateChildren, setShouldAnimateChildren] = useState<boolean>(false);

  useEffect(() => {
    if (typeof animateChildren === 'string' && animateChildren.length === 0) {
      setShouldAnimateChildren(true);
    } else {
      setShouldAnimateChildren(!!animateChildren);
    }
  }, [animateChildren]);

  return (
    <div data-animate-children={shouldAnimateChildren}>
      {children}
    </div>
  );
};

export default NgAnimateChildren;