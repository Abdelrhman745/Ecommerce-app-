import React, { useState } from 'react';
import ProducrDetailsSection from './components/ProducrDetailsSection';
import SkinRoutine from './components/SkinRoutine';
import RelatedProducts from './components/RelatedProducts';
import { Product } from '../../types/Product';

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<Product | null>(null);

  return (
    <>
      <ProducrDetailsSection setProduct={setProduct}/>
      <SkinRoutine />
      {product && (
        <RelatedProducts category={product.category} currentProductId={product.id} />
      )}
    </>
  );
}
