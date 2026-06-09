import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Move } from 'lucide-react';

const ImageCropperModal = ({ src, onCrop, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);

  // Reset states when src changes
  useEffect(() => {
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  }, [src]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - crop.x, y: e.clientY - crop.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCrop({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX - crop.x,
        y: e.touches[0].clientY - crop.y
      };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setCrop({
      x: e.touches[0].clientX - dragStart.current.x,
      y: e.touches[0].clientY - dragStart.current.y
    });
  };

  const handleImageLoad = (e) => {
    const img = e.target;
    const aspect = img.naturalWidth / img.naturalHeight;
    if (aspect > 1) {
      // Landscape: fit width to container
      setImageSize({
        width: 320,
        height: 320 / aspect
      });
    } else {
      // Portrait or square: fit height to container
      setImageSize({
        height: 320,
        width: 320 * aspect
      });
    }
  };

  const handleCrop = () => {
    if (!imgRef.current || !imageSize.width) return;

    const img = imgRef.current;
    
    // Create a high resolution canvas
    const canvas = document.createElement('canvas');
    const outputSize = 800; // high res crop
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext('2d');

    // Fill white background in case transparent
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, outputSize, outputSize);

    // Visual dimensions of image with zoom
    const visualWidth = imageSize.width * zoom;
    const visualHeight = imageSize.height * zoom;

    // Center point of image relative to container (320x320)
    const centerX = 320 / 2 + crop.x;
    const centerY = 320 / 2 + crop.y;

    // Visual top left of image relative to container top left
    const visualLeft = centerX - visualWidth / 2;
    const visualTop = centerY - visualHeight / 2;

    // Scale factor between visual 320px scale and output 800px scale
    const factor = outputSize / 320;

    // Draw the visual region onto output canvas
    ctx.drawImage(
      img,
      visualLeft * factor,
      visualTop * factor,
      visualWidth * factor,
      visualHeight * factor
    );

    canvas.toBlob((blob) => {
      if (blob) {
        onCrop(blob);
      }
    }, 'image/jpeg', 0.95);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 flex flex-col font-sans">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#fcfaf2]">
          <div className="flex flex-col">
            <h3 className="text-xs font-black text-secondary uppercase tracking-widest">Crop Image</h3>
            <p className="text-[8px] font-bold text-primary uppercase tracking-widest mt-0.5">Enforce 1:1 Square Ratio</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-[#8F5B34] transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Crop Area */}
        <div className="p-6 flex flex-col items-center gap-6">
          <div 
            className="w-[320px] h-[320px] relative overflow-hidden bg-white border border-gray-200 rounded-2xl cursor-move select-none shadow-inner"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <img
              ref={imgRef}
              src={src}
              alt="Crop area preview"
              draggable="false"
              onLoad={handleImageLoad}
              className="absolute pointer-events-none select-none max-w-none"
              style={{
                transform: `translate(${crop.x}px, ${crop.y}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                width: imageSize.width ? `${imageSize.width}px` : 'auto',
                height: imageSize.height ? `${imageSize.height}px` : 'auto',
                left: imageSize.width ? `${(320 - imageSize.width) / 2}px` : '0px',
                top: imageSize.height ? `${(320 - imageSize.height) / 2}px` : '0px',
                transformOrigin: 'center center'
              }}
            />

            {/* Drag helper overlay icon */}
            <div className="absolute top-3 left-3 bg-black/60 text-white p-1.5 rounded-lg pointer-events-none backdrop-blur-sm">
              <Move size={12} />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 border-2 border-primary pointer-events-none rounded-2xl"></div>
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
              <div className="border-r border-b border-white/20"></div>
              <div className="border-r border-b border-white/20"></div>
              <div className="border-b border-white/20"></div>
              <div className="border-r border-b border-white/20"></div>
              <div className="border-r border-b border-white/20"></div>
              <div className="border-b border-white/20"></div>
              <div className="border-r border-white/20"></div>
              <div className="border-r border-white/20"></div>
              <div></div>
            </div>
          </div>

          {/* Slider controls */}
          <div className="w-full space-y-4 px-2">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>Zoom Scale</span>
                <span>{zoom.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="0.01"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <p className="text-[10px] text-gray-400 font-medium text-center leading-normal">
              Drag the product to center it. Move the slider to zoom in/out. When satisfied, click "Apply Crop" to generate the final 1:1 image.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-5 border-t border-gray-100 bg-[#fcfaf2] flex gap-3">
          <button 
            onClick={onClose}
            className="w-1/2 py-3.5 border border-gray-200 text-gray-600 font-black text-[10px] uppercase tracking-wider rounded-xl bg-white hover:bg-gray-50 transition-all text-center"
          >
            Cancel
          </button>
          <button 
            onClick={handleCrop}
            className="w-1/2 py-3.5 bg-primary hover:bg-primary-light text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md text-center"
          >
            Apply Crop
          </button>
        </div>

      </div>
    </div>
  );
};

export default ImageCropperModal;
