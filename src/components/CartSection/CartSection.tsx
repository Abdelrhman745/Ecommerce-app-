import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, changeCartQuantity } from "../../Redux/CartSlice";
import { RootState } from "../../Redux/Store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CenterContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #f7f8fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

const HeadingBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 340px;
  margin-bottom: 38px;
  background: #ede9e2;
  box-shadow: 0 4px 18px rgba(210, 206, 196, 0.4);
  border-radius: 20px;
  padding: 20px 56px;
  align-self: center;
`;

const CartHeading = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.1rem;
  font-weight: 600;
  color: #1e1e1e;
  margin: 0;
  letter-spacing: 0.01em;
`;

const CartContainer = styled.div`
  width: 100%;
  max-width: 900px;
  align-self: center;
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #f1ede6;
  box-shadow: 0 8px 28px rgba(218, 210, 198, 0.2);
  padding: 50px 44px 40px 44px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  @media (max-width: 640px) {
    padding: 32px 7vw;
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 68px;
    height: 68px;
    border-radius: 14px;
    object-fit: cover;
    background: #fdfdfd;
    border: 1px solid #e9e5df;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-size: 1.12rem;
    font-weight: 600;
    color: #111;
    margin-bottom: 4px;
  }
  .price {
    font-size: 1rem;
    color: #555;
  }
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  input {
    width: 80px;
    text-align: center;
    border-radius: 8px;
    border: 1.4px solid #dedede;
    background: #fafafa;
    color: #111;
    font-size: 1.05rem;
    font-weight: 500;
    padding: 6px 9px;
    &:focus {
      border: 1.5px solid #bdbdbd;
      outline: none;
      background: #f0f0f0;
    }
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  background: linear-gradient(90deg, #e4e4e4, #f3f3f3 86%, #ffffff 100%);
  color: #1e1e1e;
  border: none;
  padding: 8px 19px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  margin-left: -5px;

  &:hover {
    background: linear-gradient(88deg, #f0f0f0 5%, #ffffff 95%);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

const CheckoutButton = styled(Button)`
  margin-top: 16px;
  padding: 15px 50px;
  font-size: 1.12rem;
  background: linear-gradient(95deg, #e6e6e6 10%, #fcfcfc 90%);
  color: #000;
  border-radius: 12px;
  font-weight: 600;
`;

const WarningMessage = styled.div`
  color: #b91c1c;
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 15px;
  font-size: 0.95rem;
  text-align: center;
  font-weight: 500;
`;

const TotalSection = styled.div`
  margin-top: 32px;
  padding-top: 36px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
  color: #222;
`;

const TotalLabel = styled.span`
  font-size: 1.15rem;
  color: #333;
  margin-right: 17px;
`;

const TotalValue = styled.span`
  font-size: 2.05rem;
  color: #000;
  font-weight: 700;
  margin-right: 25px;
`;

const EmptyCart = styled.div`
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #404040;
  font-size: 1.1rem;
  font-weight: 500;
`;

const CartSection: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [exceedsStock, setExceedsStock] = useState(false);

  useEffect(() => {
    const exceeds = cartItems.some(
      (item: any) => item.quantity > (item.maxStock ?? Infinity)
    );
    setExceedsStock(exceeds);
  }, [cartItems]);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (
    id: number,
    quantity: number,
    maxStock?: number
  ) => {
    if (quantity < 1) return;
    if (maxStock !== undefined && quantity > maxStock) {
      toast.error(`Only ${maxStock} items in stock.`);
      // ضبط الكمية على الحد الأعلى مباشرة
      dispatch(changeCartQuantity({ id, quantity: maxStock }));
      return;
    }
    dispatch(changeCartQuantity({ id, quantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const hasExceeds = cartItems.some(
      (item: any) => item.quantity > (item.maxStock ?? Infinity)
    );
    if (hasExceeds) {
      toast.error(
        "Some items exceed available stock. Please adjust quantities."
      );
      return;
    }
    navigate("/checkout");
  };

  return (
    <CenterContainer>
      <HeadingBg>
        <CartHeading>Your Shopping Cart</CartHeading>
      </HeadingBg>

      <CartContainer>
        {cartItems.length === 0 ? (
          <EmptyCart>
            <h3>Your cart is empty.</h3>
            <Button onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
          </EmptyCart>
        ) : (
          <>
            {cartItems.map((item: any) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "96px 1fr 126px 104px",
                  gap: "28px",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >
                <ImgBox>
                  <img src={item.image} alt={item.name} />
                </ImgBox>
                <Details>
                  <span className="name">{item.name}</span>
                  <span className="price">${item.price.toFixed(2)}</span>
                </Details>
                <QuantitySection>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        Number(e.target.value),
                        item.maxStock
                      )
                    }
                  />
                  <Button onClick={() => handleRemove(item.id)}>Remove</Button>
                </QuantitySection>
                <div
                  style={{
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "1.12rem",
                    textAlign: "center",
                  }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <TotalSection>
              <TotalLabel>Total:</TotalLabel>
              <TotalValue>${totalPrice.toFixed(2)}</TotalValue>
            </TotalSection>

            {exceedsStock && (
              <WarningMessage>
                Some items exceed available stock. Please adjust your cart
                before proceeding.
              </WarningMessage>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <CheckoutButton onClick={handleCheckout} disabled={exceedsStock}>
                Proceed to Checkout
              </CheckoutButton>
            </div>
          </>
        )}
      </CartContainer>
    </CenterContainer>
  );
};

export default CartSection;
