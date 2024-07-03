import React from 'react';

interface GlobalSettingsProps {
  layoutHorizontal: boolean;
  setLayoutHorizontal: (value: boolean) => void;
  layoutDirection: 'ltr' | 'rtl';
  setLayoutDirection: (value: 'ltr' | 'rtl') => void;
  offsetSize: number;
  setOffsetSize: (value: number) => void;
  offsetColor: string;
  setOffsetColor: (value: string) => void;
  backgroundColorLogo: string;
  setBackgroundColorLogo: (value: string) => void;
  transparentBackground: boolean;
  setTransparentBackground: (value: boolean) => void;
  horizontalPadding: number;
  setHorizontalPadding: (value: number) => void;
  verticalPadding: number;
  setVerticalPadding: (value: number) => void;
}

const GlobalSettings: React.FC<GlobalSettingsProps> = ({
  layoutHorizontal,
  setLayoutHorizontal,
  layoutDirection,
  setLayoutDirection,
  offsetSize,
  setOffsetSize,
  offsetColor,
  setOffsetColor,
  backgroundColorLogo,
  setBackgroundColorLogo,
  transparentBackground,
  setTransparentBackground,
  horizontalPadding,
  setHorizontalPadding,
  verticalPadding,
  setVerticalPadding,
}) => {
  const handleLayoutToggle = () => {
    setLayoutHorizontal(!layoutHorizontal);
  };

  const toggleBackgroundTransparency = () => {
    setTransparentBackground(!transparentBackground);
    setBackgroundColorLogo(transparentBackground ? '#FFFFFF' : 'transparent');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Layout</label>
        <button
          className={`w-full py-4 rounded-md text-white font-semibold transition-colors duration-200 
                      ${layoutHorizontal ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
          onClick={handleLayoutToggle}
        >
          {layoutHorizontal ? 'Horizontal' : 'Vertical'}
        </button>
      </div>

      {layoutHorizontal && (
        <div className="mb-8">
          <label className="block mb-2 text-lg font-bold text-gray-700">Direction</label>
          <div className="flex items-center space-x-4">
            <button
              className={`py-2 px-4 ${layoutDirection === 'ltr' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
              onClick={() => setLayoutDirection('ltr')}
            >
              Left to Right
            </button>
            <button
              className={`py-2 px-4 ${layoutDirection === 'rtl' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
              onClick={() => setLayoutDirection('rtl')}
            >
              Right to Left
            </button>
          </div>
        </div>
      )}

      <hr className="my-4" />  {/* Divider */}

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Offset Size</label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            className="form-range w-full h-2 bg-gray-600 rounded-full cursor-pointer"
            min="0"
            max="50"
            step="1"
            value={offsetSize}
            onChange={(e) => setOffsetSize(Number(e.target.value))}
          />
          <span className="inline-block ml-4 text-lg font-medium text-gray-800">{offsetSize}px</span>
        </div>
      </div>

      <hr className="my-4" />  {/* Divider */}

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Offset Color</label>
        <input
          type="color"
          className="w-full h-12 p-0 border-none rounded-md cursor-pointer"
          value={offsetColor}
          onChange={(e) => setOffsetColor(e.target.value)}
        />
      </div>

      <hr className="my-4" />  {/* Divider */}

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Background Color for Logo</label>
        <input
          type="color"
          className="w-full h-12 p-0 border-none rounded-md cursor-pointer"
          value={backgroundColorLogo}
          onChange={(e) => setBackgroundColorLogo(e.target.value)}
          disabled={transparentBackground}
        />
      </div>

      <hr className="my-4" />  {/* Divider */}

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Horizontal Padding</label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            className="form-range w-full h-2 bg-gray-600 rounded-full cursor-pointer"
            min="0"
            max="50"
            step="0.5"
            value={horizontalPadding}
            onChange={(e) => setHorizontalPadding(Number(e.target.value))}
          />
          <span className="inline-block ml-4 text-lg font-medium text-gray-800">{horizontalPadding}px</span>
        </div>
      </div>

      <hr className="my-4" />  {/* Divider */}

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Vertical Padding</label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            className="form-range w-full h-2 bg-gray-600 rounded-full cursor-pointer"
            min="0"
            max="50"
            step="0.5"
            value={verticalPadding}
            onChange={(e) => setVerticalPadding(Number(e.target.value))}
          />
          <span className="inline-block ml-4 text-lg font-medium text-gray-800">{verticalPadding}px</span>
        </div>
      </div>

      <hr className="my-4" />  {/* Divider */}

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Background Transparency</label>
        <button
          className={`w-full py-4 rounded-md text-white font-semibold transition-colors duration-200 
                      ${transparentBackground ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
          onClick={toggleBackgroundTransparency}
        >
          {transparentBackground ? 'Transparent' : 'Opaque'}
        </button>
      </div>
    </div>
  );
};

export default GlobalSettings;
