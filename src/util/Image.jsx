import React, { useEffect, useState } from 'react';

const Image = ({ src }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <img
      src={hasError ? '' : src}
      className={`w-full h-full object-cover ${hasError ? 'bg-slate-500' : null}`}
      onError={handleError}
    />
  );
};

export default Image;
