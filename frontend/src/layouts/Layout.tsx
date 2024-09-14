// Layout.tsx
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { HeroVisibilityProvider, useHeroVisibility } from "../contexts/HeroVisibilityContext";

interface Props {
  children: React.ReactNode;
}

const LayoutContent = ({ children }: Props) => {
  const { isHeroVisible } = useHeroVisibility();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isHeroVisible && <Hero />}
      <div className={`container mx-auto ${isHeroVisible ? 'w-full' : 'mt-4'}`}>
        <SearchBar />
      </div>
      <div className="container mx-auto py-10 flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};

const Layout = ({ children }: Props) => (
  <HeroVisibilityProvider>
    <LayoutContent>{children}</LayoutContent>
  </HeroVisibilityProvider>
);

export default Layout;
