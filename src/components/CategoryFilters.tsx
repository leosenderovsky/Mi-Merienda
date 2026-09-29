import React from 'react';
import { CATEGORIES, ProductCategory, Product } from '../products';

interface CategoryFiltersProps {
  selectedCategory: 'all' | ProductCategory;
  onSelectCategory: (category: 'all' | ProductCategory) => void;
  productsList: Product[];
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  productsList,
}) => {
  const getCount = (catId: 'all' | ProductCategory) => {
    if (catId === 'all') return productsList.length;
    return productsList.filter(p => p.categoría === catId).length;
  };

  return (
    <section id="catalogo" className="pt-2 pb-3 max-w-4xl mx-auto px-4 scroll-mt-28">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-xl sm:text-2xl text-[#422316] font-semibold">
          Nuestras Especialidades
        </h2>
        <span className="text-xs sm:text-sm text-[#7e5700] font-bold">
          {productsList.length} Variedades
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(cat => {
          const count = getCount(cat.id);
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#422316] text-white shadow-sm ring-1 ring-[#422316]'
                  : 'bg-[#f1ede7] text-[#514440] hover:bg-[#ebe8e2] active:scale-95'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`ml-1.5 text-[11px] opacity-80 ${isSelected ? 'text-[#ffdbce]' : 'text-[#83746f]'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
