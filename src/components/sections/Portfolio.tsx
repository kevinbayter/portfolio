import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import ImageGallery from '../common/ImageGallery';
import img00 from '../../assets/images/lifeStyle/00.webp';
import img01 from '../../assets/images/lifeStyle/01.webp';
import img02 from '../../assets/images/lifeStyle/02.webp';
import img03 from '../../assets/images/lifeStyle/03.webp';
import img04 from '../../assets/images/lifeStyle/04.webp';
import img05 from '../../assets/images/lifeStyle/05.webp';

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
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      image: img00,
      categories: ['all', 'branding', 'uikits', 'webdesign'],
      alt: 'Portfolio item 1'
    },
    {
      id: 2,
      image: img01,
      categories: ['all', 'mockups', 'uikits', 'photography'],
      alt: 'Portfolio item 2'
    },
    {
      id: 3,
      image: img02,
      categories: ['all', 'branding', 'webdesign', 'photography'],
      alt: 'Portfolio item 3'
    },
    {
      id: 4,
      image: img03,
      categories: ['all', 'mockups', 'webdesign', 'photography'],
      alt: 'Portfolio item 4'
    },
    {
      id: 5,
      image: img04,
      categories: ['all', 'branding', 'uikits', 'photography'],
      alt: 'Portfolio item 5'
    },
    {
      id: 6,
      image: img05,
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

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setGalleryOpen(true);
  };

  const galleryImages = filteredItems.map(item => ({
    src: item.image,
    alt: item.alt
  }));

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-xl border border-gray-700">
              <button
                className="block w-full h-full"
                onClick={() => openGallery(index)}
              >
                <div className="relative aspect-square">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-6 py-3 bg-black/50 rounded-lg">
                      {t.viewImage}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <ImageGallery
        images={galleryImages}
        isOpen={galleryOpen}
        initialIndex={selectedImageIndex}
        onClose={() => setGalleryOpen(false)}
      />
    </section>
  );
};

export default Portfolio;