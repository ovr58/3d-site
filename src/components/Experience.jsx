import { useContext, useMemo } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';

import 'react-vertical-timeline-component/style.min.css';

import { styles } from '../styles';
import { localize } from '../utils/Translation';
import { ExperienceCard } from '.';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { SiteLang } from '../LangContext';

const Experience = () => {
  const { lang } = useContext(SiteLang);

  const header1 = useMemo(() => localize(lang, 'experience_header1'), [lang]);
  const header2 = useMemo(() => localize(lang, 'experience_header2'), [lang]);
  const experiences = useMemo(() => localize(lang, 'experiences'), [lang]);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`py-5 ${styles.sectionSubText}`}>{header1}</p>
        <h2 className={`pb-7 ${styles.sectionHeadText}`}>{header2}</h2>
      </motion.div>

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
