import React, { useState } from 'react';
import GlobalSettings from './GlobalSettings';
import IconSettings from './IconSettings';
import MainSettings from './MainSettings';
import LogoPreview from './LogoPreview';
import AccentSettings from './AccentSettings';
import { faIcons } from './custom components/faIcons';
import { mdiIcons } from './custom components/mdiIcons';
import WebFont from 'webfontloader';
import { LogoProvider } from './logocontext';
import LogoList from './logolist';
import { IoGlobeOutline, IoImagesOutline, IoHomeOutline, IoColorPaletteOutline, IoAlbumsOutline, IoMenu } from 'react-icons/io5';

const colorPatterns = [
  {
    name: "Professional",
    colors: [
      { r: 0.00, g: 0.16, b: 0.36 }, // Navy
      { r: 0.71, g: 0.80, b: 0.86 }, // Light Slate Gray
      { r: 0.87, g: 0.90, b: 0.94 }, // Gainsboro
      { r: 0.20, g: 0.28, b: 0.37 }  // Dark Slate
    ]
  },
  {
    name: "Minimalist",
    colors: [
      { r: 0.93, g: 0.94, b: 0.95 }, // White Smoke
      { r: 0.66, g: 0.66, b: 0.66 }, // Silver
      { r: 0.18, g: 0.18, b: 0.18 }, // Jet
      { r: 0.11, g: 0.11, b: 0.11 }  // Onyx
    ]
  },
  {
    name: "Vibrant",
    colors: [
      { r: 0.80, g: 0.00, b: 0.00 }, // Red
      { r: 0.98, g: 0.80, b: 0.18 }, // Mustard
      { r: 0.04, g: 0.52, b: 0.89 }, // Blue (RYB)
      { r: 0.00, g: 0.60, b: 0.00 }  // Green
    ]
  },
  {
    name: "Pastel",
    colors: [
      { r: 0.99, g: 0.89, b: 0.77 }, // Peach Puff
      { r: 0.73, g: 0.56, b: 0.56 }, // Rosy Brown
      { r: 0.80, g: 0.88, b: 0.97 }, // Light Steel Blue
      { r: 0.86, g: 0.82, b: 0.90 }  // Thistle
    ]
  },
  {
    name: "Earthy Tones",
    colors: [
      { r: 0.35, g: 0.16, b: 0.14 }, // Dark brown
      { r: 0.91, g: 0.90, b: 0.88 }, // Very light gray
      { r: 0.75, g: 0.75, b: 0.72 },
      { r: 0.20, g: 0.09, b: 0.06 } 
    ]
  },
  {
    name: "Monochrome",
    colors: [
      { r: 0.2, g: 0.2, b: 0.2 },  // Dark gray
      { r: 0.95, g: 0.95, b: 0.95 },// Very light gray
      { r: 0.5, g: 0.5, b: 0.5 },  // Medium gray
      { r: 0.1, g: 0.1, b: 0.1 }   // Almost black
    ]
  },
  {
    name: "Cool Blues",
    colors: [
      { r: 0.0, g: 0.2, b: 0.4 },   // Navy blue
      { r: 0.9, g: 0.9, b: 1.0 },   // Pale blue
      { r: 0.0, g: 0.5, b: 0.7 },   // Cerulean
      { r: 0.04, g: 0.1, b: 0.2 }   // Dark blue
    ]
  },
  {
    name: "Natural Greens",
    colors: [
      { r: 0.0, g: 0.3, b: 0.1 },   // Dark green
      { r: 0.9, g: 1.0, b: 0.9 },   // Very light green
      { r: 0.2, g: 0.5, b: 0.2 },   // Forest green
      { r: 0.05, g: 0.15, b: 0.05 } // Deep green
    ]
  },
  {
    name: "Warm Reds and Oranges",
    colors: [
      { r: 0.8, g: 0.1, b: 0.1 },   // Crimson
      { r: 1.0, g: 0.92, b: 0.8 },  // Off white
      { r: 0.9, g: 0.4, b: 0.1 },   // Bright orange
      { r: 0.4, g: 0.05, b: 0.0 }   // Maroon
    ]
  },
  {
    name: "Subdued Purples",
    colors: [
      { r: 0.3, g: 0.0, b: 0.3 },   // Deep purple
      { r: 0.95, g: 0.85, b: 0.95 },// Lavender blush
      { r: 0.5, g: 0.2, b: 0.5 },   // Medium purple
      { r: 0.1, g: 0.0, b: 0.1 }    // Very dark purple
    ]
  }
];

WebFont.load({
  google: {
    families: [
      "Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman",
      "Georgia", "Garamond", "Courier New", "Brush Script MT", "Lobster", "Pacifico",
      "Roboto", "Montserrat", "Open Sans", "Playfair Display", "Merriweather", "Roboto Slab"
    ]
  }
});

