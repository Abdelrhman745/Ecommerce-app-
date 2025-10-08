import React, { type JSX } from "react";
import CardUI from "./components/Card";
import { useProductsQuery } from "../../services/GetCategoriesAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Spinner from 'react-bootstrap/Spinner';
import "./components/categories.css"


const images: string[] = [
  "https://cdn.thewirecutter.com/wp-content/media/2024/12/ROUNDUP-KOREAN-SKINCARE-2048px-9736-2x1-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
  "https://media.glamourmagazine.co.uk/photos/6891f9bcd47bb28da6f8f0f7/16:9/w_2560%2Cc_limit/Best%2520Korean%2520Serums%252005082025%2520main.jpg",
  "https://publish.purewow.net/wp-content/uploads/sites/2/2024/05/Best-Korean-Skincare-Brands-Round-Lab.jpg?fit=680%2C400"
];

export default function Categories(): JSX.Element {
  const { data, isLoading, isError } = useProductsQuery<string[]>();

  if (isLoading)  
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Spinner animation="border" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
if (isError) {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2 style={{ color: "red" }}>An error occurred while fetching data</h2>
    </div>
  );
}

  return (
    <div style={{ padding: "30px" }}>
      <h6 style={{ fontWeight: "lighter" }}>Categories</h6>
      <h4 style={{ fontWeight: "lighter" }}>
        Natural Face Care for Visible Transformation
      </h4>
      <p style={{ fontSize: "14px", color: "grey" }}>
        Our natural face care is based on pure ingredients and
        biotechnological plant power, designed to transform your skin and
        provide visible results —naturally.
      </p>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, type: "bullets" }}
        navigation={true}
        style={{
          width: "100%",
          height: "auto",
          position: "relative"
        }}
        className="category-slider"
      >
        {data.map((cat, i) => (
          <SwiperSlide key={cat}>
            <CardUI title={cat} img={images[i % images.length]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
