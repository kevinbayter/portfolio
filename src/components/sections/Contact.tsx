import { useLanguage } from '@hooks/useLanguage.tsx';
import { useContactForm } from '@hooks/useContactForm.ts';
import { ContactInfoPanel } from './ContactInfoPanel';
import { ContactForm } from './ContactForm';

const Contact = () => {
  const { t } = useLanguage();
  const formProps = useContactForm();

  return (
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 text-gray-100">{t.contactTitle}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.contactSubtitle}</p>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-6xl mx-auto border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <ContactInfoPanel />
              <ContactForm {...formProps} />
            </div>
          </div>
        </div>
      </section>
  );
};

export default Contact;
