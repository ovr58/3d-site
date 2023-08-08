import { styles } from '../styles';

import { ComputersCanvas } from './canvas';
import { localize } from '../utils/Translation';
import { useContext, useMemo } from 'react';
import { SiteLang } from '../LangContext';

const Hero = () => {
  const { lang } = useContext(SiteLang);

  const herotext = useMemo(() => localize(lang, 'herotext'), [lang]);
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            {herotext.hitext}
            <span className="text-[#915eff]">{herotext.nametext}</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            {herotext.myintro[0]} <br className="sm:block hidden" />
            {herotext.myintro[1]} <br className="sm:block hidden" />
            {herotext.myintro[2]} <br className="sm:block hidden" />
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-0  w-full flex sm:justify-end justify-center">
        <a href="#about">
          <div className="w-[64px] h-[64px] rounded-full border-4 border-violet-500  p-2 animate-bounce">
            <svg
              className="w-30 h-30 text-violet-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
