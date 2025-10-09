import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import ProductCard from '../../../components/productComponents/ProductCard'
import { useQuery } from '@tanstack/react-query';
import { type Product } from '../../../types/Product';

const API_URL = 'https://skincare-api-psi.vercel.app/api/data';

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    // Failure in fetching data from the server
    throw new Error('Failed to fetch data from the server'); 
  }
  const data = await response.json();
  if (Array.isArray(data)) return data as Product[];
  if (data && typeof data === 'object') {
    const values = Object.values(data);
    for (const value of values) {
      if (Array.isArray(value)) return value as Product[];
    }
  }
  return [];
};

const SupremeSkinFortification: React.FC = () => {
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

  const productList: Product[] = Array.isArray(products) ? products : [];
  
  const limitedProducts = productList.slice(0,3);

  return (
  <section className="mt-5 py-4">
  <Container fluid className="px-2 px-sm-4">
    <h6 style={{ fontWeight: "lighter" }}>Suggested</h6>
    <h4 style={{ fontWeight: "normal" }}>Combine With</h4>
    <p style={{ fontSize: "14px", color: "grey" }}>
      You may also like the following products
    </p>
{/* 
    <Row className="justify-content-center gx-2 gy-3">
      <Col xs={6} sm={6} md={3} lg={3}>
        <ProductCard product={product}  />
      </Col>
      <Col xs={6} sm={6} md={3} lg={3}>
        <ProductCard />
      </Col>
      <Col xs={6} sm={6} md={3} lg={3}>
        <ProductCard />
      </Col>
      <Col xs={6} sm={6} md={3} lg={3}>
        <ProductCard />
      </Col>
    </Row> */}
            <Row className="flex-nowrap justify-content-center">
          {limitedProducts.map((product) => ( 
            <Col
              key={product.id}
              xs="auto"
              style={{ flex: '0 0 auto' }}
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
  </Container>
</section>

  );

}

export default function RelatedProducts() {
  return <SupremeSkinFortification />;
}
