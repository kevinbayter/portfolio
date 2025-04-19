import { contactInfoData } from '@components/sections/ContactInfoData';
import { FaWhatsapp, FaEnvelope, FaTiktok, FaFacebook } from 'react-icons/fa';
import { describe, it, expect } from 'vitest';

describe('ContactInfoData', () => {
    it('contains all required contact methods', () => {
        const expectedMethods = ['WhatsApp', 'Email', 'TikTok', 'Facebook'];
        const methodLabels = contactInfoData.map(info => info.label);
        
        expect(methodLabels).toEqual(expectedMethods);
    });

    it('has valid data structure for each contact method', () => {
        contactInfoData.forEach(info => {
            expect(info).toHaveProperty('icon');
            expect(info).toHaveProperty('value');
            expect(info).toHaveProperty('link');
            expect(info).toHaveProperty('label');
            
            // Verifica que los valores no estén vacíos
            expect(info.value).toBeTruthy();
            expect(info.link).toBeTruthy();
            expect(info.label).toBeTruthy();
        });
    });

    it('has valid links for each contact method', () => {
        const linkPatterns = {
            WhatsApp: /^https:\/\/wa\.me\//,
            Email: /^mailto:/,
            TikTok: /^https:\/\/www\.tiktok\.com\/@/,
            Facebook: /^https:\/\/www\.facebook\.com\//
        };

        contactInfoData.forEach(info => {
            expect(info.link).toMatch(linkPatterns[info.label as keyof typeof linkPatterns]);
        });
    });

    it('uses correct icons for each contact method', () => {
        const iconComponents = {
            WhatsApp: FaWhatsapp,
            Email: FaEnvelope,
            TikTok: FaTiktok,
            Facebook: FaFacebook
        };

        contactInfoData.forEach(info => {
            const IconComponent = iconComponents[info.label as keyof typeof iconComponents];
            expect(info.icon.type).toBe(IconComponent);
            expect(info.icon.props.size).toBe(24);
        });
    });

    it('has valid phone number format for WhatsApp', () => {
        const whatsappInfo = contactInfoData.find(info => info.label === 'WhatsApp');
        expect(whatsappInfo?.value).toMatch(/^\+\d{2}\s\d{3}-\d{3}-\d{4}$/);
    });

    it('has valid email format', () => {
        const emailInfo = contactInfoData.find(info => info.label === 'Email');
        expect(emailInfo?.value).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('has valid social media handles', () => {
        const tiktokInfo = contactInfoData.find(info => info.label === 'TikTok');
        expect(tiktokInfo?.value).toMatch(/^@[\w._-]+$/);

        const facebookInfo = contactInfoData.find(info => info.label === 'Facebook');
        expect(typeof facebookInfo?.value).toBe('string');
        expect(facebookInfo?.value.length).toBeGreaterThan(0);
    });
}); 