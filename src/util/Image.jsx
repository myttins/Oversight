import React, { useEffect, useState } from 'react';

const ImageWithErrorHandling = ({ src }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state whenever src changes
    const img = new Image();
    img.src = src;
    img.onload = () => setHasError(false);
    img.onerror = () => setHasError(true);
  }, [src]);

  const handleError = () => {
    setHasError(true);
  };

  const imageSrc = hasError || !src ? '' : src;

  return (
    <img
      src={imageSrc}
      className={`w-full h-full object-cover ${hasError || !src ? 'bg-slate-300' : null}`}
      onError={handleError}
    />
  );
};

export default ImageWithErrorHandling;
