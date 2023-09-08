export { Page };

import { useMemo, useState } from 'react';
import { SiteLang } from './LangContext';
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

function Page() {
  const [lang, setLang] = useState('en');
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return (
    <SiteLang.Provider value={value}>
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
    </SiteLang.Provider>
  );
}
