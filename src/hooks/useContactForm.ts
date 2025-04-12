import { useState, FormEvent } from 'react';
import { useLanguage } from './useLanguage';

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface Status {
    submitted: boolean;
    success: boolean;
    message: string;
}

export const useContactForm = () => {
    const { t } = useLanguage();

    const [formData, setFormData] = useState<FormState>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<Status>({
        submitted: false,
        success: false,
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ submitted: false, success: false, message: '' });

        try {
            const response = await fetch('https://formspree.io/f/xgerdvjk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus({
                    submitted: true,
                    success: true,
                    message: t.successMessage
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus({
                    submitted: true,
                    success: false,
                    message: t.errorMessage
                });
            }
        } catch (error) {
            setStatus({
                submitted: true,
                success: false,
                message: t.connectionError
            });
        }

        setIsSubmitting(false);
    };

    return {
        formData,
        status,
        isSubmitting,
        handleChange,
        handleSubmit
    };
};
