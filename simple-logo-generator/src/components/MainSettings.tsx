import React from 'react';
import SearchableFontDropdown from './custom components/SearchableFontDropdown';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: [
      "Roboto", "Montserrat", "Open Sans", "Playfair Display", "Merriweather", "Roboto Slab",
      "Lobster", "Pacifico", "Arial", "Verdana", "Tahoma", "Courier New"
    ]
  }
});

interface MainSettingsProps {
  text: string;
  onTextChange: (newText: string) => void;
  fontSize: number;
  onFontSizeChange: (newSize: number) => void;
  letterSpacing: number;
  onLetterSpacingChange: (newSpacing: number) => void;
  isBold: boolean;
  onBoldToggle: () => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  color: string;
  setColor: (color: string) => void;
}

const MainSettings: React.FC<MainSettingsProps> = ({
  text,
  onTextChange,
  fontSize,
  onFontSizeChange,
  letterSpacing,
  onLetterSpacingChange,
  isBold,
  onBoldToggle,
  fontFamily,
  setFontFamily,
  color,
  setColor
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          style={{ fontFamily, fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}px` }}
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
      </div>

      <hr className="my-4" />

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Font Family</label>
        <SearchableFontDropdown
          fonts={[
            'Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 'Times New Roman',
            'Georgia', 'Garamond', 'Courier New', 'Brush Script MT', 'Lobster', 'Pacifico',
            'Roboto', 'Montserrat', 'Open Sans', 'Playfair Display', 'Merriweather', 'Roboto Slab'
          ]}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
        />
      </div>

      <hr className="my-4" />

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Size</label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="10"
            max="100"
            value={fontSize}
            onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
            className="form-range w-full h-2 bg-gray-700 rounded-full cursor-pointer"
          />
          <span className="inline-block ml-4 text-lg font-medium text-gray-800">{fontSize}px</span>
        </div>
      </div>

      <hr className="my-4" />

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Letter Spacing</label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="20"
            value={letterSpacing}
            onChange={(e) => onLetterSpacingChange(parseInt(e.target.value))}
            className="form-range w-full h-2 bg-gray-700 rounded-full cursor-pointer"
          />
          <span className="inline-block ml-4 text-lg font-medium text-gray-800">{letterSpacing}px</span>
        </div>
      </div>

      <hr className="my-4" />

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-12 p-0 border-none rounded-md cursor-pointer shadow-sm transition ease-in-out m-0 focus:ring focus:ring-blue-300"
        />
      </div>

      <hr className="my-4" />

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Text Weight</label>
        <button
          onClick={onBoldToggle}
          className={`w-full py-4 rounded-md text-white font-semibold transition-colors duration-200 
                      ${isBold ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
        >
          {isBold ? 'Bold' : 'Normal'}
        </button>
      </div>
    </div>
  );
};

export default MainSettings;
