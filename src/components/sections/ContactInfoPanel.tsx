import { useLanguage } from '@hooks/useLanguage.tsx';
import { contactInfoData } from './ContactInfoData';

export const ContactInfoPanel = () => {
    const { t } = useLanguage();

    return (
        <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white md:col-span-2">
            <h3 className="text-2xl font-serif mb-8 text-gray-100">{t.contactInfo}</h3> {/* Clave plana */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
                {contactInfoData.map((info, index) => {
                    const displayValue = info.value;
                    return (
                        <a
                            key={index}
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                            title={displayValue}
                        >
                            {info.icon}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};
