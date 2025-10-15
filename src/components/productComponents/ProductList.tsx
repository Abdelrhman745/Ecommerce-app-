import * as React from 'react';
import { useState, useMemo, useEffect } from 'react'; 
import { Container, Row, Col, Spinner, Nav, Button, Pagination } from 'react-bootstrap'; 
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { type Product } from '../../types/Product';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { AnimatePresence , motion } from 'framer-motion';

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
      typeof item === 'object' && item !== null 
      && 'id' in item && typeof item.id === 'number'
      && 'category' in item && typeof item.category === 'string'
      && 'name' in item && typeof item.name === 'string'
      && 'description' in item && typeof item.description === 'string'
      && 'price' in item && typeof item.price === 'number'
  );
};

type CategoryKey = string;
type SortKey = 'popular' | 'recent' | 'price-asc' | 'price-desc'; 

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
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); 
  const [sortKey, setSortKey] = useState<SortKey>('popular'); 
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allProducts: Product[] = Array.isArray(products) ? products : []; 

  const maxPrice = useMemo(() => {
    return allProducts.reduce((max, product) => {
      const price = (product as any).price || 0; 
      return Math.max(max, price);
    }, 0);
  }, [allProducts]);

  useEffect(() => {
    if (maxPrice > 0 && priceRange[1] === 1000) {
        const initialMax = Math.ceil(maxPrice / 10) * 10;
        setPriceRange([0, initialMax]);
    }
  }, [maxPrice]);

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
    const [minPrice, maxPriceRange] = priceRange; 
    
    let finalFiltered = allProducts
      .filter(product => selectedCategory === 'all' || (product as any).category === selectedCategory)
      .filter(product => {
          const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
          if (lowerCaseSearchTerm === '') return true;
          const productName = (product as any).name || '';
          const productDescription = (product as any).description || '';
          return productName.toLowerCase().includes(lowerCaseSearchTerm) || 
                 productDescription.toLowerCase().includes(lowerCaseSearchTerm);
      })
      .filter(product => {
          const productPrice = (product as any).price || 0;
          return productPrice >= minPrice && productPrice <= maxPriceRange;
      });

    const sortedProducts = [...finalFiltered];

    sortedProducts.sort((a, b) => {
        const priceA = (a as any).price || 0;
        const priceB = (b as any).price || 0;
        const idA = (a as any).id || 0;
        const idB = (b as any).id || 0;

        switch (sortKey) {
            case 'price-asc':
                return priceA - priceB;
            case 'price-desc':
                return priceB - priceA;
            case 'recent':
                return idB - idA; 
            case 'popular':
            default:
                return 0; 
        }
    });

    return sortedProducts;
  }, [selectedCategory, allProducts, searchTerm, priceRange, sortKey]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, priceRange, sortKey]);

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

  const categoryStripColor = '#F9F7F0';

  const handleCategorySelect = (eventKey: string | null) => {
    if (eventKey) {
        setSelectedCategory(eventKey);
        setSearchTerm(''); 
        setPriceRange([0, Math.ceil(maxPrice / 10) * 10]); 
        setShowFilterPanel(false); 
    }
  };

  return (
    <>
      {/* Banner */}
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

      {/* Categories Nav */}
      <Nav
          className="product-categories-nav justify-content-between border-top border-bottom"
          onSelect={handleCategorySelect}
          activeKey={selectedCategory}
          style={{
            backgroundColor: categoryStripColor,
            '--bs-nav-link-padding-y': '1rem',
            marginBottom: '0',
            paddingLeft: '5%',
            paddingRight: '5%',
          } as React.CSSProperties}
        >
          <div className="d-flex overflow-auto align-items-center">
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
          </div>

          <div className="d-flex align-items-center flex-shrink-0">
            <div className="me-3"> 
              <Button 
                variant="outline-secondary" 
                className={`d-flex align-items-center ${showFilterPanel ? 'active' : ''}`} 
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                style={{ 
                    backgroundColor: showFilterPanel ? '#FFF' : categoryStripColor, 
                    borderColor: '#b0b0b0', 
                    color: '#333', 
                    padding: '0.375rem 0.75rem', 
                    fontSize: '0.875rem' 
                }}
              >
                <i className={`bi bi-funnel${showFilterPanel ? '-fill' : ''} me-2`}></i> 
                Filters
              </Button>
            </div>
             
            <div style={{ width: '180px', marginRight: '15px' }}>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder={`Search...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ backgroundColor: '#FFF', borderColor: '#CCC' }}
                />
            </div>
          </div>
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

        {/* Filter Panel */}
        {showFilterPanel && (
            <Row className="mb-5 justify-content-center">
                <Col xs={12} md={10} lg={8} className="px-4"> 
                    <div className="p-4 rounded border" style={{ backgroundColor: '#f8f9fa' }}>
                    </div>
                </Col>
            </Row>
        )}
        
        <div className="text-center mb-4"> 
            <p className="small text-muted mb-0">
                Currently showing <strong>{filteredProducts.length}</strong> products.
            </p>
        </div>

        {/* Product Cards */}
        {paginatedProducts.length === 0 ? (
            <div className="text-center py-5">
                <p className="lead text-secondary">
                  No products found based on your selection criteria.
                </p>
            </div>
        ) : (
            <Row xs={2} sm={2} md={4} className="g-5">
                {paginatedProducts.map((product) => (
                    <Col key={product.id} className="product-list-item d-flex justify-content-center">
                      <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              />
        <AnimatePresence mode="wait">
        {[...Array(totalPages)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ display: "inline-block" }}
          >
            <Pagination.Item 
              active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          </motion.div>
        ))}
      </AnimatePresence>
              <Pagination.Next 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              />
            </Pagination>
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductList;
