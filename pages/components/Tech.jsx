import { useContext, useMemo, useState } from 'react';
import { SectionWrapper } from '../hoc';

import { NewBalls } from './canvas';

import { localize } from '../utils/Translation';
import { SiteLang } from '../LangContext';

const Tech = () => {
  const { lang } = useContext(SiteLang);

  const [selected, setSelected] = useState(-1);

  const technologies = useMemo(() => localize(lang, 'technologies'), [lang]);

  return (
    <div className="w-full  h-screen content-center">
      {selected >= 0 ? (
        <div className="absolute z-10 rounded-lg bg-tertiary p-6 shadow-white">
          <div className="flex items-center justify-between">
            <h5 className="mb-2 text-xl text-white font-medium">
              {technologies[selected].name}
            </h5>
            <button
              type="button"
              className="mb-2 z-10 w-fit p-2 bg-tertiary rounded-full"
              onClick={() => setSelected(-1)}
            >
              <h3 className="font-bold text-white">x</h3>
            </button>
          </div>
          <p className="mb-4 text-base text-white">
            {technologies[selected].anotation}
          </p>
        </div>
      ) : (
        ''
      )}
      <NewBalls
        toggle={selected}
        selectItem={(useSelectedItem) => setSelected(useSelectedItem)}
      />
    </div>
  );
};

export default SectionWrapper(Tech, '');
