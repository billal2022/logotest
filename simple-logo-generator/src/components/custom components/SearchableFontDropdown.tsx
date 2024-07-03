import React, { useState } from 'react';

interface SearchableFontDropdownProps {
  fonts: string[];
  fontFamily: string;
  setFontFamily: (font: string) => void;
}

const SearchableFontDropdown: React.FC<SearchableFontDropdownProps> = ({ fonts, fontFamily, setFontFamily }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFonts = searchTerm ? fonts.filter((font: string) => font.toLowerCase().includes(searchTerm.toLowerCase())) : fonts;

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm(''); // Clear search term when toggling dropdown
  };

  const handleSelectFont = (font: string) => {
    setFontFamily(font);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full ">
      <div className="relative w-full">
        <div
          className="flex justify-between items-center w-full px-4 py-2 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg"
          style={{ fontFamily: fontFamily }}
          onClick={handleToggleDropdown}
        >
          {fontFamily || 'Select a font'}
          <svg className="w-5 h-5 ml-2 text-gray-600 transition-transform duration-200 ease-in-out transform" style={{ transform: isOpen ? 'rotate(180deg)' : '' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
            <input
              type="text"
              className="w-full px-4 py-2 text-gray-700 bg-white border-b border-gray-300 focus:outline-none"
              placeholder="Search fonts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredFonts.map((font: string) => (
              <div
                key={font}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                style={{ fontFamily: font }}
                onClick={() => handleSelectFont(font)}
              >
                {font}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableFontDropdown;
