import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ProductImage } from '@/types';

interface ProductGalleryProps {
  name: string;
  images: ProductImage[];
  hasDiscount?: boolean;
  discount?: number;
}

export function ProductGallery({
  name,
  images,
  hasDiscount,
  discount,
}: ProductGalleryProps) {
  const mainImage = images[0]?.imageUrl || '/images/products/placeholder.svg';

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-800">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover"
          priority
        />
        {hasDiscount && discount && (
          <Badge variant="danger" className="absolute top-4 left-4 shadow-sm text-sm px-3 py-1">
            -{discount}%
          </Badge>
        )}
      </div>
      
      {/* Thumbnail row placeholder */}
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer ${i === 1 ? 'border-primary-500' : 'border-slate-200 dark:border-slate-800'}`}
          >
            <Image 
              src={images[i - 1]?.imageUrl || '/images/products/placeholder.svg'} 
              alt={`Thumbnail ${i}`} 
              fill 
              className="object-cover opacity-80 hover:opacity-100 transition-opacity" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
