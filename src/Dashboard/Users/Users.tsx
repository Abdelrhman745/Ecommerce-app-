import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Spinner, Pagination } from "react-bootstrap";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formValues, setFormValues] = useState({ name: "", email: "", password: "" });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  async function fetchUsers() {
    try {
      setLoading(true);
      const { data } = await axios.get("https://68e8fa40f2707e6128cd055c.mockapi.io/user");
      setUsers(data);
    } catch (err) {
      toast.error("Failed to fetch users!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleDelete() {
    if (!userToDelete) return;
    try {
      await axios.delete(`https://68e8fa40f2707e6128cd055c.mockapi.io/user/${userToDelete.id}`);
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Error deleting user!");
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  }

  function handleEdit(user: User) {
    setSelectedUser(user);
    setFormValues({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    setShowModal(true);
  }

  async function handleSave() {
    if (!selectedUser) return;
    try {
      const { data } = await axios.put(
        `https://68e8fa40f2707e6128cd055c.mockapi.io/user/${selectedUser.id}`,
        formValues
      );
      setUsers(users.map((u) => (u.id === data.id ? data : u)));
      toast.success("User updated successfully!");
      setShowModal(false);
    } catch (err) {
      toast.error("Error updating user!");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  function paginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Users Management</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setUserToDelete(user);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Form, Table, Spinner, Pagination } from "react-bootstrap";
// import toast from "react-hot-toast";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [formValues, setFormValues] = useState({ name: "", email: "", password: "" });

//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 5;

//   async function fetchUsers() {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("https://68e8fa40f2707e6128cd055c.mockapi.io/user");
//       setUsers(data);
//     } catch (err) {
//       toast.error("Failed to fetch users!");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   async function handleDelete(id: string) {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await axios.delete(`https://68e8fa40f2707e6128cd055c.mockapi.io/user/${id}`);
//       setUsers(users.filter((u) => u.id !== id));
//       toast.success("User deleted successfully!");
//     } catch (err) {
//       toast.error("Error deleting user!");
//     }
//   }

//   function handleEdit(user: User) {
//     setSelectedUser(user);
//     setFormValues({
//       name: user.name,
//       email: user.email,
//       password: user.password,
//     });
//     setShowModal(true);
//   }

//   async function handleSave() {
//     if (!selectedUser) return;
//     try {
//       const { data } = await axios.put(
//         `https://68e8fa40f2707e6128cd055c.mockapi.io/user/${selectedUser.id}`,
//         formValues
//       );
//       setUsers(users.map((u) => (u.id === data.id ? data : u)));
//       toast.success("User updated successfully!");
//       setShowModal(false);
//     } catch (err) {
//       toast.error("Error updating user!");
//     }
//   }

//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   }


//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(users.length / usersPerPage);

//   function paginate(pageNumber: number) {
//     setCurrentPage(pageNumber);
//   }

//   return (
//     <div className="container py-4">
//       <h2 className="text-center mb-4">Users Management</h2>

//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" />
//         </div>
//       ) : (
//         <>
//           <Table striped bordered hover responsive>
//             <thead className="table-dark">
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Password</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.length > 0 ? (
//                 currentUsers.map((user, index) => (
//                   <tr key={user.id}>
//                     <td>{indexOfFirstUser + index + 1}</td>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>{user.password}</td>
//                     <td>
//                       <Button
//                         variant="warning"
//                         size="sm"
//                         className="me-2"
//                         onClick={() => handleEdit(user)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleDelete(user.id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>


//           {totalPages > 1 && (
//             <div className="d-flex justify-content-center">
//               <Pagination>
//                 <Pagination.Prev
//                   disabled={currentPage === 1}
//                   onClick={() => paginate(currentPage - 1)}
//                 />
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Pagination.Item
//                     key={i + 1}
//                     active={i + 1 === currentPage}
//                     onClick={() => paginate(i + 1)}
//                   >
//                     {i + 1}
//                   </Pagination.Item>
//                 ))}
//                 <Pagination.Next
//                   disabled={currentPage === totalPages}
//                   onClick={() => paginate(currentPage + 1)}
//                 />
//               </Pagination>
//             </div>
//           )}
//         </>
//       )}

 
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit User</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formValues.name}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formValues.email}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="password"
//                 value={formValues.password}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Users;
