import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProfileTitleWrap = styled.div`
  margin-bottom: 36px;
  width: 100%;
  max-width: 390px;
`;
const ProfileTitle = styled.h1`
  font-size: 2.1rem;
  font-weight: 700;
  color: #2e3142;
  border-bottom: 4px solid #e4e7ee;
  margin: 0 0 8px 0;
  padding-bottom: 6px;
`;
const ProfileSubtitle = styled.div`
  color: #8892a7;
  font-size: 1.11rem;
  font-weight: 400;
  margin-top: 2px;
  letter-spacing: 0.03em;
`;
const Section = styled.section`
  width: 100vw;
  min-height: 85vh;
  background: linear-gradient(100deg, #f7f8fa 8%, #eef0f3 87%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;
const EditGrid = styled.div`
  display: flex;
  max-width: 950px;
  width: 100%;
  background: #fff;
  box-shadow: 0 8px 36px 0 rgba(188, 196, 210, 0.11);
  border-radius: 24px;
  min-height: 340px;
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`;
const LeftImgBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 330px;
  height: 340px;
  border-radius: 0;
  padding: 20px;
  background: none;

  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #e3e5eb;
    background: #f8f9fb;
    filter: grayscale(100%) brightness(0.92);
    box-shadow: 0 5px 14px rgba(180, 185, 195, 0.15);
    transition: all 0.3s ease;
    &:hover {
      filter: grayscale(60%) brightness(1);
      transform: scale(1.03);
    }
  }

  label {
    margin-top: 14px;
    font-size: 0.9rem;
    color: #546087;
    cursor: pointer;
    text-decoration: underline;
  }

  input {
    display: none;
  }
`;
const RightPanel = styled.div`
  flex: 1.1;
  padding: 0 56px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 850px) {
    padding: 36px 18px 32px 18px;
    width: 100%;
  }
`;
const Form = styled.form`
  width: 100%;
  max-width: 390px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Label = styled.label`
  font-size: 0.97rem;
  color: #636c7d;
  margin-bottom: 4px;
`;
const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.3px solid #e2e4e8;
  border-radius: 6px;
  font-size: 1rem;
  background: #f4f6fa;
  color: #3a4159;
  font-family: inherit;
  &:focus {
    border-color: #bdc6db;
    background: #eff2f7;
    outline: none;
  }
  &::placeholder {
    color: #aeb2be;
  }
`;
const SaveBtn = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #e2e5ea 20%, #eef0f3 90%);
  color: #3a4159;
  border: none;
  padding: 1.1rem 0;
  margin-top: 0.5rem;
  border-radius: 7px;
  font-size: 1.07rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.13s;
  &:hover {
    background: linear-gradient(92deg, #e4e7ee 12%, #e9ecf3 88%);
    color: #232532;
  }
`;
const ErrorMsg = styled.div`
  color: #f76c5e;
  background: #f4ebeb;
  border: 1.3px solid #fce1e2;
  border-radius: 6px;
  font-size: 0.97rem;
  padding: 9px 12px;
  margin-bottom: 13px;
  font-weight: 500;
`;
const DividerText = styled.div`
  color: #8892a7;
  font-size: 0.98rem;
  margin-top: 24px;
`;

const UserProfileEdit: React.FC = () => {
  const defaultUserImage =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const [data, setData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    image: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fakeUser = {
      email: "example@email.com",
      name: "Jane Doe",
      phone: "+20123456789",
      image: defaultUserImage,
      password: "",
    };
    setData(fakeUser);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setData({ ...data, image: imageURL });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.email || !data.name) {
      setError("Please fill all required fields");
      return;
    }
    alert("Profile updated successfully!");
  };

  return (
    <Section>
      <EditGrid>
        <LeftImgBlock>
          <img src={data.image || defaultUserImage} alt="User" />
          <label htmlFor="upload">Change Photo</label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </LeftImgBlock>
        <RightPanel>
          <ProfileTitleWrap>
            <ProfileTitle>User Profile</ProfileTitle>
            <ProfileSubtitle>Manage your personal information</ProfileSubtitle>
          </ProfileTitleWrap>
          <Form onSubmit={handleSave}>
            {error && <ErrorMsg>{error}</ErrorMsg>}

            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              placeholder="user@email.com"
              autoComplete="email"
            />

            <Label>Full Name</Label>
            <Input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              placeholder="e.g. Jane Doe"
              autoComplete="name"
            />

            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="e.g. +20123456789"
              autoComplete="tel"
            />

            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter new password"
              autoComplete="new-password"
            />

            <SaveBtn type="submit">Save Changes</SaveBtn>
          </Form>
          <DividerText>
            All changes are saved securely. Need help?{" "}
            <a
              href="#support"
              style={{ color: "#546087", textDecoration: "underline" }}
            >
              Contact support
            </a>
            .
          </DividerText>
        </RightPanel>
      </EditGrid>
    </Section>
  );
};

export default UserProfileEdit;
