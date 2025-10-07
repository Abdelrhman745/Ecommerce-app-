import Card from 'react-bootstrap/Card';

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
        height:"550px",
        position: "relative",
        overflow: "hidden",
        margin:"auto"
      }}
    >
      <Card.Img
        src={img}
        alt={title}
        style={{
          width: "100%",
          height: "550px",
        //   objectFit: "cover",
          filter: "brightness(0.6)"
        }}
      />
      <Card.Body
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Card.Title style={{ fontSize: "25px", fontWeight:"lighter" }}>
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
