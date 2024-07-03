import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '@mdi/react';
import domtoimage from 'dom-to-image';
import { useLogoContext } from './logocontext';

interface LogoPreviewProps {
  icon: { library: string, icon: any };
  iconSize: number;
  iconColor: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  letterSpacing: number;
  isBold: boolean;
  color: string;
  accentText: string;
  accentFontFamily: string;
  accentFontSize: number;
  accentLetterSpacing: number;
  isAccentBold: boolean;
  accentColor: string;
  layoutHorizontal: boolean;
  layoutDirection: 'ltr' | 'rtl';
  offsetSize: number;
  offsetColor: string;
  backgroundColorLogo: string;
  horizontalPadding: number;
  verticalPadding: number;
  randomizeLogo: () => void;
}

const LogoPreview: React.FC<LogoPreviewProps> = ({
  icon,
  iconSize,
  iconColor,
  text,
  fontFamily,
  fontSize,
  letterSpacing,
  isBold,
  color,
  accentText,
  accentFontFamily,
  accentFontSize,
  accentLetterSpacing,
  isAccentBold,
  accentColor,
  layoutHorizontal,
  layoutDirection,
  offsetSize,
  offsetColor,
  backgroundColorLogo,
  horizontalPadding,
  verticalPadding,
  randomizeLogo
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { addLogo, editLogo, currentLogoIndex, logos } = useLogoContext();
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (currentLogoIndex !== null) {
      const logoData = logos[currentLogoIndex];
      // Parse and load logoData into the component's state
      // Ensure your logoData contains all necessary properties to load into the state
    }
  }, [currentLogoIndex, logos]);

  const handleDownload = () => {
    if (previewRef.current) {
      const scale = 1;
      const options = {
        width: previewRef.current.offsetWidth * scale,
        height: previewRef.current.offsetHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        },
        quality: 1,
      };

      domtoimage.toBlob(previewRef.current, options)
        .then((blob: any) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'logo-preview.png';
          a.click();
        });
    }
  };

  const handleSave = () => {
    if (previewRef.current) {
      domtoimage.toPng(previewRef.current).then((dataUrl: string) => {
        if (currentLogoIndex !== null) {
          editLogo(currentLogoIndex, dataUrl);
        } else {
          addLogo(dataUrl);
        }
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 2000); // Hide snackbar after 2 seconds
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center h-72 mb-16 sm:mb-8">
        <div
          ref={previewRef}
          className={`flex ${layoutHorizontal ? 'items-center' : 'flex-col items-center space-y-1'} justify-center transform scale-75 sm:scale-100`}
          style={{
            flexDirection: layoutHorizontal ? (layoutDirection === 'ltr' ? 'row' : 'row-reverse') : 'column',
            backgroundColor: backgroundColorLogo,
            padding: `${verticalPadding}px ${horizontalPadding}px`,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          }}
        >
          <div style={{ color: iconColor, fontSize: `${iconSize}px`, margin: layoutHorizontal ? '0 8px' : '0' }}>
            {icon.library === 'FontAwesome' ? (
              <FontAwesomeIcon icon={icon.icon} />
            ) : (
              <Icon path={icon.icon} size={iconSize / 24} />
            )}
          </div>
          <span
            style={{
              fontFamily: fontFamily,
              fontSize: `${fontSize}px`,
              letterSpacing: `${letterSpacing}px`,
              fontWeight: isBold ? 'bold' : 'normal',
              color,
              textShadow: `${offsetSize}px ${offsetSize}px ${offsetColor}`,
              whiteSpace: 'nowrap',
              margin: layoutHorizontal ? '0 8px' : '4px 0',
            }}
          >
            {text}
          </span>
          <span
            style={{
              fontFamily: accentFontFamily,
              fontSize: `${accentFontSize}px`,
              letterSpacing: `${accentLetterSpacing}px`,
              fontWeight: isAccentBold ? 'bold' : 'normal',
              color: accentColor,
              padding: '0 4px',
              whiteSpace: 'nowrap',
              margin: layoutHorizontal ? '0 8px' : '4px 0',
            }}
          >
            {accentText}
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 transition duration-300 mb-2 sm:mb-0"
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
        >
          Save Logo
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 transition duration-300 mb-2 sm:mb-0"
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
        >
          Download Image
        </button>
      </div>
      <button
        onClick={randomizeLogo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 sm:mt-0 sm:ml-4"
      >
        Randomize Logo
      </button>
      {showSnackbar && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded shadow-lg">
          Logo saved successfully!
        </div>
      )}
    </div>
  );
};

export default LogoPreview;
