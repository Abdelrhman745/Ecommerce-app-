import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import MoreDetails from './MoreDetails'

export default function ProducrDetailsSection() {
  return (
    
     <Container className="py-5">
      <Row className="g-5 align-items-center">
        <Col md={6}>
          <Card className=" shadow-sm border-0">
            <Card.Img variant="top" src="https://us.innisfree.com/cdn/shop/files/IF_V-CM_PDP_01_Packshot_2024_1080x1080_cbbd6762-1ece-4aaa-a06b-0fb4290b37c8.jpg?v=1703776282&width=1080"  />
          </Card>
        </Col>

        <Col md={6}>
          <h4 className="fw-bold mb-3">Gentel plancing Toner</h4>
           <h6 className=" text-muted mb-3">SkinCare  .Toner</h6>
          <p className="text-muted mb-2">
            Lorem ipsum dolor sit,amet consectetur
            adipisicing elit. Temporedeserunt eos provident
              sapiente accusamus,rerum corrupti magnam?
               Pariatur esse laudantium eum neque </p>
               <h4>⭐⭐⭐⭐</h4>
          {/* <div className="mb-3 text-warning fs-5">
            {"⭐".repeat(Math.round(product.rating))}
          </div> */}
                        <h6 className="ps-1"><span style={{fontSize:"18px",color:"gray",fontWeight:"normal"}}>Price : </span>32$</h6>


          <Button className="p-2 bg-dark w-100">
            Add to Cart
          </Button>
          <h6 className="my-2 fw-lighter"><i className="bi bi-heart"></i> Save To Favorites</h6>
          <hr style={{borderTop: "3px solid black", border: "none", width: '60%' , marginBottom:"0px"}} />
                <MoreDetails/>

        </Col>
      </Row>
     
      </Container>
  )
}
