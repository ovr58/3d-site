import { styles } from '../styles';

import { ComputersCanvas } from './canvas';

const Hero = () => (
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
          Hi, I&apos;m <span className="text-[#915eff]">Nataly</span>
        </h1>
        <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          I develop 3D visualizations, models <br className="sm:block hidden" />{' '}
          and scenes for your enterprises, <br className="sm:block hidden" />
          endeavors and dreams.
        </p>
      </div>
    </div>

    <ComputersCanvas />

    <div className="absolute xs:bottom-10 bottom-32 w-full flex sm:justify-end justify-center items-center">
      <a href="#about">
        <div className="w-[64px] h-[64px] rounded-full border-4 border-violet-500 flex justify-center items-center p-2 animate-bounce">
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

export default Hero;
