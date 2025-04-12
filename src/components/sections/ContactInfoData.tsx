import {
    FaEnvelope,
    FaWhatsapp,
    FaTiktok,
    FaFacebook
} from 'react-icons/fa';

interface ContactInfoData {
    icon: React.ReactElement;
    value: string;
    link?: string;
}

export const contactInfoData: ContactInfoData[] = [
    {
        icon: <FaWhatsapp size={24} />,
        value: '+57 314-787-2867',
        link: 'https://wa.me/573147872867'
    },
    {
        icon: <FaEnvelope size={24} />,
        value: 'kevinbayterdev@gmail.com',
        link: 'mailto:kevinbayterdev@gmail.com'
    },
    {
        icon: <FaTiktok size={24} />,
        value: '@bcod3r',
        link: 'https://www.tiktok.com/@bcod3r'
    },
    {
        icon: <FaFacebook size={24} />,
        value: 'Kevin Bayter',
        link: 'https://www.facebook.com/kevinbayter'
    }
];
