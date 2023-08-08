import { VerticalTimelineElement } from 'react-vertical-timeline-component';

import PropTypes from 'prop-types';

import 'react-vertical-timeline-component/style.min.css';
import { localize } from '../utils/Translation';
import { useContext, useMemo } from 'react';
import { SiteLang } from '../LangContext';

const ExperienceCard = ({ date, iconBg, icon, action_name, title, points }) => {
  const { lang } = useContext(SiteLang);
  const support_me = useMemo(() => localize(lang, 'support_me'), [lang]);
  return (
    <>
      <VerticalTimelineElement
        contentStyle={{
          background: '#1d1836',
          color: '#fff',
          marginInline: 14,
        }}
        contentArrowStyle={{ borderRight: '7px solid #232631' }}
        date={date}
        iconStyle={{
          zIndex: 1,
          background: iconBg,
          width: '80px',
          height: '80px',
          marginRight: 10,
        }}
        icon={
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={icon}
              alt={action_name}
              className="w-[100%] h-[100%] object-contain"
            />
          </div>
        }
      >
        <div>
          <h3 className="text-white text-[24px] font-bold  timelinetoggle:ml-0 ml-16">
            {title}
          </h3>
          <h4
            className="text-secondary text-[16px] font-semibold  timelinetoggle:ml-0 ml-16 mx-0"
            // style={{ margin: 0 }}
          >
            {action_name}
          </h4>
        </div>
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point}
              {point.includes('Boosty.to') ? (
                <a
                  href="https://boosty.to/3dnataly"
                  className="animate-pulse underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {' '}
                  {support_me}
                </a>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </VerticalTimelineElement>
    </>
  );
};

ExperienceCard.propTypes = {
  date: PropTypes.string,
  iconBg: PropTypes.string,
  icon: PropTypes.string,
  action_name: PropTypes.string,
  title: PropTypes.string,
  points: PropTypes.array,
};

export default ExperienceCard;
