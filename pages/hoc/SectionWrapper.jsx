import { motion } from 'framer-motion';

import { styles } from '../styles';
import { staggerContainer } from '../utils/motion';

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`container ${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span style={{ display: 'inline' }} className="hash-span" id={idName}>
          {idName === 'contact' ? (
            ''
          ) : (
            <p>
              <br />
              <br />
              <br />
            </p>
          )}
        </span>
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