const fonts = [
  "Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman",
  "Georgia", "Garamond", "Courier New", "Brush Script MT", "Lobster", "Pacifico",
  "Roboto", "Montserrat", "Open Sans", "Playfair Display", "Merriweather", "Roboto Slab"
];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
const getRandomColor = (): string => {
  const pattern = getRandomElement(colorPatterns);
  const color = getRandomElement(pattern.colors);
  return rgbToHex(Math.floor(color.r * 255), Math.floor(color.g * 255), Math.floor(color.b * 255));
};
const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
// Function to calculate the luminance of an RGB color
const luminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Function to calculate contrast ratio between two colors
const contrastRatio = (lum1: number, lum2: number) => {
  const bright = Math.max(lum1, lum2);
  const dark = Math.min(lum1, lum2);
  return (bright + 0.05) / (dark + 0.05);
};

const getRandomColorWithContrast = (bgColorHex: string) => {
  let contrast = 0;
  let newColor = '';
  while (contrast < 3) {  // Minimum contrast ratio; increase for more contrast
    newColor = getRandomColor();
    const bgLum = luminance(parseInt(bgColorHex.slice(1, 3), 16), parseInt(bgColorHex.slice(3, 5), 16), parseInt(bgColorHex.slice(5, 7), 16));
    const colorLum = luminance(parseInt(newColor.slice(1, 3), 16), parseInt(newColor.slice(3, 5), 16), parseInt(newColor.slice(5, 7), 16));
    contrast = contrastRatio(bgLum, colorLum);
  }
  return newColor;
};

