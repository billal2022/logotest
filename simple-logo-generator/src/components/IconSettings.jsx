import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '@mdi/react';
import { faIcons } from './custom components/faIcons';
import { mdiIcons } from './custom components/mdiIcons';
import CustomDropdown from './custom components/CustomDropdown';

const IconSettings = ({ setIcon, iconSize, setIconSize, iconColor, setIconColor, icon }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const combinedIcons = useMemo(() => [...faIcons, ...mdiIcons], []);

  const filteredIcons = useMemo(
    () => combinedIcons.filter((icon) =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm, combinedIcons]
  );

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Icon</label>
        <CustomDropdown 
          icons={filteredIcons} 
          onChange={setIcon} 
          iconSize={iconSize} 
          iconColor={iconColor}
        />
        <div className="mt-4 flex items-center space-x-2 bg-white p-2 rounded border border-gray-200">
          {icon.library === 'FontAwesome' ? (
            <FontAwesomeIcon icon={icon.icon} style={{ fontSize: `${iconSize}px`, color: iconColor, filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} />
          ) : (
            <Icon path={icon.icon} size={iconSize / 24} color={iconColor} style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} />
          )}
          <span className="font-medium text-gray-600">{icon.name}</span>
        </div>
      </div>

      <hr className="my-4" /> {/* Divider */}

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Size</label>
        <div className="flex items-center space-x-4">
          <input 
            type="range" 
            className="form-range w-full h-2 bg-gray-600 rounded-full cursor-pointer"
            min="12" 
            max="94" 
            step="1" 
            value={iconSize} 
            onChange={(e) => setIconSize(Number(e.target.value))}
          />
          <span className="inline-block ml-4 text-lg font-medium text-gray-800">{iconSize}px</span>
        </div>
      </div>

      <hr className="my-4" /> {/* Divider */}

      <div className="mb-8">
        <label className="block mb-2 text-lg font-bold text-gray-700">Color</label>
        <input
          type="color"
          className="w-full h-12 p-0 border-none rounded-md cursor-pointer"
          value={iconColor}
          onChange={(e) => setIconColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default IconSettings;
