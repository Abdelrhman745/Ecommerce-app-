import React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ProductCard from '../../../components/productComponents/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { type Product } from '../../../types/Product';

interface RelatedProductsProps {
  category?: string;
  currentProductId?: number | string;
}

const API_URL = 'https://skincare-api-psi.vercel.app/api/data';

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch data from the server'); 
  }
  const data = await response.json();
  if (data && Array.isArray(data.data)) return data.data as Product[];
  return [];
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, currentProductId }) => {
  const { data: products, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ['skincareProducts'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status" variant="dark">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2 text-secondary">Loading products...</p>
      </Container>
    );
  }

  if (isError) return <p>An error occurred while loading products.</p>;

  const relatedProducts = products
    ?.filter(
      (product) =>
        product.category === category && product.id !== currentProductId
    )
    .slice(0, 4);

  if (!relatedProducts?.length) {
    return <p className="text-center text-muted">No related products found.</p>;
  }

  return (
    <section className="mt-5 py-4">
      <Container fluid className="px-2 px-sm-4">
        <h6 style={{ fontWeight: "lighter" }}>Suggested</h6>
        <h4 style={{ fontWeight: "normal" }}>Combine With</h4>
        <p style={{ fontSize: "14px", color: "grey" }}>
          You may also like the following products
        </p>
        <Row className="justify-content-center">
          {relatedProducts.map((product) => (
            <Col
              key={product.id}
              xs={6}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              className="mb-4"
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default RelatedProducts;
