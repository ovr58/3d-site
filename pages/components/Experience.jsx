import { useContext, useMemo, useEffect } from 'react';

import pkg from 'react-vertical-timeline-component';
const { VerticalTimeline } = pkg;
import 'react-vertical-timeline-component/style.min.css';

import { motion, useAnimate, useInView } from 'framer-motion';

import { styles } from '../styles';
import { localize } from '../utils/Translation';
import { ExperienceCard } from '.';
import { SectionWrapper } from '../hoc';
import { SiteLang } from '../LangContext';

const Experience = () => {
  const { lang } = useContext(SiteLang);
  const [titleScope, animate] = useAnimate();
  const isInView = useInView(titleScope);

  useEffect(() => {
    isInView
      ? animate([
          [
            'div',
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            },
            { delay: 0.1 },
          ],
          [
            'div',
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            },
            { delay: 0.8 },
          ],
        ])
      : animate([
          [
            'div',
            {
              opacity: 0,
              scale: 0,
              filter: 'blur(20px)',
            },
            { delay: 0.1 },
          ],
          [
            'div',
            {
              opacity: 0,
              scale: 0,
              filter: 'blur(20px)',
            },
            { delay: 0.8 },
          ],
        ]);
  }, [lang, isInView]);

  const header1 = useMemo(() => localize(lang, 'experience_header1'), [lang]);
  const header2 = useMemo(() => localize(lang, 'experience_header2'), [lang]);
  const experiences = useMemo(() => localize(lang, 'experiences'), [lang]);
  return (
    <>
      <div ref={titleScope}>
        <motion.div initial={{ opacity: 0, scale: 0, filter: 'blur(20px)' }}>
          <div className={`py-5 ${styles.sectionSubText}`}>{header1}</div>
          <div className={`pb-7 ${styles.sectionHeadText}`}>{header2}</div>
        </motion.div>
      </div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
