import { useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Tilt } from 'react-tilt';
import { motion, useAnimate, useInView } from 'framer-motion';

import { styles } from '../styles';
import { localize } from '../utils/Translation';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { SiteLang } from '../LangContext';

const ServiceCard = ({ index, title, icon }) => {
  const { lang } = useContext(SiteLang);
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

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
            { delay: index * 0.1 },
          ],
          [
            'div',
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            },
            { delay: index * 0.1 },
          ],
          [
            'div',
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            },
            { delay: index * 0.1 },
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
            { delay: index * 0.1 },
          ],
          [
            'div',
            {
              opacity: 0,
              scale: 0,
              filter: 'blur(20px)',
            },
            { delay: index * 0.1 },
          ],
          [
            'div',
            {
              opacity: 0,
              scale: 0,
              filter: 'blur(20px)',
            },
            { delay: index * 0.1 },
          ],
        ]);
  }, [lang, isInView]);

  return (
    <div ref={scope}>
      <Tilt className="xs:w-[250px] w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0, filter: 'blur(20px)' }}
          // variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
          className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
        >
          <div
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
            className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
          >
            <img
              src={icon}
              alt="web-development"
              className="w-16 h-16 object-contain"
            />

            <h3 className="text-white text-[20px] font-bold text-center">
              {title}
            </h3>
          </div>
        </motion.div>
      </Tilt>
    </div>
  );
};

ServiceCard.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.string,
};

const About = () => {
  const { lang } = useContext(SiteLang);
  const intro = useMemo(() => localize(lang, 'intro'), [lang]);
  const services = useMemo(() => localize(lang, 'services'), [lang]);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`py-5 ${styles.sectionSubText}`}>{intro.introheader1}</p>
        <h2 className={`pb-7 ${styles.sectionHeadText}`}>
          {intro.introheader2}
        </h2>
      </motion.div>
      <motion.p variants={fadeIn('', '', 0.1, 1)}>{intro.introtext}</motion.p>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
