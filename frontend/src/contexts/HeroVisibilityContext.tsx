import React, { createContext, useContext, useState } from 'react';

interface HeroVisibilityContextProps {
  isHeroVisible: boolean;
  setHeroVisibility: (visible: boolean) => void;
}

const HeroVisibilityContext = createContext<HeroVisibilityContextProps | undefined>(undefined);

export const HeroVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHeroVisible, setHeroVisibility] = useState<boolean>(true);

  return (
    <HeroVisibilityContext.Provider value={{ isHeroVisible, setHeroVisibility }}>
      {children}
    </HeroVisibilityContext.Provider>
  );
};

export const useHeroVisibility = () => {
  const context = useContext(HeroVisibilityContext);
  if (!context) {
    throw new Error('useHeroVisibility must be used within a HeroVisibilityProvider');
  }
  return context;
};
