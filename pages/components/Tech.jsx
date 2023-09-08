import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { localize } from '../utils/Translation';
import { useContext, useMemo, useState } from 'react';
import { SiteLang } from '../LangContext';

const Tech = () => {
  const { lang } = useContext(SiteLang);

  const [pressed, setPressed] = useState(0);

  const technologies = useMemo(() => localize(lang, 'technologies'), [lang]);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology, index) => (
        <div
          className="w-28 h-28 hover:animate-pulse"
          key={technology.name}
          onClick={() => setPressed(index)}
        >
          <BallCanvas
            icon={technology.icon}
            card={technology.anotation}
            name={technology.name}
          />
        </div>
      ))}
      <div className="rounded-lg bg-tertiary p-6 shadow-black dark:bg-neutral-900">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {technologies[pressed].name}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {technologies[pressed].anotation}
        </p>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, '');
