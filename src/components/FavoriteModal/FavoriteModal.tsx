import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Image } from "react-bootstrap";
import { RootState } from "../../Redux/Store";
import { removeAllFavorite, removeFromFavorite } from "../../Redux/FavSlice";

interface FavoritesModal {
  show: boolean;
  onHide: () => void;
}

const FavoritesModal: React.FC<FavoritesModal> = ({ show, onHide }) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header  >
        <Modal.Title className="d-flex flex-row justify-content-between w-100">
            <h4>Favorites</h4>
            <i style={{cursor:"pointer"}} className="bi bi-trash text-end" onClick={() => dispatch(removeAllFavorite())}></i>
        </Modal.Title>
        
      </Modal.Header>
   <Modal.Body>
  {favorites.length === 0 ? (
    <div className="d-flex flex-wrap gap-3 justify-content-center py-5">
            <h4 >No favorites yet.</h4>

    </div>
  ) : (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {favorites.map((item) => (
        <div
          key={item.id}
          className="border rounded p-2 text-center"
          style={{
            width: "150px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            thumbnail
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <h6 className="mt-2">{item.name}</h6>
          <p className="mb-2">${item.price}</p>
          <Button
            variant="danger"
            size="sm"
            onClick={() => dispatch(removeFromFavorite(item.id))}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  )}
</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FavoritesModal;
