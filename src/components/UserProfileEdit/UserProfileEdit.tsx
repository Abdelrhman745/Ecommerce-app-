import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Container = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4ebf1 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 950px;
  width: 100%;
  background: #fff;
  box-shadow: 0 8px 30px rgba(180, 190, 210, 0.25);
  border-radius: 18px;
  overflow: hidden;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background: #f8f9fc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;

  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #e0e3ec;
    background: #f2f4f8;
    box-shadow: 0 6px 20px rgba(170, 180, 200, 0.25);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 28px rgba(150, 160, 180, 0.35);
    }
  }

  label {
    margin-top: 14px;
    font-size: 0.9rem;
    color: #4a5570;
    cursor: pointer;
    text-decoration: underline;
  }

  input {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1.3;
  padding: 50px 60px;
  display: flex;
  flex-direction: column;
  background: #fff;

  @media (max-width: 850px) {
    padding: 30px 25px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3144;
  font-weight: 700;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  color: #7a849b;
  font-size: 1rem;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #4a4f63;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #ffffff;
  color: #2d3446;
  font-size: 1rem;
  transition: 0.2s;

  &:focus {
    border-color: #6b7bff;
    outline: none;
    background: #f8f9ff;
  }

  &::placeholder {
    color: #b0b6c3;
  }
`;

const ErrorMsg = styled.div`
  background: #fff4f4;
  color: #e15555;
  border: 1px solid #f5c2c2;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 0.95rem;
`;

const Button = styled.button`
  margin-top: 10px;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  opacity: 1;
  transition: all 0.25s ease;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #aab2d8;
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(10, "Name cannot exceed 10 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  oldPassword: Yup.string(),
  newPassword: Yup.string().test(
    "is-valid-new-password",
    "Password must start with uppercase and length 6-11",
    (value) => {
      if (!value) return true;
      return /^[A-Z][a-z0-9]{5,10}$/.test(value);
    }
  ),
});

const UserProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const defaultUserImage =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const [data, setData] = useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    password: "",
    oldPassword: "",
    newPassword: "",
    image: "",
  });

  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtss0bqxc/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error("Failed to upload image");
      return null;
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userToken");
    if (!userId) {
      setError("User not logged in");
      return;
    }

    axios
      .get(`https://68e8fa40f2707e6128cd055c.mockapi.io/user/${userId}`)
      .then((res) => {
        setData({
          ...res.data,
          password: "",
          oldPassword: "",
          newPassword: "",
        });
        setOriginalData({
          name: res.data.name,
          email: res.data.email,
        });
      })
      .catch(() => setError("Failed to load user data"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_upload");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dtss0bqxc/upload",
          formData
        );

        setData({ ...data, image: response.data.secure_url });
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("userToken");
    if (!userId) {
      setError("User not logged in");
      return;
    }

    try {
      await validationSchema.validate({
        name: data.name,
        email: data.email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
    } catch (validationError: any) {
      setError(validationError.message);
      return;
    }

    try {
      const { data: allUsers } = await axios.get(
        "https://68e8fa40f2707e6128cd055c.mockapi.io/user"
      );

      const duplicateEmail = allUsers.find(
        (u: any) => u.email === data.email && u.id !== userId
      );

      if (duplicateEmail) {
        setError("This email is already in use by another account");
        return;
      }
    } catch {
      setError("Failed to verify email uniqueness");
      return;
    }

    if (
      (data.name !== originalData.name || data.email !== originalData.email) &&
      !data.oldPassword
    ) {
      setError(
        "Please enter your current password to confirm name or email change"
      );
      return;
    }

    if (isChangingPassword || data.oldPassword) {
      const { data: userFromServer } = await axios.get(
        `https://68e8fa40f2707e6128cd055c.mockapi.io/user/${userId}`
      );

      if (userFromServer.password !== data.oldPassword) {
        setError("password is incorrect");
        return;
      }
    }

    setLoading(true);
    try {
      const updateData: Record<string, any> = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        image: data.image,
      };

      if (isChangingPassword && data.newPassword) {
        updateData["password"] = data.newPassword;
      }

      await axios.put(
        `https://68e8fa40f2707e6128cd055c.mockapi.io/user/${userId}`,
        updateData
      );

      toast.success("✅ Profile updated successfully!");
      setOriginalData({ name: data.name, email: data.email });
      setData({ ...data, oldPassword: "", newPassword: "" });
      setIsChangingPassword(false);
    } catch {
      setError("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <LeftPanel>
          <img src={data.image || defaultUserImage} alt="User" />
          <label htmlFor="upload">Change Image</label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </LeftPanel>

        <RightPanel>
          <Title>Profile Settings</Title>
          <Subtitle>Manage your personal info and credentials</Subtitle>

          <Form onSubmit={handleSave}>
            {error && <ErrorMsg>{error}</ErrorMsg>}

            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              placeholder=""
              autoComplete="email"
            />

            <Label>Full Name</Label>
            <Input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              placeholder=""
            />

            {(data.name !== originalData.name ||
              data.email !== originalData.email) && (
              <>
                <Label>Current Password (required for name/email change)</Label>
                <Input
                  type="password"
                  name="oldPassword"
                  value={data.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                />
              </>
            )}

            {!isChangingPassword ? (
              <Button
                type="button"
                style={{
                  background: "#58df92ff",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  width: "fit-content",
                  alignSelf: "flex-start",
                }}
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </Button>
            ) : (
              <Button
                type="button"
                style={{
                  background: "#d36b6b",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  width: "fit-content",
                  alignSelf: "flex-start",
                }}
                onClick={() => setIsChangingPassword(false)}
              >
                Cancel Password Change
              </Button>
            )}

            {isChangingPassword && (
              <>
                <Label>Old Password</Label>
                <Input
                  type="password"
                  name="oldPassword"
                  value={data.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter old password"
                />

                <Label>New Password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </>
            )}

            <Button
              type="submit"
              className="btn btn-dark w-100 mt-2"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">"Saving..."</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </Form>
        </RightPanel>
      </Card>
    </Container>
  );
};

export default UserProfileEdit;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Container = styled.section`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #f5f7fa 0%, #e4ebf1 100%);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 40px 20px;
// `;

// const Card = styled.div`
//   display: flex;
//   flex-direction: row;
//   max-width: 950px;
//   width: 100%;
//   background: #fff;
//   box-shadow: 0 8px 30px rgba(180, 190, 210, 0.25);
//   border-radius: 18px;
//   overflow: hidden;

//   @media (max-width: 850px) {
//     flex-direction: column;
//   }
// `;

// const LeftPanel = styled.div`
//   flex: 1;
//   background: #f8f9fc;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 30px 20px;

//   img {
//     width: 130px;
//     height: 130px;
//     object-fit: cover;
//     border-radius: 50%;
//     border: 3px solid #e0e3ec;
//     background: #f2f4f8;
//     box-shadow: 0 6px 20px rgba(170, 180, 200, 0.25);
//     transition: all 0.3s ease;

//     &:hover {
//       transform: scale(1.05);
//       box-shadow: 0 8px 28px rgba(150, 160, 180, 0.35);
//     }
//   }

//   label {
//     margin-top: 14px;
//     font-size: 0.9rem;
//     color: #4a5570;
//     cursor: pointer;
//     text-decoration: underline;
//   }

//   input {
//     display: none;
//   }
// `;

// const RightPanel = styled.div`
//   flex: 1.3;
//   padding: 50px 60px;
//   display: flex;
//   flex-direction: column;
//   background: #fff;

//   @media (max-width: 850px) {
//     padding: 30px 25px;
//   }
// `;

// const Title = styled.h2`
//   font-size: 2rem;
//   color: #2c3144;
//   font-weight: 700;
//   margin-bottom: 6px;
// `;

// const Subtitle = styled.p`
//   color: #7a849b;
//   font-size: 1rem;
//   margin-bottom: 30px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1.2rem;
// `;

// const Label = styled.label`
//   font-size: 0.95rem;
//   font-weight: 500;
//   color: #4a4f63;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const Input = styled.input`
//   padding: 12px 14px;
//   border-radius: 8px;
//   border: 1px solid #d0d5dd;
//   background: #ffffff;
//   color: #2d3446;
//   font-size: 1rem;
//   transition: 0.2s;

//   &:focus {
//     border-color: #6b7bff;
//     outline: none;
//     background: #f8f9ff;
//   }

//   &::placeholder {
//     color: #b0b6c3;
//   }
// `;

// const ErrorMsg = styled.div`
//   background: #fff4f4;
//   color: #e15555;
//   border: 1px solid #f5c2c2;
//   border-radius: 6px;
//   padding: 10px 14px;
//   font-size: 0.95rem;
// `;

// const Button = styled.button`
//   margin-top: 10px;
//   opacity: 0.4;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   padding: 14px 0;
//   font-size: 1.05rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.25s ease;

//   &:hover {
//     opacity: 2;
//     transform: translateY(-2px);
//   }

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

// // ✅ Schema validation
// const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(3, "Name must be at least 3 characters")
//     .max(10, "Name cannot exceed 10 characters")
//     .required("Name is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   oldPassword: Yup.string(),
//   newPassword: Yup.string().matches(
//     /^[A-Z][a-z0-9]{5,10}$/,
//     "Password must start with uppercase and length 6-11"
//   ),
// });

// const UserProfileEdit: React.FC = () => {
//   const navigate = useNavigate();
//   const defaultUserImage =
//     "https://cdn-icons-png.flaticon.com/512/847/847969.png";

//   const [data, setData] = useState({
//     id: "",
//     email: "",
//     name: "",
//     phone: "",
//     password: "",
//     oldPassword: "",
//     newPassword: "",
//     image: "",
//   });

//   const [originalData, setOriginalData] = useState({
//     name: "",
//     email: "",
//   });

//   const [error, setError] = useState("");
//   const [isChangingPassword, setIsChangingPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const userId = localStorage.getItem("userToken");
//     if (!userId) {
//       setError("User not logged in");
//       return;
//     }

//     axios
//       .get(`https://68e8fa40f2707e6128cd055c.mockapi.io/user/${userId}`)
//       .then((res) => {
//         setData({
//           ...res.data,
//           password: "",
//           oldPassword: "",
//           newPassword: "",
//         });
//         setOriginalData({
//           name: res.data.name,
//           email: res.data.email,
//         });
//       })
//       .catch(() => setError("Failed to load user data"));
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageURL = URL.createObjectURL(file);
//       setData({ ...data, image: imageURL });
//     }
//   };

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const userId = localStorage.getItem("userToken");
//     if (!userId) {
//       setError("User not logged in");
//       return;
//     }

//     try {
//       await validationSchema.validate({
//         name: data.name,
//         email: data.email,
//         oldPassword: data.oldPassword,
//         newPassword: data.newPassword,
//       });
//     } catch (validationError: any) {
//       setError(validationError.message);
//       return;
//     }

//     try {
//       const { data: allUsers } = await axios.get(
//         "https://68e8fa40f2707e6128cd055c.mockapi.io/user"
//       );

//       const duplicateEmail = allUsers.find(
//         (u: any) => u.email === data.email && u.id !== userId
//       );

//       if (duplicateEmail) {
//         setError("This email is already in use by another account");
//         return;
//       }
//     } catch {
//       setError("Failed to verify email uniqueness");
//       return;
//     }

//     if (
//       (data.name !== originalData.name || data.email !== originalData.email) &&
//       !data.oldPassword
//     ) {
//       setError(
//         "Please enter your current password to confirm name or email change"
//       );
//       return;
//     }

//     if (isChangingPassword || data.oldPassword) {
//       const { data: userFromServer } = await axios.get(
//         `https://68e8fa40f2707e6128cd055c.mockapi.io/user/${userId}`
//       );

//       if (userFromServer.password !== data.oldPassword) {
//         setError("password is incorrect");
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       const updateData: Record<string, any> = {
//         name: data.name,
//         email: data.email,
//         phone: data.phone,
//         image: data.image,
//       };

//       if (isChangingPassword && data.newPassword) {
//         updateData["password"] = data.newPassword;
//       }

//       await axios.put(
//         `https://68e8fa40f2707e6128cd055c.mockapi.io/user/${userId}`,
//         updateData
//       );

//       toast("✅Profile updated successfully!");
//       localStorage.removeItem("userToken");
//       navigate("/login");
//     } catch {
//       setError("Error updating profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <Card>
//         <LeftPanel>
//           <img src={data.image || defaultUserImage} alt="User" />
//           <label htmlFor="upload">Change Image</label>
//           <input
//             id="upload"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </LeftPanel>

//         <RightPanel>
//           <Title>Profile Settings</Title>
//           <Subtitle>Manage your personal info and credentials</Subtitle>

//           <Form onSubmit={handleSave}>
//             {error && <ErrorMsg>{error}</ErrorMsg>}

//             <Label>Email Address</Label>
//             <Input
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               required
//               placeholder=""
//               autoComplete="email"
//             />

//             <Label>Full Name</Label>
//             <Input
//               type="text"
//               name="name"
//               value={data.name}
//               onChange={handleChange}
//               required
//               placeholder=""
//             />

//             {(data.name !== originalData.name ||
//               data.email !== originalData.email) && (
//               <>
//                 <Label>Current Password (required for name/email change)</Label>
//                 <Input
//                   type="password"
//                   name="oldPassword"
//                   value={data.oldPassword}
//                   onChange={handleChange}
//                   placeholder="Enter current password"
//                 />
//               </>
//             )}

//             <Label>
//               <input
//                 type="checkbox"
//                 checked={isChangingPassword}
//                 onChange={() => setIsChangingPassword(!isChangingPassword)}
//               />
//               Change Password
//             </Label>

//             {isChangingPassword && (
//               <>
//                 <Label>Old Password</Label>
//                 <Input
//                   type="password"
//                   name="oldPassword"
//                   value={data.oldPassword}
//                   onChange={handleChange}
//                   placeholder="Enter old password"
//                 />

//                 <Label>New Password</Label>
//                 <Input
//                   type="password"
//                   name="newPassword"
//                   value={data.newPassword}
//                   onChange={handleChange}
//                   placeholder="Enter new password"
//                 />
//               </>
//             )}

//             <Button
//               type="submit"
//               className="btn btn-dark w-100 mt-2"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save Changes"}
//             </Button>
//           </Form>
//         </RightPanel>
//       </Card>
//     </Container>
//   );
// };

// export default UserProfileEdit;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const ProfileTitleWrap = styled.div`
//   margin-bottom: 36px;
//   width: 100%;
//   max-width: 390px;
// `;
// const ProfileTitle = styled.h1`
//   font-size: 2.1rem;
//   font-weight: 700;
//   color: #2e3142;
//   border-bottom: 4px solid #e4e7ee;
//   margin: 0 0 8px 0;
//   padding-bottom: 6px;
// `;
// const ProfileSubtitle = styled.div`
//   color: #8892a7;
//   font-size: 1.11rem;
//   font-weight: 400;
//   margin-top: 2px;
//   letter-spacing: 0.03em;
// `;
// const Section = styled.section`
//   width: 100vw;
//   min-height: 85vh;
//   background: linear-gradient(100deg, #f7f8fa 8%, #eef0f3 87%);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0;
// `;
// const EditGrid = styled.div`
//   display: flex;
//   max-width: 950px;
//   width: 100%;
//   background: #fff;
//   box-shadow: 0 8px 36px 0 rgba(188, 196, 210, 0.11);
//   border-radius: 24px;
//   min-height: 340px;
//   @media (max-width: 850px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;
// const LeftImgBlock = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-width: 330px;
//   height: 340px;
//   border-radius: 0;
//   padding: 20px;
//   background: none;

//   img {
//     width: 130px;
//     height: 130px;
//     object-fit: cover;
//     border-radius: 50%;
//     border: 2px solid #e3e5eb;
//     background: #f8f9fb;
//     filter: grayscale(100%) brightness(0.92);
//     box-shadow: 0 5px 14px rgba(180, 185, 195, 0.15);
//     transition: all 0.3s ease;
//     &:hover {
//       filter: grayscale(60%) brightness(1);
//       transform: scale(1.03);
//     }
//   }

//   label {
//     margin-top: 14px;
//     font-size: 0.9rem;
//     color: #546087;
//     cursor: pointer;
//     text-decoration: underline;
//   }

//   input {
//     display: none;
//   }
// `;
// const RightPanel = styled.div`
//   flex: 1.1;
//   padding: 0 56px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   @media (max-width: 850px) {
//     padding: 36px 18px 32px 18px;
//     width: 100%;
//   }
// `;
// const Form = styled.form`
//   width: 100%;
//   max-width: 390px;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;
// const Label = styled.label`
//   font-size: 0.97rem;
//   color: #636c7d;
//   margin-bottom: 4px;
// `;
// const Input = styled.input`
//   width: 100%;
//   padding: 12px 14px;
//   border: 1.3px solid #e2e4e8;
//   border-radius: 6px;
//   font-size: 1rem;
//   background: #f4f6fa;
//   color: #3a4159;
//   font-family: inherit;
//   &:focus {
//     border-color: #bdc6db;
//     background: #eff2f7;
//     outline: none;
//   }
//   &::placeholder {
//     color: #aeb2be;
//   }
// `;
// const SaveBtn = styled.button`
//   width: 100%;
//   background: linear-gradient(90deg, #e2e5ea 20%, #eef0f3 90%);
//   color: #3a4159;
//   border: none;
//   padding: 1.1rem 0;
//   margin-top: 0.5rem;
//   border-radius: 7px;
//   font-size: 1.07rem;
//   font-weight: 700;
//   cursor: pointer;
//   transition: background 0.2s, color 0.13s;
//   &:hover {
//     background: linear-gradient(92deg, #e4e7ee 12%, #e9ecf3 88%);
//     color: #232532;
//   }
// `;
// const ErrorMsg = styled.div`
//   color: #f76c5e;
//   background: #f4ebeb;
//   border: 1.3px solid #fce1e2;
//   border-radius: 6px;
//   font-size: 0.97rem;
//   padding: 9px 12px;
//   margin-bottom: 13px;
//   font-weight: 500;
// `;
// const DividerText = styled.div`
//   color: #8892a7;
//   font-size: 0.98rem;
//   margin-top: 24px;
// `;

// const UserProfileEdit: React.FC = () => {
//   const defaultUserImage =
//     "https://cdn-icons-png.flaticon.com/512/847/847969.png";

//   const [data, setData] = useState({
//     email: "",
//     name: "",
//     phone: "",
//     password: "",
//     image: "",
//   });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fakeUser = {
//       email: "example@email.com",
//       name: "Jane Doe",
//       phone: "+20123456789",
//       image: defaultUserImage,
//       password: "",
//     };
//     setData(fakeUser);
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageURL = URL.createObjectURL(file);
//       setData({ ...data, image: imageURL });
//     }
//   };

//   const handleSave = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!data.email || !data.name) {
//       setError("Please fill all required fields");
//       return;
//     }
//     alert("Profile updated successfully!");
//   };

//   return (
//     <Section>
//       <EditGrid>
//         <LeftImgBlock>
//           <img src={data.image || defaultUserImage} alt="User" />
//           <label htmlFor="upload">Change Photo</label>
//           <input
//             id="upload"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </LeftImgBlock>
//         <RightPanel>
//           <ProfileTitleWrap>
//             <ProfileTitle>User Profile</ProfileTitle>
//             <ProfileSubtitle>Manage your personal information</ProfileSubtitle>
//           </ProfileTitleWrap>
//           <Form onSubmit={handleSave}>
//             {error && <ErrorMsg>{error}</ErrorMsg>}

//             <Label>Email Address</Label>
//             <Input
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               required
//               placeholder="user@email.com"
//               autoComplete="email"
//             />

//             <Label>Full Name</Label>
//             <Input
//               type="text"
//               name="name"
//               value={data.name}
//               onChange={handleChange}
//               required
//               placeholder="e.g. Jane Doe"
//               autoComplete="name"
//             />

//             <Label>Old Password</Label>
//             <Input
//               type="password"
//               name="password"
//               value={data.password}
//               onChange={handleChange}
//               placeholder="Enter new password"
//               autoComplete="new-password"
//             />
//             <Label>New Password</Label>
//             <Input
//               type="password"
//               name="password"
//               value={data.password}
//               onChange={handleChange}
//               placeholder="Enter new password"
//               autoComplete="new-password"
//             />

//             <SaveBtn type="submit">Save Changes</SaveBtn>
//           </Form>
//           <DividerText>
//             All changes are saved securely. Need help?{" "}
//             <a
//               href="#support"
//               style={{ color: "#546087", textDecoration: "underline" }}
//             >
//               Contact support
//             </a>
//             .
//           </DividerText>
//         </RightPanel>
//       </EditGrid>
//     </Section>
//   );
// };

// export default UserProfileEdit;
