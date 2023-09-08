import { useState, useRef, useMemo, useContext } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { whatsup, telegram } from '../assets';
import { localize } from '../utils/Translation';
import { SiteLang } from '../LangContext';

const telNumber = import.meta.env.VITE_APP_TELNUMBER;

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { lang } = useContext(SiteLang);
  const [loading, setLoading] = useState(false);
  const contact_text = useMemo(() => localize(lang, 'contact_text'), [lang]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Nataly',
          from_email: form.email,
          to_email: 'nm2413027@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);

          alert(contact_text.alert_message_sent);
          setForm({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);

          console.error(error);

          alert(contact_text.alert_message_sent);
        }
      );
  };

  return (
    <div
      className={`flex xl:mt-12 xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="max-h-fit flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>{contact_text.get_in_touch}</p>
        <h3 className="text-white font-black xs:text-[40px] text-[30px]">
          {contact_text.contact_text}
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              {contact_text.form_your_name}
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={contact_text.form_your_name_placeholder}
              className="bg-tertiary py-4 px-6  text-white rounded-lg outline-none border-none font-medium placeholder:text-red-800"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              {contact_text.form_your_email}
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={contact_text.form_your_email_placeholder}
              className="bg-tertiary py-4 px-6  text-white rounded-lg outline-none border-none font-medium placeholder:text-red-800"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              {contact_text.form_your_message}
            </span>
            <textarea
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={contact_text.form_your_message_placeholder}
              className="bg-tertiary py-4 px-6 placeholder:text-red-800 text-white rounded-lg outline-none border-none font-medium resize-none"
              required
            />
          </label>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
              title="submit"
            >
              {loading
                ? contact_text.form_sending_message
                : contact_text.form_sent_message}
            </button>
            <div className="flex justify-start ">
              <a
                href={`https://wa.me/${telNumber}`}
                target="_blank"
                className="px-2 py-2 shadow-primary hover:animate-ping"
                rel="noreferrer"
                aria-label="message via whatsapp"
              >
                <img
                  src={whatsup}
                  alt="whatsup"
                  className=" h-[30px] w-[30px]"
                  title={contact_text.form_title_whatsup}
                />
              </a>
              <a
                href={`https://t.me/natatulia84`}
                target="_blank"
                className="px-2 py-2 shadow-primary hover:animate-ping"
                rel="noreferrer"
                aria-label="message via telegram"
              >
                <img
                  src={telegram}
                  alt="telegram"
                  className=" h-[30px] w-[30px]"
                  title={contact_text.form_title_telega}
                />
              </a>
            </div>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto xs:h-[400px] md:h-[350px] h-[550px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
