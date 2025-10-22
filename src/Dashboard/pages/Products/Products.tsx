import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  Spinner,
  Image,
  Row,
  Col,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

const Card = styled.div`
  background: #f9f8f7;
  border-radius: 15px;
  box-shadow: 0px 6px 38px #f0ebdacc;
  padding: 32px 10px;
  max-width: 1240px;
  margin: 0 auto;
`;

const PageTitle = styled.h2`
  font-family: "Montserrat", serif;
  font-weight: 700;
  color: #a39173;
  letter-spacing: 0.01em;
  font-size: 2.2rem;
  margin-bottom: 12px;
`;

const AddBtn = styled(Button)`
  background: #d6cfc1;
  color: #6a573e;
  border: none;
  font-weight: 600;
  padding: 0.68em 2em;
  margin-bottom: 25px;
  border-radius: 9px;
  font-size: 1.12em;
  box-shadow: 0 2px 10px #e4dbcaaa;
  &:hover,
  &:focus {
    background: #ebe4d9;
    color: #8d7e5b;
  }
`;

const ProductImg = styled(Image)`
  width: 65px;
  height: 65px;
  object-fit: cover;
  border-radius: 9px;
  border: 1px solid #e1d9c6;
  box-shadow: 0 4px 18px #eae1cbbc;
`;

const SearchBar = styled(InputGroup)`
  max-width: 400px;
  margin-top: 6px;
  margin-bottom: 30px;
  input {
    border-radius: 9px !important;
    border: 1.5px solid #e2dccd;
    box-shadow: 0 3px 10px rgba(226, 220, 195, 0.25);
    font-size: 1.05rem;
    padding: 11px 14px;
    color: #5c5343;
    &::placeholder {
      color: #b2a68b;
    }
    &:focus {
      border-color: #d6cfc1;
      outline: none;
      box-shadow: 0 0 0 3px rgba(214, 207, 193, 0.25);
    }
  }
`;

