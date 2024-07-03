import React from 'react';
import { useLogoContext } from './logocontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

const LogoList: React.FC = () => {
  const { logos, removeLogo } = useLogoContext();

  const handleDownload = (logo: string) => {
    const a = document.createElement('a');
    a.href = logo;
    a.download = 'logo.png';
    a.click();
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto shadow-2xl">
      <div className="p-6 text-gray-800">
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-3">Saved Logos</h2>
        <ul className="space-y-6">
          {logos.map((logo, index) => (
            <li key={index} className="group">
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <img src={logo} alt={`Logo ${index}`} className="w-full h-48 object-contain mb-4 rounded" />
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleDownload(logo)}
                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors"
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Download
                  </button>
                  <button
                    onClick={() => removeLogo(index)}
                    className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-medium px-4 py-2 rounded transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LogoList;
