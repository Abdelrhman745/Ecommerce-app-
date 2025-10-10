import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  changeCartQuantity,
  updateCartItem,
} from "../../Redux/CartSlice";
import { RootState } from "../../Redux/Store";

const Section = styled.section`
  width: 100vw;
  min-height: 100vh;
  padding: 40px;
  background-color: #f8f9fa;
`;

const CartContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const Button = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #444;
  }
`;

const CartSection: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(changeCartQuantity({ id, quantity }));
  };

  return (
    <Section>
      <CartContainer>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p>${item.price}</p>
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                  style={{
                    width: "50px",
                    textAlign: "center",
                    marginRight: "10px",
                  }}
                />
                <Button onClick={() => handleRemove(item.id)}>Remove</Button>
              </div>
            </CartItem>
          ))
        )}
      </CartContainer>
    </Section>
  );
};

export default CartSection;
