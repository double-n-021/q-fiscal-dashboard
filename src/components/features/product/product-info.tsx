import Link from 'next/link';
import { Truck, ShieldCheck } from 'lucide-react';
import { PriceDisplay } from '@/components/ui/price-display';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Product } from '@/types';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <Link 
          href={`/products?category=${product.category.slug}`} 
          className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
        >
          {product.category.name}
        </Link>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        {product.name}
      </h1>
      
      <div className="mb-8">
        <PriceDisplay 
          price={product.price}
          discountedPrice={product.discountedPrice}
          hasDiscount={product.hasDiscount}
          showPrice={product.config.showPrice}
          size="lg"
        />
      </div>

      <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 border-y border-slate-200 dark:border-slate-800 py-6">
        {product.description}
      </p>

      {/* Product Specifics Accordion */}
      <div className="mb-8">
        <Accordion type="single" defaultValue="general">
          <AccordionItem value="general">
            <AccordionTrigger>General Information</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm">
                <li><span className="font-semibold">Brand:</span> {product.specifics.brand}</li>
                <li><span className="font-semibold">Origin:</span> {product.specifics.origin}</li>
                <li><span className="font-semibold">Warranty:</span> {product.specifics.warranty}</li>
                {product.config.showStock && (
                  <li>
                    <span className="font-semibold">Availability:</span> 
                    {product.stock > 0 ? (
                      <span className="text-green-600 ml-1">{product.stock} in stock</span>
                    ) : (
                      <span className="text-red-600 ml-1">Out of stock</span>
                    )}
                  </li>
                )}
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="specs">
            <AccordionTrigger>Detailed Specifications</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm">
                {Object.entries(product.specifics.specs).map(([key, value]) => (
                  <li key={key} className="flex flex-col sm:flex-row sm:items-center py-1 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <span className="font-semibold sm:w-1/3 text-slate-900 dark:text-slate-300">{key}</span>
                    <span className="sm:w-2/3">{value}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Features list */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 shadow-sm">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">Free Nationwide Delivery</h4>
            <p className="text-sm text-slate-500">For orders above $100</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">Secure Transaction</h4>
            <p className="text-sm text-slate-500">256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
}
