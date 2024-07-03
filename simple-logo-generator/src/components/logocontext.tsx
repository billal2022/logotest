import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LogoContextProps {
  logos: string[];
  addLogo: (logo: string) => void;
  removeLogo: (index: number) => void;
  editLogo: (index: number, updatedLogo: string) => void;
  currentLogoIndex: number | null;
  setCurrentLogoIndex: (index: number | null) => void;
}

const LogoContext = createContext<LogoContextProps | undefined>(undefined);

export const useLogoContext = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogoContext must be used within a LogoProvider');
  }
  return context;
};

export const LogoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logos, setLogos] = useState<string[]>(() => {
    const savedLogos = localStorage.getItem('logos');
    return savedLogos ? JSON.parse(savedLogos) : [];
  });
  const [currentLogoIndex, setCurrentLogoIndex] = useState<number | null>(null);

  const addLogo = (logo: string) => {
    setLogos((prevLogos) => {
      const newLogos = [...prevLogos, logo];
      localStorage.setItem('logos', JSON.stringify(newLogos));
      return newLogos;
    });
  };

  const removeLogo = (index: number) => {
    setLogos((prevLogos) => {
      const newLogos = prevLogos.filter((_, i) => i !== index);
      localStorage.setItem('logos', JSON.stringify(newLogos));
      return newLogos;
    });
  };

  const editLogo = (index: number, updatedLogo: string) => {
    setLogos((prevLogos) => {
      const newLogos = [...prevLogos];
      newLogos[index] = updatedLogo;
      localStorage.setItem('logos', JSON.stringify(newLogos));
      return newLogos;
    });
    setCurrentLogoIndex(null);
  };

  return (
    <LogoContext.Provider value={{ logos, addLogo, removeLogo, editLogo, currentLogoIndex, setCurrentLogoIndex }}>
      {children}
    </LogoContext.Provider>
  );
};
