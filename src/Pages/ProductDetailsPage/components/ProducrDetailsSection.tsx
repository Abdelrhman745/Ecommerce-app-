import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import MoreDetails from "./MoreDetails";
import { useParams } from "react-router-dom";
import { Product } from "../../../types/Product";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "react-bootstrap-icons";
import { fetchProductDetails } from "../../../services/GetProductDetails";


interface Props {
  setProduct: (product: Product | null) => void;
}

export default function ProductDetailsSection({setProduct}:Props) {
  
  const { id } = useParams();


  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ["productDetails", id],
    queryFn:()=> fetchProductDetails(id),
  });

   useEffect(() => {
    if (data) setProduct(data);
  }, [data, setProduct]);

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" role="status" />
      </div>
    );

  if (isError)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ color: "red" }}>An error occurred while fetching data</h2>
      </div>
    );

  return (
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
            <span style={{ fontSize: "18px", color: "gray", fontWeight: "normal" }}>Price : </span>${data?.price}
          </h6>

          <Button className="p-2 bg-dark w-100">Add to Cart</Button>
          <h6 className="my-4 fw-lighter">
              <Heart color="black" size={18} className="me-2" /> Save To Favorites
          </h6>
          <hr style={{ borderTop: "3px solid black", width: "100%", marginBottom: "0px" }} />
          <MoreDetails />
        </Col>
      </Row>
    </Container>
  );
}