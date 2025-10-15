import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import about1 from "../../assets/images/download.jpg"
import "./about.css"
import TextSec from '../../components/TextSection/TextSection'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
export default function About() {
    const navigate =useNavigate();
  return (
    
    <>
        <Helmet>
      <meta charSet="utf-8" />
      <title> About us </title>

    </Helmet>
<Container fluid className="p-0 mt-4">
            <Row>
            <Col md={6} className="text-center p-0">
            <img src={about1} width={"500px"} height={"500px"} />
            </Col>
            <Col md={6} className='m-auto'>
            <h3>Our Story</h3>
            <p className="text-muted">Our line features meticulous skin, hair, and body care <br /> formulations, crafted with both 
             efficacy and sensory delight in <br /> focus.</p>
               <p className="text-muted">
                We are dedicated to creating top-quality skin, hair, and body <br /> care products.
                We extensively research plant-based and lab- <br /> made ingredients, selecting only those with 
                 <br />proven safety and <br /> effectiveness.
                 At our distinctive stores, knowledgeable <br /> consultants are eager to introduce you to the 
                 Aesop range and <br /> assist with your choices.</p>
            </Col>
        </Row>
         <Row className="flex-row-reverse my-5">
            <Col md={6}  className="p-0">
            <img src="https://i.pinimg.com/1200x/b4/3a/00/b43a004b97d785cfb87112df7278772b.jpg" width={"500px"} height={"500px"} />
            </Col>
            <Col md={6} className="text-center m-auto">
            <h3>Countless solutions have been <br />discovered in nature.
We simply <br /> need to observe and tap into its <br /> inherent brilliance.</h3>
                 <Button type="button" className="bg-light text-black border-dark mt-1" onClick={()=>navigate("/products")}> Discover Products <i className="bi bi-arrow-right"></i></Button>

        
            </Col>
        </Row>
        <Row >
          <img src={"https://www.tru-skin.com/getmedia/f997351b-2ea2-46ec-a570-62af1be71c89/Facial-Cleasner-Hero.jpg?width=720&height=400&ext=.jpg"} 
          height={"400px"}
          />
        </Row>
        <TextSec/>
<Row className="g-0 mb-0 justify-content-evenly last-section">
          <Col md={4} className="about-image left-image d-flex align-items-center p-0 m-0">
            <div className="overlay-content">
              <h3>Quality & Efficacy</h3>
              <p>
                For those serious about skin health, trust someone dedicated since 1986.
                With over 35 years of crafting certified natural cosmetics.
              </p>
              <Button variant="outline-light" onClick={() => window.location.href="https://curology.com/blog/tag/serum/"}>Discover More <i className="bi bi-arrow-right"></i></Button>
            </div>
          </Col>
<Col md={4} className="about-image center-image d-flex align-items-center p-0 m-0">
            <div className="overlay-content">
              <h3>High Tech Cleanser</h3>
              <p>
                We build our formulas on nature’s most precious raw materials, refined with modern technologies.
              </p>
              <Button variant="outline-light" onClick={() => window.location.href="https://www.tru-skin.com/blog/must-have-ingredients-in-facial-cleansers-for-great-skin/"}>Discover More <i className="bi bi-arrow-right"></i></Button>
            </div>
          </Col>
          <Col md={4} className="about-image right-image d-flex align-items-center p-0 m-0">
            <div className="overlay-content">
              <h3>High Tech Natural Skin Care</h3>
              <p>
                We build our formulas on nature’s most precious raw materials, refined with modern technologies.
              </p>
              <Button variant="outline-light" onClick={() => window.location.href="https://www.o3plus.com/blogs/moisturizers?srsltid=AfmBOooS-rDx6E67TQPBSKAd6nIlWSZ7-4JjQL0pok7eAIDx7AwX9Aic/"}>Discover More <i className="bi bi-arrow-right"></i></Button>
            </div>
          </Col>
        </Row>
    </Container>

    </>
  )
}
