import React from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, changeCartQuantity } from "../../Redux/CartSlice";
import { RootState } from "../../Redux/Store";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(18px);}
  to   { opacity: 1; transform: none; }
`;

const CenterContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(110deg, #f7f8fa 12%, #eef0f3 98%);
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
  background: linear-gradient(98deg, #f3f4f7 60%, #f9fafb 100%);
  box-shadow: 0 6px 34px 0 rgba(180, 183, 189, 0.15);
  border-radius: 24px;
  padding: 24px 58px;
  align-self: center;
`;

const CartHeading = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: #2e3142;
  margin: 0;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 12px #e9ebf18c;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CartContainer = styled.div`
  width: 100%;
  max-width: 900px;
  align-self: center;
  background: #fff;
  border-radius: 26px;
  border: 1.8px solid #e2e4e8;
  box-shadow: 0 8px 45px 0 rgba(177, 180, 189, 0.11);
  padding: 58px 58px 46px 58px;
  display: flex;
  flex-direction: column;
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
    border-radius: 15px;
    object-fit: cover;
    background: #f7f8fa;
    border: 1.5px solid #e3e5ea;
    box-shadow: 0 0px 15px 0 rgba(200, 203, 209, 0.07);
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-size: 1.15rem;
    font-weight: 600;
    color: #2d3351;
    margin-bottom: 4px;
    letter-spacing: 0.02em;
  }
  .price {
    font-size: 1.03rem;
    color: #9da2b0;
    margin-bottom: 2px;
  }
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  input {
    width: 50px;
    text-align: center;
    margin-right: 10px;
    border-radius: 8px;
    border: 1.4px solid #eceef2;
    background: #f8f9fb;
    color: #636c7d;
    font-size: 1.12rem;
    font-weight: 500;
    padding: 7px 9px;
    transition: border 0.18s, box-shadow 0.18s;
    box-shadow: 0 1px 8px 0 rgba(210, 215, 220, 0.07);
    &:focus {
      border: 1.6px solid #bdc6db;
      outline: none;
      background: #eff2f7;
      box-shadow: 0 0 15px 0 rgba(190, 197, 214, 0.12);
    }
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #e2e5ea, #eef0f3 86%, #f7f8fa 100%);
  color: #525a6b;
  border: none;
  padding: 8px 19px;
  border-radius: 9px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  margin-left: -5px;
  box-shadow: 0 1px 8px 0 rgba(210, 214, 221, 0.11);
  transition: background 0.16s, color 0.12s, box-shadow 0.17s;
  &:hover {
    background: linear-gradient(88deg, #e4e7ee 5%, #eaeff2 95%);
    color: #2c2e39;
    box-shadow: 0 6px 22px #e8eaf2;
  }
`;

const CheckoutButton = styled(Button)`
  margin-top: 16px;
  padding: 16px 54px;
  font-size: 1.17rem;
  background: linear-gradient(95deg, #e2e6ee 10%, #f2f3f6 90%);
  color: #3e4150;
  border-radius: 14px;
  font-weight: 600;
  box-shadow: 0 5px 24px #e2e5ef81;
  transition: background 0.19s, color 0.13s, box-shadow 0.17s;
  &:hover {
    background: linear-gradient(95deg, #dfe5f0 0%, #e9ecf3 99%);
    color: #22232f;
    box-shadow: 0 14px 54px #e3e6f171;
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 96px 1fr 126px 104px;
  gap: 32px;
  align-items: center;
  margin-bottom: 27px;
  border-bottom: 1.1px solid #e6e8ec;
  padding-bottom: 24px;
  background: #fff;
  animation: ${fadeIn} 0.52s cubic-bezier(0.17, 1, 0.34, 1);
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 950px) {
    grid-template-columns: 70px 1fr 90px 70px;
    gap: 14px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 60px 1fr;
    grid-template-rows: auto auto auto;
    gap: 10px 8px;
    padding-bottom: 16px;
  }

  @media (max-width: 500px) {
    grid-template-columns: 44px 1fr;
    gap: 5px 4px;
    padding-bottom: 10px;
    font-size: 0.92em;
    ${ImgBox} img {
      width: 33px;
      height: 33px;
      border-radius: 7px;
    }
    ${Button}, ${CheckoutButton} {
      font-size: 0.83em;
      padding: 4.5px 5.5px;
    }
    ${QuantitySection} input {
      width: 24px;
      font-size: 0.82em;
      padding: 2px 3px;
    }
    ${Details} .name {
      font-size: 0.98em;
    }
    ${Details} .price {
      font-size: 0.91em;
    }
  }
`;

const TotalSection = styled.div`
  margin-top: 32px;
  padding-top: 36px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;
  font-size: 1.13rem;
  color: #7e8492;
`;

const TotalLabel = styled.span`
  font-size: 1.19rem;
  color: #7d8393;
  margin-right: 17px;
  letter-spacing: 0.02em;
`;

const TotalValue = styled.span`
  font-size: 2.2rem;
  color: #323741;
  font-weight: 700;
`;

const EmptyCart = styled.div`
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8c94a9;
  font-size: 1.22rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  h3 {
    color: #586075;
    font-weight: 700;
    font-size: 1.24em;
    margin-bottom: 15px;
  }
`;

// ====== Component ======
const CartSection: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(changeCartQuantity({ id, quantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CenterContainer>
      <HeadingBg>
        <CartHeading>
          Your Shopping Cart
          <svg width="28" height="28" fill="#dde2eb" viewBox="0 0 20 20">
            <path d="M2.5 3h1.12l.34 1.2 2.7 8.79a2 2 0 0 0 1.9 1.42h6.86a2 2 0 0 0 1.952-1.684l1.02-5.54A1 1 0 0 0 15.56 6H6.21l-.56-2H2.5zM7 17.5A1.25 1.25 0 1 0 7 15a1.25 1.25 0 0 0 0 2.5zm7 0A1.25 1.25 0 1 0 14 15a1.25 1.25 0 0 0 0 2.5z" />
          </svg>
        </CartHeading>
      </HeadingBg>

      <CartContainer>
        {cartItems.length === 0 ? (
          <EmptyCart>
            <h3>Your cart is empty.</h3>
            <Button
              type="button"
              style={{ marginTop: 14 }}
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </EmptyCart>
        ) : (
          <>
            {cartItems.map((item, idx) => (
              <CartItem
                key={item.id}
                style={{ animationDelay: `${idx * 53}ms` }}
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
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  />
                  <Button onClick={() => handleRemove(item.id)}>Remove</Button>
                </QuantitySection>
                <div
                  style={{
                    color: "#545a65",
                    fontWeight: 600,
                    fontSize: "1.16rem",
                    textAlign: "center",
                  }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </CartItem>
            ))}
            <TotalSection>
              <TotalLabel>Total :</TotalLabel>
              <TotalValue>${totalPrice.toFixed(2)}</TotalValue>
            </TotalSection>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <CheckoutButton onClick={() => navigate("/checkout")}>
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
