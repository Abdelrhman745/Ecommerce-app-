import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, changeCartQuantity } from "../../Redux/CartSlice";
import { RootState } from "../../Redux/Store";

const Section = styled.section`
  width: 90vw;
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

const TotalSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  display: flex;
  justify-content:end;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: #222;
`;

const CheckoutButton = styled(Button)`
  background-color: #000;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 8px;
    align-items: center;




  &:hover {
    background-color: #323131ff;
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
    <Section>
      <CartContainer>
        {cartItems.length === 0 ? (
          <div className="d-flex flex-column justify-content-center w-100 align-items-center p-5">
            <h3>Your cart is empty.</h3>
            <Button className="my-2 px-4 py-3 fs-6">Continue Shopping</Button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                className="d-flex flex-row justify-content-around"
              >
                <img
                  src={item.image}
                  width="100px"
                  height="100px"
                  style={{ borderRadius: "8px", objectFit: "cover" }}
                />
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
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      padding: "4px",
                    }}
                  />
                  <Button onClick={() => handleRemove(item.id)}>Remove</Button>
                </div>
              </CartItem>
            ))}

            <TotalSection style={{marginRight:"35px"}}>
              <span style={{marginRight:"10px"}}>Total :</span>
              <span>${totalPrice.toFixed(2)}</span>
            </TotalSection>

            <div style={{ textAlign: "center", marginTop: "20px" ,display:"flex", flexDirection:"row",justifyContent:'end'}}>
              <CheckoutButton >Proceed to Checkout</CheckoutButton>
            </div>
          </>
        )}
      </CartContainer>
    </Section>
  );
};

export default CartSection;
