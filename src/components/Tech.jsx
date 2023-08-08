import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { localize } from '../utils/Translation';
import { useContext, useMemo } from 'react';
import { SiteLang } from '../LangContext';

const Tech = () => {
  const { lang } = useContext(SiteLang);

  const technologies = useMemo(() => localize(lang, 'technologies'), [lang]);
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div className="w-28 h-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, '');
