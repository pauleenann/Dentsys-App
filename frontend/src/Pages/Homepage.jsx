import React, { useRef } from 'react';
import NavBar from '../Components/NavBar/NavBar';
import HeaderPage from '../Components/Header/HeaderPage';
import Services from '../Components/Services/Services';
import AboutUs from '../Components/AboutUs/AboutUs';
import Footer from '../Components/Footer/Footer';

const App = () => {
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);

  const scrollToAboutUs = (e) => {
    e.preventDefault();
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = (e) => {
    e.preventDefault();
    if (aboutUsRef.current) {
     servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <NavBar onAboutUsClick={scrollToAboutUs} onServicesClick={scrollToServices} />
      <HeaderPage />
      <div ref={servicesRef}>
        <Services />
      </div>
      <div ref={aboutUsRef}>
        <AboutUs />
      </div>
      <Footer />
    </div>
  );
};

export default App;
