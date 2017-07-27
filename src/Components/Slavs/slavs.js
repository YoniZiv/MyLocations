import React from "react"
import { Button, Col, Grid, Row, Thumbnail } from "react-bootstrap";

const Slavs = () => (
  <Grid>
    <Row>
      <Col xs={6} md={4}>
        <Thumbnail src="http://cdn77.sadanduseless.com/wp-content/uploads/2016/04/slav1.jpg" alt="242x200">
          <h3>Vladi</h3>
          <p>Ready for battle!</p>
          <p>
            <Button bsStyle="primary">Like</Button>&nbsp;
            <Button bsStyle="default">Buy</Button>
          </p>
        </Thumbnail>
      </Col>
      <Col xs={6} md={4}>
        <Thumbnail src="http://cdn77.sadanduseless.com/wp-content/uploads/2016/04/slav9.jpg" alt="242x200">
          <h3>Yura</h3>
          <p>Ti kto takoi?!</p>
          <p>
            <Button bsStyle="primary">Like</Button>&nbsp;
            <Button bsStyle="default">Buy</Button>
          </p>
        </Thumbnail>
      </Col>
      <Col xs={6} md={4}>
        <Thumbnail src="http://teplitz.ru/Foto_raznoe/Gopnik.jpg" alt="242x200">
          <h3>Vasya</h3>
          <p>Tvaju rot yebal</p>
          <p>
            <Button bsStyle="primary">Like</Button>&nbsp;
            <Button bsStyle="default">Buy</Button>
          </p>
        </Thumbnail>
      </Col>
    </Row>
  </Grid>

)

export default Slavs;