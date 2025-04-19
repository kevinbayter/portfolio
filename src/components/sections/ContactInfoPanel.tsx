import { useLanguage } from '@hooks/useLanguage.tsx';
import { contactInfoData } from './ContactInfoData';

export const ContactInfoPanel = () => {
    const { t } = useLanguage();

    return (
        <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white md:col-span-2">
            <h3 className="text-2xl font-serif mb-8 text-gray-100">{t.contactInfo}</h3>
            
            <div className="space-y-6">
                {contactInfoData.map((info, index) => (
                    <a
                        key={index}
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-primary/10 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-700 group-hover:bg-primary flex items-center justify-center transition-all">
                            {info.icon}
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">
                                {info.label}
                            </p>
                            <p className="text-gray-100 font-medium group-hover:text-primary transition-colors">
                                {info.value}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-4">{t.contactSubtitle}</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-gray-300 text-sm">{t.availableForProjects}</p>
                </div>
            </div>
        </div>
    );
};
