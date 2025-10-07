import * as React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Heart } from 'react-bootstrap-icons';
import { type Product} from '../../types/custom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isMasque = product.isNightMasque;

  const handleAddToCart = () => {
    console.log(`Product ${product.name} added to cart (Redux action here)`);
  };

  return (
    <>
      <Card
        className={`product-card hover-card ${isMasque ? 'masque-card' : ''}`}
        style={{
          width: '331.75px',
          height: '586px',
          margin: 0,
          padding: 0,
          border: 'none',
          borderRadius: 0,
          transition: 'background-color 0.3s ease, transform 0.3s ease',
        }}
      >
        {/* الصورة + الأيقونة */}
        <div
          className="product-image-area position-relative d-flex justify-content-center pt-4"
          style={{
            width: '100%',
            height: '288px',
            padding: '16px',
            boxSizing: 'border-box',
          }}
        >
          {(product.isBestseller || product.isNewFormula) && (
            <span
              className={`badge-pill position-absolute top-0 start-0 small fw-semibold text-dark ${
                product.isBestseller ? 'bestseller-badge' : 'new-formula-badge'
              }`}
            >
              {product.isBestseller ? 'BESTSELLER' : 'NEW FORMULA'}
            </span>
          )}

          <div
            className="image-placeholder d-flex justify-content-center align-items-center"
            style={{ width: '100%', height: '100%' }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          <Heart
            className="favorite-icon position-absolute end-0 top-0 mt-3 me-3 text-secondary"
            size={20}
          />
        </div>

        {/* معلومات المنتج */}
        <Card.Body
          className="d-flex flex-column text-center px-2 pb-0 product-body-content"
          style={{
            width: '100%',
            paddingTop: '0',
            paddingBottom: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <Card.Title
            className="product-title fw-semibold"
            style={{
              fontSize: '1rem',
              lineHeight: '1.2rem',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.name}
          </Card.Title>

          <Card.Text
            className="product-description small text-secondary"
            style={{
              fontSize: '0.8rem',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.description}
          </Card.Text>

          {/* السعر */}
          <div
            className="product-price-section"
            style={{
              marginTop: '24px',
              height: '62px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <p
              className="product-size small text-secondary mb-1"
              style={{
                fontSize: '0.75rem',
                margin: 0,
                opacity: 0.8,
              }}
            >
              {product.size}
            </p>

            <p
              className="product-price h5 fw-medium text-dark"
              style={{
                fontSize: '1rem',
                margin: 0,
              }}
            >
              ${product.price}
            </p>
          </div>
        </Card.Body>

        {/* زر السلة */}
        <Card.Footer
          className={`product-footer p-0 border-0 add-to-cart-container ${
            isMasque ? 'd-block' : ''
          }`}
          style={{
            opacity: 0,
            transition: 'opacity 0.3s ease',
            height: '0px',
            overflow: 'hidden',
          }}
        >
          <Button
            variant="dark"
            className="add-to-cart-btn w-100"
            onClick={handleAddToCart}
            style={{
              padding: '0.75rem 0',
            }}
          >
            Add to your cart
          </Button>
        </Card.Footer>
      </Card>

      {/* استايل Hover و Responsive */}
      <style>{`
        /* 1. تأثير التمرير العام على الكارد (للشاشات الكبيرة) */
        .hover-card:hover {
          background-color: #F2F3EC;
          transform: scale(1.02);
        }

        /* إظهار الزر عند التمرير على الكارد في الشاشات الكبيرة */
        @media (min-width: 577px) {
            .hover-card:hover .add-to-cart-container {
                opacity: 1 !important;
                height: auto !important;
            }
        }
        
        .add-to-cart-btn {
          border-radius: 0 !important;
        }

        /* 2. تنسيقات الشاشات الصغيرة (max-width: 576px) */
        @media (max-width: 576px) {
          /* أبعاد الكارد المطلوبة */
          .product-card {
            width: 159.5px !important;
            height: 411px !important;
            margin: 0 !important;
          }

          /* تعديل محتويات البطاقة الداخلية */
          .product-image-area {
            height: 180px !important;
            padding-top: 8px !important;
            padding-bottom: 0 !important;
          }
          .product-price-section {
            margin-top: 12px !important;
            height: 40px !important; 
          }
          .product-title, .product-price {
            font-size: 0.9rem !important;
          }
          .product-description, .product-size {
            font-size: 0.75rem !important;
          }

          /* إظهار زر السلة دائمًا في شاشات الموبايل */
          .add-to-cart-container {
            opacity: 1 !important;
            height: auto !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          /* أبعاد الزر المطلوبة وتنسيقه الأساسي (أبيض بحد أسود) */
          .add-to-cart-btn {
            width: 159.5px !important;
            height: 62px !important;
            padding: 19px 23px !important;
            border: 1px solid black !important;
            background-color: white !important;
            color: black !important;
            font-size: 0.75rem !important;
            font-weight: 500;
            text-transform: uppercase;
            transition: all 0.3s ease !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }
          
          /*  التعديل المطلوب: تطبيق تأثير Hover على الزر عند التمرير على الكارد */
          .product-card:hover .add-to-cart-btn {
            background-color: black !important;
            color: white !important;
            border-color: black !important;
          }

          /* إلغاء تأثير Hover على الزر نفسه لمنع التعارض */
          .add-to-cart-btn:hover {
          }
        }
      `}</style>
    </>
  );
};

export default ProductCard;