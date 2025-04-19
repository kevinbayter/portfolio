import React from 'react';
import { useLanguage } from '@hooks/useLanguage.tsx';

interface ContactFormProps {
    formData: { name: string; email: string; subject: string; message: string; };
    status: { submitted: boolean; success: boolean; message: string; };
    isSubmitting: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const ContactForm: React.FC<ContactFormProps> = ({
                                                            formData,
                                                            status,
                                                            isSubmitting,
                                                            handleChange,
                                                            handleSubmit
                                                        }) => {
    const { t } = useLanguage();

    return (
        <div className="p-8 md:col-span-3 bg-gray-800">
            <h3 className="text-2xl font-serif mb-6 text-gray-100">{t.sendMessage}</h3>
            <form onSubmit={handleSubmit}>
                {status.submitted && (
                    <div className={`mb-6 p-4 rounded ${status.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                        {status.message}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">{t.name}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-200"
                            placeholder={t.name} // Clave plana (reutilizada)
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">{t.email}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-200"
                            placeholder={t.email}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm">{t.subject}</label> {/* Clave plana */}
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-200"
                        placeholder={t.subject}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">{t.message}</label> {/* Clave plana */}
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none text-gray-200"
                        placeholder={t.message}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md transition-all hover:translate-y-[-2px] disabled:bg-gray-600 disabled:hover:translate-y-0"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t.sending : t.send}
                </button>
            </form>
        </div>
    );
};
