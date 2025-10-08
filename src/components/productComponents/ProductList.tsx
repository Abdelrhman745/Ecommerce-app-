import * as React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap'; 
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard'; 
import { type Product } from '../../types/Product'; 

const API_URL = 'https://skincare-api-psi.vercel.app/api/data';

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch data from the server');
  }
  const data = await response.json();
  if (ArrayOfProducts(data)) return data as Product[];
  if (data && typeof data === 'object') {
    const values = Object.values(data);
    for (const value of values) {
      if (ArrayOfProducts(value)) return value as Product[];
    }
  }
  return [];
};

const ArrayOfProducts = (data: any): data is Product[] => {
  return Array.isArray(data) && data.every(item => typeof item === 'object' && item !== null && 'id' in item);
};


const ProductList: React.FC = () => {
  const { data: products, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ['skincareProductsList'], 
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="dark">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2 text-secondary">Loading all products...</p>
      </div>
    );
  }

  if (isError) return <p className="text-danger text-center py-5">An error occurred while loading products.</p>;

  const productList: Product[] = Array.isArray(products) ? products : [];

  return (
    <Container className="product-list-container px-0">
      
      <header className="mb-5 text-center">
          <p className="text-uppercase small text-secondary mb-2" style={{ letterSpacing: '0.2em' }}>
              Revered Formulations
          </p>
          <h1 className="display-5 fw-normal">Essentials for Every Skincare</h1>
      </header>
      
      <Row xs={2} sm={2} md={4} className="g-5"> 
        {productList.map((product) => ( 
          <Col 
            key={product.id}
            className="product-list-item d-flex justify-content-center"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
