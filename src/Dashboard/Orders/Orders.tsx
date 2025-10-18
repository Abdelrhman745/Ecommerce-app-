import React, { useState } from 'react';
import { Badge, Button, Modal, Spinner, Table, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/Store';
import { deleteOrderAsync, Order, updateOrderAsync } from '../../Redux/OrderSlice';
import "./orders.css";
import Swal from 'sweetalert2';

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.orders
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState("");

  const handleEditClick = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowModal(true);
  };

const handleDeleteOrder = (order: Order) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to delete order #${order.id}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteOrderAsync(order.id))
        .unwrap()
        .then(() => {
          Swal.fire(
            'Deleted!',
            `Order #${order.id} has been deleted.`,
            'success'
          )
        })
        .catch((err) => {
          Swal.fire(
            'Error!',
            `${err}`,
            'error'
          )
        });
    }
  });
};

  const handleSave = async () => {
    if (selectedOrder && selectedOrder.status !== newStatus) {
      const updatedOrder = { ...selectedOrder, status: newStatus };
      try {
        await dispatch(updateOrderAsync(updatedOrder)).unwrap();
        setShowModal(false);
      } catch (err: any) {
        alert(err);
      }
    } else {
      setShowModal(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "completed":
        return "success";
      case "canceled":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <p className="text-danger m-4">{error}</p>;

  return (
    <>
      <div className="p-4" style={{ marginTop: "50px", marginBottom: '100px' }}>
        <Table bordered responsive>
          <thead className="text-center">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total ($)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userName}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
                <td>
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td>${order.total.toFixed(2)}</td>
                <td className="text-center">
                  <Badge bg={getStatusVariant(order.status)}>
                    {order.status.toUpperCase()}
                  </Badge>
                </td>
                <td className="d-flex gap-2 justify-content-center">
                  <i
                    className="bi bi-pencil bg-primary text-white px-2"
                    style={{ cursor: 'pointer', fontSize: '1.2rem', padding: '5px', borderRadius: '4px' }}
                    title="Edit"
                    onClick={() => handleEditClick(order)}
                  ></i>
                  <i
                    className="bi bi-trash bg-danger text-white px-2"
                    style={{ cursor: 'pointer', fontSize: '1.2rem', padding: '5px', borderRadius: '4px' }}
                    title="Delete"
                    onClick={()=> handleDeleteOrder(order)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" value={selectedOrder?.userName} readOnly className="mb-3" />
          <Form.Label>Total</Form.Label>
          <Form.Control type="text" value={selectedOrder?.total} readOnly className="mb-3" />
          <Form.Label>Status</Form.Label>
          <Form.Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
