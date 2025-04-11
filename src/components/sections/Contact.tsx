import { useState, FormEvent } from 'react';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaWhatsapp, 
  FaTiktok,
  FaFacebook
} from 'react-icons/fa';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: React.ReactElement;
  value: string;
  link?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo: ContactInfo[] = [
    {
      icon: <FaMapMarkerAlt size={24} />,
      value: 'Bogotá, Colombia'
    },
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
          message: '¡Tu mensaje ha sido enviado! Gracias.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus({
          submitted: true,
          success: false,
          message: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.'
        });
      }
    } catch (error) {
      setStatus({
        submitted: true,
        success: false,
        message: 'Hubo un error de conexión. Por favor, inténtalo de nuevo.'
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4 text-gray-100">Contacto</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">¿Tienes alguna pregunta o propuesta? No dudes en contactarme.</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-6xl mx-auto border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white md:col-span-2">
              <h3 className="text-2xl font-serif mb-8 text-gray-100">Contáctame</h3>
              
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                    title={info.value}
                  >
                    {info.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="p-8 md:col-span-3 bg-gray-800">
              <h3 className="text-2xl font-serif mb-6 text-gray-100">Envíame un mensaje</h3>
              
              <form onSubmit={handleSubmit}>
                {status.submitted && (
                  <div className={`mb-6 p-4 rounded ${status.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {status.message}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-200"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-200"
                      placeholder="Tu email"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm">Asunto</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-200"
                    placeholder="Asunto"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none text-gray-200"
                    placeholder="Tu mensaje"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md transition-all hover:translate-y-[-2px] disabled:bg-gray-600 disabled:hover:translate-y-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 