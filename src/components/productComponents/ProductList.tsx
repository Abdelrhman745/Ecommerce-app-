import * as React from 'react';
import { useState, useMemo } from 'react';
import { Container, Row, Col, Spinner, Image, Nav } from 'react-bootstrap';
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
  return Array.isArray(data) && data.every(item => 
      typeof item === 'object' && item !== null && 'id' in item && 'category' in item && typeof item.category === 'string'
  );
};

type CategoryKey = string;

const toDisplayName = (key: CategoryKey): string => {
    if (key === 'all') return 'Shop All';
    return key
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace(/ and /g, ' & ');
};


const ProductList: React.FC = () => {
  const { data: products, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ['skincareProductsList'],
    queryFn: fetchProducts,
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');

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

  const allProducts: Product[] = Array.isArray(products) ? products : [];

  const dynamicCategories: CategoryKey[] = useMemo(() => {
    const categorySet = new Set<CategoryKey>();
    categorySet.add('all');

    allProducts.forEach(product => {
      const category = (product as any).category;
      if (category && typeof category === 'string') {
        categorySet.add(category);
      }
    });

    return Array.from(categorySet);
  }, [allProducts]); 

  const filteredProducts: Product[] = useMemo(() => {
    if (selectedCategory === 'all') {
      return allProducts;
    }
    return allProducts.filter(product => (product as any).category === selectedCategory);
  }, [selectedCategory, allProducts]);


  const categoryStripColor = '#F9F7F0';

  const handleCategorySelect = (eventKey: string | null) => {
    if (eventKey) {
        setSelectedCategory(eventKey);
    }
  };


  return (
    <>
      <div
        className="banner-image-container mt-n5"
        style={{
          backgroundImage: `url(src/assets/images/products-banner.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '250px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '5%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: '400px', zIndex: 2 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px', color: '#FFF' }}>
            Skin Care
          </h1>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#FFF' }}>
            The skin is constantly changing, influenced by the environment, lifestyle, and diet. Our range is crafted
            with this in consideration, addressing various preferences and needs to help you achieve optimal
            skin health.
          </p>
        </div>
      </div>

      <Nav
          className="product-categories-nav justify-content-start border-top border-bottom"
          onSelect={handleCategorySelect}
          activeKey={selectedCategory}
          style={{
            backgroundColor: categoryStripColor,
            '--bs-nav-link-padding-y': '1rem',
            marginBottom: '0',
            paddingLeft: '5%',
            paddingRight: '5%',
            borderTopColor: '#e0e0e0',
            borderBottomColor: '#e0e0e0',
          } as React.CSSProperties}
        >
          {dynamicCategories.map((key) => (
              <Nav.Item key={key}>
                  <Nav.Link
                      eventKey={key} 
                      className="text-dark"
                      active={selectedCategory === key}
                      style={{
                          fontWeight: '500',
                          borderBottom: selectedCategory === key ? '2px solid black' : '2px solid transparent'
                      }}
                  >
                      {toDisplayName(key)}
                  </Nav.Link>
              </Nav.Item>
          ))}
        </Nav>

      <Container className="product-list-container px-0">

        <header className="mb-5 text-center pt-5">
          <p className="text-uppercase small text-secondary mb-2" style={{ letterSpacing: '0.2em' }}>
            Revered Formulations
          </p>
          <h1 className="display-5 fw-normal">
            {toDisplayName(selectedCategory)} Essentials
          </h1>
        </header>

        {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
                <p className="lead text-secondary">No products found in the "{toDisplayName(selectedCategory)}" category.</p>
            </div>
        ) : (
            <Row xs={2} sm={2} md={4} className="g-5">
                {filteredProducts.map((product) => (
                    <Col
                      key={product.id}
                      className="product-list-item d-flex justify-content-center"
                    >
                      <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        )}
      </Container>
    </>
  );
};

export default ProductList;