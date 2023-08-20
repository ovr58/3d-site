import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { boosty } from '../assets';
import { SectionWrapper } from '../hoc';
import { localize } from '../utils/Translation';
import { fadeIn, textVariant } from '../utils/motion';

import PropTypes from 'prop-types';
import { useContext, useMemo } from 'react';
import { SiteLang } from '../LangContext';

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, '_blank')}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={boosty}
                alt="boosty"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="m2-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
  image: PropTypes.string,
  source_code_link: PropTypes.string,
};

const Works = () => {
  const { lang } = useContext(SiteLang);

  const work_text = useMemo(() => localize(lang, 'work_text'), [lang]);
  const projects = useMemo(() => localize(lang, 'projects'), [lang]);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={` ${styles.sectionSubText}`}>
          {work_text.my_work_header}
        </p>
        <h2 className={` ${styles.sectionHeadText}`}>
          {work_text.my_work_header1}
        </h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {work_text.my_work_intro}
        </motion.p>
      </div>
      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'works');
