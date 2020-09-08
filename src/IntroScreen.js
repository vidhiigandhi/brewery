import React from "react";
import {
  Jumbotron,
  Button,
  Spinner,
  Figure,
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import beer from "./assets/beerfill.gif";
import { Link } from "react-router-dom";
import history from "./history";

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.getRandomBeer = this.getRandomBeer.bind(this);
    this.url =
      "http://api.brewerydb.com/v2/beers/?key=a5c1b917e7ba62dcd79f434ed73bc72d&withBreweries=Y&order=random&randomCount=1";
    this.cors_api_url = "https://cors-anywhere.herokuapp.com/";
    this.imagefail =
      "https://touch.daft.ie/static/images/fallbacks/no-image-size740x480.jpg";
  }

  getRandomBeer() {
    this.setState({
      isLoaded: false
    });
    var x = new XMLHttpRequest();
    x.open("GET", this.cors_api_url + this.url);
    x.onload = x.onerror = () => {
      this.setState({
        isLoaded: true,
        items: JSON.parse(x.responseText).data[0]
      });
    };
    if (/^POST/i.test("GET")) {
      x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    x.send("");
  }

  componentDidMount() {
    this.id = window.sessionStorage.getItem("beerId");
    if (this.id) {
      window.sessionStorage.removeItem("beerId");
      this.url = `http://api.brewerydb.com/v2/beers/?key=a5c1b917e7ba62dcd79f434ed73bc72d&ids=${this.id}&withBreweries=Y`;
    }
    this.getRandomBeer();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    return (
      <Jumbotron>
        <div class="labelBeer"> Welcome To Beer Brewery 🍺 </div>
        {error ? (
          <div>Error: {error.message}</div>
        ) : !isLoaded ? (
          <Spinner animation="border" role="status" variant="warning">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Container>
            <Row>
              <Col>
                <Figure>
                  <Figure.Image
                    width={210}
                    height={210}
                    alt="210x210"
                    src={beer}
                  />
                  <Figure.Caption>
                    Image Source:{" "}
                    <a href="https://blog.joypixels.com/presenting-emoji-animations-2-0/">
                      Joy Pixels
                    </a>
                  </Figure.Caption>
                </Figure>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="warning"
                  class="titleText"
                  onClick={() => {
                    this.url =
                      "http://api.brewerydb.com/v2/beers/?key=a5c1b917e7ba62dcd79f434ed73bc72d&withBreweries=Y&order=random&randomCount=1";
                    this.getRandomBeer();
                  }}
                >
                  Click for Random Beer
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card
                  style={{
                    width: "auto",
                    backgroundColor: "#ffc107",
                    display: "inline-block",
                    margin: "10px",
                    padding: "20px"
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={items.labels ? items.labels.medium : this.imagefail}
                  />
                  <Card.Body>
                    <Card.Title>{items.name}</Card.Title>
                    <Card.Text>
                      <div>
                        <div class="titleText">Description:</div>{" "}
                        {items.style.description}
                      </div>
                      {items.breweries.map((ele) => {
                        return (
                          <div>
                            <div>
                              <div class="titleText">Brewery Name:</div>{" "}
                              {ele.name}
                            </div>
                          </div>
                        );
                      })}
                    </Card.Text>
                    <Link to={`/details/:${items.id}`}>More Details..</Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </Jumbotron>
    );
  }
}

export default IntroScreen;
