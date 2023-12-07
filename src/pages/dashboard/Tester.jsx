import React, { useEffect, useRef, useState } from 'react';


const AvatarUploader = () => {
  const [src, setSrc] = useState(null);
  const fileInputRef = useRef(null);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onImageClick = () => {
    fileInputRef.current.click();
  };


  return (
    <div className='container mx-auto my-4 p-4'>
      <input type='file' accept='image/*' onChange={onFileChange} ref={fileInputRef} className='hidden' />
      <div
        className='w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center cursor-pointer'
        onClick={onImageClick}
      >
        {src ? (
          <img src={src} alt='Avatar' className='w-full h-full object-cover' />
        ) : (
          <span className='text-gray-500'>Upload Image</span>
        )}
      </div>
    </div>
  );
};

const Tester = () => {
  return (
    <div>
    </div>
  );
};

export default Tester;