const Form: React.FC = () => {

  const [transparentBackground, setTransparentBackground] = useState(false);

  const [listVisible, setListVisible] = useState(false);
  const toggleListVisibility = () => {
    setListVisible((prev) => !prev);
  };
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [text, setText] = useState('Logo');
  const [fontSize, setFontSize] = useState(48);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [isBold, setIsBold] = useState(false);
  const [fontFamily, setFontFamily] = useState('');
  const [color, setColor] = useState('#000000');
  const [icon, setIcon] = useState(faIcons[0]);
  const [iconSize, setIconSize] = useState(100);
  const [iconColor, setIconColor] = useState('#000000');
  
  const [accentText, setAccentText] = useState('');
  const [accentFontSize, setAccentFontSize] = useState(48);
  const [accentLetterSpacing, setAccentLetterSpacing] = useState(0);
  const [isAccentBold, setIsAccentBold] = useState(false);
  const [accentFontFamily, setAccentFontFamily] = useState('');
  const [accentColor, setAccentColor] = useState('#000000');
  const [layoutHorizontal, setLayoutHorizontal] = useState(true);
  const [layoutDirection, setLayoutDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [offsetSize, setOffsetSize] = useState(5);
  const [offsetColor, setOffsetColor] = useState("#f2f2f2");
  const [backgroundColorLogo, setBackgroundColorLogo] = useState("#ffffff");
  const [horizontalPadding, setHorizontalPadding] = useState(0);
  const [verticalPadding, setVerticalPadding] = useState(0);

  const [activeTab, setActiveTab] = useState('global');

  
  const handleTextChange = (newText: string) => setText(newText);
  const handleFontSizeChange = (newSize: number) => setFontSize(newSize);
  const handleLetterSpacingChange = (newSpacing: number) => setLetterSpacing(newSpacing);
  const handleBoldToggle = () => setIsBold(!isBold);
  const handleAccentTextChange = (newText: string) => setAccentText(newText);
  const handleAccentFontSizeChange = (newSize: number) => setAccentFontSize(newSize);
  const handleAccentLetterSpacingChange = (newSpacing: number) => setAccentLetterSpacing(newSpacing);
  const handleAccentBoldToggle = () => setIsAccentBold(!isAccentBold);

  const randomizeLogo = () => {
    const backgroundColor = getRandomColor(); // Get a random background color first
    setBackgroundColorLogo(backgroundColor);
  
    setText(getRandomElement([ 'Logo',]));
    setFontFamily(getRandomElement(fonts));
    setFontSize(getRandomNumber(35, 60));
    setLetterSpacing(getRandomNumber(0, 5));
    setIsBold(Math.random() > 0.5);
    setColor(getRandomColorWithContrast(backgroundColor)); // Ensure text color contrasts with background
    const randomIcon = getRandomElement([...faIcons, ...mdiIcons]);
    setIcon(randomIcon);
    setIconSize(getRandomNumber(50, 100));
    setIconColor(getRandomColorWithContrast(backgroundColor)); // Ensure icon color contrasts with background
    
    setAccentText(getRandomElement(['']));
    setAccentFontFamily(getRandomElement(fonts));
    setAccentFontSize(getRandomNumber(35, 60));
    setAccentLetterSpacing(getRandomNumber(0, 5));
    setIsAccentBold(Math.random() > 0.5);
    setAccentColor(getRandomColorWithContrast(backgroundColor)); // Ensure accent color contrasts with background
  
    setHorizontalPadding(getRandomNumber(10, 20));
    setVerticalPadding(getRandomNumber(2, 6));
    setLayoutHorizontal(Math.random() > 0.5);
    setLayoutDirection(Math.random() > 0.5 ? 'ltr' : 'rtl');
    setOffsetSize(getRandomNumber(2, 8));
    setOffsetColor(getRandomColorWithContrast(backgroundColor));
  };
  const tabConfig = [
    { name: 'global', icon: <IoGlobeOutline size={28} /> },
    { name: 'icon', icon: <IoImagesOutline size={28} /> },
    { name: 'main', icon: <IoHomeOutline size={28} /> },
    { name: 'accent', icon: <IoColorPaletteOutline size={28} /> },
    { name: 'logos', icon: <IoAlbumsOutline size={28} /> }, // Changed to a more suitable icon for logos
  ];

  return (
  <LogoProvider>
      <div className="flex flex-col w-full h-screen bg-white overflow-hidden">
        {/* Navbar with Tailwind CSS adjusted for subtle divider */}
        <div className="bg-white w-full border-b border-gray-200">
          <ul className="flex justify-between items-center px-4 md:px-0 overflow-x-auto">
            {tabConfig.map(tab => (
              <li key={tab.name} className="flex-1 min-w-max">
                <button onClick={() => setActiveTab(tab.name)}
                  className={`flex flex-col items-center text-sm font-bold py-3 px-4 focus:outline-none gap-3 w-full
                    ${activeTab === tab.name ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-600'}
                    hover:bg-blue-50 transition-colors duration-150`}>
                  {tab.icon}
                  <span>{`${tab.name.charAt(0).toUpperCase()}${tab.name.slice(1)} Settings`}</span>
                </button>
              </li>
            ))}
            <li className="md:hidden">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center text-sm font-bold py-3 px-4 focus:outline-none gap-3 w-full
                  bg-white text-gray-600 hover:bg-blue-50 transition-colors duration-150"
              >
                <IoMenu size={28} />
              </button>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex flex-grow overflow-hidden relative">
          {/* Sidebar with a subtle box-shadow as divider */}
          <div className={`sidebar bg-white w-full md:w-96 p-0 overflow-auto shadow-sm transition-all duration-300 md:relative ${sidebarOpen ? 'absolute inset-0 z-10' : 'hidden'} md:block`}>
            {activeTab === 'global' && (
              <GlobalSettings
                layoutHorizontal={layoutHorizontal}
                setLayoutHorizontal={setLayoutHorizontal}
                layoutDirection={layoutDirection}
                setLayoutDirection={setLayoutDirection}
                transparentBackground={transparentBackground}
                setTransparentBackground={setTransparentBackground}
                backgroundColorLogo={backgroundColorLogo}
                setBackgroundColorLogo={setBackgroundColorLogo}
                offsetSize={offsetSize}
                setOffsetSize={setOffsetSize}
                offsetColor={offsetColor}
                setOffsetColor={setOffsetColor}
                horizontalPadding={horizontalPadding}
                setHorizontalPadding={setHorizontalPadding}
                verticalPadding={verticalPadding}
                setVerticalPadding={setVerticalPadding}
              />
            )}
            {activeTab === 'icon' && (
              <IconSettings
                icon={icon}
                setIcon={setIcon}
                iconSize={iconSize}
                setIconSize={setIconSize}
                iconColor={iconColor}
                setIconColor={setIconColor}
              />
            )}
            {activeTab === 'main' && (
              <MainSettings
                text={text}
                onTextChange={setText}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                letterSpacing={letterSpacing}
                onLetterSpacingChange={setLetterSpacing}
                isBold={isBold}
                onBoldToggle={handleBoldToggle}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                color={color}
                setColor={setColor}
              />
            )}
            {activeTab === 'accent' && (
              <AccentSettings
                text={accentText}
                onTextChange={handleAccentTextChange}
                fontSize={accentFontSize}
                onFontSizeChange={handleAccentFontSizeChange}
                letterSpacing={accentLetterSpacing}
                onLetterSpacingChange={handleAccentLetterSpacingChange}
                isBold={isAccentBold}
                onBoldToggle={handleAccentBoldToggle}
                fontFamily={accentFontFamily}
                setFontFamily={setAccentFontFamily}
                color={accentColor}
                setColor={setAccentColor}
              />
            )}
            {activeTab === 'logos' && <LogoList />}
          </div>

          <div className="content flex-grow p-4 overflow-auto bg-gray-50 flex items-center justify-center">
            <div className="relative z-0">
              <LogoPreview
                icon={icon}
                iconSize={iconSize}
                iconColor={iconColor}
                text={text}
                fontFamily={fontFamily}
                fontSize={fontSize}
                letterSpacing={letterSpacing}
                isBold={isBold}
                color={color}
                accentText={accentText}
                accentFontFamily={accentFontFamily}
                accentFontSize={accentFontSize}
                accentLetterSpacing={accentLetterSpacing}
                isAccentBold={isAccentBold}
                accentColor={accentColor}
                layoutHorizontal={layoutHorizontal}
                layoutDirection={layoutDirection}
                offsetSize={offsetSize}
                offsetColor={offsetColor}
                backgroundColorLogo={backgroundColorLogo}
                horizontalPadding={horizontalPadding}
                verticalPadding={verticalPadding}
                randomizeLogo={randomizeLogo}
              />
            </div>
          </div>
        </div>
      </div>
    </LogoProvider>
  );
};

export default Form;
