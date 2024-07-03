import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'; // Import the dropdown icon
import Icon from '@mdi/react';

interface IconType {
  name: string;
  library: 'FontAwesome' | 'MDI';
  icon: any;
}

interface CustomDropdownProps {
  icons: IconType[];
  onChange: (icon: IconType) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ icons, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconType | null>(icons && icons.length > 0 ? icons[0] : null);
  const [searchTerm, setSearchTerm] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const filteredIcons = icons ? icons.filter(icon => 
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative w-full" ref={ref}>
      <button 
        className="p-3 bg-white border border-gray-300 rounded-md w-full text-gray-700 flex justify-between items-center shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
        <span>Select an icon</span>
        </div>
        <FontAwesomeIcon icon={faCaretDown} />
      </button>
      {isOpen && (
        <div className="absolute bg-white text-gray-700 w-full rounded-md shadow-lg z-10 mt-1">
          <input
            type="text"
            placeholder="Type to filter"
            className="p-2 w-full border-b border-gray-300 focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <div className="grid grid-cols-4 gap-2 p-2 overflow-y-auto max-h-60">
            {filteredIcons.length > 0 ? filteredIcons.map((icon, index) => (
              <button 
                key={index} 
                className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => {
                  setSelectedIcon(icon);
                  onChange(icon);
                  setIsOpen(false);
                }}
              >
                {icon.library === 'FontAwesome' ? (
                  <FontAwesomeIcon icon={icon.icon} size="2x" />
                ) : (
                  <Icon path={icon.icon} size={2} />
                )}
              </button>
            )) : (
              <div className="text-gray-500 p-3 text-center col-span-4">No icons found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
