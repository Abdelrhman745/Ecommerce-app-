import { Col, Container, Row } from "react-bootstrap";
import "../Gallery/gallery.css";

export default function Gallery() {
  const galleryImages: string[] = [
    "src/assets/images/Ig.png",
    "src/assets/images/Ig (1).png",
    "src/assets/images/Ig (2).png",
    "src/assets/images/Ig (3).png",
    "src/assets/images/Ig (4).png",
    "src/assets/images/Ig (5).png",
  ];

  return (
    <div className="galleryDev">
      <h4 style={{ fontWeight: "400", marginBottom: "40px" }}>User  Voice</h4>

      <Container style={{ padding: "0" ,margin:"auto"}}>
        <Row 
          className="g-0"  
          style={{ 
            justifyContent: "center", 
            margin: "0 auto"  
          }}
        >
          {galleryImages.map((img, index) => (
            <Col
              key={index}
              xs={4} 
              style={{ 
                padding: "0 !important",  
                margin: "0 !important"   
              }}
              className="g-0"
            >
              <img
                className="gallerImg"
                src={img}
                style={{
                  width: "100%", 
                  height: "200px",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 !important",
                  padding: "0 !important",
                  borderRadius: "0",
                  border: "none" 
                }}
                alt={`Gallery Image ${index + 1}`}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
