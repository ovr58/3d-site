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
import { useEffect } from 'react';

function Page() {
  
  const [lang, setLang] = useState('en');
  
  useEffect(() => {
    
    const browser_lang = window.navigator.language.substring(0,2);
    
    browser_lang == 'ru' || browser_lang == 'ka' || browser_lang == 'en' ? setLang(browser_lang) : setLang('en')
    
  }, []);
  
  const value = useMemo(() => ({ lang, setLang }), [lang]);

  console.log(value)
  return (
    <SiteLang.Provider value={value}>
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <div className="relative z-0">
        <Tech />
      </div>
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
