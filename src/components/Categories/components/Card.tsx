import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface CardUIProps {
  title: string;
  img: string;
}

export default function CardUI({ title, img }: CardUIProps) {
  return (
    <Card
      style={{
        width: "100%",
        border: "none",
        height: "450px",
        position: "relative",
        overflow: "hidden",
        margin: "auto",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      <Card.Img
        src={img}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.6)",
          transition: "transform 0.5s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      <Card.Body
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Card.Title style={{ fontSize: "20px", fontWeight: "lighter" }}>
          {title}
        </Card.Title>
        <Button
          variant="light"
          style={{
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "500",
            border: "none",
            color: "#333",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#333";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.color = "#333";
          }}
        >
          Shop Now
        </Button>
      </Card.Body>
    </Card>
  );
}
