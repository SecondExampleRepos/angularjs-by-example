import React, { useEffect, useState } from 'react';

interface NgAnimateChildrenProps {
  children: React.ReactNode;
  animateChildren: boolean | string;
}

const NgAnimateChildren: React.FC<NgAnimateChildrenProps> = ({ children, animateChildren }) => {
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