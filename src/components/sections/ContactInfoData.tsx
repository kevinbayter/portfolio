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
    label: string;
}

export const contactInfoData: ContactInfoData[] = [
    {
        icon: <FaWhatsapp size={24} />,
        value: '+57 314-787-2867',
        link: 'https://wa.me/573147872867',
        label: 'WhatsApp'
    },
    {
        icon: <FaEnvelope size={24} />,
        value: 'kevinbayter@gmail.com',
        link: 'mailto:kevinbayter@gmail.com',
        label: 'Email'
    },
    {
        icon: <FaTiktok size={24} />,
        value: '@bayter_x',
        link: 'https://www.tiktok.com/@bayter_x',
        label: 'TikTok'
    },
    {
        icon: <FaFacebook size={24} />,
        value: 'Kevin Bayter',
        link: 'https://www.facebook.com/kevinbayter',
        label: 'Facebook'
    }
];
