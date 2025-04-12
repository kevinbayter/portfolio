import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

type FilterCategory = 'all' | 'branding' | 'mockups' | 'uikits' | 'webdesign' | 'photography';

interface PortfolioItem {
  id: number;
  image: string;
  categories: FilterCategory[];
  alt: string;
}

const Portfolio = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      image: '/src/assets/images/lifeStyle/00.webp',
      categories: ['all', 'branding', 'uikits', 'webdesign'],
      alt: 'Portfolio item 1'
    },
    {
      id: 2,
      image: '/src/assets/images/lifeStyle/01.webp',
      categories: ['all', 'mockups', 'uikits', 'photography'],
      alt: 'Portfolio item 2'
    },
    {
      id: 3,
      image: '/src/assets/images/lifeStyle/02.webp',
      categories: ['all', 'branding', 'webdesign', 'photography'],
      alt: 'Portfolio item 3'
    },
    {
      id: 4,
      image: '/src/assets/images/lifeStyle/03.webp',
      categories: ['all', 'mockups', 'webdesign', 'photography'],
      alt: 'Portfolio item 4'
    },
    {
      id: 5,
      image: '/src/assets/images/lifeStyle/04.webp',
      categories: ['all', 'branding', 'uikits', 'photography'],
      alt: 'Portfolio item 5'
    },
    {
      id: 6,
      image: '/src/assets/images/lifeStyle/05.webp',
      categories: ['all', 'mockups', 'uikits', 'webdesign'],
      alt: 'Portfolio item 6'
    }
  ];

  const filters = [
    { id: 'all', label: t.all },
    { id: 'branding', label: t.branding },
    { id: 'mockups', label: t.beauty },
    { id: 'uikits', label: t.nature },
    { id: 'webdesign', label: t.lifestyle },
    { id: 'photography', label: t.photography }
  ];

  const filteredItems = portfolioItems.filter(item => 
    activeFilter === 'all' ? true : item.categories.includes(activeFilter)
  );

  return (
    <section id="portfolio" className="py-20 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif mb-12 text-gray-100">{t.myPortfolio}</h2>
        
        <div className="mb-10">
          <ul className="flex flex-wrap justify-center gap-4">
            {filters.map(filter => (
              <li key={filter.id}>
                <button
                  className={`py-2 px-4 rounded transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveFilter(filter.id as FilterCategory)}
                >
                  {filter.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="portfolio-item overflow-hidden rounded-lg shadow-xl border border-gray-700">
              <a
                href={item.image}
                className="block relative group"
                data-lightbox="portfolio"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-6 py-3 bg-black/50 rounded-lg">
                    {t.viewImage}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 