function paginationItemStyle(active: boolean, disabled?: boolean) {
  if (disabled) {
    return {
      backgroundColor: "#f8f4e9",
      color: "#cbbfae",
      border: "1.1px solid #e4dbca",
      minWidth: 38,
      height: 44,
      borderRadius: 9,
      fontWeight: 600,
      boxShadow: "none",
      cursor: "not-allowed",
      pointerEvents: "none",
    };
  }
  return {
    backgroundColor: active ? "#d6cfc1" : "#fff",
    color: active ? "#564d3b" : "#a39173",
    border: "1.5px solid #e4dbca",
    minWidth: 38,
    height: 44,
    borderRadius: 9,
    fontWeight: active ? 700 : 500,
    fontSize: "1.07em",
    boxShadow: active ? "0 6px 0 0 #ebe4d9" : "none",
    cursor: "pointer",
    transition: "background .16s, color .13s, box-shadow .15s",
    margin: "0 5px",
  };
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: "",
  });
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const API = "https://68f278b4b36f9750deecbed2.mockapi.io/data/api/products";

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(API);
      setProducts(data);
    } catch {
      toast.error("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function openModal(product?: Product) {
    if (product) {
      setSelectedProduct(product);
      setFormValues({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        imageUrl: product.imageUrl,
      });
    } else {
      setSelectedProduct(null);
      setFormValues({
        name: "",
        price: "",
        category: "",
        stock: "",
        imageUrl: "",
      });
    }
    setModalOpen(true);
  }

  async function handleSave() {
    if (
      !formValues.name ||
      !formValues.price ||
      !formValues.category ||
      !formValues.stock
    ) {
      toast.error("Please fill all fields!");
      return;
    }
    if (isNaN(Number(formValues.price)) || Number(formValues.price) <= 0) {
      toast.error("Enter valid price!");
      return;
    }
    if (isNaN(Number(formValues.stock)) || Number(formValues.stock) < 0) {
      toast.error("Enter valid stock!");
      return;
    }

    setSaving(true);
    try {
      if (selectedProduct) {
        const { data } = await axios.put(`${API}/${selectedProduct.id}`, {
          ...formValues,
          price: Number(formValues.price),
          stock: Number(formValues.stock),
        });
        setProducts(products.map((p) => (p.id === data.id ? data : p)));
        toast.success("Product updated!");
      } else {
        const { data } = await axios.post(API, {
          ...formValues,
          price: Number(formValues.price),
          stock: Number(formValues.stock),
        });
        setProducts([...products, data]);
        toast.success("Product added!");
      }
      setModalOpen(false);
      setSelectedProduct(null);
      setFormValues({
        name: "",
        price: "",
        category: "",
        stock: "",
        imageUrl: "",
      });
    } catch {
      toast.error("Error saving product!");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted.");
    } catch {
      toast.error("Delete failed!");
    }
  }

  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      style={{
        background: "#fffdfb",
        minHeight: "100vh",
        padding: "40px 0",
        paddingBottom: "80px",
      }}
    >
      <Card>
        <Row className="mb-1 align-items-end">
          <Col md={7}>
            <PageTitle>Products Management</PageTitle>
            <SearchBar>
              <Form.Control
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </SearchBar>
          </Col>
          <Col md={5} className="text-md-end mt-2 mt-md-0">
            <AddBtn onClick={() => openModal()}>+ Add Product</AddBtn>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: "#d7c8b2" }} />
          </div>
        ) : (
          <>
            <div style={{ overflowX: "auto" }}>
              <Table
                bordered
                hover
                responsive
                style={{
                  background: "#fffefc",
                  borderRadius: "16px",
                  fontSize: "1.06em",
                  border: "none",
                  boxShadow: "0 2px 12px #f0e9db8a",
                }}
              >
                <thead style={{ background: "#f7f2e8" }}>
                  <tr>
                    <th style={{ color: "#d4c6ad", fontWeight: 700 }}>#</th>
                    <th style={{ color: "#d4c6ad", fontWeight: 700 }}>Image</th>
                    <th style={{ color: "#d4c6ad", fontWeight: 700 }}>Name</th>
                    <th style={{ color: "#d4c6ad", fontWeight: 700 }}>
                      Category
                    </th>
                    <th style={{ color: "#d4c6ad", fontWeight: 700 }}>
                      Price ($)
                    </th>
                    <th style={{ color: "#d4c6ad", fontWeight: 700 }}>Stock</th>
                    <th style={{ color: "#d4c6ad", fontWeight: 700 }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product, index) => (
                      <tr key={product.id}>
                        <td style={{ fontWeight: 600, color: "#cdbf9c" }}>
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td>
                          <ProductImg
                            src={product.imageUrl}
                            alt={product.name}
                          />
                        </td>
                        <td style={{ fontWeight: 500, color: "#a6977f" }}>
                          {product.name}
                        </td>
                        <td style={{ color: "#c7b998" }}>{product.category}</td>
                        <td>
                          <span style={{ color: "#c7b998" }}>
                            ${product.price}
                          </span>
                        </td>
                        <td style={{ color: "#c7b998" }}>{product.stock}</td>
                        <td>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            style={{
                              minWidth: 56,
                              marginRight: 7,
                              fontWeight: 600,
                            }}
                            onClick={() => openModal(product)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            style={{ minWidth: 56, fontWeight: 600 }}
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>No products found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 20,
                backgroundColor: "#f7f2e8",
                borderRadius: 13,
                boxShadow: "0 4px 20px #dbc9a542",
                margin: "20px auto 0 auto",
                maxWidth: "fit-content",
              }}
            >
              <Pagination size="sm" className="mb-0">
                <Pagination.Prev
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  style={paginationItemStyle(false, currentPage === 1)}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    style={paginationItemStyle(currentPage === i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  style={paginationItemStyle(
                    false,
                    currentPage === totalPages || totalPages === 0
                  )}
                />
              </Pagination>
            </div>
          </>
        )}

        {/* Add/Edit Product Modal */}
        <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedProduct ? "Edit Product" : "Add Product"}
            </Modal.Title>
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
                  placeholder="Enter product name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formValues.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formValues.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formValues.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  value={formValues.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={saving}
              style={{
                background: "#d6cfc1",
                color: "#564d3b",
                border: "none",
                fontWeight: 600,
              }}
            >
              {saving ? (
                <>
                  <Spinner size="sm" animation="border" /> Saving...
                </>
              ) : selectedProduct ? (
                "Update"
              ) : (
                "Save"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
};

export default Products;
