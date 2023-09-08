import TypeProps from 'prop-types';

import { motion, useAnimate, useInView } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { localize } from '../utils/Translation';
import { useContext, useEffect, useMemo } from 'react';
import { SiteLang } from '../LangContext';

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => {
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
            { delay: index * 0.5 },
          ],
          [
            'div',
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            },
            { delay: index * 0.5 },
          ],
          [
            'div',
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            },
            { delay: index * 0.5 },
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
            { delay: 0.5 },
          ],
          [
            'div',
            {
              opacity: 0,
              scale: 0,
              filter: 'blur(20px)',
            },
            { delay: index * 0.5 },
          ],
          [
            'div',
            {
              opacity: 0,
              scale: 0,
              filter: 'blur(20px)',
            },
            { delay: index * 0.5 },
          ],
        ]);
  }, [lang, isInView]);

  return (
    <div ref={scope}>
      <motion.div
        initial={{ opacity: 0, scale: 0, filter: 'blur(20px)' }}
        // variants={fadeIn('', 'spring', index * 0.5, 0.75)}
        className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
      >
        <p className="text-white font-black text-[48px]">&quot;</p>

        <div className="mt-1">
          <p className="text-white tracking-wider text-[18px]">{testimonial}</p>

          <div className="mt-7 flex justify-between items-center gap-1">
            <div className="flex-1 flex flex-col">
              <p className="text-white font-medium text-[16px]">
                <span className=" blue-text-gradient">@</span> {name}
              </p>
              <p className="mt-1 text-secondary text-[12px]">
                {designation} of {company}
              </p>
            </div>
            <img
              src={image}
              alt={`feedback-by-${name}`}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

FeedbackCard.propTypes = {
  index: TypeProps.number,
  testimonial: TypeProps.string,
  name: TypeProps.string,
  designation: TypeProps.string,
  company: TypeProps.string,
  image: TypeProps.string,
};

const Feedbacks = () => {
  const { lang } = useContext(SiteLang);
  const testiomnials_text = useMemo(
    () => localize(lang, 'testimonials_text'),
    [lang]
  );
  const testimonials = useMemo(() => localize(lang, 'testimonials'), [lang]);

  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div
        className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>
            {testiomnials_text.what_others_say}
          </p>
          <h2 className={styles.sectionHeadText}>
            {testiomnials_text.testiomnials_text}
          </h2>
        </motion.div>
      </div>
      <div className={`${styles.paddingX} -mt-20 pb-14 flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, '');
