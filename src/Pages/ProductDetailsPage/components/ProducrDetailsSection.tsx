import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import MoreDetails from "./MoreDetails";
import {  useParams } from "react-router-dom";
import { Product } from "../../../types/Product";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetails } from "../../../services/GetProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFromFavorite } from "../../../Redux/FavSlice";
import { RootState } from "../../../Redux/Store";
import toast, { Toaster } from 'react-hot-toast';
import { addToCart } from "../../../Redux/CartSlice";


interface Props {
  setProduct: (product: Product | null) => void;
}

export default function ProductDetailsSection({ setProduct }: Props) {

  
    const dispatch = useDispatch();
   
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ["productDetails", id],
    queryFn: () => fetchProductDetails(id),
  });

  useEffect(() => {
    if (data) setProduct(data);
  }, [data, setProduct]);
 const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === data?.id);
   const cartItems = useSelector((state: RootState) => state.cart.items);


  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" role="status" />
      </div>
    );

  if (isError)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ color: "red" }}>An error occurred while fetching data</h2>
      </div>
    );

      const handleFavoriteClick = () => {
    if (!data) return;

    if (isFavorite) {
      dispatch(removeFromFavorite(data.id));
      toast.error("Removed from favorites 💔");
    } else {
      dispatch(
        addToFavorite({
          id: data.id,
          name: data.name,
          price: data.price,
          image: data.imageUrl,
        })
      );
      toast.success("Added to favorites ❤️");
    }
  };
  const addProductToCart =()=>{
        if (!data) return;
         const isInCart = cartItems.some((item) => item.id === data.id);
          if (isInCart) {
    toast.error(`${data.name} is already in your cart`, {
      duration: 2000,
      position: "top-center",
    });
    return;
  }

        dispatch(addToCart({
          id:data.id,
          name:data.name,
          price:data.price,
          quantity:1,
          image:data.imageUrl
        }));
        toast.success(`${data.name} added to cart 🛒`, {
    duration: 2000,
    position: "top-center",
  });

  }


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    <Container className="pb-5">
      <Row className="g-5 align-items-center">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Img variant="top" src={data?.imageUrl} />
          </Card>
        </Col>

        <Col md={6}>
          <h3 className="fw-bold mb-3">{data?.name}</h3>
          <h5 className="text-dark mb-3">{data?.category}</h5>
          <p className="text-muted mb-2">{data?.description}</p>
          <div className="mb-3 text-warning fs-5">
            {"⭐".repeat(Math.round(data?.rating ?? 0))}
          </div>
          <h6 className="ps-1">
            <span
              style={{ fontSize: "18px", color: "gray", fontWeight: "normal" }}
            >
              Price :{" "}
            </span>
            ${data?.price}
          </h6>

          <Button className="p-2 bg-dark w-100" onClick={addProductToCart}>Add to Cart</Button>
      <h6
            className="my-4 fw-lighter d-flex align-items-center"
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={handleFavoriteClick}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "color 0.3s ease",
              }}
            >
              {isFavorite ? (
                <i className="bi bi-heart-fill text-danger fs-5"></i>
              ) : (
                <i className="bi bi-heart fs-5"></i>
              )}
              <span style={{ transition: "opacity 0.3s ease" }}>
                {isFavorite ? "Saved To Favorites" : "Save To Favorites"}
              </span>
            </span>
          </h6>

          <hr
            style={{
              borderTop: "3px solid black",
              width: "100%",
              marginBottom: "0px",
            }}
          />
          <MoreDetails />
        </Col>
      </Row>
    </Container>
    </>
  );
}
