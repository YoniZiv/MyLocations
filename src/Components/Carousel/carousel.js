import React from "react";
import { Carousel } from "react-bootstrap";

const HamCarousel = () => (
  <Carousel style={ {height: 300, width: "100%", display: "inline-block" } }>
    <Carousel.Item>
      <img style={ { height: 300, width:"100%", filter: "blur(2px)"} } alt="900x500" src="http://nature-to-nurture.co.uk/wp-content/uploads/2014/03/Mighty-Tree-With-Green-Leaves-Banner-Nature-To-Nurture-Aromatherapy-In-Hemel-St-Albans.jpg"/>
      <Carousel.Caption>
        <h3>Shashlik Mashlik</h3>
        <p>Come eat Sala with me.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img style={ { height: 300, width:"100%", filter: "blur(2px)"} } alt="900x500" src="http://cadesky.tax/img/slides/home_banner_buildings.jpg"/>
      <Carousel.Caption>
        <h3>Doktarsaja orginal</h3>
        <p>Just like Babushka used to make it.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img style={ { height: 300, width:"100%", filter: "blur(2px)"} } alt="900x500" src="http://blog.ourcrowd.com/wp-content/uploads/2016/09/OurCrowd-Newsletter-banner.png"/>
      <Carousel.Caption>
        <h3>Putin the king</h3>
        <p>The only president for me.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
)



export default HamCarousel

