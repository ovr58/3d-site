import { BrowserRouter } from 'react-router-dom';
import { useMemo, useState } from 'react';

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Footer,
  Tech,
  Works,
  StarsCanvas,
} from './components';

import { SiteLang } from './LangContext';

const App = () => {
  const [lang, setLang] = useState('en');
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return (
    <BrowserRouter>
      <SiteLang.Provider value={value}>
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
          <Footer />
        </div>
      </SiteLang.Provider>
    </BrowserRouter>
  );
};

export default App;
