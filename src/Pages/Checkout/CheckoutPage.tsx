import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { removeFromCart } from "../../Redux/CartSlice";
import Swal from "sweetalert2";

const CenterContainer = styled.div`
  // min-height: 100vh;
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
  margin-top:30px;
  margin-bottom: 38px;
  background: linear-gradient(98deg, #f3f4f7 60%, #f9fafb 100%);
  box-shadow: 0 6px 34px 0 rgba(180, 183, 189, 0.15);
  border-radius: 24px;
  padding: 24px 58px;
  align-self: center;
`;

const CheckoutHeading = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.1rem;
  font-weight: 600;
  color: #2e3142;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 12px #e9ebf18c;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CheckoutCard = styled.div`
  width: 100%;
  max-width: 1000px;
  align-self: center;
  background: #fff;
  border-radius: 24px;
  border: 1.7px solid #e2e4e8;
  box-shadow: 0 8px 45px 0 rgba(177, 180, 189, 0.11);
  padding: 48px 48px 38px 48px;
  display: flex;
    margin-bottom: 30px;

  flex-direction: column;
  @media (max-width: 640px) {
    padding: 28px 6vw;
  }
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: #2d3351;
  margin-bottom: 24px;
  margin-top: 4px;
  letter-spacing: 0.01em;
  text-align: left;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 22px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 7px;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #8892a7;
  margin-bottom: 7px;
  font-weight: 500;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 15px;
  border: 1.3px solid #e2e4e8;
  border-radius: 9px;
  font-size: 1.01rem;
  background: #f8f9fb;
  color: #3a4159;
  margin-bottom: 4px;
  font-family: inherit;
  &:focus {
  border: 1.6px solid #bdc6db;
  outline: none;
  background: #f1f3f8;
  }
`;

// const OrderSummary = styled.div`
//   border-top: 1.6px solid #e1e5ec;
//   margin-top: 42px;
//   padding-top: 32px;
// `;

const SummaryRow = styled.div`
  font-size: 1.07rem;
  color: #636c7d;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const TotalRow = styled.div`
  font-size: 1.27rem;
  padding-top: 6px;
  font-weight: 700;
  color: #323741;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #e2e5ea 15%, #eef0f3 86%, #f7f8fa 100%);
  color: #525a6b;
  border: none;
  padding: 13px 44px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: 600;
  box-shadow: 0 2px 12px 0 rgba(210, 214, 221, 0.12);
  transition: background 0.16s, color 0.13s, box-shadow 0.15s;
  margin-top: 33px;
  align-self: center;
  &:hover {
    background: linear-gradient(88deg, #d7d9deff 5%, #a9acadff 96%);
    color: #2c2e39;
    box-shadow: 0 8px 32px #e8eaf2;
  }
`;
const CheckoutLayout = styled.div`
  display: flex;
  gap: 48px;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 28px;
  }
`;

const FormSection = styled.div`
  flex: 1.6;
`;

const InfoSection = styled.div`
  flex: 1;
  border-left: 1.5px solid #e6e9ef;
  
  padding-left: 32px;
  @media (max-width: 768px) {
    border-left: none;
    border-top: 1.5px solid #e6e9ef;
    padding-left: 0;
    padding-top: 28px;
  }
`;


const CheckoutPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Pre-calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 7; // Sample shipping logic
  const total = subtotal + shipping;
  const dispatch = useDispatch();

const handleRemove = (id: number) => {
  dispatch(removeFromCart(id));
};


const submitOrder = () =>{
       Swal.fire({
        title: "Order Placed!",
        text: "Your checkout has been submitted successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      
}
  return (
    <CenterContainer>
      <HeadingBg>
        <CheckoutHeading>
          Checkout
          <svg width="28" height="28" fill="#dde2eb" viewBox="0 0 20 20">
            <path
              d="M2.5 3h1.12l.34 1.2 2.7 8.79a2 2 0 0 0 1.9 1.42h6.86a2 2 0 0 0 1.952-1.684l1.02-5.54A1 1 0 0 0 15.56 6H6.21l-.56-2H2.5z 
              M7 17.5A1.25 1.25 0 1 0 7 15a1.25 1.25 0 0 0 0 2.5zm7 0A1.25 1.25 0 1 0 14 15a1.25 1.25 0 0 0 0 2.5z"
            />
          </svg>
        </CheckoutHeading>
      </HeadingBg>
<CheckoutCard>
  <CheckoutLayout>
    <FormSection>
      <SectionTitle>Shipping Information</SectionTitle>
      <form>
        <FormRow>
          <div style={{ flex: 1 }}>
            <Label htmlFor="name">Full Name</Label>
            <Input type="text" id="name" name="name" autoComplete="name" required />
          </div>
          <div style={{ flex: 1 }}>
            <Label htmlFor="email">Email Address</Label>
            <Input type="email" id="email" name="email" autoComplete="email" required />
          </div>
        </FormRow>

        <FormRow>
          <div style={{ flex: 1 }}>
            <Label htmlFor="address">Street Address</Label>
            <Input type="text" id="address" name="address" autoComplete="street-address" required />
          </div>
          <div style={{ flex: 1 }}>
            <Label htmlFor="city">City</Label>
            <Input type="text" id="city" name="city" autoComplete="address-level2" required />
          </div>
        </FormRow>

        <FormRow>
          <div style={{ flex: 1 }}>
            <Label htmlFor="postal">Postal Code</Label>
            <Input type="text" id="postal" name="postal" autoComplete="postal-code" required />
          </div>
          <div style={{ flex: 1 }}>
            <Label htmlFor="country">Country</Label>
            <Input type="text" id="country" name="country" autoComplete="country" required />
          </div>
        </FormRow>

       
      </form>
    </FormSection>

<InfoSection>
  <SectionTitle>Order Summary</SectionTitle>

<div>
  {cartItems.length > 0 ? (
    cartItems.map((item) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "18px",
          borderBottom: "1px solid #eceff3",
          paddingBottom: "14px",
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "12px",
            marginRight: "14px",
          }}
        />

        <div style={{ flex: 1 }}>
          <h4
            style={{
              fontSize: "1rem",
              color: "#2e3142",
              margin: 0,
              fontWeight: 600,
            }}
          >
            {item.name}
          </h4>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#7b8193",
              marginTop: "4px",
            }}
          >
            Quantity: {item.quantity}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginLeft: "10px",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#333743",
            }}
          >
            ${(item.price * item.quantity).toFixed(2)}
          </div>

          <button
            style={{
              marginTop: "6px",
              background: "none",
              border: "none",
              color: "#e63946",
              fontSize: "0.9rem",
              cursor: "pointer",
              textDecoration: "underline",
              padding: "0",
            }}
            onClick={() => handleRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    ))
  ) : (
    <p style={{ color: "#8a8f9e", fontSize: "1rem" }}>Your cart is empty.</p>
  )}
</div>


  <div style={{ marginTop: "28px" }}>
    <SummaryRow>
      <span>Subtotal:</span>
      <span>${subtotal.toFixed(2)}</span>
    </SummaryRow>
    <SummaryRow>
      <span>Shipping:</span>
      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
    </SummaryRow>
    <TotalRow>
      <span>Total:</span>
      <span>${total.toFixed(2)}</span>
    </TotalRow>
  </div>

</InfoSection>

  </CheckoutLayout>
     <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
                        submitOrder()


          }}
        >
          Place Order
        </Button>
</CheckoutCard>


    </CenterContainer>
  );
};

export default CheckoutPage;
