import React from 'react';
import background from '../assets/background.jpg';
import diet1 from '../assets/diet1.jpg';
import diet2 from '../assets/diet2.jpg';
import diet3 from '../assets/diet3.jpg';
import diet4 from '../assets/diet4.jpg';
import diet5 from '../assets/diet5.jpg';
import diet6 from '../assets/diet6.jpg';
import background2 from '../assets/background2.jpg';
import background3 from '../assets/background3.jpg';
import logo from '../assets/logo.png';
import chartsBackground2 from '../assets/chartsBackground2.jpg';

const ImageGallery = () => {
  const images = [
    diet1,
    diet2,
    diet3,
    diet4,
    diet5,
    diet6,
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Image Gallery</h1>
      <div className="gallery grid grid-cols-6 gap-2 perspective">
        {images.map((src, index) => (
          <div key={index} className={`images group relative overflow-hidden transition-all duration-300`}>
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60 flex items-center justify-center text-white text-lg font-bold">
              View Full Image
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;