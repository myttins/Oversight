import React, { useRef, useState } from 'react';
import Image from '../../util/Image';

const AvatarManager = ({ path, onFileSelected, active }) => {
  const [src, setSrc] = useState(path);
  const fileInputRef = useRef(null);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileSelected(file); // Call the callback with the file
      const reader = new FileReader();
      reader.onloadend = () => setSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='container mx-auto'>
      <input type='file' accept='image/*' onChange={onFileChange} ref={fileInputRef} className='hidden' />
      {active ? (
        <div
          className='w-40 h-40 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center cursor-pointer opacity-50'
          onClick={onImageClick}
        >
          <Image src={src} />
          <span className='text-white text-center px-4 absolute'>Click to upload</span>
        </div>
      ) : (
        <div className='w-40 h-40 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center'>
          <Image src={src} />
        </div>
      )}
    </div>
  );
};

export default AvatarManager;
