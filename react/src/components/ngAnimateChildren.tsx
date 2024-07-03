import React, { useEffect, useState } from 'react';

interface NgAnimateChildrenProps {
  children: React.ReactNode;
  ngAnimateChildren: boolean | string;
}

const NgAnimateChildren: React.FC<NgAnimateChildrenProps> = ({ children, ngAnimateChildren }) => {
  const [animateChildren, setAnimateChildren] = useState<boolean>(false);

  useEffect(() => {
    if (typeof ngAnimateChildren === 'string' && ngAnimateChildren.length === 0) {
      setAnimateChildren(true);
    } else {
      setAnimateChildren(!!ngAnimateChildren);
    }
  }, [ngAnimateChildren]);

  return (
    <div data-ng-animate-children={animateChildren}>
      {children}
    </div>
  );
};

export default NgAnimateChildren;
