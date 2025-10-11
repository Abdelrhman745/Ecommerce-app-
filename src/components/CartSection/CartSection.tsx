import React from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, changeCartQuantity } from "../../Redux/CartSlice";
import { RootState } from "../../Redux/Store";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(18px);}
  to   { opacity: 1; transform: none; }
`;

const CenterContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(110deg, #fcf9f3 12%, #f8f5ee 98%);
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
  background: linear-gradient(98deg, #f5ede0 60%, #fbf8f2 100%);
  box-shadow: 0 6px 34px 0 rgba(210, 200, 170, 0.15);
  border-radius: 24px;
  padding: 24px 58px;
  align-self: center;
`;

const CartHeading = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: #392b17;
  margin: 0;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 12px #efe7da8c;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CartContainer = styled.div`
  width: 100%;
  max-width: 900px;
  align-self: center;
  background: #fffefc;
  border-radius: 26px;
  border: 1.8px solid #eadfc7;
  box-shadow: 0 8px 45px 0 rgba(181, 164, 140, 0.14);
  padding: 58px 58px 46px 58px;
  display: flex;
  flex-direction: column;
  @media (max-width: 640px) {
    padding: 32px 7vw;
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 96px 1fr 126px 104px;
  gap: 32px;
  align-items: center;
  margin-bottom: 27px;
  border-bottom: 1.1px solid #f5ede2;
  padding-bottom: 24px;
  background: #fff;
  animation: ${fadeIn} 0.52s cubic-bezier(0.17, 1, 0.34, 1);
  &:last-child {
    border-bottom: none;
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
    background: #fbf8f6;
    border: 1.5px solid #ede6dd;
    box-shadow: 0 0px 15px 0 rgba(231, 222, 205, 0.07);
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-size: 1.15rem;
    font-weight: 600;
    color: #3d2f1e;
    margin-bottom: 4px;
    letter-spacing: 0.02em;
  }
  .price {
    font-size: 1.03rem;
    color: #bcad99;
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
    border: 1.4px solid #efe9de;
    background: #f9f6ee;
    color: #786954;
    font-size: 1.12rem;
    font-weight: 500;
    padding: 7px 9px;
    transition: border 0.18s, box-shadow 0.18s;
    box-shadow: 0 1px 8px 0 rgba(230, 223, 214, 0.07);
    &:focus {
      border: 1.6px solid #d5ba97;
      outline: none;
      background: #f2e9d5;
      box-shadow: 0 0 15px 0 rgba(218, 212, 186, 0.12);
    }
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #ead7b9, #e7d6c3 86%, #f6eee8 100%);
  color: #695c46;
  border: none;
  padding: 8px 19px;
  border-radius: 9px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  margin-left: -5px;
  box-shadow: 0 1px 8px 0 rgba(222, 210, 190, 0.11);
  transition: background 0.16s, color 0.12s, box-shadow 0.17s;
  &:hover {
    background: linear-gradient(88deg, #eaddc6 5%, #e6cead 95%);
    color: #3d2d15;
    box-shadow: 0 6px 22px #e8dac6;
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
  color: #958a7b;
`;

const TotalLabel = styled.span`
  font-size: 1.19rem;
  color: #8a7e6b;
  margin-right: 17px;
  letter-spacing: 0.02em;
`;

const TotalValue = styled.span`
  font-size: 2.2rem;
  color: #3e301a;
  font-weight: 700;
`;

const CheckoutButton = styled(Button)`
  margin-top: 16px;
  padding: 16px 54px;
  font-size: 1.17rem;
  background: linear-gradient(95deg, #e9d1ab 10%, #eee5d3 90%);
  color: #6b5c3a;
  border-radius: 14px;
  font-weight: 600;
  box-shadow: 0 5px 24px #ecdcc281;
  transition: background 0.19s, color 0.13s, box-shadow 0.17s;
  &:hover {
    background: linear-gradient(95deg, #e7c89c 0%, #e4dec7 99%);
    color: #3a2b17;
    box-shadow: 0 14px 54px #dfcaaa71;
  }
`;

const EmptyCart = styled.div`
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #948573;
  font-size: 1.22rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  h3 {
    color: #7a694e;
    font-weight: 700;
    font-size: 1.24em;
    margin-bottom: 15px;
  }
`;

const CartSection: React.FC = () => {
  const dispatch = useDispatch();
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
          <svg width="28" height="28" fill="#ddc4a6" viewBox="0 0 20 20">
            <path d="M2.5 3h1.12l.34 1.2 2.7 8.79a2 2 0 0 0 1.9 1.42h6.86a2 2 0 0 0 1.952-1.684l1.02-5.54A1 1 0 0 0 15.56 6H6.21l-.56-2H2.5zM7 17.5A1.25 1.25 0 1 0 7 15a1.25 1.25 0 0 0 0 2.5zm7 0A1.25 1.25 0 1 0 14 15a1.25 1.25 0 0 0 0 2.5z" />
          </svg>
        </CartHeading>
      </HeadingBg>
      <CartContainer>
        {cartItems.length === 0 ? (
          <EmptyCart>
            <h3>Your cart is empty.</h3>
            <Button style={{ marginTop: 14 }}>Continue Shopping</Button>
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
                    color: "#5d5241",
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
              <CheckoutButton>Proceed to Checkout</CheckoutButton>
            </div>
          </>
        )}
      </CartContainer>
    </CenterContainer>
  );
};

export default CartSection;
