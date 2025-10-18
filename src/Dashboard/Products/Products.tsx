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
  background: #f9f8f6;
  border-radius: 14px;
  box-shadow: 0 8px 40px #e8e5df33;
  padding: 32px 22px 32px 22px;
  max-width: 1240px;
  margin: 0 auto;
`;

const PageTitle = styled.h2`
  font-family: "Montserrat", serif;
  font-weight: 700;
  color: #826d58;
  letter-spacing: 0.01em;
  font-size: 2.15rem;
`;

const AddBtn = styled(Button)`
  background: #9d8764;
  border: none;
  font-weight: 600;
  padding: 0.65em 2em;
  border-radius: 9px;
  font-size: 1.09em;
  transition: background 0.2s;
  &:hover {
    background: #7c6f63;
  }
`;

const ProductImg = styled(Image)`
  width: 65px;
  height: 65px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ebe6df;
  box-shadow: 0 4px 18px #e5e1d8;
`;

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
    } catch {
      toast.error("Delete failed!");
    }
  }

  return (
    <div
      style={{ background: "#f6f3ee", minHeight: "100vh", padding: "40px 0" }}
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
            <Spinner animation="border" style={{ color: "#9d8764" }} />
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <Table
              bordered
              hover
              responsive
              style={{
                background: "#fff9f3",
                borderRadius: "16px",
                fontSize: "1.04em",
              }}
            >
              <thead style={{ background: "#ebdfd1" }}>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price ($)</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product.id}>
                      <td style={{ fontWeight: 600, color: "#998068" }}>
                        {index + 1}
                      </td>
                      <td>
                        <ProductImg src={product.imageUrl} alt={product.name} />
                      </td>
                      <td style={{ fontWeight: 500 }}>{product.name}</td>
                      <td style={{ color: "#b08d6c" }}>{product.category}</td>
                      <td>
                        <span style={{ color: "#987549" }}>
                          ${product.price}
                        </span>
                      </td>
                      <td>{product.stock}</td>
                      <td>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          style={{ minWidth: 56, marginRight: 7 }}
                          onClick={() => openModal(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          style={{ minWidth: 56 }}
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
        )}
        <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#96764d" }}>
              {selectedProduct ? "Edit Product" : "Add Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
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
                <Form.Label>Category</Form.Label>
                <Form.Control
                  name="category"
                  value={formValues.category}
                  onChange={handleChange}
                  placeholder="e.g. Serum, Cleanser"
                  maxLength={30}
                  required
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Price ($)</Form.Label>
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
                    <Form.Label>Stock</Form.Label>
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
                <Form.Label>Image URL</Form.Label>
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
                        style={{ width: 38, height: 38, objectFit: "cover" }}
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
