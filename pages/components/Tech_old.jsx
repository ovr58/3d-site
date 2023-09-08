import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { localize } from '../utils/Translation';
import { useContext, useMemo, useState } from 'react';
import { SiteLang } from '../LangContext';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { usePopper } from 'react-popper';

const Tech = () => {
  const { lang } = useContext(SiteLang);

  const technologies = useMemo(() => localize(lang, 'technologies'), [lang]);

  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div className="w-28 h-28" key={technology.name}>
          <Popover>
            {({ open }) => (
              <>
                <Popover.Button
                  title="get to about"
                  ref={setReferenceElement}
                  className={`
                ${open ? ' rounded-full animate-pulse' : ''}
                w-28 h-28 outline-none`}
                >
                  <BallCanvas icon={technology.icon} />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className=" z-10 mt-1 w-screen max-w-xs -translate-x-1/2 transform px-4 lg:max-w-xl"
                  >
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-tertiary">
                      <p className="p-5">{technology.anotation}</p>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, '');
