import React, { useEffect, useState } from 'react';

interface NgAnimateChildrenProps {
  ngAnimateChildren: string | boolean;
  children: React.ReactNode;
}

const NgAnimateChildren: React.FC<NgAnimateChildrenProps> = ({ ngAnimateChildren, children }) => {
  const [animateChildren, setAnimateChildren] = useState<boolean>(false);

  useEffect(() => {
    if (typeof ngAnimateChildren === 'string' && ngAnimateChildren.length === 0) {
      setAnimateChildren(true);
    } else if (typeof ngAnimateChildren === 'boolean') {
      setAnimateChildren(ngAnimateChildren);
    }
  }, [ngAnimateChildren]);

  return (
    <div data-animate-children={animateChildren}>
      {children}
    </div>
  );
};

export default NgAnimateChildren;
