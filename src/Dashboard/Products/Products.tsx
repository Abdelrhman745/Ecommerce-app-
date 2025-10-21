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
`;

const AddBtn = styled(Button)`
  background: #d6cfc1;
  color: #6a573e;
  border: none;
  font-weight: 600;
  padding: 0.68em 2em;
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
    outline: "none",
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

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const API = "https://68f278b4b36f9750deecbed2.mockapi.io/data/api/products";

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(API);
      setProducts(data);
    } catch (err) {
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
      if ((currentPage - 1) * itemsPerPage >= products.length - 1) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    } catch {
      toast.error("Delete failed!");
    }
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginationItems = [];
  const delta = 1;
  const rangeStart = Math.max(1, currentPage - delta);
  const rangeEnd = Math.min(totalPages, currentPage + delta);

  if (rangeStart > 1) {
    paginationItems.push(
      <Pagination.Item
        key={1}
        onClick={() => setCurrentPage(1)}
        active={1 === currentPage}
        style={paginationItemStyle(1 === currentPage)}
      >
        1
      </Pagination.Item>
    );
    if (rangeStart > 2) {
      paginationItems.push(
        <Pagination.Ellipsis
          key="start-ellipsis"
          disabled
          style={paginationItemStyle(false, true)}
        />
      );
    }
  }
  for (let i = rangeStart; i <= rangeEnd; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        onClick={() => setCurrentPage(i)}
        active={i === currentPage}
        style={paginationItemStyle(i === currentPage)}
      >
        {i}
      </Pagination.Item>
    );
  }
  if (rangeEnd < totalPages) {
    if (rangeEnd < totalPages - 1) {
      paginationItems.push(
        <Pagination.Ellipsis
          key="end-ellipsis"
          disabled
          style={paginationItemStyle(false, true)}
        />
      );
    }
    paginationItems.push(
      <Pagination.Item
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        active={totalPages === currentPage}
        style={paginationItemStyle(totalPages === currentPage)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  return (
    <div
      style={{ background: "#fffdfb", minHeight: "100vh", padding: "40px 0" }}
    >
      <Card>
        <Row className="mb-4 align-items-center">
          <Col md={7}>
            <PageTitle>Products Management</PageTitle>
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
                            style={{
                              minWidth: 56,
                              fontWeight: 600,
                            }}
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
            <Pagination
              className="justify-content-center mt-4"
              style={{
                userSelect: "none",
                backgroundColor: "#f7f2e8",
                borderRadius: 13,
                padding: "12px 20px",
                boxShadow: "0 4px 20px #dbc9a542",
                border: "none",
                margin: "0 auto",
              }}
              size="sm"
            >
              <Pagination.Prev
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={paginationItemStyle(false, currentPage === 1)}
              />
              {paginationItems}
              <Pagination.Next
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                style={paginationItemStyle(
                  false,
                  currentPage === totalPages || totalPages === 0
                )}
              />
            </Pagination>
          </>
        )}
        <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#c7b998" }}>
              {selectedProduct ? "Edit Product" : "Add Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#b2a68b" }}>
                  Product Name
                </Form.Label>
                <Form.Control
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  maxLength={50}
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#b2a68b" }}>Category</Form.Label>
                <Form.Control
                  name="category"
                  value={formValues.category}
                  onChange={handleChange}
                  placeholder="e.g. Latte, Espresso"
                  maxLength={30}
                  required
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#b2a68b" }}>
                      Price ($)
                    </Form.Label>
                    <Form.Control
                      name="price"
                      type="number"
                      value={formValues.price}
                      onChange={handleChange}
                      min={0}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#b2a68b" }}>Stock</Form.Label>
                    <Form.Control
                      name="stock"
                      type="number"
                      value={formValues.stock}
                      onChange={handleChange}
                      min={0}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#b2a68b" }}>Image URL</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="imageUrl"
                    value={formValues.imageUrl}
                    onChange={handleChange}
                    placeholder="Paste image link"
                  />
                  {formValues.imageUrl && (
                    <InputGroup.Text>
                      <Image
                        src={formValues.imageUrl}
                        alt="Preview"
                        thumbnail
                        style={{
                          width: 38,
                          height: 38,
                          objectFit: "cover",
                          border: "none",
                        }}
                      />
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleSave} disabled={saving}>
              {saving ? <Spinner animation="border" size="sm" /> : "Save"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
};

export default Products;
